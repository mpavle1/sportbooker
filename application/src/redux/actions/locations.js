import axios from "axios";

export const GET_ALL_LOCATIONS = 'GET_ALL_LOCATIONS';
export const GET_ALL_LOCATIONS_SUCCESS = 'GET_ALL_LOCATIONS_SUCCESS';
export const GET_ALL_LOCATIONS_FAIL = 'GET_ALL_LOCATIONS_FAIL';

export const ADD_LOCATION = 'ADD_LOCATION';
export const ADD_LOCATION_SUCCESS = 'ADD_LOCATION_SUCCESS';
export const ADD_LOCATION_FAIL = 'ADD_LOCATION_FAIL';

export const DELETE_LOCATION = 'DELETE_LOCATION';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_FAIL = 'DELETE_LOCATION_FAIL';

export const getAllLocations = () => dispatch => {
    dispatch({ type: GET_ALL_LOCATIONS });
    axios
        .get("/api/locations")
        .then(res => {
            dispatch({
                type: GET_ALL_LOCATIONS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_LOCATIONS_FAIL
            })
        });
}

export const addLocation = (location) => dispatch => {
    dispatch({ type: ADD_LOCATION });
    axios
        .post("/api/locations", { location })
        .then(res => {
            dispatch({
                type: ADD_LOCATION_SUCCESS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: ADD_LOCATION_FAIL,
                payload: err.message
            })
        );
}

export const deleteLocation = (location) => dispatch => {
    dispatch({ type: DELETE_LOCATION });
    axios
        .delete("/api/locations", { data: { location } })
        .then(res => {
            dispatch({
                type: DELETE_LOCATION_SUCCESS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: DELETE_LOCATION_FAIL,
                payload: err.message
            })
        );
}
