import { GET_GAMEBYNAME, GET_GAMES, GET_GENRES, GET_FILTERED_GAMES, CREATE_GAMES, CURRENT_GAME } from "../actions/index";

const initialState = {
    games: {},
    genres: [],
    newGame: {},
    currentGame: {}
};

const rootReducer = (state = initialState, action) =>{
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload
            }; 
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            };
        case GET_GAMEBYNAME:
            return {
                ...state,
                games: action.payload
            };    
        case GET_FILTERED_GAMES: 
            return {
                ...state,
                games: action.payload
            }
        case CREATE_GAMES:
            return {
                ...state,
                newGame: action.payload
            }
        case CURRENT_GAME:
            return {
                ...state,
                currentGame: action.payload
            }

    
        default:
            return {...state};
    };
};


export default rootReducer;