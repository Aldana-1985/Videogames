const { Router } = require('express');
const { getGames } = require('../../controllers/videogamesController');

const api = Router()

api.get('/', getGames);



module.exports = api;