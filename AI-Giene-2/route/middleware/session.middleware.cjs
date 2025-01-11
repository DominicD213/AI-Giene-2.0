const session =  require('express-session');
const crypto = require('crypto');
const MongoStore = require('connect-mongo');
const {dbURI} = require('../configs/config.cjs')

const secretKey = crypto.randomBytes(32).toString('hex');

const mongoUrl = dbURI;

console.log('Mongo URL:', mongoUrl);

const sessionMiddleware = session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        collectionName: 'sessions',
        ttl: 14 * 24 * 60 * 60
    }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
    }
})

module.exports = sessionMiddleware;