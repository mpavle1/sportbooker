import {
    GET_ALL_EVENTS_FOR_USER,
    GET_ALL_EVENTS_FOR_USER_SUCCESS,
    GET_ALL_EVENTS_FOR_USER_FAIL
} from "../actions/events";


const initialState = {
    user: [],
    all: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_EVENTS_FOR_USER_SUCCESS:
            return {
                user: [...action.payload],
                ...state
            };
        case GET_ALL_EVENTS_FOR_USER:
        case GET_ALL_EVENTS_FOR_USER_FAIL:
        default:
            return state;
    }
};
