import React, { useState } from "react";
import useSearchBar from "../../hooks/searchBarService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const SearchBar: React.FC = () => {
    const { handleSearchClick } = useSearchBar();
    const loginState = useSelector((state: RootState) => state.login.sessionActive)
    const [inputValue, setInputValue] = useState(""); // Local input state
    const loading = useSelector((state: RootState) => state.search.loading);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); // Only update local state
    };

    const searchBarPlaceholder = () => {
        if (!loginState){
            return "Must Login to use this search bar."
        }else{
            return "Search...";
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        handleSearchClick(inputValue); // Pass input value when submitting
        setInputValue(""); // Clear input after search
    };

    return (
        <div className="text-white flex items-center m-auto lg:m-auto w-4/6">
            <form
                onSubmit={handleSubmit} 
                className="relative flex items-center m-auto max-sm:w-full w-4/5"
            >
                <input
                    type="text"
                    value={inputValue} // Use local state
                    onChange={handleInputChange}
                    className="h-12 bg-light-grey outline-none p-4 text-white text-lg rounded-lg max-sm:w-2/5"
                    placeholder={searchBarPlaceholder()}
                    style={{ color: "white", width: "100%", maxWidth: "40rem" }}
                />
                <button
                    type="submit" 
                    className={`bg-custom-gradient rounded-lg px-2 py-2 max-w-28 h-12 ml-2 max-sm:w-1/5 ${
                        loading ? "animate-bounce opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading} 
                >
                    {loading ? "Sending..." : "Send"}
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
