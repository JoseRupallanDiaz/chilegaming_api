import express from 'express';
import {PORT} from './src/config/enviorment.js';
import mongoStart from './src/config/mongo.js';
import userRouter from './src/routes/user.router.js';

const app = express();

app.use(express.json());

app.use('/auth', userRouter);

async function startServer() {
    console.log("Initializing server...");
    const isConnected = await mongoStart();
    if (isConnected) {
        registerModels();
        app.listen(PORT, () => {
            console.log("Server started. Listening to port "+PORT+".");
        });
    } else {
        console.log("Failed to start server.");
        process.exit();
    }
}

async function registerModels() {
    await import ('./src/models/category.model.js');
    await import ('./src/models/news.model.js');
    await import ('./src/models/user.model.js');
}

startServer();