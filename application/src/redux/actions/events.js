import axios from "axios";

export const GET_ALL_EVENTS_FOR_USER = 'GET_ALL_EVENTS_FOR_USER';
export const GET_ALL_EVENTS_FOR_USER_SUCCESS = 'GET_ALL_EVENTS_FOR_USER_SUCCESS';
export const GET_ALL_EVENTS_FOR_USER_FAIL = 'GET_ALL_EVENTS_FOR_USER_FAIL';

export const ADD_EVENT = 'ADD_EVENT';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_EVENT_FAIL = 'ADD_EVENT_FAIL';

// export const ADD_SPORT = 'ADD_SPORT';
// export const ADD_SPORT_SUCCESS = 'ADD_SPORT_SUCCESS';
// export const ADD_SPORT_FAIL = 'ADD_SPORT_FAIL';

// export const DELETE_SPORT = 'DELETE_SPORT';
// export const DELETE_SPORT_SUCCESS = 'DELETE_SPORT_SUCCESS';
// export const DELETE_SPORT_FAIL = 'DELETE_SPORT_FAIL';

export const getAllEventsForUser = (sportCenter_id) => dispatch => {
    dispatch({ type: GET_ALL_EVENTS_FOR_USER });
    axios
        .get("/api/events/sportCenter", { sportCenter_id })
        .then(res => {
            dispatch({
                type: GET_ALL_EVENTS_FOR_USER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_EVENTS_FOR_USER_FAIL
            })
        });
}

export const addEvent = (event) => dispatch => {
    dispatch({ type: ADD_EVENT });
    axios
        .post("/api/events", { event })
        .then(res => {
            dispatch({
                type: ADD_EVENT_SUCCESS,
                payload: res.data
            });
        })
        .catch(err =>
            dispatch({
                type: ADD_EVENT_FAIL,
                payload: err.response.data
            })
        );
}

// export const deleteSport = (sport) => dispatch => {
//     dispatch({ type: DELETE_SPORT });
//     axios
//         .delete("/api/sports", { data: { sport } })
//         .then(res => {
//             dispatch({
//                 type: DELETE_SPORT_SUCCESS,
//                 payload: res.data
//             });
//         })
//         .catch(err =>
//             dispatch({
//                 type: DELETE_SPORT_FAIL,
//                 payload: err.response.data
//             })
//         );
// }
