import { useDispatch } from "react-redux";
import { updateSearch, startLoading, stopLoading } from "../../store/searchbar/search";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useSocketAPI from '../../services/utils/socketService/socketAPI'; // Import the socket service

const useSearchBar = () => {
    const dispatch = useDispatch();
    const search = useSelector((state: RootState) => state.search.search);
    const userId = useSelector((state: RootState) => state.login.id);
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
            socket.emit('newQuery', search, userId);
        }
    }, [search, socket, userId]); // Only run this effect when `search` changes and socket is initialized

    // Handles search submission
    const handleSearchClick = async (searchTerm: string) => {
        if (!searchTerm.trim()) {
            console.error('Search term is empty or invalid');
            return;
        }

        try {
            console.log('Search term:', searchTerm);
            dispatch(updateSearch(searchTerm)); // Dispatch search term on submit
            dispatch(startLoading())
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
