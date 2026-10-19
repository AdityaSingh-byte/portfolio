"""Serves dist/ at http://127.0.0.1:8741 with the headers from dist/_headers applied,
so the Content Security Policy and caching behave as they will on Cloudflare Pages.

Usage: npm run build && python3 scripts/preview.py
"""
import fnmatch
import http.server
import pathlib
import socketserver

ROOT = pathlib.Path(__file__).resolve().parent.parent / "dist"
PORT = 8741


def load_rules():
    rules, current = [], None
    for line in (ROOT / "_headers").read_text().splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if not line.startswith((" ", "\t")):
            current = (line.strip(), [])
            rules.append(current)
        elif current and ":" in line:
            name, value = line.strip().split(":", 1)
            current[1].append((name.strip(), value.strip()))
    return rules


RULES = load_rules()


class Handler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        path = self.path.split("?", 1)[0]
        for pattern, headers in RULES:
            if fnmatch.fnmatch(path, pattern.replace("*", "*")):
                for name, value in headers:
                    self.send_header(name, value)
        super().end_headers()

    def log_message(self, *args):
        pass


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True
    request_queue_size = 64


with Server(("127.0.0.1", PORT), Handler) as httpd:
    print(f"preview: http://127.0.0.1:{PORT}")
    httpd.serve_forever()
