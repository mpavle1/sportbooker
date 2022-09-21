import axios from "axios";

export const GET_ALL_SPORT_CENTERS = 'GET_ALL_SPORT_CENTERS';
export const GET_ALL_SPORT_CENTERS_SUCCESS = 'GET_ALL_SPORT_CENTERS_SUCCESS';
export const GET_ALL_SPORT_CENTERS_FAIL = 'GET_ALL_SPORT_CENTERS_FAIL';

export const getAllSportCenters = () => dispatch => {
    dispatch({ type: GET_ALL_SPORT_CENTERS });
    axios
        .get("/api/sportCenters")
        .then(res => {
            dispatch({
                type: GET_ALL_SPORT_CENTERS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_SPORT_CENTERS_FAIL
            })
        });
}
