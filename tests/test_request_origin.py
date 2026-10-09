"""Local browser Origin compatibility without relaxing cross-site protection."""
import json
import io
from email.message import Message
from pathlib import Path
import socket
import sys
import tempfile
import threading
import unittest
import urllib.error
import urllib.request
from unittest.mock import Mock, patch

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import app


class RequestOriginTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='shiwei-origin-')
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
        self.port=self.server.server_port
        self.base=f'http://127.0.0.1:{self.port}'
        self.opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=3)
        app.DB_PATH,app.ENV_PATH=self.original_db,self.original_env
        app.CONFIG.clear()
        app.CONFIG.update(self.original_config)
        self.temp.cleanup()

    def request(self,path,headers=None,method='GET',body=None):
        request=urllib.request.Request(self.base+path,method=method,
            data=None if body is None else json.dumps(body).encode(),
            headers={'Content-Type':'application/json',**(headers or {})})
        try:
            # The full catalogue is a large JSON response; origin refusal
            # checks still use the short timeout for small/invalid requests.
            response=self.opener.open(request,timeout=30 if path=='/api/recipes' else 5)
        except urllib.error.HTTPError as error:
            response=error
        with response:
            return response.status,response.headers.get_content_type(),response.read()

    def bare_headers(self,**extra):
        return {'Origin':'http://127.0.0.1','Sec-Fetch-Site':'same-origin',**extra}

    def test_bare_origin_same_origin_fetch_loads_css_scripts_and_images(self):
        for path,mime,dest in [('/style.css','text/css','style'),
                               ('/app.js','text/javascript','script'),
                               ('/cooking.js','text/javascript','script'),
                               ('/kitchen-tools.js','text/javascript','script'),
                               ('/assets/brand.svg','image/svg+xml','image')]:
            with self.subTest(path=path):
                status,content_type,body=self.request(path,self.bare_headers(**{'Sec-Fetch-Dest':dest}))
                self.assertEqual(status,200)
                # Older supported Python releases return application/javascript.
                self.assertIn(content_type,{'text/javascript','application/javascript'} if mime=='text/javascript' else {mime})
                self.assertGreater(len(body),0)

    def test_bare_origin_allows_initialization_reads_and_isolated_write(self):
        headers=self.bare_headers()
        for path in ['/api/health','/api/settings','/api/recipes','/api/favorites','/api/sessions','/api/pantry']:
            with self.subTest(path=path):
                status,mime,body=self.request(path,headers)
                self.assertEqual((status,mime),(200,'application/json'))
                json.loads(body)
        status,_,body=self.request('/api/pantry',headers,'POST',{'name':'番茄','quantity':2,'unit':'个'})
        self.assertEqual(status,201)
        stored=json.loads(body)
        self.assertEqual(stored['name'],'番茄')
        self.assertEqual(len(app.pantry_inventory()['items']),1)

    def test_localhost_bare_origin_must_match_current_host(self):
        headers={'Host':f'localhost:{self.port}','Origin':'http://localhost','Sec-Fetch-Site':'same-origin'}
        self.assertEqual(self.request('/api/health',headers)[0],200)
        headers['Origin']='http://127.0.0.1'
        self.assertEqual(self.request('/api/health',headers)[0],403)
        self.assertEqual(self.request('/api/health',self.bare_headers(Origin='http://localhost'))[0],403)

    def test_exact_local_origins_and_absent_origin_keep_existing_behavior(self):
        for headers in ({},{'Origin':self.base},{'Origin':f'http://localhost:{self.port}'},
                        {'Origin':self.base,'Sec-Fetch-Site':'same-origin'}):
            with self.subTest(headers=headers):
                self.assertEqual(self.request('/api/health',headers)[0],200)

    def test_bare_origin_requires_exact_same_origin_fetch_metadata(self):
        for fetch_site in (None,'','none','same-site','cross-site','same-origin, cross-site','Same-Origin'):
            headers={'Origin':'http://127.0.0.1'}
            if fetch_site is not None:
                headers['Sec-Fetch-Site']=fetch_site
            with self.subTest(fetch_site=fetch_site):
                self.assertEqual(self.request('/style.css',headers)[0],403)
                self.assertEqual(self.request('/api/pantry',headers,'POST',{'name':'番茄'})[0],403)
        self.assertEqual(app.pantry_inventory()['items'],[])

    def test_same_origin_metadata_does_not_allow_other_origins(self):
        invalid=['null','https://127.0.0.1','http://127.0.0.1:80','http://127.0.0.1:1',
                 'http://localhost','http://example.com','http://127.0.0.1.evil.example',
                 'http://127.0.0.1/','http://127.0.0.1?x=1','http://127.0.0.1#x',
                 'http://user@127.0.0.1','http://127.0.0.1 http://example.com']
        for origin in invalid:
            with self.subTest(origin=origin):
                headers=self.bare_headers(Origin=origin)
                self.assertEqual(self.request('/style.css',headers)[0],403)
                self.assertEqual(self.request('/api/pantry',headers,'POST',{'name':'番茄'})[0],403)
        self.assertEqual(app.pantry_inventory()['items'],[])

    def test_cross_site_remains_forbidden_even_with_exact_or_missing_origin(self):
        for origin in (None,self.base,'http://127.0.0.1'):
            headers={'Sec-Fetch-Site':'cross-site'}
            if origin is not None:
                headers['Origin']=origin
            with self.subTest(origin=origin):
                self.assertEqual(self.request('/style.css',headers)[0],403)
                self.assertEqual(self.request('/api/pantry',headers,'POST',{'name':'番茄'})[0],403)

    def test_host_validation_cannot_be_bypassed_by_origin_metadata(self):
        for host in ('127.0.0.1','localhost',f'example.com:{self.port}',f'127.0.0.1:{self.port+1}'):
            with self.subTest(host=host):
                self.assertEqual(self.request('/style.css',self.bare_headers(Host=host))[0],403)
                self.assertEqual(self.request('/api/health',self.bare_headers(Host=host))[0],403)

    def test_rejected_small_posts_deliver_real_403_without_mutation(self):
        for index in range(50):
            with self.subTest(index=index):
                status,mime,raw=self.request('/api/pantry',{'Origin':'http://example.com'},'POST',{'name':'番茄'})
                self.assertEqual((status,mime),(403,'application/json'))
                self.assertEqual(json.loads(raw),{'error':'不允许其他网站调用本地厨房。'})
        self.assertEqual(app.pantry_inventory()['items'],[])


