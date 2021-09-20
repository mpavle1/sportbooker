import {
    GET_ALL_SPORTS,
    GET_ALL_SPORTS_SUCCESS,
    GET_ALL_SPORTS_FAIL,
    ADD_SPORT,
    ADD_SPORT_SUCCESS,
    ADD_SPORT_FAIL,
    DELETE_SPORT,
    DELETE_SPORT_SUCCESS,
    DELETE_SPORT_FAIL
} from "../actions/sports";


const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SPORTS_SUCCESS:
            return [...action.payload];
        case ADD_SPORT_SUCCESS:
            return [...state, action.payload];
        case DELETE_SPORT_SUCCESS:
            return [...state.filter((sport) => sport.name !== action.payload)];
        case GET_ALL_SPORTS:
        case DELETE_SPORT:
        case ADD_SPORT:
        case GET_ALL_SPORTS_FAIL:
        case ADD_SPORT_FAIL:
        case DELETE_SPORT_FAIL:
        default:
            return state;
    }
};
