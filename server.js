const express = require ('express');
const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require ('./config/connection');
const routes = require ('./controllers');
const helpers = require('./utils/helpers');
const path = require ('path');
const session = require ('express-session');

const SequelizeStore = require('connect-session-sequelize') (session.Store);

const sess = {
    secret: 'puppy breath',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
        checkExpirationInterval: 15 * 60 * 1000,
        expirations: 24 * 60 * 60 * 1000
    })
};


const app = express();
const PORT = process.env.PORT || 3001;


app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync ({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening on port 3001!'));
})