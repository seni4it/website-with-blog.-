#!/bin/bash

echo "🌐 Finding alternative ways to host your website locally..."
echo "⚠️  Localhost seems blocked on your system. Trying alternatives..."

# Kill any existing processes
pkill -f "vite" 2>/dev/null || true
pkill -f "python" 2>/dev/null || true
pkill -f "serve" 2>/dev/null || true

# Build the project first
echo "🔨 Building project..."
npm run build

# Method 1: Ngrok Tunnel (Creates public URL)
echo "🚀 Method 1: Trying Ngrok tunnel..."
if [ -f "./ngrok" ]; then
    # Start a simple HTTP server in background
    cd dist && python3 -m http.server 3000 &
    SERVER_PID=$!
    cd ..
    
    # Start ngrok tunnel
    ./ngrok http 3000 &
    NGROK_PID=$!
    
    sleep 5
    
    # Get the public URL
    NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o 'https://[^"]*ngrok[^"]*')
    
    if [ ! -z "$NGROK_URL" ]; then
        echo "✅ SUCCESS! Your website is now accessible at:"
        echo "🌍 Public URL: $NGROK_URL"
        echo "📱 Share this URL with anyone to view your site!"
        echo "⚡ This URL works from anywhere in the world"
        echo ""
        echo "Press Ctrl+C to stop the tunnel"
        wait $NGROK_PID
        kill $SERVER_PID 2>/dev/null
        exit 0
    fi
    
    kill $SERVER_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
fi

# Method 2: Direct IP binding on different ports
echo "🔌 Method 2: Trying direct IP binding..."
for PORT in 3000 8000 8080 9000; do
    echo "Trying port $PORT..."
    
    cd dist && python3 -m http.server $PORT --bind 0.0.0.0 &
    SERVER_PID=$!
    cd ..
    
    sleep 3
    
    # Test different IP addresses
    for IP in "192.168.1.10" "192.168.1.7" "127.0.0.1"; do
        if curl -s --connect-timeout 2 http://$IP:$PORT > /dev/null 2>&1; then
            echo "✅ SUCCESS! Your website is accessible at:"
            echo "🌐 http://$IP:$PORT"
            echo "📱 Try this URL in your browser"
            wait $SERVER_PID
            exit 0
        fi
    done
    
    kill $SERVER_PID 2>/dev/null
done

# Method 3: Using Node.js serve with different configurations
echo "📦 Method 3: Trying Node.js serve with different configs..."
for PORT in 3000 8000 8080 9000; do
    echo "Trying Node serve on port $PORT..."
    
    npx serve dist -p $PORT -s &
    SERVER_PID=$!
    
    sleep 3
    
    # Test the connection
    if curl -s --connect-timeout 2 http://localhost:$PORT > /dev/null 2>&1; then
        echo "✅ SUCCESS! Your website is accessible at:"
        echo "🌐 http://localhost:$PORT"
        wait $SERVER_PID
        exit 0
    fi
    
    # Try with explicit host
    kill $SERVER_PID 2>/dev/null
    npx serve dist -p $PORT -s --host 0.0.0.0 &
    SERVER_PID=$!
    
    sleep 3
    
    for IP in "192.168.1.10" "192.168.1.7"; do
        if curl -s --connect-timeout 2 http://$IP:$PORT > /dev/null 2>&1; then
            echo "✅ SUCCESS! Your website is accessible at:"
            echo "🌐 http://$IP:$PORT"
            wait $SERVER_PID
            exit 0
        fi
    done
    
    kill $SERVER_PID 2>/dev/null
done

# Method 4: PHP built-in server (if available)
echo "🐘 Method 4: Trying PHP built-in server..."
if command -v php >/dev/null 2>&1; then
    cd dist
    php -S 0.0.0.0:8000 &
    SERVER_PID=$!
    cd ..
    
    sleep 3
    
    for IP in "localhost" "192.168.1.10" "192.168.1.7"; do
        if curl -s --connect-timeout 2 http://$IP:8000 > /dev/null 2>&1; then
            echo "✅ SUCCESS! Your website is accessible at:"
            echo "🌐 http://$IP:8000"
            wait $SERVER_PID
            exit 0
        fi
    done
    
    kill $SERVER_PID 2>/dev/null
fi

# Method 5: File:// protocol (last resort)
echo "📁 Method 5: Using file:// protocol..."
FULL_PATH=$(pwd)/dist/index.html
echo "✅ FALLBACK SOLUTION:"
echo "🌐 Open this in your browser: file://$FULL_PATH"
echo "⚠️  Note: Some features may not work with file:// protocol"

# Method 6: Create a simple HTTP server script
echo "🛠️  Method 6: Creating custom server script..."
cat > simple-server.py << 'EOF'
#!/usr/bin/env python3
import http.server
import socketserver
import os
import socket

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_my_headers()
        http.server.SimpleHTTPRequestHandler.end_headers(self)
    
    def send_my_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('', 0))
        s.listen(1)
        port = s.getsockname()[1]
    return port

if __name__ == "__main__":
    os.chdir('dist')
    
    for port in [3000, 8000, 8080, 9000]:
        try:
            with socketserver.TCPServer(("0.0.0.0", port), MyHTTPRequestHandler) as httpd:
                print(f"✅ Server running at:")
                print(f"🌐 http://localhost:{port}")
                print(f"🌐 http://192.168.1.10:{port}")
                print(f"🌐 http://192.168.1.7:{port}")
                print("Press Ctrl+C to stop")
                httpd.serve_forever()
        except OSError:
            continue
    
    # If all standard ports fail, use random port
    port = find_free_port()
    with socketserver.TCPServer(("0.0.0.0", port), MyHTTPRequestHandler) as httpd:
        print(f"✅ Server running on random port:")
        print(f"🌐 http://localhost:{port}")
        print(f"🌐 http://192.168.1.10:{port}")
        print(f"🌐 http://192.168.1.7:{port}")
        print("Press Ctrl+C to stop")
        httpd.serve_forever()
EOF

python3 simple-server.py

echo "❌ All methods failed. This indicates a serious network configuration issue."
echo ""
echo "🔧 PERMANENT FIXES TO TRY:"
echo "1. System Preferences > Security & Privacy > Firewall > Turn Off"
echo "2. Disable VPN/Proxy temporarily"
echo "3. Terminal > System Preferences > Privacy > Full Disk Access > Add Terminal"
echo "4. sudo dscacheutil -flushcache && sudo killall -HUP mDNSResponder"
echo "5. Check /etc/hosts file for localhost blocking"
echo "6. Restart your Mac in Safe Mode and try again"
echo ""
echo "🌍 ALTERNATIVE: Deploy to Netlify immediately for online access"