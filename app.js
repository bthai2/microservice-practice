const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

// const data = require('./data.json');
const fetch = require('node-fetch');
// import fetch from 'node-fetch';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var data = {};

var checkData = false;

const url = 'https://www.pollen.com/api/forecast/current/pollen/20111';

const getData = async () => {
    if(!checkData) {
        const res = await fetch(url, {
            headers: { 'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept': 'application/json, text/plain, */*',
            'Referer': url}
        });
        // const res = await fetch('./data.json');
        data = await res.json();
        console.log(data)
    }
}

getData().then(() => {
    checkData = true;
}).catch(error => {
    console.log(error);
})


// const user_agent = 
//     'Mozilla/5.0 (X11; Linux x86_64)'

// fetch(url, {
//     headers: { 'Accept-Encoding': 'gzip, deflate, br',
//     'Accept-Language': 'en-US,en;q=0.9',
//     'Accept': 'application/json, text/plain, */*',
//     'Referer': url}
// }).then(res => res.json()).then(console.log(res))

// function to extract info needed from whole dataset
function cleanData() {
    let xs = {'name': data.name, 'id': data.id, 'height': data.height};
    xs.abilities = [];
    xs.hidden_abilities = [];
    xs.held_items = [];
    xs.moves = [];
    xs.types = [];

    for(let i of data.abilities){
        let abilityData = {'name': i.ability.name, 'url': i.ability.url};
        if(i.is_hidden){
            xs.hidden_abilities.push(abilityData)
        } else {
            xs.abilities.push(abilityData)
        }
    }

    for(let i of data.held_items) {
        xs.held_items.push(i.item);
    }

    for(let i of data.moves) {
        xs.moves.push(i.move);
    }

    for(let i of data.stats) {
        xs[i.stat.name] = i.base_stat;
    }

    for(let i of data.types) {
        xs.types.push(i.type.name);
    }
    console.log(data)
    return xs;
}

app.get('/', (req, res) => {
    res.send('Hello');
    // res.send(data);
});

app.get('/data/:id', (req, res) => {
    //checkData
})

module.exports = app;

// maybe location_area_encounters

// moves

// stats

// types