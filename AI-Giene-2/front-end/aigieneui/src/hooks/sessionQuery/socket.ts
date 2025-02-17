import { useEffect, useState } from "react";
import useSocketAPI from "../../services/socketAPI"; 
import { useDispatch, useSelector } from "react-redux"; 
import { addRequest } from "../../store/session/sessionStatus";
import { RootState } from "../../store/store";

const useSocketEvents = (event: string) => {
    const dispatch = useDispatch();
    const queries = useSelector((state: RootState) => state.session.queries);
    const [socketConnected, setSocketConnected] = useState(false);
    const socket = useSocketAPI(); 

    useEffect(() => {
        // Ensure the socket is initialized before trying to use it
        if (!socket) {
            console.warn("Socket is not initialized yet.");
            return;
        }

        const handleConnection = () => {
            console.log("Socket connected successfully.");
            setSocketConnected(true);
        };

        const handleReconnection = () => {
            console.log("Socket is not connected. Retrying connection...");
            socket.connect();
        };

        // Listen to socket events once connected
        socket.on("connect", handleConnection);
        socket.on("connect_error", handleReconnection);

        if (socketConnected) {
            console.log(`Socket connected. Listening for event: ${event}`);
            socket.off(event); // Remove old listeners
            socket.on(event, (data) => {
                console.log(`Received event: ${event}`, data);
                if (data?.response) {
                    console.log(`Response: ${data.response}`);
                    dispatch(addRequest([
                        {
                            query: data.data,
                            response: data.response,
                            id: `${queries.length + 1}`
                        }
                    ]));
                } else {
                    console.warn("Received data is missing response:", data);
                }
            });
        }

        // Clean up when the component unmounts
        return () => {
            console.log(`Removing listener for event: ${event}`);
            socket.off(event); // Remove listener for the event
            socket.off("connect", handleConnection);
            socket.off("connect_error", handleReconnection);
        };
    }, [event, dispatch, socket, queries, socketConnected]); 
};

export default useSocketEvents;
