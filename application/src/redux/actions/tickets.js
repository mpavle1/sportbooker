import axios from "axios";

export const GET_ALL_TICKETS = 'GET_ALL_TICKETS';
export const GET_ALL_TICKETS_SUCCESS = 'GET_ALL_TICKETS_SUCCESS';
export const GET_ALL_TICKETS_FAIL = 'GET_ALL_TICKETS_FAIL';

export const GET_ALL_USER_TICKETS = 'GET_ALL_USER_TICKETS';
export const GET_ALL_USER_TICKETS_SUCCESS = 'GET_ALL_USER_TICKETS_SUCCESS';
export const GET_ALL_USER_TICKETS_FAIL = 'GET_ALL_USER_TICKETS_FAIL';

export const GET_ALL_EVENT_TICKETS = 'GET_ALL_EVENT_TICKETS';
export const GET_ALL_EVENT_TICKETS_SUCCESS = 'GET_ALL_EVENT_TICKETS_SUCCESS';
export const GET_ALL_EVENT_TICKETS_FAIL = 'GET_ALL_EVENT_TICKETS_FAIL';


export const getAllTicket = () => dispatch => {
    dispatch({ type: GET_ALL_TICKETS });
    axios
        .get("/api/ticket")
        .then(res => {
            dispatch({
                type: GET_ALL_TICKETS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_TICKETS_FAIL
            })
        });
}

export const getAllUserTicket = (userId) => dispatch => {
    dispatch({ type: GET_ALL_USER_TICKETS });
    axios
        .get(`/api/ticket/user/${userId}`)
        .then(res => {
            dispatch({
                type: GET_ALL_USER_TICKETS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_USER_TICKETS_FAIL
            })
        });
}


export const getAllEventTicket = (eventId) => dispatch => {
    dispatch({ type: GET_ALL_EVENT_TICKETS });
    axios
        .get(`/api/event/${eventId}`)
        .then(res => {
            dispatch({
                type: GET_ALL_EVENT_TICKETS_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_EVENT_TICKETS_FAIL
            })
        });
}