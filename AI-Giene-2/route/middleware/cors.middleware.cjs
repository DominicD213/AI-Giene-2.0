const cors = require('cors');
const { origin } = require('../configs/config.cjs');

const corsMiddlewareFunction = (req, res, next) => {
    try {
        // Express CORS configuration
        const corsOptions = {
            origin: [origin, 'http://localhost:3000'],
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        };

        // Apply CORS middleware
        cors(corsOptions)(req, res, next);
    } catch (error) {
        console.error('CORS Middleware Error:', error);
        res.status(400).send('CORS Options Issue');
    }
};

module.exports = corsMiddlewareFunction;
