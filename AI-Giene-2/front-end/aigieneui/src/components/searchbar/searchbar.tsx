import React, { useState, useEffect } from "react";
import useSearchBar from "../../hooks/searchBarService/searchBarService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { startLoading } from "../../store/searchbar/search";

const SearchBar: React.FC = () => {
    const { handleSearchClick } = useSearchBar();
    const loginState = useSelector((state: RootState) => state.login.sessionActive);
    const loading = useSelector((state: RootState) => state.search.loading);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(""); // Local input state
    const [searchBarPlaceholder, setSearchBarPlaceholder] = useState(
        "Must Login to use this search bar."
    );
    const sanitizeQuery = (query: string) => query.replace(/[^a-zA-Z0-9 ]/g, "");


    useEffect(() => {
        setSearchBarPlaceholder(loginState ? "Search for queries" : "Must Login to use this search bar.");
    }, [loginState]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Update local state
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            setSearchBarPlaceholder("Queries cannot have an empty value!");
        } else {
            handleSearchClick(sanitizeQuery(inputValue));
            setInputValue(""); // Clear input after search
            dispatch(startLoading());
        }
    };

    return (
        <div className="text-white flex items-center m-auto lg:m-auto w-4/6">
            <form
                onSubmit={handleSubmit}
                className="relative flex items-center m-auto max-sm:w-full w-4/5"
            >
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="h-12 bg-light-grey outline-none p-4 text-white text-lg rounded-lg max-sm:w-2/5"
                    placeholder={searchBarPlaceholder}
                    style={{ color: "white", width: "100%", maxWidth: "40rem" }}
                    disabled={!loginState} // Disable input when not logged in
                />
                <button
                    type="submit"
                    className={`bg-custom-gradient rounded-lg px-2 py-2 max-w-28 h-12 ml-2 max-sm:w-1/5 ${
                        loading ? "animate-bounce opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading || !loginState} // Disable button when not logged in
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
