const socketHandler = (io) => {
    // Socket.IO connection handling
    io.on('connection', (socket) => {
    console.log('Socket.io connected');
    socket.on('disconnect', () => {
        console.log('Socket.io disconnected');
    });
});
}
module.exports = socketHandler;