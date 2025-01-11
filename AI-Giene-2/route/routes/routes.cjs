const express = require('express');

const {
    signup,
    login,
    sessionStatus,
    logout,
    openAIResponse,
    recentHistory,
    longtermHistory,
    uploadRoute,
} = require('../controller/giene.controller.cjs'); // Adjust this path if necessary

const createRouter = (io,fileUploadMiddleware) => {
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
    router.post('/login', login);

    // Logout route
    router.post('/logout', logout);

    // Session-related routes
    const sessionRouter = express.Router();
    sessionRouter.get('/session-status', sessionStatus);
    sessionRouter.post('/session-status/openAIResponse', authenticate, openAIResponse(io));
    sessionRouter.get('/session-status/openAIResponse/recent-queries', authenticate, recentHistory);
    sessionRouter.get('/session-status/search/history', authenticate, longtermHistory);
    sessionRouter.post('/session-status/upload', authenticate,fileUploadMiddleware, uploadRoute);

    // Mount session routes under /login
    router.use('/login', sessionRouter);

    return router;
};

module.exports = createRouter;
