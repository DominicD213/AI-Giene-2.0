import React, { useEffect, useRef } from "react";
import { useSelector} from "react-redux";
import { RootState } from "../../store/store";
import useCheckSessionStatus from "../../hooks/authentication/checkSession/authenticationService";
import useFetchQueries from "../../hooks/sessionQuery/fetchQueries/fetchQueries";  
import { Query } from "../../store/session/sessionStatus";
import useSocketEvents from "../../hooks/sessionQuery/socket/socket";
import Intro from "../intro/intro";

const SessionQuery: React.FC = () => {
    const checkSessionStatus = useCheckSessionStatus();
    const { fetchQueries } = useFetchQueries();
    const queriesEndRef = useRef<HTMLDivElement>(null);

    const loading = useSelector((state: RootState) => state.session.sessionLoading);
    const error = useSelector((state: RootState) => state.session.error);
    const queries = useSelector((state: RootState) => state.session.queries);
    const sessionStatus = useSelector((state: RootState) => state.login.sessionActive);
    const loaded = useSelector((state: RootState) => state.session.loaded);
    const loginState = useSelector((state: RootState) => state.login.sessionActive);

    const hasCheckedSessionRef = useRef(false); // Ref to track if session has been checked

    useSocketEvents('Updated-Data'); // Listen for new data updates

    // Effect to check the session status only once
    useEffect(() => {
        if (loginState && !hasCheckedSessionRef.current) {
            checkSessionStatus();
            hasCheckedSessionRef.current = true; // Mark as checked
        }
    }, [checkSessionStatus, loginState]);

    if (sessionStatus && !loaded) {
        fetchQueries();
    }

    // Scroll to the bottom when queries are updated
    useEffect(() => {
        if (queriesEndRef.current) {
            queriesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [queries]);

    return (
        <div>
            {!loginState ? (
                <div className="w-auto flex-grow rounded-lg p-4 max-h-full">
                    <Intro />
                </div>
            ) : (
                <div className="h-full flex flex-col mx-5 mt-10 rounded">
                    <div className="w-auto flex-grow rounded-lg p-4 overflow-y-auto max-h-[calc(90vh-200px)] scrollbar-hide">
                        {loading && <p className="text-center text-gray-500">Loading...</p>}
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <div className="space-y-8">
                            {queries.length === 0 ? (
                                <p className="text-center text-gray-500">No queries found.</p>
                            ) : (
                                queries.map((item: Query, i: number) => (
                                    <div key={i} className="space-y-4">
                                        <div className="animate-fade-right">
                                            <div className="flex justify-end">
                                                <div className="ml-8 max-w-xs p-4 bg-custom-gradient rounded-lg">
                                                    <h2 className="text-lg font-bold">Query:</h2>
                                                    <p>{item.query}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="animate-fade-left">
                                            <div className="flex justify-start">
                                                <div className="mr-8 lg:w-lg max-lg:w-auto p-4 bg-custom-text-gradient rounded-lg">
                                                    <h2 className="text-lg font-bold">Response:</h2>
                                                    <p>{item.response}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                            <div ref={queriesEndRef} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SessionQuery;
