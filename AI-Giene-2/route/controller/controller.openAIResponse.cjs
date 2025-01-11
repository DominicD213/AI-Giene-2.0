const converseWithChatGPT = require('./controller.converseWithChatGPT.cjs');
const sanitizedRequest = require("../validation/openAIResponse.validation.cjs");
const Giene = require("../models/schema.cjs");

const openAIResponse = (io) => {
    return async (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send('Unauthorized');
        }

        try {
            const query = req.body.query;

            // Validate and sanitize the query
            const validatedQuery = sanitizedRequest(query);
            const { query: sanitizedQuery } = validatedQuery;

            // Communicate with OpenAI
            const response = await converseWithChatGPT(sanitizedQuery);

            // Save the query and response to the database
            const userId = req.session.user.id;
            const newRequest = new Giene.UserQueries({
                user: userId,
                query: query,
                response: response,
            });
            await newRequest.save();

            // Emit the query and response via WebSocket
            io.emit('newQuery', { query, response });

            // Send the response back to the client
            return res.status(200).json({ response });
        } catch (error) {
            console.error('OpenAI API error:', error);
            return res.status(500).send('Error communicating with OpenAI API');
        }
    };
};

module.exports = openAIResponse