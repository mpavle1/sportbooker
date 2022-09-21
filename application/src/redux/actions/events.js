import axios from "axios";

export const GET_ALL_EVENTS_FOR_USER = "GET_ALL_EVENTS_FOR_USER";
export const GET_ALL_EVENTS_FOR_USER_SUCCESS =
  "GET_ALL_EVENTS_FOR_USER_SUCCESS";
export const GET_ALL_EVENTS_FOR_USER_FAIL = "GET_ALL_EVENTS_FOR_USER_FAIL";

export const GET_ALL_EVENTS = "GET_ALL_EVENTS";
export const GET_ALL_EVENTS_SUCCESS = "GET_ALL_EVENTS_SUCCESS";
export const GET_ALL_EVENTS_FAIL = "GET_ALL_EVENTS_FAIL";

export const ADD_EVENT = "ADD_EVENT";
export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";
export const ADD_EVENT_FAIL = "ADD_EVENT_FAIL";

export const TOGGLE_ACTIVATED = "TOGGLE_ACTIVATED";
export const TOGGLE_ACTIVATED_SUCCESS = "TOGGLE_ACTIVATED_SUCCESS";
export const TOGGLE_ACTIVATED_FAIL = "TOGGLE_ACTIVATED_FAIL";

export const DELETE_EVENT = "DELETE_EVENT";
export const DELETE_EVENT_SUCCESS = "DELETE_EVENT_SUCCESS";
export const DELETE_EVENT_FAIL = "DELETE_EVENT_FAIL";

export const UPDATE_EVENT = "UPDATE_EVENT";
export const UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
export const UPDATE_EVENT_FAIL = "UPDATE_EVENT_FAIL";

export const getAllEventsForSportCenter = (sportCenterId) => (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_FOR_USER });
  axios
    .get(`/api/events/sportCenter/${sportCenterId}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_EVENTS_FOR_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_EVENTS_FOR_USER_FAIL,
      });
    });
};

export const getAllEvents = () => (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS });
  axios
    .get(`/api/events/`)
    .then((res) => {
      dispatch({
        type: GET_ALL_EVENTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_EVENTS_FAIL,
      });
    });
};

export const addEvent = (event) => (dispatch) => {
  dispatch({ type: ADD_EVENT });
  axios
    .post("/api/events", { event })
    .then((res) => {
      dispatch({
        type: ADD_EVENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: ADD_EVENT_FAIL,
      })
    );
};

export const toggleActivated =
  (eventId, active, setByAdmin = false) =>
  (dispatch) => {
    dispatch({ type: TOGGLE_ACTIVATED });
    return axios
      .patch("/api/events/toggleActivated", {
        eventId,
        newState: { active, setByAdmin },
      })
      .then((res) => {
        dispatch({
          type: TOGGLE_ACTIVATED_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) =>
        dispatch({
          type: TOGGLE_ACTIVATED_FAIL,
        })
      );
  };

export const updateEvent = (event) => (dispatch) => {
  dispatch({ type: UPDATE_EVENT });
  return axios
    .patch("/api/events/", {
      event,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_EVENT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: UPDATE_EVENT_FAIL,
      })
    );
};

export const deleteEvent = (eventId) => (dispatch) => {
  dispatch({ type: DELETE_EVENT });
  return axios
    .post(`api/events/delete`, { data: { eventId } })
    .then((res) => {
      dispatch({
        type: DELETE_EVENT_SUCCESS,
        payload: eventId,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_EVENT_FAIL,
      });
    });
};

export const getOtherEventsForSportCenter = (sportCenterId, eventId, limit) => {
  return axios.get(
    `api/events/otherEventsFromSc/${sportCenterId}/${eventId}/${limit}`
  );
};

export const getOtherEventsForLocation = (sportCenterId, locationId, limit) => {
  return axios.get(
    `api/events/otherEventsForLocation/${sportCenterId}/${locationId}/${limit}`
  );
};
