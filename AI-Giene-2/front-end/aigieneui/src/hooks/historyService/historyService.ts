import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { addQuery } from "../../store/history/querySlice";
import useHistoryServiceApi from "../../services/queryServices/historyService/historyServiceApi";

const useFetchQueriesHistory = () => {
    const searchHistory = useSelector((state: RootState) => state.searchHistory.value);
    const dispatch = useDispatch();
    const { historyServiceApi } = useHistoryServiceApi(); 
    const fetchQueriesHistory = useCallback(async () => {
        if (!searchHistory.trim()) return;

        try {
            const response = await historyServiceApi(searchHistory);
            if (Array.isArray(response)) {
                response.forEach(query => dispatch(addQuery(query))); 
            } else if (typeof response === "object" && response !== null) {
                dispatch(addQuery(Array.isArray(response) ? response : [response]));
 
            }else {
                console.warn("Unexpected API response format:", response);
            }
        } catch (error) {
            console.error("Error fetching search history:", error);
        }
    }, [searchHistory, dispatch, historyServiceApi]); 
    return { fetchQueriesHistory };
};

export default useFetchQueriesHistory;
