const { Server } =  require('socket.io');
const {origin} = require('../configs/config.cjs')

const initSocket = (server) => {
    // Socket.IO CORS configuration
    const io = new Server(server, {
        cors: {
            origin: [origin, 'http://localhost:3000'],
            methods: ["GET", "POST"],
            credentials: true,
        }
    });
    require('./socketHandlers')(io)
    return io;
};

module.exports =  initSocket