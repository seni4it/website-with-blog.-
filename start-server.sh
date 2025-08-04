#!/bin/bash

echo "🚀 Starting development server with multiple fallback options..."

# Kill any existing processes
pkill -f "vite" 2>/dev/null || true
pkill -f "npx vite" 2>/dev/null || true

# Try different approaches
echo "📡 Testing network connectivity..."

# Method 1: Standard localhost
echo "🔗 Trying localhost:3000..."
npx vite --port 3000 --host localhost &
SERVER_PID=$!
sleep 3

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ SUCCESS: Server running at http://localhost:3000"
    echo "🌐 Visit: http://localhost:3000"
    echo "📝 Blog: http://localhost:3000/blog"
    echo "⚙️  Admin: http://localhost:3000/admin"
    wait $SERVER_PID
    exit 0
fi

# Kill failed attempt
kill $SERVER_PID 2>/dev/null || true

# Method 2: All interfaces
echo "🔗 Trying all interfaces on port 3000..."
npx vite --port 3000 --host 0.0.0.0 &
SERVER_PID=$!
sleep 3

if curl -s http://127.0.0.1:3000 > /dev/null 2>&1; then
    echo "✅ SUCCESS: Server running at http://127.0.0.1:3000"
    echo "🌐 Visit: http://127.0.0.1:3000"
    echo "📝 Blog: http://127.0.0.1:3000/blog"
    echo "⚙️  Admin: http://127.0.0.1:3000/admin"
    wait $SERVER_PID
    exit 0
fi

if curl -s http://192.168.1.10:3000 > /dev/null 2>&1; then
    echo "✅ SUCCESS: Server running at http://192.168.1.10:3000"
    echo "🌐 Visit: http://192.168.1.10:3000"
    echo "📝 Blog: http://192.168.1.10:3000/blog"
    echo "⚙️  Admin: http://192.168.1.10:3000/admin"
    wait $SERVER_PID
    exit 0
fi

# Kill failed attempt
kill $SERVER_PID 2>/dev/null || true

# Method 3: Different port
echo "🔗 Trying port 8000..."
npx vite --port 8000 --host 0.0.0.0 &
SERVER_PID=$!
sleep 3

if curl -s http://localhost:8000 > /dev/null 2>&1; then
    echo "✅ SUCCESS: Server running at http://localhost:8000"
    echo "🌐 Visit: http://localhost:8000"
    echo "📝 Blog: http://localhost:8000/blog"
    echo "⚙️  Admin: http://localhost:8000/admin"
    wait $SERVER_PID
    exit 0
fi

# Kill failed attempt
kill $SERVER_PID 2>/dev/null || true

# Method 4: Python HTTP server as fallback
echo "🔗 Trying Python HTTP server as fallback..."
if command -v python3 >/dev/null 2>&1; then
    cd dist
    python3 -m http.server 8080 &
    SERVER_PID=$!
    sleep 2
    
    if curl -s http://localhost:8080 > /dev/null 2>&1; then
        echo "✅ SUCCESS: Static server running at http://localhost:8080"
        echo "🌐 Visit: http://localhost:8080"
        echo "📝 Blog: http://localhost:8080/blog"
        echo "⚙️  Admin: http://localhost:8080/admin"
        echo "⚠️  Note: This is serving built files (no hot reload)"
        wait $SERVER_PID
        exit 0
    fi
    
    kill $SERVER_PID 2>/dev/null || true
    cd ..
fi

echo "❌ All methods failed. Network or firewall issue detected."
echo "💡 Recommendations:"
echo "   1. Check macOS Firewall: System Preferences > Security & Privacy > Firewall"
echo "   2. Disable VPN temporarily"
echo "   3. Check antivirus software"
echo "   4. Try: sudo lsof -i :3000 (to see what's using the port)"
echo "   5. Deploy to Netlify instead"

exit 1