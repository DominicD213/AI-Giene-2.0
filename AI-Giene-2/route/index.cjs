const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const { GridFSBucket } = require('mongodb');
const sessionMiddleware = require('./middleware/session.middleware.cjs');
const corsMiddleWare = require('./middleware/cors.middleware.cjs');
const fileUploadMiddleware = require('./middleware/fileUpload.middleware.cjs');
const {envPort, dbURI,origin} = require('./configs/config.cjs')

require('dotenv').config()

if (!dbURI || !origin) {
    console.error('Missing required environment variables');
    process.exit(1);
}

const app = express();
const server = http.createServer(app);

const initSocket = require('./socket/socket.config.cjs');
const io = initSocket;

app.use(sessionMiddleware);
app.use(corsMiddleWare);
app.use(fileUploadMiddleware);

// Parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Pass io and upload to the routes
const routes = require('./routes/routes.cjs')(io, fileUploadMiddleware);
app.use('/', routes);

// Connect to MongoDB
mongoose.connect(dbURI)
    .then((conn) => {
        console.log('DB Connected');
        global.gfs = new GridFSBucket(conn.connection.db, {
            bucketName: 'images'
        });
        console.log('MongoDB connected and GridFS initialized');
    })
    .catch((err) => console.error(`DB Connection Error: ${err}`));

mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
mongoose.connection.on('error', (err) => console.log(`Mongoose connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected from DB'));

const port = envPort || 4000;
server.listen(port, () => console.log(`Server is active on port ${port}`));

