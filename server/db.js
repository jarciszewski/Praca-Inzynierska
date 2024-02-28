const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_HOST,
    process.env.DB_PASS,
    {
        // host: 'mysql',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize.sync().then(() => {
    console.log('Success!');
}).catch((error) => {
    console.error('Something went wrong: ', error);
});

module.exports = { sequelize, Sequelize }