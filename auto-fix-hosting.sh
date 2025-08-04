#!/bin/bash

echo "🤖 AUTOMATIC HOSTING FIX SYSTEM"
echo "==============================="
echo "Self-monitoring and auto-healing web server"

# Configuration
MAX_RETRIES=3
CHECK_INTERVAL=10
TIMEOUT=5
LOG_FILE="hosting-monitor.log"

# Initialize log
echo "$(date): Starting auto-fix hosting system" > "$LOG_FILE"

# Function to log messages
log() {
    echo "$(date): $1" | tee -a "$LOG_FILE"
}

# Function to test if hosting is working
test_hosting() {
    local url=$1
    local timeout=${2:-$TIMEOUT}
    
    if curl -s --connect-timeout "$timeout" --max-time "$timeout" "$url" > /dev/null 2>&1; then
        return 0  # Success
    else
        return 1  # Failure
    fi
}

# Function to find available port
find_free_port() {
    local start_port=${1:-3000}
    for ((port=$start_port; port<=9999; port++)); do
        if ! lsof -i ":$port" >/dev/null 2>&1; then
            echo $port
            return 0
        fi
    done
    echo 3000  # fallback
}

# Function to get working IP addresses
get_working_ips() {
    local ips=()
    
    # Test localhost variations
    for ip in "127.0.0.1" "localhost"; do
        if ping -c 1 -W 1000 "$ip" >/dev/null 2>&1; then
            ips+=("$ip")
        fi
    done
    
    # Get network IPs
    local network_ips=($(ifconfig | grep "inet " | grep -v "127.0.0.1" | awk '{print $2}'))
    for ip in "${network_ips[@]}"; do
        if ping -c 1 -W 1000 "$ip" >/dev/null 2>&1; then
            ips+=("$ip")
        fi
    done
    
    echo "${ips[@]}"
}

# Function to start server with multiple fallbacks
start_server_with_fallbacks() {
    local port=$(find_free_port)
    local dist_path=""
    
    # Find dist directory
    if [ -d "dist" ]; then
        dist_path="dist"
    elif [ -d "../dist" ]; then
        dist_path="../dist"
    else
        log "ERROR: No dist directory found. Building project..."
        if [ -f "package.json" ]; then
            npm run build
            dist_path="dist"
        else
            log "ERROR: No package.json found"
            return 1
        fi
    fi
    
    log "Starting server in $dist_path on port $port"
    
    # Try different server methods
    local methods=("python3" "python" "npx_serve" "node_http")
    
    for method in "${methods[@]}"; do
        log "Trying method: $method"
        
        case $method in
            "python3")
                if command -v python3 >/dev/null 2>&1; then
                    cd "$dist_path"
                    python3 -m http.server "$port" --bind 0.0.0.0 >/dev/null 2>&1 &
                    SERVER_PID=$!
                    cd - >/dev/null
                fi
                ;;
            "python")
                if command -v python >/dev/null 2>&1; then
                    cd "$dist_path"
                    python -m http.server "$port" --bind 0.0.0.0 >/dev/null 2>&1 &
                    SERVER_PID=$!
                    cd - >/dev/null
                fi
                ;;
            "npx_serve")
                if command -v npx >/dev/null 2>&1; then
                    npx serve "$dist_path" -p "$port" -s >/dev/null 2>&1 &
                    SERVER_PID=$!
                fi
                ;;
            "node_http")
                if command -v node >/dev/null 2>&1; then
                    # Create temporary Node.js server
                    cat > temp_server.js << EOF
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join('$dist_path', req.url === '/' ? 'index.html' : req.url);
    
    if (!fs.existsSync(filePath)) {
        filePath = path.join('$dist_path', 'index.html');
    }
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml'
        }[ext] || 'text/plain';
        
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    });
});

server.listen($port, '0.0.0.0', () => {
    console.log('Server running on port $port');
});
EOF
                    node temp_server.js >/dev/null 2>&1 &
                    SERVER_PID=$!
                fi
                ;;
        esac
        
        if [ ! -z "$SERVER_PID" ]; then
            sleep 3
            
            # Test if server is working
            local working_ips=($(get_working_ips))
            for ip in "${working_ips[@]}"; do
                if test_hosting "http://$ip:$port"; then
                    log "✅ SUCCESS: Server started with $method"
                    log "🌐 URL: http://$ip:$port"
                    
                    # Store successful configuration
                    echo "WORKING_METHOD=$method" > .hosting_config
                    echo "WORKING_IP=$ip" >> .hosting_config
                    echo "WORKING_PORT=$port" >> .hosting_config
                    echo "SERVER_PID=$SERVER_PID" >> .hosting_config
                    
                    return 0
                fi
            done
            
            # If no IP worked, kill the server and try next method
            kill "$SERVER_PID" 2>/dev/null
            SERVER_PID=""
        fi
    done
    
    log "❌ All server methods failed"
    return 1
}

