#!/bin/bash

echo "🔧 PERMANENT LOCALHOST FIX SYSTEM"
echo "=================================="
echo "Analyzing and fixing network connectivity issues..."

# Kill any existing servers first
pkill -f "python" 2>/dev/null || true
pkill -f "serve" 2>/dev/null || true
pkill -f "vite" 2>/dev/null || true
pkill -f "node" 2>/dev/null || true

# Problem 1: macOS Firewall blocking connections
echo "🛡️  SOLUTION 1: Firewall Configuration"
echo "Checking firewall status..."

FIREWALL_STATE=$(defaults read /Library/Preferences/com.apple.alf globalstate 2>/dev/null || echo "unknown")
echo "Current firewall state: $FIREWALL_STATE"

if [ "$FIREWALL_STATE" != "0" ]; then
    echo "⚠️  Firewall is blocking connections"
    echo "📝 Manual fix needed: System Preferences > Security & Privacy > Firewall > Turn Off"
    echo "💡 Or allow Python/Node.js through firewall"
fi

# Problem 2: Network interface binding issues  
echo ""
echo "🌐 SOLUTION 2: Network Interface Analysis"
echo "Available network interfaces:"
ifconfig | grep -E "^[a-z]|inet " | grep -A1 "^en"

# Get all available IPs
IPS=($(ifconfig | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}'))
echo "Available IP addresses: ${IPS[*]}"

# Problem 3: Port conflicts and service binding
echo ""
echo "🔌 SOLUTION 3: Port and Service Management"
echo "Checking ports in use:"
netstat -an | grep LISTEN | grep -E ":300[0-9]|:800[0-9]|:900[0-9]" || echo "Common ports are free"

# Create multiple hosting solutions
echo ""
echo "🚀 IMPLEMENTING 3 AUTOMATED SOLUTIONS:"
echo "======================================"

# Build the project first
if [ -f "../package.json" ]; then
    echo "Building project..."
    cd .. && npm run build && cd - || true
fi

# Solution 1: External tunnel (bypasses all local network issues)
echo ""
echo "🌍 SOLUTION 1: External Tunnel (Bypass all network issues)"
if command -v python3 >/dev/null 2>&1; then
    # Start local server
    cd ../dist 2>/dev/null || cd dist 2>/dev/null || echo "No dist folder found"
    python3 -m http.server 8000 --bind 127.0.0.1 &
    LOCAL_PID=$!
    cd - >/dev/null
    
    sleep 2
    
    # Try ngrok if available
    if [ -f "../ngrok" ]; then
        echo "Starting ngrok tunnel..."
        ../ngrok http 8000 --log=stdout &
        NGROK_PID=$!
        
        sleep 5
        
        # Get public URL
        NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o 'https://[^"]*ngrok[^"]*' | head -1)
        
        if [ ! -z "$NGROK_URL" ]; then
            echo "✅ SOLUTION 1 SUCCESS!"
            echo "🌍 Public URL: $NGROK_URL"
            echo "📱 This works from anywhere in the world!"
            echo "🔗 Share this URL to view your site"
            
            # Keep running
            echo "Press Ctrl+C to stop tunnel..."
            trap "kill $LOCAL_PID $NGROK_PID 2>/dev/null; exit" INT
            wait $NGROK_PID
            exit 0
        else
            kill $NGROK_PID 2>/dev/null
        fi
    fi
    
    kill $LOCAL_PID 2>/dev/null
fi

# Solution 2: Multiple IP/Port combinations with automatic detection
echo ""
echo "🔍 SOLUTION 2: Smart IP/Port Detection"

# Function to test connectivity
test_connection() {
    local ip=$1
    local port=$2
    timeout 3 curl -s "http://$ip:$port" >/dev/null 2>&1
    return $?
}

