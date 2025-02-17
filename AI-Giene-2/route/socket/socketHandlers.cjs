const converseWithChatGPT = require('../controller/controller.converseWithChatGPT.cjs')
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id); // Log new client connection

        // Listen for 'sendMessage' event from the client
        socket.on('newQuery', async (request) => {
            console.log('Received a new message:', request); // Log the data received from the client

            // Now interact with OpenAI API or any other processing logic here
            const response = await converseWithChatGPT(request);  // Assume converseWithChatGPT is your API call function

            // Emit the response back to the same socket
            socket.emit('Updated-Data', { data: request, response });
            console.log(`Returning Data: ${request}, Response: ${response}`);
        });

        // Handle client disconnect event
        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id); // Log when a client disconnects
        });
    });
};
