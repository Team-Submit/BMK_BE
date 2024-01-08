import { configDotenv } from 'dotenv'
import express, { Application, Request, Response } from 'express'
import { AppDataSoure } from './models/dataSource';

configDotenv();
const app: Application = express();
const port: number = Number(process.env.PORT) || 8000;

AppDataSoure.initialize()
    .then(() => { console.log(`DB has initted`) })
    .catch((err) => { console.error(err) })

app.get('/toto', (req: Request, res: Response) => {
    res.send('Hello toto')
})

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})