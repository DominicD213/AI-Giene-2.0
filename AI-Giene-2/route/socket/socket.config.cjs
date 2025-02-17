const { Server } = require('socket.io');
const { origin } = require('../configs/config.cjs');

const initSocket = (server) => {
    // Socket.IO CORS configuration
    const io = new Server(server, {
        cors: {
            origin: [origin, 'http://localhost:3000'], // Ensure these match client app's URL
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    // Load socket event handlers
    require('./socketHandlers.cjs')(io);

    // Log when socket server is created
    console.log('Socket Created');
    
    return io;
};

module.exports = initSocket;
