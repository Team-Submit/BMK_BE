import { configDotenv } from "dotenv";
import { DataSource } from "typeorm";
import "reflect-metadata"
import User from "./user.entity";
import ChatRooms from "./chatRoom.entity";
import ChatMessages from "./chatMessages.entity";
import Used from "./usedEntity";
import Email from "./email.entity";
import Group from "./group.entity";


configDotenv();

export const AppDataSoure = new DataSource({
    type: "mysql",
    host: process.env.HOST,
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    database: process.env.NAME,
    password: process.env.PASSWORD,
    synchronize: true,
    logging: false,
    migrations: [],
    entities: [User, Email, Group, Used, ChatRooms, ChatMessages],
    subscribers: [],
});

//.env 작성법

// 1. .env파일을 만든다.
// 2. 아래와 같은 형식으로 변수들을 작성한다. 이 때 값들은 미리 만들어둔 db에 대한 정보를 적는다.
// HOST = '127.0.0.1'
// USERNAME = 'qwer'
// PASSWORD = '0000'
// NAME = 'bmk_db'
// PORT = 1234

