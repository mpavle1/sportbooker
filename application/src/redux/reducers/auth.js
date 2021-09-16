import {
    SET_CURRENT_USER,
    USER_LOADING,
    SET_CURRENT_SPORT_CENTER
} from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false,
    sportCenter: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                loading: false,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case SET_CURRENT_SPORT_CENTER:
            return {
                ...state,
                loading: false,
                sportCenter: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
};
