import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import 'reflect-metadata';
import cors from 'cors';
import mongoose from 'mongoose';

import './services/helpers/Secrets'
import { errorHandler } from './middlewares/ErrorHandler';
import { jitoRouter } from './routes/v1/Jito';
import { JitoManager } from './services/jito/JitoManager';
import { pingRouter } from './routes/v1/Ping';

const app = express();
app.use(json());
app.use(cors());
app.use(jitoRouter);
app.use(pingRouter);

app.use(errorHandler);

const start = async () => {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URL!);
    console.log(new Date(), 'Connected to mongodb!');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
    
        JitoManager.initSearcherClient();
        console.log(`Listening on port ${port}.`);
    });
}

start();