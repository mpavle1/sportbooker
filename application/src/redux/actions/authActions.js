import axios from "axios";
import jwt_decode from "jwt-decode";

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    USER_LOADING,
    SET_CURRENT_SPORT_CENTER
} from "./types";

import setAuthToken from "../../utils/auth/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/register", userData)
        .then(res => {
            history.push("/home");
        }) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded.user));
            if (decoded.user.type === 'sportCenter') {
                dispatch(setCurrentSportCenter(decoded.sportCenter));
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    dispatch(setCurrentUser({}));
    dispatch(setCurrentSportCenter({}));
};

export const setCurrentSportCenter = (decoded) => {
    return {
        type: SET_CURRENT_SPORT_CENTER,
        payload: decoded
    };
}


export const updateSportCenterProfile = (data) => dispatch => {
    axios
    .patch("/api/users/", data)
    .then(res => {
        dispatch(setCurrentUser(res.user));
        dispatch(setCurrentSportCenter(res.sportCenter));
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
}