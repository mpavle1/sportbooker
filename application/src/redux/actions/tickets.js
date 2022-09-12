import axios from "axios";

export const GET_ALL_TICKETS = "GET_ALL_TICKETS";
export const GET_ALL_TICKETS_SUCCESS = "GET_ALL_TICKETS_SUCCESS";
export const GET_ALL_TICKETS_FAIL = "GET_ALL_TICKETS_FAIL";

export const GET_ALL_USER_TICKETS = "GET_ALL_USER_TICKETS";
export const GET_ALL_USER_TICKETS_SUCCESS = "GET_ALL_USER_TICKETS_SUCCESS";
export const GET_ALL_USER_TICKETS_FAIL = "GET_ALL_USER_TICKETS_FAIL";

export const GET_ALL_EVENT_TICKETS = "GET_ALL_EVENT_TICKETS";
export const GET_ALL_EVENT_TICKETS_SUCCESS = "GET_ALL_EVENT_TICKETS_SUCCESS";
export const GET_ALL_EVENT_TICKETS_FAIL = "GET_ALL_EVENT_TICKETS_FAIL";

export const ADD_TICKET = "ADD_TICKET";
export const ADD_TICKET_SUCCESS = "ADD_TICKET_SUCCESS";
export const ADD_TICKET_FAIL = "ADD_TICKET_FAIL";

export const CANCEL_TICKET = "CANCEL_TICKET";
export const CANCEL_TICKET_SUCCESS = "CANCEL_TICKET_SUCCESS";
export const CANCEL_TICKET_FAIL = "CANCEL_TICKET_FAIL";

export const getAllTickets = () => (dispatch) => {
  dispatch({ type: GET_ALL_TICKETS });
  axios
    .get("/api/tickets")
    .then((res) => {
      dispatch({
        type: GET_ALL_TICKETS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_TICKETS_FAIL,
      });
    });
};

export const getAllUserTickets = (userId) => (dispatch) => {
  dispatch({ type: GET_ALL_USER_TICKETS });
  axios
    .get(`/api/tickets/user/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_USER_TICKETS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_USER_TICKETS_FAIL,
      });
    });
};

export const getAllEventTickets = (eventId) => (dispatch) => {
  dispatch({ type: GET_ALL_EVENT_TICKETS });
  axios
    .get(`/api/tickets/event/${eventId}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_EVENT_TICKETS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ALL_EVENT_TICKETS_FAIL,
      });
    });
};

export const bookATicket = (postData) => (dispatch) => {
  dispatch({ type: ADD_TICKET });
  return axios
    .post(`api/tickets`, postData)
    .then((res) => {
      dispatch({
        type: ADD_TICKET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_TICKET_FAIL,
      });
    });
};

export const cancelATicket = (ticketId) => (dispatch) => {
  console.log({ action: ticketId });
  dispatch({ type: CANCEL_TICKET });
  return axios
    .post(`api/tickets/cancel`, { data: { ticketId } })
    .then((res) => {
      dispatch({
        type: CANCEL_TICKET_SUCCESS,
        payload: ticketId,
      });
    })
    .catch((err) => {
      dispatch({
        type: CANCEL_TICKET_FAIL,
      });
    });
};
