const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3000

// const data = require('./data.json');
// const fetch = require('node-fetch');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

var data = {};

var checkData = false;

const getData = async () => {
    if(!checkData) {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon/35/');
        // const res = await fetch('./data.json');
        data = await res.json();
    }
}

getData().then(() => {
    checkData = true;
}).catch(error => {
    console.log(error);
})

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
    res.send(cleanData());
    // res.send(data);
});

module.exports = app;

// maybe location_area_encounters

// moves

// stats

// types

