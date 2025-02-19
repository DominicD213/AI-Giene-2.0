import { useDispatch, useSelector } from "react-redux";
import { addRequest, setError } from "../../../store/session/sessionStatus";
import useFetchQueriesApi from "../../../services/queryServices/fetchQueries/fetchQueriesApi";
import { RootState } from "../../../store/store";

const useFetchQueries = () => {
    const dispatch = useDispatch();
    const { fetchQueriesApi } = useFetchQueriesApi();
    const requests = useSelector((state: RootState) => state.session.queries);
    const loaded = useSelector((state: RootState) => state.session.loaded);

    const fetchQueries = async (): Promise<void> => {
        console.log("Fetching queries...");

        if (loaded || requests.length > 0) {
            console.log("Skipping fetch: Data already exists or loading in progress.");
            return;
        }

        try {
            console.log("Calling fetchQueriesApi()...");
            const data = await fetchQueriesApi();
            console.log("Query Response:", data);

            if (data?.length > 0) {
                dispatch(addRequest(data));
                dispatch({ type: 'session/setLoaded', payload: true });
            } else {
                console.log("No new queries found, skipping update.");
            }
        } catch (error: any) {
            console.error("Query Error:", error);
            dispatch(setError(error?.message || "Error fetching queries"));
        };
    };

    return { fetchQueries, requests };
};

export default useFetchQueries;
