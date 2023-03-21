const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genres } = require('../db');



const getGames = async (req, res) => {

    const { order, ratingOrder, genres } = req.query;
    
    try {
        const allGames = [];       

        const dbGames = await Videogame.findAll({
            include: {
                model: Genres,
                where: genres ? { name: genres } : {} 
              }
        });
        allGames.push(...dbGames);
        
        for(let i = 1; i <= 5; i++){
            const { data } = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${i}&genres=${genres}`);
            allGames.push(...data.results);            
        };

        if(ratingOrder) {
            allGames.sort(function (a, b) {
                if (a.rating > b.rating) {
                    if(ratingOrder === "desc" ) {
                        return -1
                    }
                    return 1
                }
                if (a.rating < b.rating) {
                    if(ratingOrder === "desc") {
                        return 1
                    }
                    return -1
                }
                return 0;
            });
        } else if(order) {
            allGames.sort(function (a, b) {
                if (a.name > b.name) {
                    if(order === "desc" ) {
                        return -1
                    }
                    return 1
                }
                if (a.name < b.name) {
                    if(order === "desc") {
                        return 1
                    }
                    return -1
                }
                return 0;
            });
        };

        // if (dbGames.length > 0) {
        //     const filteredGames = allGames.filter((game) => {
        //       return dbGames.some((dbGame) => dbGame.id === game.id);
        //     });
        //     res.status(200).send(filteredGames);
        // } else {
        //     res.status(200).send(allGames);
        // }

        res.status(200).send(allGames)

    } catch (error) {
        res.status(500).send({error})
    }    
};

const getGamesId = async (req, res) => {
    try {
        const { id } = req.params;
        
        if(id.length < 10) {
            const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`);
            return res.status(200).send(data);
        
        }else{
            const game = await Videogame.findByPk(id, { include: Genres });
            return res.status(200).send(game);
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el videojuego' });
    }
};

const getGamesByName = async (req, res) => {
    try {
        const name = req.query.name;

        const gameDb = await Videogame.findAll({
            where: {
              name: {
                [Op.iLike]: `%${name}%`
              }
            },
            include: Genres,
            limit: 15
        });

        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${name}`);
        
        const gamesFromAPI = data.results.slice(0, 15 - gameDb.length);

        const allGamesByName = [...gameDb, ...gamesFromAPI];
        
        if(allGamesByName.length){
            res.status(200).json(allGamesByName);
        }else{
            res.status(404).send('No se encontraron videojuegos con ese nombre');
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el videojuego' });
    }
};

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

       const response = await Videogame.findByPk(newGame.id, {
        include: { model: Genres, attributes: ['name'] },
       });

        res.status(200).send(response)
        
    } catch (error) {
        res.status(404).send({error})
    }
};

module.exports = {
    getGames,
    getGamesId,
    getGamesByName,
    createGame,
}