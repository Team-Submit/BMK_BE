import express, { json } from "express";
import cors from "cors";
import sequelize from "./config/index.js";

const app = express();
const host = 'localhost';
const port = 8000;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, host, () => {
    console.log(`Server Listening on ${host}:${port}`);
    sequelize.sync()
        .then(() => {
            console.log("Database synced successfully");
        })
        .catch((err) => {
            console.error("Error syncing database:", err);
        });
});