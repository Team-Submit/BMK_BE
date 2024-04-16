import { configDotenv } from 'dotenv'
import express, { Application, Request, Response } from 'express'
import { AppDataSoure } from './models/dataSource';
import cors from 'cors';
import router from './router/index';
import redisCli from '../redis';

configDotenv();
const app: Application = express();
const port: number = Number(process.env.PORT) || 8000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// db설정
AppDataSoure.initialize()
    .then(() => { console.log(`DB has initted`) })
    .catch((err) => { console.error(err) });

// cors 설정
app.use(cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true
}))

// 기본 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', router);

// redis 설정

app.listen(port, async () => {
    await redisCli.connect()
    console.log(`App is listening on port ${port} !`)
})

// socket 설정

io.on('connection', (socket) => {
    console.log('새로운 사용자가 연결되었습니다.');
});