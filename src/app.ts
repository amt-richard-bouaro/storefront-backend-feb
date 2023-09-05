import express from 'express';

import swaggerDocs from './services/documentation/swagger'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { SERVER_CONFIG } from './config/main';

import dotenv from 'dotenv'
dotenv.config()

const app = express();

const PORT:number = SERVER_CONFIG.PORT as number;

app.use(cors({
    origin: SERVER_CONFIG.CLIENT_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    return res.redirect('/api/v1/docs');
});




swaggerDocs(app, PORT)

app.listen(PORT, () => {
    console.log('app listening on port ' + PORT);
    
})