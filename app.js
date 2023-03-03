const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000
// const fetch = require('node-fetch');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var joke = {}

const getData = async () => {
    const res = await fetch('https://v2.jokeapi.dev/joke/Any');
    joke = res.json();
}

app.get('/', (req, res) => {
    getData();
    res.send(joke);
});

module.exports = app;
