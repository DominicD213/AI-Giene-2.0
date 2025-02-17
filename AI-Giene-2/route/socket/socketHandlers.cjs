const openAIResponse = require('../controller/controller.openAIResponse.cjs');

module.exports = (io) => {
    io.on('connection', (socket) => {
        // console.log('A user connected:', socket.id);

        // Listen for 'newQuery' event
        socket.on('newQuery', async (query, userId) => {
            // console.log('Received new message:', query, userId);

            try {
                // Call openAIResponse (pass the query and userId directly)
                const responseData = await openAIResponse(query, userId);
                
                // Check for error in the response
                if (responseData.error) {
                    socket.emit('Error', { message: responseData.error });
                    return;
                }

                // Emit the response back to the same socket
                socket.emit('Updated-Data', { data: responseData.query, response: responseData.response });
                // console.log(`Returning Data: ${responseData.query}, Response: ${responseData.response}`);
            } catch (error) {
                console.error('Error processing query:', error);
                socket.emit('Error', { message: 'Error processing your request' });
            }
        });

        // Handle client disconnect event
        socket.on('disconnect', () => {
            // console.log('A user disconnected:', socket.id);
        });
    });
};