# Try different combinations
SUCCESS=false
for PORT in 3000 8000 8080 9000 3001 8001; do
    if [ "$SUCCESS" = true ]; then break; fi
    
    echo "Testing port $PORT..."
    
    # Try different server types
    for SERVER_TYPE in "python" "node"; do
        if [ "$SUCCESS" = true ]; then break; fi
        
        echo "  Trying $SERVER_TYPE on port $PORT..."
        
        if [ "$SERVER_TYPE" = "python" ] && command -v python3 >/dev/null 2>&1; then
            cd ../dist 2>/dev/null || cd dist 2>/dev/null || continue
            python3 -m http.server $PORT --bind 0.0.0.0 >/dev/null 2>&1 &
            SERVER_PID=$!
            cd - >/dev/null
        elif [ "$SERVER_TYPE" = "node" ] && command -v npx >/dev/null 2>&1; then
            npx serve ../dist -p $PORT >/dev/null 2>&1 &
            SERVER_PID=$!
        else
            continue
        fi
        
        sleep 3
        
        # Test all available IPs
        for IP in 127.0.0.1 localhost "${IPS[@]}"; do
            if test_connection "$IP" "$PORT"; then
                echo "✅ SOLUTION 2 SUCCESS!"
                echo "🌐 Your website is accessible at: http://$IP:$PORT"
                echo "📱 Try this URL in your browser"
                echo "🔧 Using $SERVER_TYPE server on port $PORT"
                
                SUCCESS=true
                
                # Keep server running
                echo ""
                echo "Server is running. Press Ctrl+C to stop."
                trap "kill $SERVER_PID 2>/dev/null; exit" INT
                wait $SERVER_PID
                exit 0
            fi
        done
        
        kill $SERVER_PID 2>/dev/null
    done
done

# Solution 3: File protocol fallback with automatic browser opening
echo ""
echo "📁 SOLUTION 3: File Protocol Fallback"

DIST_PATH=""
if [ -d "../dist" ]; then
    DIST_PATH="../dist"
elif [ -d "dist" ]; then
    DIST_PATH="dist"
fi

if [ ! -z "$DIST_PATH" ]; then
    FULL_PATH="$(cd "$DIST_PATH" && pwd)/index.html"
    if [ -f "$FULL_PATH" ]; then
        echo "✅ SOLUTION 3 AVAILABLE!"
        echo "🌐 File URL: file://$FULL_PATH"
        echo "📱 Copy this URL to your browser"
        
        # Try to open automatically
        if command -v open >/dev/null 2>&1; then
            echo "🚀 Attempting to open automatically..."
            open "file://$FULL_PATH"
            echo "✅ Browser should open automatically"
        fi
        
        # Create a desktop shortcut
        DESKTOP_PATH="$HOME/Desktop/Dental Website.webloc"
        cat > "$DESKTOP_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>URL</key>
    <string>file://$FULL_PATH</string>
</dict>
</plist>
EOF
        echo "🔗 Desktop shortcut created: $DESKTOP_PATH"
        
        exit 0
    fi
fi

# If all solutions fail, provide comprehensive diagnostics
echo ""
echo "❌ ALL AUTOMATED SOLUTIONS FAILED"
echo "================================="
echo ""
echo "🔍 DIAGNOSTIC INFORMATION:"
echo "-------------------------"
echo "Network interfaces:"
ifconfig | grep -E "^[a-z]|inet " | head -20
echo ""
echo "Firewall status: $FIREWALL_STATE"
echo "Available ports:"
netstat -an | grep LISTEN | head -10
echo ""
echo "🛠️  MANUAL FIXES TO TRY:"
echo "1. System Preferences > Security & Privacy > Firewall > Turn Off"
echo "2. System Preferences > Network > Advanced > TCP/IP > Renew DHCP Lease"
echo "3. Terminal app > System Preferences > Privacy > Full Disk Access > Add Terminal"
echo "4. Restart your Mac and try again"
echo "5. Try different browser (Chrome, Firefox, Safari)"
echo ""
echo "🌍 ALTERNATIVE: Deploy directly to Netlify for immediate access"

# Create a permanent fix script for future use
cat > fix-network.sh << 'EOF'
#!/bin/bash
echo "Applying network fixes..."
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
echo "DNS cache flushed"
echo "Try running the main script again"
EOF
chmod +x fix-network.sh

echo "📝 Created fix-network.sh for DNS issues"
echo "🔧 Run ./fix-network.sh if problems persist"