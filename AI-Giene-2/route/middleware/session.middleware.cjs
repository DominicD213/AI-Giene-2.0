const session = require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');
const { dbURI } = require('../configs/config.cjs');

// Generate a secure secret key for session
const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'); // Use an environment variable for better security

const mongoUrl = dbURI;
// console.log('Mongo URL:', mongoUrl);

// Configure session middleware
const sessionMiddleware = session({
    secret: secretKey,
    resave: false, // Don't resave the session if it hasn't changed
    saveUninitialized: false, // Don't save uninitialized sessions
    store: MongoStore.create({
        mongoUrl: mongoUrl, // MongoDB connection URI for storing sessions
        collectionName: 'sessions',
        maxAge: 86400000,
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        httpOnly: true, // Prevent JavaScript access to the cookie for better security
        sameSite: 'lax', // Lax for less restrictive SameSite policy (adjust as necessary)
        maxAge: 14 * 24 * 60 * 60 * 1000 // Ensure the session expires after 14 days
    }
});

module.exports = sessionMiddleware;
