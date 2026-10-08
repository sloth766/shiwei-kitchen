"""Integration tests. All DB/config writes are isolated in a temporary directory.
DeepSeek calls are mocked; these tests never transmit a key or spend API credits.
"""
import copy
from datetime import date
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

    def add_fast_western_vegan_recipe(self):
        # The bundled catalogue has no verified Western vegan dish <=15 minutes.
        # A controlled fixture checks positive retrieval as well as inherited filters.
        app.import_personal_recipes({'recipes':[{'id':'user-test-western-vegan','name':'快手西式豆腐','region':'西方','area_group':'欧洲','area':'意大利','diet':'vegan','minutes':10,'servings':2,'ingredients':['豆腐','番茄'],'steps':['切块后炒熟。']}]})

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
        self.assertGreaterEqual(health['recipes'],1700)
        self.assertFalse(health['configured'])
        status,page=self.request('/')
        self.assertEqual(status,200)
        self.assertIn('拾味厨房'.encode(),page)
        status,recipes=self.request('/api/recipes')
        self.assertGreaterEqual(len(recipes),1700)
        self.assertTrue(any(r['id'].startswith('pdr-') for r in recipes))
        self.assertTrue(any(r['id'].startswith('fork-') for r in recipes))
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
        regional=app.search_recipes('想吃川菜',limit=8)
        self.assertTrue(regional)
        self.assertTrue(all(r['area']=='四川' for r in regional))
        self.assertEqual(app.search_recipes(area='不存在的地区'),[])
        self.assertTrue(all(r['area_group']=='欧洲' for r in app.search_recipes(area_group='欧洲',limit=8)))
        status,recipes=self.request('/api/recipes?area='+urllib.parse.quote('广东'))
        self.assertEqual(status,200)
        self.assertTrue(recipes)
        self.assertTrue(all(r['area']=='广东' for r in recipes))
        status,recipes=self.request('/api/recipes?area_group='+urllib.parse.quote('美洲'))
        self.assertEqual(status,200)
        self.assertTrue(all(r['area_group']=='美洲' for r in recipes))

    def test_partial_recipe_names_and_ingredient_keywords(self):
        for query in ('咖喱','咖喱 咖喱','咖喱怎么做','我想吃咖喱'):
            with self.subTest(query=query):
                recipes=app.search_recipes(query,max_minutes=30)
                self.assertTrue(recipes)
                self.assertTrue(all('咖喱' in r['name']+' '+ ' '.join(r['tags']) for r in recipes))
                self.assertTrue(all(r['minutes']<=30 for r in recipes))
        recipe=app.normalize_personal_recipe({'name':'暖暖一锅','minutes':15,
            'ingredients':['咖喱块（参考包装用量）'],'steps':['煮熟。']})
        with patch.object(app,'all_recipes',return_value=[recipe]):
            self.assertEqual(app.search_recipes('咖喱')[0]['id'],recipe['id'])

    def test_unknown_keywords_never_fall_back_to_unrelated_recipes(self):
        for query in ('未收录的菜9f84','快手未收录的菜9f84','咖喱 15 分钟内'):
            with self.subTest(query=query):
                self.assertEqual(app.search_recipes(query,max_minutes=15),[])
        status,recipes=self.request('/api/recipes?q='+urllib.parse.quote('未收录的菜9f84'))
        self.assertEqual(status,200)
        self.assertEqual(recipes,[])
        self.assertTrue(app.search_recipes('推荐晚餐',max_minutes=30))
        self.assertTrue(app.search_recipes('',max_minutes=30))

    def test_offline_curry_chat_returns_only_related_recipes(self):
        status,result=self.request('/api/chat','POST',{'message':'咖喱','context':{'time':30}})
        self.assertEqual(status,200)
        self.assertEqual(result['mode'],'local')
        self.assertTrue(result['sources'])
        for source in result['sources']:
            recipe=app.get_recipe(source['id'])
            self.assertIn('咖喱',recipe['name']+' '+ ' '.join(recipe['tags']))
        self.assertNotIn('微波炉蛋糕',result['content'])
        status,followup=self.request('/api/chat','POST',{
            'message':'咖喱','session_id':result['session_id'],'context':{'time':30}})
        self.assertEqual(status,200)
        self.assertTrue(followup['sources'])
        for source in followup['sources']:
            recipe=app.get_recipe(source['id'])
            self.assertIn('咖喱',recipe['name']+' '+ ' '.join(recipe['tags']))

    def test_offline_unknown_and_filtered_queries_report_no_match(self):
        for message in ('未收录的菜9f84','咖喱'):
            with self.subTest(message=message):
                status,result=self.request('/api/chat','POST',{
                    'message':message,'context':{'time':15}})
                self.assertEqual(status,200)
                self.assertEqual(result['sources'],[])
                self.assertIn('关键词',result['content'])
                self.assertNotIn('可以从',result['content'])

    def test_zero_match_followup_does_not_repeat_previous_menu(self):
        status,first=self.request('/api/chat','POST',{'message':'牛肉','context':{'time':30}})
        self.assertEqual(status,200)
        self.assertTrue(first['sources'])
        for message in ('鱼香肉丝','未收录的菜9f84'):
            with self.subTest(message=message):
                status,result=self.request('/api/chat','POST',{
                    'message':message,'session_id':first['session_id'],'context':{'time':30}})
                self.assertEqual(status,200)
                self.assertEqual(result['match_status'],'no_match')
                self.assertEqual(result['match_count'],0)
                self.assertEqual(result['sources'],[])
                self.assertIn('## 没有找到匹配菜谱',result['content'])
                self.assertNotIn('可以从',result['content'])
                self.assertNotIn('**食材：**',result['content'])
                self.assertNotEqual(result['content'],first['content'])
        session=self.request('/api/sessions/'+first['session_id'])[1]
        self.assertEqual(len(session['messages']),6)
        self.assertEqual(session['messages'][-1]['content'],result['content'])
        self.assertEqual(session['messages'][-1]['sources'],[])

    def test_new_specific_query_ignores_old_topics_and_sidebar_ingredients(self):
        first=app.handle_chat({'message':'咖喱'})
        result=app.handle_chat({'message':'未收录的菜9f84','session_id':first['session_id'],
                               'context':{'ingredients':'鸡蛋'}})
        self.assertEqual(result['sources'],[])
        self.assertEqual(result['match_status'],'no_match')
        followup=app.handle_chat({'message':'还有什么建议？','session_id':first['session_id']})
        self.assertEqual(followup['sources'],[])
        self.assertEqual(followup['match_status'],'no_match')

    def test_explicit_followup_still_reuses_the_previous_topic(self):
        first=app.handle_chat({'message':'番茄炒鸡蛋'})
        for _ in range(2):
            followup=app.handle_chat({'message':'还有什么建议？','session_id':first['session_id']})
            self.assertTrue(followup['sources'])
            self.assertEqual(followup['sources'][0]['id'],'tomato-eggs')

    def test_pantry_zero_match_uses_the_dedicated_return(self):
        result=app.handle_chat({'message':'根据库存推荐菜单','context':{'use_pantry':True}})
        self.assertEqual(result['match_status'],'no_match')
        self.assertEqual(result['match_count'],0)
        self.assertEqual(result['sources'],[])
        self.assertIn('## 没有找到匹配菜谱',result['content'])
        self.assertIn('库存为空',result['content'])

    def test_specific_dish_query_never_becomes_an_ingredient_recommendation(self):
        self.assertEqual(app.search_recipes('红烧牛肉',max_minutes=30),[])
        self.assertEqual(app.search_recipes('鱼香肉丝',max_minutes=30),[])
        self.assertTrue(app.search_recipes('鱼香肉丝',max_minutes=60))

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

    def test_bilingual_recipe_names_match_the_dish_and_region(self):
        for query in ('Chicken Paprikash','匈牙利红椒炖鸡'):
            with self.subTest(query=query):
                recipes=app.search_recipes(query,area='匈牙利')
                self.assertTrue(recipes)
                self.assertTrue(all('paprikash' in r['source']['title'].lower() for r in recipes))
                self.assertEqual(app.search_recipes(query,area='日本'),[])
                self.assertEqual(app.search_recipes(query,max_minutes=15),[])
        self.assertTrue(app.search_recipes('咖喱',area='印度',max_minutes=60))
        self.assertTrue(app.search_recipes('番茄',area='墨西哥'))

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
        # Reject the declared size before reading; avoid Windows resetting a socket
        # while the client is still streaming a large body into a closed connection.
        self.assertEqual(self.request('/api/recipes/import','POST',{'recipes':[good]},headers={'Content-Length':str(2*1024*1024+1)})[0],413)
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
        self.add_fast_western_vegan_recipe()
        result=app.handle_chat({'message':'我对牛奶过敏，请推荐 15 分钟内的纯素菜。'})
        self.assertTrue(result['sources'])
        for source in result['sources']:
            recipe=app.get_recipe(source['id'])
            self.assertEqual(recipe['diet'],'vegan')
            self.assertLessEqual(recipe['minutes'],15)
            self.assertNotIn('牛奶',recipe['allergens'])
        followup=app.handle_chat({'message':'再推荐一道西式的','session_id':result['session_id']})
        self.assertTrue(followup['sources'])
        self.assertEqual(followup['context']['time'],15)
        self.assertEqual(followup['context']['diet'],'vegan')
        for source in followup['sources']:
            recipe=app.get_recipe(source['id'])
            self.assertNotIn('牛奶',recipe['allergens'])
            self.assertEqual(recipe['diet'],'vegan')
            self.assertEqual(recipe['region'],'西方')
            self.assertLessEqual(recipe['minutes'],15)

    def test_conversation_constraints_survive_unchanged_sidebar_and_restart(self):
        self.add_fast_western_vegan_recipe()
        sidebar={'time':30,'servings':2,'diet':'','region':''}
        first=app.handle_chat({'message':'推荐 15 分钟内的纯素菜，4 人份','context':sidebar})
        app.init_db()
        followup=app.handle_chat({'message':'再推荐一道西式的','session_id':first['session_id'],'context':sidebar})
        self.assertTrue(followup['sources'])
        for key,value in {'time':15,'servings':4,'diet':'vegan','region':'西方'}.items():
            self.assertEqual(followup['context'][key],value)
        restored=app.read_session(first['session_id'])
        self.assertEqual(restored['context'],followup['context'])
        result=app.handle_chat({'message':'推荐菜单','session_id':first['session_id'],'context':{'time':60,'servings':1,'diet':'vegetarian'}})
        self.assertEqual(result['context']['time'],60)
        self.assertEqual(result['context']['servings'],1)
        self.assertEqual(result['context']['diet'],'vegetarian')

    def test_explicit_sidebar_reset_overrides_inferred_values(self):
        first=app.handle_chat({'message':'推荐 15 分钟内的纯素菜','context':{'time':30,'diet':''}})
        second=app.handle_chat({'message':'推荐菜单','session_id':first['session_id'],'context':{'time':30,'diet':''},'context_overrides':['time','diet']})
        self.assertEqual(second['context']['time'],30)
        self.assertEqual(second['context']['diet'],'')
        for overrides in ('time',['unknown'],['time'],[False]):
            self.assertEqual(self.request('/api/chat','POST',{'message':'菜单','context':{},'context_overrides':overrides})[0],400)

    def test_legacy_session_migration_recovers_conditions(self):
        self.add_fast_western_vegan_recipe()
        first=app.handle_chat({'message':'推荐 15 分钟内的纯素菜，4 人份'})
        with app.connect() as db:
            db.execute('ALTER TABLE sessions DROP COLUMN constraints')
        app.init_db()
        result=app.handle_chat({'message':'再推荐一道西式的','session_id':first['session_id']})
        self.assertTrue(result['sources'])
        self.assertEqual(result['context']['time'],15)
        self.assertEqual(result['context']['servings'],4)
        self.assertEqual(result['context']['diet'],'vegan')

    def test_failed_answer_does_not_change_session_constraints(self):
        first=app.handle_chat({'message':'推荐 15 分钟内的纯素菜'})
        before=app.read_session(first['session_id'])
        app.CONFIG['api_key']='test-only-not-a-real-key'
        with patch.object(app,'deepseek_request',side_effect=app.AppError('连接失败',502)):
            with self.assertRaises(app.AppError):
                app.handle_chat({'message':'推荐 60 分钟内的菜','session_id':first['session_id']})
        self.assertEqual(app.read_session(first['session_id']),before)

    def test_region_words_cannot_rescue_unknown_food_keywords(self):
        for query in ('西式未收录的菜9f84','推荐快手的未收录的菜9f84'):
            self.assertEqual(app.search_recipes(query,max_minutes=30),[])

    def test_inventory_equivalence_does_not_treat_substitutes_as_owned(self):
        for stock,ingredient in [('番茄酱','番茄'),('番茄汁','番茄'),('番茄','番茄酱'),('奶粉','牛奶'),('鸡肉','鸡腿'),('干香菇','香菇')]:
            self.assertFalse(app.pantry_matches(stock,ingredient),(stock,ingredient))
        for stock,ingredient in [('西红柿','番茄'),('番茄','西红柿一个'),('大虾','虾'),('花生米','花生'),('番茄','番茄（可选）')]:
            self.assertTrue(app.pantry_matches(stock,ingredient),(stock,ingredient))
        app.save_pantry_item({'name':'番茄酱'})
        recipe=app.get_recipe('tomato-eggs')
        with patch.object(app,'all_recipes',return_value=[recipe]):
            self.assertEqual(app.pantry_recipe_candidates(app.pantry_context(),app.validate_context({'use_pantry':True})),[])

    def test_specific_pantry_query_does_not_return_other_stock_menus(self):
        app.save_pantry_item({'name':'番茄'})
        app.save_pantry_item({'name':'鸡蛋'})
        generic=app.handle_chat({'message':'根据库存推荐菜单','context':{'use_pantry':True}})
        self.assertTrue(generic['sources'])
        for query in ('未收录的菜9f84','红烧牛肉','鱼香肉丝'):
            result=app.handle_chat({'message':query,'session_id':generic['session_id'],'context':{'use_pantry':True,'time':30}})
            self.assertEqual(result['sources'],[])
            self.assertEqual(result['match_status'],'no_match')

    def test_equipment_is_excluded_from_pantry_missing_ingredients(self):
        recipe=app.normalize_personal_recipe({'name':'冰箱拌番茄','minutes':5,'ingredients':['番茄','冰箱','碗'],'steps':['放入碗中。']})
        app.save_pantry_item({'name':'番茄'})
        with patch.object(app,'all_recipes',return_value=[recipe]):
            result=app.pantry_recipe_candidates(app.pantry_context(),app.validate_context({'use_pantry':True}))
        self.assertEqual(result[0]['pantry_match']['missing'],[])
        self.assertEqual(result[0]['pantry_match']['available'],['番茄'])

    def test_tools_cannot_relax_time_diet_or_region(self):
        self.add_fast_western_vegan_recipe()
        app.CONFIG['api_key']='test-only-not-a-real-key'
        unknown=next(r['id'] for r in app.all_recipes() if r['time_note']=='unknown')
        calls=[{'id':'search','type':'function','function':{'name':'search_recipes','arguments':json.dumps({'query':'推荐晚餐','max_minutes':1440,'diet':'vegetarian','region':'东方','limit':5})}},
               {'id':'long','type':'function','function':{'name':'get_recipe','arguments':'{"recipe_id":"carbonara"}'}},
               {'id':'unknown-time','type':'function','function':{'name':'get_recipe','arguments':json.dumps({'recipe_id':unknown})}},
               {'id':'wrong-region','type':'function','function':{'name':'get_recipe','arguments':'{"recipe_id":"tomato-eggs"}'}}]
        with patch.object(app,'deepseek_request',side_effect=[{'role':'assistant','content':None,'tool_calls':calls},{'role':'assistant','content':'推荐满足厨房条件的西式纯素菜。'}]) as mock:
            result=app.handle_chat({'message':'推荐晚餐','context':{'time':15,'diet':'vegan','region':'西方'}})
        tools={m['tool_call_id']:json.loads(m['content']) for m in mock.call_args.args[0] if m['role']=='tool'}
        self.assertTrue(tools['search'])
        self.assertTrue(all(r['minutes']<=15 and r['diet']=='vegan' and r['region']=='西方' for r in tools['search']))
        self.assertTrue(all('error' in tools[key] for key in ('long','unknown-time','wrong-region')))
        self.assertTrue(all(app.recipe_in_context(app.get_recipe(r['id']),app.validate_context({'time':15,'diet':'vegan','region':'西方'})) for r in result['sources']))

    def test_tool_time_and_limit_types_are_strict(self):
        app.CONFIG['api_key']='test-only-not-a-real-key'
        calls=[{'id':str(index),'type':'function','function':{'name':'search_recipes','arguments':json.dumps(args)}} for index,args in enumerate([{'query':'','max_minutes':True},{'query':'','max_minutes':0},{'query':'','limit':False},{'query':'','limit':6}])]
        with patch.object(app,'deepseek_request',side_effect=[{'role':'assistant','content':None,'tool_calls':calls},{'role':'assistant','content':'请重新查询。'}]) as mock:
            app.handle_chat({'message':'菜单'})
        tools=[json.loads(m['content']) for m in mock.call_args.args[0] if m['role']=='tool']
        self.assertEqual(len(tools),4)
        self.assertTrue(all('error' in result for result in tools))

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
        self.assertEqual({tool['function']['name'] for tool in payload['tools']},{'search_recipes','get_recipe','get_pantry'})

    def test_pantry_batches_crud_and_upgrade_persistence(self):
        body={'name':'番茄','quantity':2.5,'unit':'斤','category':'蔬菜','storage':'冷藏','notes':'炖汤'}
        status,first=self.request('/api/pantry','POST',body)
        self.assertEqual(status,201)
        status,second=self.request('/api/pantry','POST',body)
        self.assertNotEqual(first['id'],second['id'])
        changed={**body,'quantity':0,'storage':'冷冻'}
        status,updated=self.request('/api/pantry/'+first['id'],'PUT',changed)
        self.assertEqual(status,200)
        self.assertEqual(updated['status'],'depleted')
        app.init_db()
        inventory=self.request('/api/pantry')[1]
        self.assertEqual(len(inventory['items']),2)
        self.assertEqual(inventory['counts']['available'],1)
        self.assertEqual(self.request('/api/pantry/'+second['id'],'DELETE')[0],200)
        self.assertEqual(self.request('/api/pantry/'+second['id'],'PUT',body)[0],404)
        self.assertEqual(self.request('/api/pantry/'+second['id'],'DELETE')[0],404)

    def test_pantry_date_boundaries_and_invalid_inputs(self):
        with patch.object(app,'pantry_today',return_value=date(2026,10,8)):
            for name,expiry,quantity in [('过期','2026-10-07',1),('今日','2026-10-08',1),('临期','2026-10-11',1),('新鲜','2026-10-12',1),('未知','',1),('耗尽','2026-10-07',0)]:
                self.assertEqual(self.request('/api/pantry','POST',{'name':name,'expires_on':expiry,'quantity':quantity})[0],201)
            inventory=self.request('/api/pantry')[1]
            self.assertEqual([item['status'] for item in inventory['items']],['expired','today','soon','fresh','unknown','depleted'])
            self.assertEqual(inventory['counts']['urgent'],2)
            self.assertEqual(inventory['counts']['available'],4)
            self.assertEqual(inventory['today'],'2026-10-08')
            for body in ([],{}, {'name':'x','quantity':True},{'name':'x','quantity':-1},{'name':'x','quantity':'2'},{'name':'x','quantity':100001},{'name':'x','category':'不支持'},{'name':'x','expires_on':'2026-02-29'},{'name':'x','expires_on':'2026-1-2'},{'name':'x','opened_on':'2026-10-09'},{'name':'x','notes':[]},{'name':'x','expires_on':None}):
                self.assertEqual(self.request('/api/pantry','POST',body)[0],400,body)
            for body in ({'use_pantry':'true'},{'pantry_mode':'wrong'}):
                self.assertEqual(self.request('/api/chat','POST',{'message':'晚餐','context':body})[0],400)
            self.assertEqual(len(self.request('/api/pantry')[1]['items']),6)

    def test_pantry_capacity_and_context_limit(self):
        with app.connect() as db:
            db.executemany('INSERT INTO pantry(id,name,quantity,unit,category,storage,expires_on) VALUES(?,?,?,?,?,?,?)',[(f'pantry-{i:032x}',f'食材{i}',1,'份','其他','冷藏','2099-01-01') for i in range(200)])
        self.assertEqual(self.request('/api/pantry','POST',{'name':'超额'})[0],400)
        self.assertEqual(self.request('/api/pantry/pantry-'+f'{0:032x}','PUT',{'name':'更新','quantity':0})[0],200)
        snapshot=app.pantry_context()
        self.assertEqual(len(snapshot['items']),100)
        self.assertEqual(snapshot['omitted'],99)

    def test_pantry_recommendations_prioritize_dates_and_honor_constraints(self):
        def recipe(name,ingredients):
            return app.normalize_personal_recipe({'name':name,'minutes':10,'servings':2,'diet':'vegan','ingredients':ingredients,'steps':['混合煮熟。']})
        recipes=[recipe('较晚到期菜',['临期乙','补充材料']),recipe('今日到期菜',['临期甲','补充材料']),recipe('库存齐全菜',['新鲜甲','新鲜乙']),recipe('过期食材菜',['过期甲'])]
        with patch.object(app,'pantry_today',return_value=date(2026,10,8)):
            for name,expiry in [('临期甲','2026-10-08'),('临期乙','2026-10-11'),('新鲜甲','2026-11-01'),('新鲜乙',''),('过期甲','2026-10-07')]:
                app.save_pantry_item({'name':name,'expires_on':expiry})
            pantry=app.pantry_context()
            context=app.validate_context({'use_pantry':True,'pantry_mode':'expiry','time':15,'diet':'vegan'})
            with patch.object(app,'all_recipes',return_value=recipes):
                ranked=app.pantry_recipe_candidates(pantry,context)
                self.assertEqual([r['name'] for r in ranked],['今日到期菜','较晚到期菜','库存齐全菜'])
                self.assertEqual(ranked[0]['pantry_match']['missing'],['补充材料'])
                context['pantry_mode']='menu'
                self.assertEqual(app.pantry_recipe_candidates(pantry,context)[0]['name'],'库存齐全菜')
                context['avoid']='新鲜甲'
                self.assertNotIn('库存齐全菜',[r['name'] for r in app.pantry_recipe_candidates(pantry,context)])
                context['time']=5
                self.assertEqual(app.pantry_recipe_candidates(pantry,context),[])
            self.assertTrue(app.pantry_matches('西红柿','番茄'))
            self.assertFalse(app.pantry_matches('番茄','白砂糖（中和西红柿的酸味）'))
            app.save_pantry_item({'name':'过期甲','expires_on':'2026-10-10'})
            self.assertTrue(app.pantry_recipe_allowed(recipes[-1],app.pantry_context()))

    def test_pantry_offline_chat_and_no_automatic_deduction(self):
        self.assertEqual(app.handle_chat({'message':'仓库有什么能做的','context':{'use_pantry':True}})['sources'],[])
        with patch.object(app,'pantry_today',return_value=date(2026,10,8)):
            app.save_pantry_item({'name':'番茄','quantity':2,'unit':'个','expires_on':'2026-10-08'})
            app.save_pantry_item({'name':'鸡蛋','quantity':3,'unit':'个','expires_on':'2026-10-10'})
            app.save_pantry_item({'name':'牛奶','expires_on':'2026-10-07'})
            before=app.pantry_inventory()
            result=app.handle_chat({'message':'根据库存推荐番茄炒鸡蛋','context':{'use_pantry':True,'pantry_mode':'expiry','time':30}})
            self.assertEqual(result['mode'],'local')
            self.assertIn('番茄 2个',result['content'])
            self.assertIn('已过标注日期',result['content'])
            self.assertIn('需核对或补充',result['content'])
            self.assertIn('tomato-eggs',[r['id'] for r in result['sources']])
            self.assertEqual(app.pantry_inventory(),before)

    def test_pantry_tool_snapshot_is_current_and_opt_in(self):
        app.CONFIG['api_key']='test-only-not-a-real-key'
        item=app.save_pantry_item({'name':'私有库存测试食材','quantity':7,'unit':'克'})
        call={'role':'assistant','content':None,'tool_calls':[{'id':'stock','type':'function','function':{'name':'get_pantry','arguments':'{}'}}]}
        with patch.object(app,'deepseek_request',side_effect=[call,{'role':'assistant','content':'按库存安排。'}]) as mock:
            result=app.handle_chat({'message':'库存菜单','context':{'use_pantry':True,'pantry':{'items':[{'name':'客户端伪造食材'}]}}})
        tool=json.loads([m for m in mock.call_args.args[0] if m['role']=='tool'][0]['content'])
        self.assertEqual(tool['items'][0]['quantity'],7)
        self.assertEqual(tool['items'][0]['name'],item['name'])
        self.assertNotIn('客户端伪造',json.dumps(tool,ensure_ascii=False))
        app.save_pantry_item({'name':item['name'],'quantity':0},item['id'],updating=True)
        with patch.object(app,'deepseek_request',side_effect=[call,{'role':'assistant','content':'库存已用完。'}]) as mock:
            app.handle_chat({'message':'再看看','session_id':result['session_id'],'context':{'use_pantry':True}})
        tool=json.loads([m for m in mock.call_args.args[0] if m['role']=='tool'][0]['content'])
        self.assertEqual(tool['items'],[])
        with patch.object(app,'deepseek_request',side_effect=[call,{'role':'assistant','content':'请提供食材。'}]) as mock:
            app.handle_chat({'message':'推荐晚餐','context':{'use_pantry':False}})
        messages=mock.call_args.args[0]
        self.assertNotIn(item['name'],json.dumps(messages,ensure_ascii=False))
        self.assertIn('error',json.loads([m for m in messages if m['role']=='tool'][0]['content']))

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
