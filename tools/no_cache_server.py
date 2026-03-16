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
