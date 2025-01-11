const OpenAI = require("openai");
const {openAIApiKey} = require('../configs/config.cjs')

const openai = new OpenAI({
    apiKey: openAIApiKey,
});

async function converseWithChatGPT(query) {
    try {
        const stream = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: query }],
            stream: true,
        });

        let fullResponse = '';
        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            process.stdout.write(content);
            fullResponse += content;
        }

        if (!fullResponse) {
            throw new Error('Invalid response from OpenAI');
        }

        console.log(fullResponse);
        return fullResponse;
    } catch (error) {
        console.error('Error communicating with OpenAI:', error);
        throw error;
    }
}

module.exports =  converseWithChatGPT;