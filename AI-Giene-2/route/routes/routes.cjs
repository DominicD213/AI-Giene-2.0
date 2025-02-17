const express = require('express');
const {
    signup,
    login,
    sessionStatus,
    logout,
    recentHistory,
    longtermHistory,
    uploadRoute,
} = require('../controller/giene.controller.cjs');

const sessionMiddleware  = require('../middleware/session.middleware.cjs'); // named export

const createRouter = (io, fileUploadMiddleware) => {
    const router = express.Router();

    const authenticate = (req, res, next) => {
        if (!req.session.user) {
            return res.status(401).send('Unauthorized');
        }
        next();
    };

    // Signup route
    router.post('/signup', signup);

    // Login route (sessionMiddleware as a function)
    router.post('/login', sessionMiddleware, login);

    // Logout route
    router.post('/logout', logout);

    const sessionRouter = express.Router();

    sessionRouter.get('/session-status', sessionStatus);


    sessionRouter.get('/session-status/openAIResponse/recent-queries', authenticate, recentHistory);

    sessionRouter.get('/session-status/search/history', authenticate, longtermHistory);

    // File upload route with authentication and multer file upload middleware
    sessionRouter.post('/session-status/upload', authenticate, fileUploadMiddleware, uploadRoute);

    router.use('/login', sessionRouter);

    return router;
};

module.exports = createRouter;
