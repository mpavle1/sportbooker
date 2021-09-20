import {
    GET_ALL_LOCATIONS,
    GET_ALL_LOCATIONS_SUCCESS,
    GET_ALL_LOCATIONS_FAIL,
    ADD_LOCATION,
    ADD_LOCATION_SUCCESS,
    ADD_LOCATION_FAIL,
    DELETE_LOCATION,
    DELETE_LOCATION_SUCCESS,
    DELETE_LOCATION_FAIL
} from "../actions/locations";


const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS_SUCCESS:
            return [...action.payload];
        case ADD_LOCATION_SUCCESS:
            return [...state, action.payload];
        case DELETE_LOCATION_SUCCESS:
            return [...state.filter((location) => location.name !== action.payload)];
        case GET_ALL_LOCATIONS:
        case ADD_LOCATION:
        case DELETE_LOCATION:
        case GET_ALL_LOCATIONS_FAIL:
        case ADD_LOCATION_FAIL:
        case DELETE_LOCATION_FAIL:
        default:
            return state;
    }
};
