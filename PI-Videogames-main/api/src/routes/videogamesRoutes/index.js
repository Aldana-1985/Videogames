const { Router } = require('express');
const { getGames, createGame, getGamesId, getGamesByName } = require('../../controllers/videogamesController');

const api = Router()

api.get('/', getGames);
api.post('/', createGame);
api.get('/videogames/:id', getGamesId);
api.get('/videogames/name', getGamesByName);



module.exports = api;