import { useDispatch } from "react-redux";
import { updateSearch, startLoading, stopLoading } from "../store/searchbar/search";
import openAIQuery from '../services/openAIApi'; // Import the API function
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useSocketAPI from '../services/socketAPI'; // Import the socket service

const useSearchBar = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search.search);
    const [input, setInput] = useState(""); // Local state for input field
    const socket = useSocketAPI(); // Get the socket instance

    // Updates local state when user types
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // Emits socket event when the search term is updated
    useEffect(() => {
        if (socket && search.trim()) {
            // Emit socket event when search is updated
            socket.emit('newQuery', search);
        }
    }, [search, socket]); // Only run this effect when `search` changes and socket is initialized

    // Handles search submission
    const handleSearchClick = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            console.error('Search term is empty or invalid');
            return;
        }

        try {
            console.log('Search term:', searchTerm);
            dispatch(updateSearch(searchTerm)); // Dispatch search term on submit
            dispatch(startLoading());

            const response = await openAIQuery(searchTerm); // Make API request

            // Only call the socket event if the response is valid
            if (response) {
                console.log('API Response:', response);
                // Optionally, you can dispatch the response to Redux here if needed.
            } else {
                console.error('No response from API');
            }

            return response;
        } catch (error) {
            console.error('Error making API request:', error);
        } finally {
            dispatch(stopLoading());
            setInput(""); // Clear input field
        }
    };

    return { handleInputChange, handleSearchClick, input };
};

export default useSearchBar;
