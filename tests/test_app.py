"""Integration tests. All DB/config writes are isolated in a temporary directory.
DeepSeek calls are mocked; these tests never transmit a key or spend API credits.
"""
import copy
import io
import json
from pathlib import Path
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch
import urllib.error
import urllib.request

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import app


class KitchenTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='shiwei-tests-')
        self.original_db,self.original_env=app.DB_PATH,app.ENV_PATH
        self.original_config=dict(app.CONFIG)
        app.DB_PATH=Path(self.temp.name)/'kitchen.db'
        app.ENV_PATH=Path(self.temp.name)/'.env'
        app.CONFIG.clear()
        app.CONFIG.update(api_key='',model=app.DEFAULT_MODEL)
        app.init_db()
        self.server=app.make_server(0)
        self.thread=threading.Thread(target=self.server.serve_forever,daemon=True)
        self.thread.start()
        self.base=f'http://127.0.0.1:{self.server.server_port}'

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)
        app.DB_PATH,app.ENV_PATH=self.original_db,self.original_env
        app.CONFIG.clear()
        app.CONFIG.update(self.original_config)
        self.temp.cleanup()

    def request(self,path,method='GET',body=None,headers=None):
        data=None if body is None else json.dumps(body,ensure_ascii=False).encode()
        request=urllib.request.Request(self.base+path,data=data,method=method,headers={'Content-Type':'application/json',**(headers or {})})
        try:
            with urllib.request.urlopen(request,timeout=5) as response:
                raw=response.read()
                return response.status,json.loads(raw) if response.headers.get_content_type()=='application/json' else raw
        except urllib.error.HTTPError as error:
            return error.code,json.loads(error.read())

    def test_bootstrap_static_database_and_provenance(self):
        status,health=self.request('/api/health')
        self.assertEqual(status,200)
        self.assertGreaterEqual(health['recipes'],350)
        self.assertFalse(health['configured'])
        status,page=self.request('/')
        self.assertEqual(status,200)
        self.assertIn('拾味厨房'.encode(),page)
        status,recipes=self.request('/api/recipes')
        self.assertGreaterEqual(len(recipes),350)
        self.assertEqual({r['region'] for r in recipes},{'东方','西方'})
        for recipe in recipes:
            self.assertTrue(recipe['source']['url'].startswith('https://'))
            self.assertTrue(recipe['ingredients'])
            self.assertTrue(recipe['steps'])
            self.assertTrue((app.PUBLIC/recipe['image'].lstrip('/')).is_file())

    def test_search_synonyms_vegan_and_allergens(self):
        self.assertEqual(app.search_recipes('西红柿鸡蛋',max_minutes=20)[0]['id'],'tomato-eggs')
        recipes=app.search_recipes('推荐晚餐',diet='vegan',avoid='对花生、牛奶过敏',limit=8)
        self.assertTrue(recipes)
        self.assertTrue(all(r['diet']=='vegan' for r in recipes))
        self.assertTrue(all(app.recipe_allowed(r,'vegan','花生 牛奶') for r in recipes))
        self.assertFalse(app.recipe_allowed(app.get_recipe('carbonara'),avoid='乳制品'))
        self.assertFalse(app.recipe_allowed(app.get_recipe('garlic-prawns'),avoid='海鲜'))
        self.assertFalse(app.recipe_allowed(app.get_recipe('kung-pao'),avoid='不能吃辣'))

    def test_region_filters_and_natural_language_retrieval(self):
        for area in ('四川','广东','日本','意大利','墨西哥'):
            recipes=app.search_recipes(area=area,limit=8)
            self.assertTrue(recipes,area)
            self.assertTrue(all(r['area']==area for r in recipes))
        self.assertTrue(all(r['area']=='四川' for r in app.search_recipes('想吃川菜',limit=8)))
        self.assertEqual(app.search_recipes(area='不存在的地区'),[])
        self.assertTrue(all(r['area_group']=='欧洲' for r in app.search_recipes(area_group='欧洲',limit=8)))
        status,recipes=self.request('/api/recipes?area='+urllib.parse.quote('广东'))
        self.assertEqual(status,200)
        self.assertTrue(recipes)
        self.assertTrue(all(r['area']=='广东' for r in recipes))
        status,recipes=self.request('/api/recipes?area_group='+urllib.parse.quote('美洲'))
        self.assertEqual(status,200)
        self.assertTrue(all(r['area_group']=='美洲' for r in recipes))

    def test_source_quantities_and_unknown_metadata_remain_honest(self):
        recipe=app.get_recipe('bastian-pizza')
        self.assertTrue(recipe['quantity_notes'])
        self.assertTrue(recipe['servings_note'])
        self.assertEqual(recipe['diet'],'unknown')
        self.assertFalse(app.recipe_allowed(recipe,'vegan'))
        self.assertFalse(app.recipe_allowed(app.get_recipe('bastian-smashed-burger'),avoid='鸡蛋'))
        self.assertFalse(app.recipe_allowed(app.get_recipe('bastian-tarte-flambee'),avoid='牛奶'))
        self.assertEqual(app.search_recipes(area='意大利',query=recipe['name'],max_minutes=1),[])
        for r in app.all_recipes():
            self.assertTrue(all(s.strip() for s in r['steps']))
            self.assertTrue(r['area'] and r['area_group'])

    def test_bundle_upgrade_is_idempotent_and_preserves_user_data(self):
        with app.connect() as db:
            db.execute("INSERT INTO favorites(recipe_id) VALUES('tomato-eggs')")
            db.execute("INSERT INTO sessions(id,title) VALUES(?,?)",('a'*32,'existing user conversation'))
            db.execute("INSERT INTO messages(session_id,role,content) VALUES(?,?,?)",('a'*32,'user','既有问答'))
            # Simulate a prior installation with only the original bundle.
            db.execute("DELETE FROM recipes WHERE id LIKE 'htc-%' OR id LIKE 'bastian-%'")
            db.execute("DELETE FROM data_imports WHERE filename='community-recipes.json'")
        app.init_db()
        count=len(app.all_recipes())
        self.assertGreaterEqual(count,390)
        app.init_db()
        self.assertEqual(len(app.all_recipes()),count)
        self.assertEqual(self.request('/api/favorites')[1],['tomato-eggs'])
        self.assertEqual(app.read_session('a'*32)['messages'][0]['content'],'既有问答')

    def test_favorites_persist_and_import_preserves_them(self):
        status,result=self.request('/api/favorites/tomato-eggs','PUT',{'favorite':True})
        self.assertEqual(status,200)
        self.assertTrue(result['favorite'])
        self.assertEqual(self.request('/api/favorites')[1],['tomato-eggs'])
        app.import_recipes(app.ROOT/'data'/'recipes.json')
        self.assertEqual(self.request('/api/favorites')[1],['tomato-eggs'])
        self.request('/api/favorites/tomato-eggs','PUT',{'favorite':False})
        self.assertEqual(self.request('/api/favorites')[1],[])
        self.assertEqual(self.request('/api/favorites/missing','PUT',{'favorite':True})[0],404)
        self.assertEqual(self.request('/api/favorites/tomato-eggs','PUT',{'favorite':'yes'})[0],400)

    def test_personal_import_preview_persistence_and_retrieval(self):
        recipe={'id':'user-family-soup','name':'清爽萝卜汤','area_group':'中国','area':'广东',
                'minutes':25,'servings':3,'diet':'vegan','ingredients':['萝卜 1 个','盐适量'],
                'steps':'萝卜切块。\n加水煮软，调味。'}
        count=len(app.all_recipes())
        status,preview=self.request('/api/recipes/import','POST',{'recipes':[recipe],'dry_run':True})
        self.assertEqual(status,200)
        self.assertEqual(preview['added'],1)
        self.assertEqual(len(app.all_recipes()),count)
        self.assertEqual(self.request('/api/personal-recipes')[1],[])
        status,result=self.request('/api/recipes/import','POST',{'recipes':[recipe]})
        self.assertEqual(status,200)
        self.assertEqual(result['added'],1)
        stored=self.request('/api/recipes/user-family-soup')[1]
        self.assertTrue(stored['personal'])
        self.assertEqual(stored['steps'],['萝卜切块。','加水煮软，调味。'])
        self.assertEqual(stored['source']['url'],'')
        self.assertIsNone(stored['ingredients'][0]['quantity'])
        self.assertEqual(app.search_recipes('清爽萝卜汤',area='广东')[0]['id'],recipe['id'])
        app.init_db()
        self.assertEqual(len(app.all_recipes()),count+1)
        self.assertEqual(self.request('/api/personal-recipes')[1][0]['id'],recipe['id'])
        reply=app.handle_chat({'message':'清爽萝卜汤怎么做？'})
        self.assertIn(recipe['id'],[r['id'] for r in reply['sources']])

    def test_personal_export_round_trip_conflicts_updates_and_delete(self):
        minimal={'name':'我的炖菜','ingredients':[{'name':'土豆','quantity':2,'unit':'个'}],'steps':['煮熟。']}
        self.request('/api/recipes/import','POST',{'recipes':[minimal]})
        exported=self.request('/api/personal-recipes')[1]
        self.assertEqual(len(exported),1)
        rid=exported[0]['id']
        self.assertTrue(rid.startswith('user-'))
        self.assertEqual(exported[0]['time_note'],'unknown')
        self.assertTrue(exported[0]['servings_note'])
        self.request('/api/favorites/'+rid,'PUT',{'favorite':True})
        exported[0]['name']='改良版炖菜'
        status,result=self.request('/api/recipes/import','POST',{'recipes':exported})
        self.assertEqual((status,result['skipped']),(200,1))
        self.assertEqual(app.get_recipe(rid)['name'],'我的炖菜')
        status,result=self.request('/api/recipes/import','POST',{'recipes':exported,'on_conflict':'update'})
        self.assertEqual((status,result['updated']),(200,1))
        self.assertEqual(app.get_recipe(rid)['name'],'改良版炖菜')
        self.assertIn(rid,self.request('/api/favorites')[1])
        self.assertEqual(self.request('/api/personal-recipes/tomato-eggs','DELETE')[0],404)
        self.assertEqual(self.request('/api/personal-recipes/'+rid,'DELETE')[0],200)
        self.assertNotIn(rid,self.request('/api/favorites')[1])
        self.assertEqual(self.request('/api/recipes/'+rid)[0],404)

    def test_personal_import_rejects_bad_batches_without_partial_writes(self):
        good={'id':'user-valid','name':'测试菜','ingredients':['番茄'],'steps':['切块。']}
        count=len(app.all_recipes())
        for bad in (dict(good,name=''),dict(good,id='tomato-eggs'),dict(good,ingredients=[]),
                    dict(good,image='https://example.com/a.jpg'),dict(good,minutes='30'),
                    dict(good,ingredients=[{'name':'盐','quantity':float('nan'),'unit':'克'}]),
                    dict(good,source={'name':'外部来源','title':'测试','url':'','retrieved_at':'2026-10-08'}),
                    dict(good,area_group='不明地区')):
            with self.subTest(bad=bad):
                self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good,bad]})[0],400)
                self.assertEqual(len(app.all_recipes()),count)
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good,good]})[0],400)
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good]*501})[0],400)
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good],'dry_run':'yes'})[0],400)
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good],'padding':'x'*(2*1024*1024)})[0],413)
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good]},headers={'Origin':'https://example.com'})[0],403)

    def test_personal_import_keeps_builtin_source_metadata(self):
        before=app.get_recipe('tomato-eggs')['source']
        recipe={'name':'参考做法','ingredients':['番茄'],'steps':['煮熟。'],
                'source':{**before,'name':'用户的来源标题','title':'另一个标题'}}
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[recipe]})[0],200)
        self.assertEqual(app.get_recipe('tomato-eggs')['source'],before)

    def test_offline_chat_quantity_and_history(self):
        status,result=self.request('/api/chat','POST',{'message':'西红柿鸡蛋怎么做，4 人份','context':{'servings':2,'time':20}})
        self.assertEqual(status,200)
        self.assertEqual(result['mode'],'local')
        self.assertIn('番茄 800克',result['content'])
        self.assertEqual(result['sources'][0]['id'],'tomato-eggs')
        sid=result['session_id']
        self.assertEqual(len(self.request('/api/sessions/'+sid)[1]['messages']),2)
        self.request('/api/chat','POST',{'message':'还有什么建议？','session_id':sid})
        self.assertEqual(len(self.request('/api/sessions/'+sid)[1]['messages']),4)
        self.assertEqual(len(self.request('/api/sessions')[1]),1)

    def test_explicit_diet_time_and_allergy_survive_followup(self):
        result=app.handle_chat({'message':'我对牛奶过敏，请推荐 15 分钟内的纯素菜。'})
        for source in result['sources']:
            recipe=app.get_recipe(source['id'])
            self.assertEqual(recipe['diet'],'vegan')
            self.assertLessEqual(recipe['minutes'],15)
            self.assertNotIn('牛奶',recipe['allergens'])
        followup=app.handle_chat({'message':'再推荐一道西式的','session_id':result['session_id']})
        for source in followup['sources']:
            self.assertNotIn('牛奶',app.get_recipe(source['id'])['allergens'])

    def test_empty_result_is_honest(self):
        result=app.handle_chat({'message':'我想吃晚饭','context':{'diet':'vegan','time':1}})
        self.assertEqual(result['sources'],[])
        self.assertIn('没有同时满足',result['content'])

    def test_settings_never_expose_key_and_are_saved_locally(self):
        status,settings=self.request('/api/settings','POST',{'api_key':'test-only-not-a-real-key','model':'deepseek-flash'})
        self.assertEqual(status,200)
        self.assertTrue(settings['configured'])
        self.assertNotIn('api_key',settings)
        self.assertIn('test-only-not-a-real-key',app.ENV_PATH.read_text())
        self.assertNotIn('test-only-not-a-real-key',json.dumps(self.request('/api/settings')[1]))
        self.assertEqual(self.request('/api/settings','POST',{'api_key':'','model':'deepseek-v4-pro'})[1]['configured'],True)
        self.assertFalse(self.request('/api/settings','POST',{'clear_key':True,'model':'deepseek-flash'})[1]['configured'])
        self.assertEqual(self.request('/api/settings','POST',{'model':'bad\nmodel'})[0],400)

    def test_tool_call_round_trip_and_context(self):
        app.CONFIG['api_key']='test-only-not-a-real-key'
        replies=[
            {'role':'assistant','content':None,'tool_calls':[{'id':'call-1','type':'function','function':{'name':'search_recipes','arguments':json.dumps({'query':'番茄鸡蛋'})}}]},
            {'role':'assistant','content':None,'tool_calls':[{'id':'call-2','type':'function','function':{'name':'get_recipe','arguments':json.dumps({'recipe_id':'tomato-eggs'})}}]},
            {'role':'assistant','content':'## 番茄炒鸡蛋\n参考本地菜谱，按两人份制作。'}
        ]
        with patch.object(app,'deepseek_request',side_effect=replies) as mock:
            result=app.handle_chat({'message':'番茄鸡蛋怎么做？','context':{'equipment':'平底锅','servings':2}})
        self.assertEqual(result['mode'],'deepseek')
        self.assertEqual(mock.call_count,3)
        self.assertIn('平底锅',mock.call_args.args[0][0]['content'])
        tool_messages=[m for m in mock.call_args.args[0] if m['role']=='tool']
        self.assertEqual(len(tool_messages),2)
        self.assertEqual(json.loads(tool_messages[-1]['content'])[0]['id'],'tomato-eggs')

    def test_tools_reject_unknown_functions_bad_json_and_unsafe_recipes(self):
        app.CONFIG['api_key']='test-only-not-a-real-key'
        calls=[
            {'id':'unknown','type':'function','function':{'name':'run_shell','arguments':'{}'}},
            {'id':'invalid','type':'function','function':{'name':'search_recipes','arguments':'broken json'}},
            {'id':'blocked','type':'function','function':{'name':'get_recipe','arguments':'{"recipe_id":"carbonara"}'}}
        ]
        with patch.object(app,'deepseek_request',side_effect=[{'role':'assistant','content':None,'tool_calls':calls},{'role':'assistant','content':'换一道不含奶的菜吧。'}]) as mock:
            result=app.handle_chat({'message':'推荐晚餐','context':{'avoid':'牛奶'}})
        tools=[json.loads(m['content']) for m in mock.call_args.args[0] if m['role']=='tool']
        self.assertEqual(len(tools),3)
        self.assertTrue(all('error' in t for t in tools))
        self.assertNotIn('carbonara',[s['id'] for s in result['sources']])

    def test_deepseek_failure_does_not_commit_partial_chat(self):
        app.CONFIG['api_key']='test-only-not-a-real-key'
        with patch.object(app,'deepseek_request',side_effect=app.AppError('连接失败',502)):
            status,_=self.request('/api/chat','POST',{'message':'番茄怎么做？'})
        self.assertEqual(status,502)
        self.assertEqual(self.request('/api/sessions')[1],[])
        self.assertFalse(app.ACTIVE_SESSIONS)

    def test_provider_errors_are_safe_and_request_matches_api(self):
        config={'model':'deepseek-flash','api_key':'test-only-not-a-real-key'}
        with patch.object(app.urllib.request,'urlopen',side_effect=urllib.error.HTTPError(app.DEEPSEEK_URL,401,'bad',None,io.BytesIO(b'secret upstream error'))):
            with self.assertRaises(app.AppError) as raised:
                app.deepseek_request([{'role':'user','content':'Hi'}],config)
            self.assertIn('API Key 无效',str(raised.exception))
            self.assertNotIn('secret',str(raised.exception))
        response=unittest.mock.MagicMock()
        response.__enter__.return_value.read.return_value=b'{"choices":[{"message":{"role":"assistant","content":"hello"}}]}'
        with patch.object(app.urllib.request,'urlopen',return_value=response) as mock:
            self.assertEqual(app.deepseek_request([{'role':'user','content':'Hi'}],config)['content'],'hello')
        request=mock.call_args.args[0]
        payload=json.loads(request.data)
        self.assertEqual(request.full_url,'https://api.deepseek.com/chat/completions')
        self.assertEqual(payload['model'],'deepseek-flash')
        self.assertEqual(payload['thinking'],{'type':'disabled'})
        self.assertEqual(len(payload['tools']),2)

    def test_csrf_host_validation_and_private_files(self):
        self.assertEqual(self.request('/api/settings','POST',{'model':'deepseek-flash'},headers={'Origin':'https://attacker.example'})[0],403)
        self.assertEqual(self.request('/api/health',headers={'Host':'attacker.example'})[0],403)
        self.assertEqual(self.request('/api/chat','POST',{'message':'hello'},headers={'Sec-Fetch-Site':'cross-site'})[0],403)
        for path in ('/.env','/data/kitchen.db','/%2e%2e/app.py','/..%5capp.py'):
            self.assertEqual(self.request(path)[0],404,path)

    def test_invalid_requests_do_not_crash(self):
        for body in ({'message':''},{'message':'x','context':[]},{'message':'x','context':{'servings':True}},{'message':'x','context':{'time':'abc'}},{'message':'x','session_id':'../../data'}):
            self.assertEqual(self.request('/api/chat','POST',body)[0],400)
        self.assertEqual(self.request('/api/recipes?max_minutes=abc')[0],400)
        self.assertEqual(self.request('/api/chat','POST',{'message':'x'},headers={'Content-Type':'text/plain'})[0],415)
        self.assertEqual(self.request('/api/chat','POST',{'message':'x'*15000})[0],413)

    def test_import_validation_is_atomic(self):
        recipes=json.loads((app.ROOT/'data'/'recipes.json').read_text(encoding='utf-8'))
        invalid=copy.deepcopy(recipes[:2])
        invalid[0]['name']='Should not be imported'
        invalid[1]['source']['url']='javascript:alert(1)'
        path=Path(self.temp.name)/'invalid.json'
        path.write_text(json.dumps(invalid),encoding='utf-8')
        with self.assertRaises(app.AppError):
            app.import_recipes(path)
        self.assertEqual(app.get_recipe(recipes[0]['id'])['name'],recipes[0]['name'])


if __name__=='__main__':
    unittest.main(verbosity=2)
