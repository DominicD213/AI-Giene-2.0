const converseWithChatGPT = require('./controller.converseWithChatGPT.cjs');
const sanitizedRequest = require("../validation/openAIResponse.validation.cjs");
const Giene = require("../models/schema.cjs");

const openAIResponse = async (query, userId) => {
    console.log(`openAI response: query: ${query}, userId: ${userId}`);

    try {
        const validatedQuery = sanitizedRequest(query.toString());  // This returns an object { query: sanitizedQuery }
        //console.log('Validated query:', validatedQuery);

        const { query: sanitizedQuery } = validatedQuery;  // Destructure the 'query' property
        //console.log('Sanitized query:', sanitizedQuery);  // Now you have the sanitized query string


        // Communicate with OpenAI API
        const response = await converseWithChatGPT(sanitizedQuery, userId);
        //console.log('OpenAI Response:', response);

        if (!response) {
            console.error('No response from OpenAI');
            return { error: 'No response from OpenAI' };
        }

        // Save the query and response to the database
        const newRequest = new Giene.UserQueries({
            user: userId,
            query: query,
            response: response,
        });
        await newRequest.save();
        //console.log('New request saved:', newRequest);

        return { query: query, response: response };
    } catch (error) {
        //console.error('Error:', error);
        return { error: 'Error processing your request' };
    }
};

module.exports = openAIResponse;
