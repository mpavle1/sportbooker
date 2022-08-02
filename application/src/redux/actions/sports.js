import axios from "axios";

export const GET_ALL_SPORTS = 'GET_ALL_SPORTS';
export const GET_ALL_SPORTS_SUCCESS = 'GET_ALL_SPORTS_SUCCESS';
export const GET_ALL_SPORTS_FAIL = 'GET_ALL_SPORTS_FAIL';

export const ADD_SPORT = 'ADD_SPORT';
export const ADD_SPORT_SUCCESS = 'ADD_SPORT_SUCCESS';
export const ADD_SPORT_FAIL = 'ADD_SPORT_FAIL';

export const DELETE_SPORT = 'DELETE_SPORT';
export const DELETE_SPORT_SUCCESS = 'DELETE_SPORT_SUCCESS';
export const DELETE_SPORT_FAIL = 'DELETE_SPORT_FAIL';

export const getAllSports = () => dispatch => {
    dispatch({ type: GET_ALL_SPORTS });
    axios
        .get("/api/sports")
        .then(res => {
            dispatch({
                type: GET_ALL_SPORTS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_SPORTS_FAIL
            })
        });
}

export const addSport = (sport) => dispatch => {
    dispatch({ type: ADD_SPORT });
    axios
        .post("/api/sports", { sport })
        .then(res => {
            dispatch({
                type: ADD_SPORT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: ADD_SPORT_FAIL,
                payload: err.message
            })
        );
}

export const deleteSport = (sport) => dispatch => {
    dispatch({ type: DELETE_SPORT });
    axios
        .delete("/api/sports", { data: { sport } })
        .then(res => {
            dispatch({
                type: DELETE_SPORT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DELETE_SPORT_FAIL,
                payload: err.message
            })
        );
}
