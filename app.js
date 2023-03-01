const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
// const fetch = require('node-fetch');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World!'));

module.exports = app;