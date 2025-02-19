import axios from "axios";

const useFetchQueriesApi = () => {
    const fetchQueriesApi = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/login/session-status/openAIResponse/recent-queries`,
                { withCredentials: true }
            );
            console.log('Fetched Queries:', response.data);
            return response.data; 
        } catch (error) {
            console.error('Error fetching queries:', error);
            throw error;
        }
    };

    return { fetchQueriesApi };
};

export default useFetchQueriesApi;
