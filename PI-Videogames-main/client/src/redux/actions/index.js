import instance from "../../config/config";

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_GAMEBYNAME = "GET_GAMEBYNAME";

export const getGames = () => {
    return async function (dispatch){
        try {
            const { data } = await instance.get('/videogames');
            return dispatch({
                type: GET_GAMES,
                payload: data
            });            
        } catch (error) {
            console.log(error);
        };
    };
};

export const getGenres = () => {
    return async function (dispatch){
        try {
            const { data } = await instance.get('/genres');
            return dispatch({
                type: GET_GENRES,
                payload: data
            });            
        } catch (error) {
          console.log(error);  
        };
    };
};

export const getGameByName = (name) => {
    return async function (dispatch){
        try {
            const { data } = await instance.get('/videogames/name', {
                params: {
                    name
                }
            });
            const payload = {
                currentPage: 1,
                totalGames: 15,
                totalPages: 1,
                games: data
            }
            return dispatch({
                type: GET_GAMEBYNAME,
                payload
            });
        } catch (error) {
            console.log(error);
        };
    };
};