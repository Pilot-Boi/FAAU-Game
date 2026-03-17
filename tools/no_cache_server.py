"""
No-cache local test server.

How to run:

1. Open a terminal.
2. Move to the project root:
    Set-Location "c:\Users\dugan\OneDrive\Desktop\FAAU Game"
3. Start the server:
    & "c:/Users/dugan/OneDrive/Desktop/FAAU Game/.venv/Scripts/python.exe" "tools/no_cache_server.py"
4. Open in browser:
    http://127.0.0.1:8000

This server sends no-cache headers so normal refresh picks up file changes.
Press Ctrl+C in the terminal to stop.
"""

import http.server
import socketserver

HOST = "127.0.0.1"
PORT = 8000


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    with socketserver.TCPServer((HOST, PORT), NoCacheHandler) as server:
        print(f"Serving no-cache HTTP at http://{HOST}:{PORT}")
        print("Press Ctrl+C to stop.")
        server.serve_forever()