class RejectedBodyDrainTests(unittest.TestCase):
    def handler(self,lengths=(),transfer_encoding=None,data=b''):
        handler=object.__new__(app.Handler)
        handler.headers=Message()
        for length in lengths:
            handler.headers['Content-Length']=length
        if transfer_encoding is not None:
            handler.headers['Transfer-Encoding']=transfer_encoding
        handler.connection=Mock()
        handler.connection.gettimeout.return_value=20
        handler.rfile=io.BytesIO(data)
        handler.close_connection=False
        return handler

    def test_only_single_bounded_ascii_length_can_be_consumed(self):
        invalid=[[],['1','1'],['-1'],['+1'],['1.0'],['١'],['\u00a01'],
                 ['12289'],['9'*1000],['0']]
        for lengths in invalid:
            with self.subTest(lengths=lengths):
                handler=self.handler(lengths,data=b'body')
                handler.discard_rejected_body()
                self.assertEqual(handler.rfile.tell(),0)
                handler.connection.settimeout.assert_not_called()
                self.assertTrue(handler.close_connection)
        for encoding in ('chunked',''):
            handler=self.handler(['4'],encoding,b'body')
            handler.discard_rejected_body()
            self.assertEqual(handler.rfile.tell(),0)
            handler.connection.settimeout.assert_not_called()

    def test_drain_consumes_only_declared_bytes_and_restores_timeout(self):
        handler=self.handler([' \t00004\t '],data=b'bodyNEXT')
        handler.discard_rejected_body()
        self.assertEqual(handler.rfile.read(),b'NEXT')
        self.assertTrue(handler.close_connection)
        self.assertEqual(handler.connection.settimeout.call_args.args,(20,))
        self.assertLessEqual(handler.connection.settimeout.call_args_list[0].args[0],.25)

    def test_total_deadline_is_not_renewed_by_trickled_bytes(self):
        handler=self.handler(['100'])
        handler.rfile=Mock()
        handler.rfile.read1.return_value=b'a'
        # Two bytes arrive before the shared deadline; a third wait would
        # exceed it. A per-read-only timeout could otherwise run indefinitely.
        with patch.object(app.time,'monotonic',side_effect=[1.0,1.05,1.20,1.26]):
            handler.discard_rejected_body()
        self.assertEqual(handler.rfile.read1.call_count,2)
        timeouts=[call.args[0] for call in handler.connection.settimeout.call_args_list]
        self.assertAlmostEqual(timeouts[0],.20)
        self.assertAlmostEqual(timeouts[1],.05)
        self.assertEqual(timeouts[-1],20)
        self.assertTrue(handler.close_connection)

    def test_timed_out_stream_still_closes_and_restores_socket_timeout(self):
        handler=self.handler(['4'])
        handler.rfile=Mock()
        handler.rfile.read1.side_effect=socket.timeout('timed out')
        handler.discard_rejected_body()
        self.assertTrue(handler.close_connection)
        self.assertEqual(handler.connection.settimeout.call_args.args,(20,))


if __name__=='__main__':
    unittest.main()
