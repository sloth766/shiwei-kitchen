"""Startup isolation and verified reuse. Never open the user's DB or browser."""
from contextlib import contextmanager
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import io
import json
import os
from pathlib import Path
import socket
import sys
import tempfile
import threading
import unittest
from unittest.mock import patch

sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
import app


@contextmanager
def running_server(server):
    thread=threading.Thread(target=server.serve_forever,daemon=True)
    thread.start()
    try:
        yield server.server_port
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=3)


class OtherHandler(BaseHTTPRequestHandler):
    server_version='OtherProgram/1.0'
    payload={'ok':True,'recipes':397,'configured':False,'model':'local'}
    status=200
    content_type='application/json'
    redirect=None

    def do_GET(self):
        self.send_response(self.status)
        self.send_header('Content-Type',self.content_type)
        if self.redirect:
            self.send_header('Location',self.redirect)
        raw=json.dumps(self.payload).encode()
        self.send_header('Content-Length',str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def log_message(self,*args):
        pass


class StartupTests(unittest.TestCase):
    def setUp(self):
        self.temp=tempfile.TemporaryDirectory(prefix='shiwei-startup-')
        self.original_db,self.original_env=app.DB_PATH,app.ENV_PATH
        self.original_config=dict(app.CONFIG)
        app.DB_PATH=Path(self.temp.name)/'kitchen.db'
        app.ENV_PATH=Path(self.temp.name)/'.env'
        app.CONFIG.clear()
        app.CONFIG.update(api_key='',model=app.DEFAULT_MODEL)

    def tearDown(self):
        app.DB_PATH,app.ENV_PATH=self.original_db,self.original_env
        app.CONFIG.clear()
        app.CONFIG.update(self.original_config)
        self.temp.cleanup()

    @contextmanager
    def main_args(self,*args):
        with patch.object(sys,'argv',['app.py',*args]),patch('sys.stdout',new_callable=io.StringIO) as output:
            yield output

    def test_existing_kitchen_opens_without_loading_config_or_mutating_database(self):
        app.init_db()
        before=hashlib.sha256(app.DB_PATH.read_bytes()).digest()
        with running_server(app.make_server(0)) as port:
            with self.main_args('--port',str(port),'--open') as output, \
                    patch.object(app,'init_db',side_effect=AssertionError('must not initialize')) as init, \
                    patch.object(app,'load_config',side_effect=AssertionError('must not read config')) as config, \
                    patch.object(app,'make_server',side_effect=AssertionError('must not bind')) as bind, \
                    patch.object(app.webbrowser,'open') as browser:
                app.main()
                self.assertIn('already running',output.getvalue())
                browser.assert_called_once_with(f'http://127.0.0.1:{port}')
                init.assert_not_called()
                config.assert_not_called()
                bind.assert_not_called()
        self.assertEqual(hashlib.sha256(app.DB_PATH.read_bytes()).digest(),before)
        self.assertFalse(app.ENV_PATH.exists())

    def test_existing_without_open_does_not_open_browser(self):
        app.init_db()
        with running_server(app.make_server(0)) as port,self.main_args('--port',str(port)), \
                patch.object(app.webbrowser,'open') as browser,patch.object(app,'init_db') as init:
            app.main()
            browser.assert_not_called()
            init.assert_not_called()

    def test_other_program_on_port_fails_without_creating_database(self):
        with running_server(ThreadingHTTPServer(('127.0.0.1',0),OtherHandler)) as port, \
                self.main_args('--port',str(port),'--open') as output, \
                patch.object(app,'init_db') as init,patch.object(app,'load_config') as config, \
                patch.object(app.webbrowser,'open') as browser:
            with self.assertRaises(SystemExit) as error:
                app.main()
            self.assertEqual(error.exception.code,1)
            self.assertIn('No running Shiwei Kitchen was verified',output.getvalue())
            self.assertIn('--port 8766',output.getvalue())
            init.assert_not_called()
            config.assert_not_called()
            browser.assert_not_called()
        self.assertFalse(app.DB_PATH.exists())

    def test_new_server_initializes_database_only_after_binding(self):
        server=app.make_server(0)
        port=server.server_port
        with self.main_args('--port','0','--open') as output, \
                patch.object(app,'make_server',return_value=server), \
                patch.object(server,'serve_forever',side_effect=KeyboardInterrupt), \
                patch.object(app,'load_config',return_value={'api_key':'','model':app.DEFAULT_MODEL}), \
                patch.object(app.webbrowser,'open') as browser:
            app.main()
            self.assertIn('Shiwei Kitchen ready:',output.getvalue())
            browser.assert_called_once_with(f'http://127.0.0.1:{port}')
        self.assertGreater(len(app.all_recipes()),350)
        self.assertEqual(server.socket.fileno(),-1)

    def test_initialization_error_releases_bound_socket(self):
        server=app.make_server(0)
        with self.main_args('--port','0'),patch.object(app,'make_server',return_value=server), \
                patch.object(app,'load_config',return_value={}), \
                patch.object(app,'init_db',side_effect=RuntimeError('initialization failed')):
            with self.assertRaises(RuntimeError):
                app.main()
        self.assertEqual(server.socket.fileno(),-1)

    def test_port_race_rechecks_before_reusing(self):
        with self.main_args('--port','8765','--open'), \
                patch.object(app,'existing_kitchen',side_effect=[False,True]) as probe, \
                patch.object(app,'make_server',side_effect=OSError('busy')), \
                patch.object(app,'init_db') as init,patch.object(app,'load_config') as config, \
                patch.object(app.webbrowser,'open') as browser:
            app.main()
            self.assertEqual(probe.call_count,2)
            browser.assert_called_once_with('http://127.0.0.1:8765')
            init.assert_not_called()
            config.assert_not_called()
        self.assertFalse(app.DB_PATH.exists())

    def test_unverified_port_race_does_not_open_or_initialize(self):
        with self.main_args('--port','8765','--open'), \
                patch.object(app,'existing_kitchen',return_value=False), \
                patch.object(app,'make_server',side_effect=OSError('busy')), \
                patch.object(app,'init_db') as init,patch.object(app.webbrowser,'open') as browser:
            with self.assertRaises(SystemExit):
                app.main()
            init.assert_not_called()
            browser.assert_not_called()

    def test_import_mode_keeps_import_semantics_and_skips_server_detection(self):
        fixture=Path(self.temp.name)/'import.json'
        with self.main_args('--import-recipes',str(fixture),'--open') as output, \
                patch.object(app,'existing_kitchen',side_effect=AssertionError('must not detect')), \
                patch.object(app,'make_server',side_effect=AssertionError('must not bind')), \
                patch.object(app,'load_config',return_value={}), \
                patch.object(app,'import_recipes',wraps=app.import_recipes) as importer, \
                patch.object(app.webbrowser,'open') as browser:
            fixture.write_text('[]',encoding='utf-8')
            app.main()
            self.assertEqual(importer.call_args.args,(fixture,))
            self.assertIn('Imported 0 recipes.',output.getvalue())
            browser.assert_not_called()
        self.assertTrue(app.DB_PATH.exists())

    def test_health_validation_rejects_wrong_header_and_malformed_payloads(self):
        with running_server(ThreadingHTTPServer(('127.0.0.1',0),OtherHandler)) as port:
            self.assertFalse(app.existing_kitchen(port))
            with patch.object(OtherHandler,'server_version','ShiweiKitchen/1.0'):
                self.assertTrue(app.existing_kitchen(port))
                for payload in ({'ok':True},[],{'ok':True,'recipes':True,'configured':False,'model':'local'},
                                {'ok':False,'recipes':397,'configured':False,'model':'local'},
                                {'ok':True,'recipes':397,'configured':False,'model':'x'*17000}):
                    with self.subTest(payload_type=type(payload).__name__),patch.object(OtherHandler,'payload',payload):
                        self.assertFalse(app.existing_kitchen(port))
                with patch.object(OtherHandler,'content_type','text/html'):
                    self.assertFalse(app.existing_kitchen(port))

    def test_health_probe_does_not_follow_redirect_or_use_proxy(self):
        app.init_db()
        with running_server(app.make_server(0)) as kitchen_port:
            with patch.dict(os.environ,{'HTTP_PROXY':'http://127.0.0.1:1','http_proxy':'http://127.0.0.1:1','NO_PROXY':'','no_proxy':''}):
                self.assertTrue(app.existing_kitchen(kitchen_port))
            with patch.object(OtherHandler,'status',302), \
                    patch.object(OtherHandler,'redirect',f'http://127.0.0.1:{kitchen_port}/api/health'), \
                    running_server(ThreadingHTTPServer(('127.0.0.1',0),OtherHandler)) as redirect_port:
                self.assertFalse(app.existing_kitchen(redirect_port))

    def test_unused_port_is_not_detected_as_kitchen(self):
        with socket.socket() as sock:
            sock.bind(('127.0.0.1',0))
            port=sock.getsockname()[1]
            self.assertFalse(app.existing_kitchen(port))


if __name__=='__main__':
    unittest.main()
