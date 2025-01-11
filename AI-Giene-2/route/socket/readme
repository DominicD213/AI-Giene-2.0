<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Socket.IO Initialization</title>
</head>
<body>
    <h1>Socket.IO Server Initialization</h1>
    <p>The provided code sets up and initializes a Socket.IO server with Cross-Origin Resource Sharing (CORS) configuration in an Express application. The <code>initSocket</code> function takes a <code>server</code> instance (typically an HTTP server) as an argument and configures Socket.IO to work with that server. The <code>Server</code> class from the <code>socket.io</code> package is used to create the Socket.IO instance, <code>io</code>, which handles WebSocket communication between the server and connected clients.</p>

    <p>The <code>cors</code> configuration allows specific origins (in this case, the origin specified in the <code>config.cjs</code> file and a local development server running on <code>http://localhost:3000</code>) to make requests to the server. The allowed HTTP methods for WebSocket connections are restricted to "GET" and "POST," and the <code>credentials: true</code> setting allows cookies and authentication data to be sent with requests. After setting up the Socket.IO server with these options, the <code>initSocket</code> 
        function imports and applies the socket event handlers from another file (<code>./socketHandlers</code>), allowing the server to handle various socket events. Finally, the configured <code>io</code> instance is returned for use throughout the application. The function is exported as <code>initSocket</code> for easy use in other parts of the app.</p>
</body>
</html>
