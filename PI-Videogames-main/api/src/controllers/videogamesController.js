const axios = require('axios');
const {API_KEY} = process.env;
const { Videogame, Genres } = require('../db');



const getGames = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}`);
        const apiGames = data.results;
        const dbGames = await Videogame.findAll();

        const allGames = [...dbGames, ...apiGames];

        res.status(200).send(allGames)

    } catch (error) {
        res.status(500).send({error})
    }    
}

const getGamesId = async(req, res) => {
    try {
        const { id } = req.params;

        const game = await Videogame.findByPk(id, { include: Genres });

        if(!game){
            return res.status(404).json({ error: 'Videojuego no encontrado' });
        };

        return res.json({
            id: game.id,
            name: game.name,
            description: game.description,
            releaseDate: game.releaseDate,
            rating: game.rating,
            genre: {
              id: game.Genres.id,
              name: game.Genres.name,
            },
        });

    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el videojuego' });
    }
}

const getGamesByName = () => {}

const createGame = async (req, res) => {
    try {
        const { name, description, genresId, platforms, image, releaseDate, rating } = req.body;

        if(!name || !description || !genresId || !platforms || !image || !releaseDate || !rating){
            throw({message: 'Falta algun campo'})
        };

        const genres = await Genres.findAll({
            where: { id: genresId }
        });

        const newGame = await Videogame.create({
            name, 
            description, 
            platforms, 
            image, 
            releaseDate, 
            rating
        });
        
       await newGame.addGenres(genres);

        res.status(200).send(newGame)
        
    } catch (error) {
        res.status(404).send({error})
    }
}

module.exports = {
    getGames,
    getGamesId,
    getGamesByName,
    createGame,
}