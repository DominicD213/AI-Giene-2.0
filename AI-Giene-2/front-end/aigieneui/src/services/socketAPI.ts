import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const useSocketAPI = () => {
    if (!socket) {
        const apiUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:4000'; // API URL from environment variables
        if (!apiUrl) {
            console.error('API URL is missing in the configuration.');
            return null; // Early return if the URL is missing
        }

        console.log('Connecting to socket at:', apiUrl);

        socket = io(apiUrl, {
            transports: ['websocket'],
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
            console.log('Socket connected successfully:', socket?.id);
        });

        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err);
        });

        socket.on('reconnect_attempt', (attempt) => {
            console.log(`Reconnection attempt #${attempt}`);
        });

        socket.on('reconnect_failed', () => {
            console.error('Socket reconnection failed.');
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected.');
        });

        socket.connect();
    }

    return socket;
};

export default useSocketAPI;
