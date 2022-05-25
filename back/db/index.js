const mysql = require("mysql");
const util = require("util");

require("dotenv").config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306,
});

const query = util.promisify(connection.query).bind(connection);

connection.connect((err) => {
    if (err) {
        console.log(`Erreur de connexion : ${err}`);
    } else {
        console.log(`Connecté à la base de donnée - ${process.env.DB_NAME}`);
    }
});

module.exports = { query };