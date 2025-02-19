import axios from "axios"

const openAIQuery = async (query: string): Promise<any> => {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/login/session-status/openAIResponse`,
            { query: query },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true, 
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error;
    }
};


export default openAIQuery;

