import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { RootState } from '../store/store';
import { addQuery } from '../store/history/querySlice';
import { Query } from '../store/history/querySlice';

const useFetchQueries = () => {
    const searchHistory = useSelector((state: RootState) => state.searchHistory.value);
    const dispatch = useDispatch();

    const fetchQueries = async () => {
        if (!searchHistory.trim()) return; // Skip API call if searchHistory is empty or only spaces

        try {
            // Make the API request
            const response = await axios.get<{ data: Query[] }>(
                'https://aigeine-api.onrender.com/login/session-status/search/history',
                {
                    params: { query: searchHistory },
                }
            );

            // Dispatch the fetched queries to the Redux store
            dispatch(addQuery(response.data.data)); 
        } catch (error) {
            console.error('Error fetching search history:', error); // Log the error
            // Optionally, dispatch an error action to update the UI
        }
    };

    return { fetchQueries };
};

export default useFetchQueries;
