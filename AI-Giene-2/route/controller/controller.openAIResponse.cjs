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
            const validatedQuery = sanitizedRequest(query, res); // Validate the query

            if (validatedQuery.error) {
                return res.status(400).send(validatedQuery.error); // Return error if validation fails
            }
            
            const { query: sanitizedQuery } = validatedQuery;

            // Communicate with OpenAI API
            const response = await converseWithChatGPT(sanitizedQuery);

            // Save the query and response to the database
            const userId = req.session.user.id;
            const newRequest = new Giene.UserQueries({
                user: userId,
                query:query,
                response: response,
            });
            await newRequest.save();

            // Emit the query and response to the specific socket (pass socket here)
            io.emit('newQuery', { query: sanitizedQuery, response });
            console.log({query: sanitizedQuery, response})

            // Send the response back to the client
            return res.status(200).json({ response });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).send('Error processing your request');
        }
    };
};

module.exports = openAIResponse;
