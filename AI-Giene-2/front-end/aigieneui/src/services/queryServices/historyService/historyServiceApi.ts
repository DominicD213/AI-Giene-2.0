import axios from "axios";

const useHistoryServiceApi = () => {
    const historyServiceApi = async (searchHistory: string): Promise<any> => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/login/session-status/search/history`, {
            params: { query: searchHistory },
            withCredentials: true,  
        });

        // console.log("API Response:", response.data); // Debugging

        // Ensure we return the correct format
        if (Array.isArray(response.data)) {
            return response.data; 
        } else {
            throw new Error(`Unexpected API response format: ${JSON.stringify(response.data.data)}`);
        }
    };
    return { historyServiceApi };
};

export default useHistoryServiceApi;
