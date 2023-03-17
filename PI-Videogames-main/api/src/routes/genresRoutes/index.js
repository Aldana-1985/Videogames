const { Router } = require('express');
const { getGenres } = require('../../controllers/genresController');

const api = Router()

api.get('/', getGenres);



module.exports = api;