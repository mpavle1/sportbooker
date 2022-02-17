import {
  GET_ALL_EVENTS_FOR_USER,
  GET_ALL_EVENTS_FOR_USER_SUCCESS,
  GET_ALL_EVENTS_FOR_USER_FAIL,
  ADD_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  TOGGLE_ACTIVATED,
  TOGGLE_ACTIVATED_SUCCESS,
  TOGGLE_ACTIVATED_FAIL,
} from "../actions/events";

const initialState = {
  user: [],
  all: [],
  search: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS_FOR_USER_SUCCESS:
      return {
        user: [...action.payload],
        all: [...state.all],
      };
    case ADD_EVENT_SUCCESS:
      return {
        user: [...state.user, action.payload],
        all: [...state.all],
      };
    case TOGGLE_ACTIVATED_SUCCESS:
      const newState = state.user.filter(
        (event) => event._id !== action.payload._id
      );
      return {
        user: [...newState, action.payload],
        all: [...state.all],
      };
    case ADD_EVENT:
    case ADD_EVENT_FAIL:
    case TOGGLE_ACTIVATED:
    case TOGGLE_ACTIVATED_FAIL:
    case GET_ALL_EVENTS_FOR_USER:
    case GET_ALL_EVENTS_FOR_USER_FAIL:
    default:
      return state;
  }
}
