import axios from "axios";

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";

export const getGames = () => {
    return async function (dispatch){
        const { data } = await axios.get('http://localhost:3001/api/videogames');
        return dispatch({
            type: GET_GAMES,
            payload: data
        });
    };
};

export const getGenres = () => {
    return async function (dispatch){
        const { data } = await axios.get('http://localhost:3001/api/genres');
        return dispatch({
            type: GET_GENRES,
            payload: data
        });
    };
};