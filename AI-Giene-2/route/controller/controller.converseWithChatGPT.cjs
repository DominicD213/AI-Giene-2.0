const OpenAI = require("openai");
const { openAIApiKey } = require('../configs/config.cjs');
const Giene = require("../models/schema.cjs"); // MongoDB Schema

const openai = new OpenAI({
    apiKey: openAIApiKey,
});

async function converseWithChatGPT(query) {
    try {
        // Fetch the last 5 queries from MongoDB, sorted by entryDate (most recent first)
        const previousQueries = await Giene.UserQueries.find()
            .sort({ entryDate: -1 }) // Sort by entryDate in descending order
            .limit(5); // Get only the last 5 queries

        // Log fetched queries to debug
        console.log("Fetched previous queries:", previousQueries);

        // Construct message history for OpenAI
        const messageHistory = [];
        previousQueries.forEach(item => {
            messageHistory.push({ role: "user", content: item.query });
            messageHistory.push({ role: "assistant", content: item.response });
        });

        // Add the new query to the message history
        messageHistory.push({ role: "user", content: query });

        // Log final message history before sending
        console.log("Final message history:", messageHistory);

        // Make the request to OpenAI with the conversation history
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messageHistory,
            stream: true, // Stream the response
        });

        let fullResponse = '';

        // Handle the streaming response
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            process.stdout.write(content);
            fullResponse += content;
        }

        if (!fullResponse) {
            throw new Error('Received empty response from OpenAI');
        }

        return fullResponse; // Return the response
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw error;
    }
}

module.exports = converseWithChatGPT;
