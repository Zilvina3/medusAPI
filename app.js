const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require("dotenv").config();

// const { port, dbConfig } = require('./config.js');
const port = process.env.PORT

const app = express();
app.use(express.json());

app.use(cors());

const db = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

app.get('/', (req, res) => {
    res.send({ message: 'Online' });
});

app.get('/atsiliepimai', async (req, res) => {
    try {
        const con = await mysql.createConnection(db);
        const [response] = await con.query(`SELECT * FROM atsiliepimai`)
        con.end();
        res.send(response);
        console.log(response)
    } catch (error) {
        res.status(500).send({ error: error })
        console.log(error)
    }
})

app.post('/prideti', async (req, res) => {
    let komentaras  = req.body
        console.log(komentaras)
    try {
        const con = await mysql.createConnection(db);
        const [response] = await con.query
        (`INSERT INTO atsiliepimai (vardas, komentaras) VALUES ("${komentaras.vardas}", "${komentaras.atsiliepimas}")`);
        con.end();
        res.send(response);
    } catch (error) {
        console.log(error)
        res.status(500).send({ error: error });
    };
});

app.listen(port, () => {
    console.log(`Listening... on ${port}`)
})
