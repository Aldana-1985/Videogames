const axios = require('axios');
const {API_KEY} = process.env;
const { Genres } = require('../db');

const getGenres = async (req, res) => {
    try {
        const dbGenres = await Genres.findAll();
        if(!dbGenres.length) {
            const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`);
            const apiGenres = data.results.map(({ id, name }) => ({ id, name}));
            const createdGenres = await Genres.bulkCreate(apiGenres)
            return res.status(200).send(createdGenres)
        }
        res.status(200).send(dbGenres)
    } catch (error) {
        res.status(404).send({error})
    }
}


module.exports = {
    getGenres
}


