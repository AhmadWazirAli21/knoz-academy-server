require('dotenv').config()
const monogoose = require('mongoose');
const db_uri = process.env.DB_URI

const connection = () => {
    monogoose.connect(db_uri);
    console.log('with db');
}

module.exports = connection