import Sequelize from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost:3306',
    username: '유저이름',
    password: '비번',
    database: '데이터베이스이름',
});

export default sequelize;