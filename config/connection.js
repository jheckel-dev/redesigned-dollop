const Sequelize = require('sequelize');

require('dotenv').config();


// dont forget to add info for heroku deployment
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3001
});

module.exports = sequelize