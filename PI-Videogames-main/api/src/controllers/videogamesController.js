const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame } = require('../db');



const getGames = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`);
        const apiGames = data.results;
        const dbGames = await Videogame.findAll();
        res.status(200).send(dbGames)
    } catch (error) {
        res.status(404).send({error})
    }
    
}

const createGame = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(404).send({error})
    }
}

module.exports = {
    getGames,
}