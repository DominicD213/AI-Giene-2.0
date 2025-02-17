const express = require('express');
const {
    signup,
    login,
    sessionStatus,
    logout,
    openAIResponse,
    recentHistory,
    longtermHistory,
    uploadRoute,  // Ensure this function handles the file upload logic
} = require('../controller/giene.controller.cjs'); // Adjust this path if necessary

const sessionMiddleware = require('../middleware/session.middleware.cjs');

const createRouter = (io, fileUploadMiddleware) => {
    const router = express.Router();

    // Middleware for authentication
    const authenticate = (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send('Unauthorized');
        }
        next();
    };

    // Signup route
    router.post('/signup', signup);

    // Login route
    router.post('/login', sessionMiddleware, login);

    // Logout route
    router.post('/logout', logout);

    // Session-related routes
    const sessionRouter = express.Router();
    
    // Session status route
    sessionRouter.get('/session-status', sessionStatus);

    // OpenAI response route with authentication
    sessionRouter.post('/session-status/openAIResponse', authenticate, openAIResponse(io));

    // Recent history route with authentication
    sessionRouter.get('/session-status/openAIResponse/recent-queries', authenticate, recentHistory);

    // Long-term history route with authentication
    sessionRouter.get('/session-status/search/history', authenticate, longtermHistory);

    // File upload route with authentication and multer file upload middleware
    sessionRouter.post('/session-status/upload', authenticate, fileUploadMiddleware, (req, res) => {
        // Call the uploadRoute function (ensure this handles the file correctly)
        uploadRoute(req, res);
    });
    
    // Mount session routes under /login
    router.use('/login', sessionRouter);

    return router;
};

module.exports = createRouter;
