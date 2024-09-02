import express from 'express';
import { Request, Response, NextFunction } from "express";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import homeRoute from "./routes/home.route"

//Adding Routes layouts

// import router from './routes';
import dotenv from 'dotenv'; // <--- (1)

// Create Express server
const app = express(); // New express instance

// Initialize configuration
dotenv.config();

// Create Express server
const port = process.env['APP_PORT'] || 3000; // Port number // <--- (3)
const env = process.env['APP_ENV'] || 'dev'; // Environment // <--- (4)

// Express configuration
app.use(express.static('doc'));
app.use(cors()); // Enable CORS
app.use(helmet()); // Enable Helmet
app.use(morgan('dev')); // Enable Morgan
app.use(helmet());
app.use(bodyParser.json());

//Calling your Routes Layout
app.use('/api/v1', homeRoute);


//Implementation of CORS middleware
app.use(function (req, res, next) {
    console.log('CORS middleware');
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// 500 internal server error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode === 404) return next();
    res.status(500).json({
        // Never leak the stack trace of the err if running in production mode
        err: process.env.NODE_ENV === "production" ? null : err,
        msg: "500 Internal Server Error",
        data: null,
    });
});

// 404 error handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        err: null,
        msg: "404 Not Found",
        data: null,
    });
});

// Export Express app
export default app;