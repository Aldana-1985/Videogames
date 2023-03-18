const { Router } = require('express');
const { getGames, createGame, getGamesId, getGamesByName } = require('../../controllers/videogamesController');

const api = Router()

api.get('/', getGames);
api.post('/', createGame);
api.get('/name', getGamesByName);
api.get('/:id', getGamesId);



module.exports = api;