import instance from "../../config/config";

export const GET_GAMES = "GET_GAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_GAMEBYNAME = "GET_GAMEBYNAME";
export const GET_FILTERED_GAMES = "GET_FILTERED_GAMES";
export const CREATE_GAMES = "CREATE_GAMES";
export const CURRENT_GAME = "CURRENT_GAME"



export const getGames = ({ page=1 }) => {
    return async function (dispatch){
        try {
            const { data } = await instance.get('/videogames', {
                params: {
                    page
                }
            });
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

export const getFilteredGames = ({ genres, origin, order, ratingOrder }) => {
    return async function(dispatch) {
        try {
            const { data } = await instance.get("/videogames", {
                params: {
                    genres,
                    origin,
                    order,
                    ratingOrder
                }
            })
            return dispatch({
                type: GET_FILTERED_GAMES,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const createGames = (game) => {
    return async function(dispatch){
        try {
            const { data } = await instance.post("/videogames", game)
            return dispatch({
                type: CREATE_GAMES,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const getCurrentGame = (id) => {
    return async function(dispatch){
        try {
            const { data } = await instance.get(`/videogames/${id}`)
            return dispatch({
                type: CURRENT_GAME,
                payload: data
            })
        } catch (error) {
            console.log(error);
        }
    }
}


