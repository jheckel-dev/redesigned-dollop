const express = require('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;

sequelize.sync ({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3001!'));
})