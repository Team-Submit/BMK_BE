import { configDotenv } from 'dotenv'
import express, { Application, Request, Response } from 'express'
import { AppDataSoure } from './models/dataSource';
import cors from 'cors';
import router from './router/index';

configDotenv();
const app: Application = express();
const port: number = Number(process.env.PORT) || 8000;

AppDataSoure.initialize()
    .then(() => { console.log(`DB has initted`) })
    .catch((err) => { console.error(err) });

app.use(cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', router);

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})