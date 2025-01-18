import React, { useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import Search from "../../Assets/whiteSearchIcon.png";
import { setSearchHistory } from "../../store/history/searchHistorySlice";
import useFetchQueries from "../../service/historyService";

const History : React.FC = () => {
    const searchHistory = useSelector((state: RootState) => state.searchHistory.value);
    const queries = useSelector((state: RootState) => state.query.value);
    const dispatch = useDispatch();
    const queriesEndRef = useRef<HTMLDivElement>(null);  // Reference to the end of the list for scrolling effect
    const {fetchQueries} = useFetchQueries(); // Fetch queries using custom hook

    useEffect(() => {
      if (queriesEndRef.current) {
        fetchQueries();
        queriesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [searchHistory]); // Fetch queries when searchHistory changehistory]); // Fetch queries when searchHistory changesistory,fetchQueries]); // Fetch queries when searchHistory changes

    const handleSearchHistoryChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchHistory(e.target.value)); // Update searchHistory state with input value
    };

  // Handle form submission
    const handleFormSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault(); // Prevent default form submission behavior
      dispatch(setSearchHistory(searchHistory)); // Trigger search with current input value
    };

    return(
        <div>
      <div className='ml-5'>
        <h1 className='font-bold' style={{ color: 'white' }}>History</h1>
        <form className='ml-3' onSubmit={handleFormSubmit}>
          <div className='bg-light-grey rounded-lg mt-2 h-10 flex items-center w-11/12 max-w-lg'>
            <button className='h-full px-3' type='submit'>
              <img className='max-h-6 max-w-6 min-w-5 min-h-5' src={Search} alt='search' />
            </button>
            <input
              className='flex h-full bg-light-grey outline-none mr-5 rounded-lg w-3/5'
              type='text'
              placeholder='Search history'
              value={searchHistory}
              onChange={handleSearchHistoryChange}
              style={{ color: 'white' }}
            />
          </div>
        </form>
        <div className="space-y-4 flex flex-col mx-5 mt-10 rounded overflow-auto max-h-[50vh]">
                  {searchHistory !== '' ?(
                    queries.map((item:{query:string; response:string}, i: number) => (
                       <div key={i} className="space-y-4">
                       <div className="animate-fade-right">
                           <div className="flex justify-end">
                               <div className="ml-8 max-w-xs p-4 bg-custom-gradient rounded-lg">
                                   <h2 className="text-lg font-bold">Query:</h2>
                                   <p>{item.query}</p>
                               </div>
                           </div>
                       </div>
                       <div className="">
                           <div className="flex justify-start">
                               <div className="mr-8 lg:[w-lg] max-lg:[w-auto] p-4 bg-custom-text-gradient rounded-lg">
                                   <h2 className="text-lg font-bold">Response:</h2>
                                   <p>{item.response}</p>
                               </div>
                           </div>
                       </div>
                   </div>
                    ))) : null}
          <div ref={queriesEndRef} /> {/* Reference to scroll to the end of the queries list */}
        </div>
      </div>
    </div>
    )
}

export default History;