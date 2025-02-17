// useSearchBarServiceApi.ts
import axios from 'axios';

// Function to call the API with the search query
const historyServiceApi = async (searchHistory: string): Promise<any> => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/session-status/search/history`, {
            params: { query: searchHistory },
        });
        return response;
    } catch (error) {
        console.error('Error in API call:', error);
        throw error; // rethrow to handle in calling component
    }
};

export default historyServiceApi;
