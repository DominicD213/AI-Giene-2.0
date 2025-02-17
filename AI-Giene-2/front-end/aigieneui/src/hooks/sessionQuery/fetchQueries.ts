import { useDispatch, useSelector } from "react-redux";
import { addRequest, stopLoading, startLoading, setError } from "../../store/session/sessionStatus";
import useFetchQueriesApi from "../../services/fetchQueriesApi";
import { RootState } from "../../store/store";
import { useCallback } from "react";


const useFetchQueries = () => {
    const dispatch = useDispatch();
    const { fetchQueriesApi } = useFetchQueriesApi();
    const requests = useSelector((state: RootState) => state.session.queries); // Fetch queries from Redux store
    const loaded = useSelector((state: RootState) => state.session.loaded);

    const fetchQueries = useCallback(async (): Promise<void> => {
        console.log("Fetching queries...");

        // Skip fetch if data has already been fetched
        if (requests.length > 0 || loaded) {
            console.log("Skipping fetch: Data already exists.");
            return;
        }
        dispatch(startLoading());

        try {
            console.log("Calling fetchQueriesApi()...");
            const data = await fetchQueriesApi();
            console.log("Query Response:", data);
            if (data && data.length > 0) {
                dispatch(addRequest(data));
            } else {
                dispatch(setError("No queries found"));
            }
        } catch (error) {
            console.error("Query Error:", error);
            dispatch(setError("No requests found"));
        } finally {
            dispatch(stopLoading());
        }
    }, [dispatch, fetchQueriesApi, requests.length, loaded]);

    return { fetchQueries, requests };
};

export default useFetchQueries;