# Function to monitor and auto-heal
monitor_and_heal() {
    local working_url=""
    local check_count=0
    local failure_count=0
    
    while true; do
        check_count=$((check_count + 1))
        log "🔍 Health check #$check_count"
        
        # Load current configuration if available
        if [ -f ".hosting_config" ]; then
            source .hosting_config
            working_url="http://$WORKING_IP:$WORKING_PORT"
        fi
        
        # Test current hosting
        if [ ! -z "$working_url" ] && test_hosting "$working_url"; then
            log "✅ Hosting is healthy: $working_url"
            failure_count=0
            
            # Display status every 10 checks
            if [ $((check_count % 10)) -eq 0 ]; then
                echo "🟢 System healthy - Check #$check_count - URL: $working_url"
            fi
        else
            failure_count=$((failure_count + 1))
            log "❌ Hosting failure detected (attempt $failure_count)"
            
            if [ $failure_count -ge $MAX_RETRIES ]; then
                log "🚨 Multiple failures detected. Attempting auto-repair..."
                
                # Kill existing server
                if [ ! -z "$SERVER_PID" ]; then
                    kill "$SERVER_PID" 2>/dev/null
                fi
                
                # Clean up
                rm -f .hosting_config temp_server.js
                
                # Attempt to restart
                if start_server_with_fallbacks; then
                    failure_count=0
                    log "✅ Auto-repair successful"
                    
                    # Reload configuration
                    source .hosting_config
                    working_url="http://$WORKING_IP:$WORKING_PORT"
                    
                    echo "🔄 Service restored: $working_url"
                else
                    log "❌ Auto-repair failed. Trying alternative solutions..."
                    
                    # Try ngrok as last resort
                    if [ -f "ngrok" ]; then
                        log "Attempting ngrok fallback..."
                        ./ngrok http 3000 >/dev/null 2>&1 &
                        NGROK_PID=$!
                        
                        sleep 5
                        NGROK_URL=$(curl -s http://localhost:4040/api/tunnels 2>/dev/null | grep -o 'https://[^"]*ngrok[^"]*' | head -1)
                        
                        if [ ! -z "$NGROK_URL" ]; then
                            log "✅ Ngrok fallback successful: $NGROK_URL"
                            working_url="$NGROK_URL"
                            failure_count=0
                            echo "🌍 External tunnel active: $NGROK_URL"
                        fi
                    fi
                fi
            fi
        fi
        
        sleep $CHECK_INTERVAL
    done
}

# Function to show real-time status
show_status() {
    if [ -f ".hosting_config" ]; then
        source .hosting_config
        echo "📊 Current Status:"
        echo "   Method: $WORKING_METHOD"
        echo "   URL: http://$WORKING_IP:$WORKING_PORT"
        echo "   PID: $SERVER_PID"
        echo "   Log: $LOG_FILE"
    else
        echo "⚪ No active hosting configuration"
    fi
}

# Main execution
case "${1:-start}" in
    "start")
        echo "🚀 Starting auto-fix hosting system..."
        
        # Initial setup
        if start_server_with_fallbacks; then
            source .hosting_config
            echo "✅ Initial setup successful: http://$WORKING_IP:$WORKING_PORT"
            echo ""
            echo "🤖 Starting monitoring system..."
            echo "   - Checking every $CHECK_INTERVAL seconds"
            echo "   - Auto-repair after $MAX_RETRIES failures"
            echo "   - Logs: $LOG_FILE"
            echo ""
            echo "Press Ctrl+C to stop monitoring"
            
            # Start monitoring
            trap "log 'Monitoring stopped by user'; kill $SERVER_PID 2>/dev/null; rm -f .hosting_config temp_server.js; exit" INT
            monitor_and_heal
        else
            echo "❌ Failed to start initial server"
            echo "🔧 Try running with manual intervention:"
            echo "   ./fix-localhost-permanently.sh"
            exit 1
        fi
        ;;
    "status")
        show_status
        ;;
    "stop")
        if [ -f ".hosting_config" ]; then
            source .hosting_config
            kill "$SERVER_PID" 2>/dev/null
            rm -f .hosting_config temp_server.js
            log "System stopped by user"
            echo "✅ Hosting system stopped"
        else
            echo "⚪ No active hosting system found"
        fi
        ;;
    "restart")
        $0 stop
        sleep 2
        $0 start
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status}"
        echo ""
        echo "Commands:"
        echo "  start   - Start auto-monitoring hosting with auto-repair"
        echo "  stop    - Stop hosting and monitoring"
        echo "  restart - Stop and start the system"
        echo "  status  - Show current status"
        ;;
esac