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
  GET_ALL_EVENTS,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAIL,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
} from "../actions/events";

const initialState = {
  user: [],
  all: [],
  search: null,
  isLoading: false,
  isInitialized: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS_FOR_USER_SUCCESS:
      return {
        ...state,
        user: [...action.payload],
        all: [...state.all],
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        user: [...state.user, action.payload],
        all: [...state.all],
      };
    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
        user: [...state.user],
        all: [...action.payload],
      };
    case UPDATE_EVENT_SUCCESS:
    case TOGGLE_ACTIVATED_SUCCESS:
      const newState = state.user.filter(
        (event) => event._id !== action.payload._id
      );
      return {
        ...state,
        user: [...newState, action.payload],
        all: [...state.all],
      };
    case GET_ALL_EVENTS_FOR_USER:
    case GET_ALL_EVENTS:
      return {
        ...state,
        isInitialized: false,
        isLoading: true,
      };
    case GET_ALL_EVENTS_FOR_USER_FAIL:
    case GET_ALL_EVENTS_FAIL:
      return {
        ...state,
        isInitialized: true,
        isLoading: false,
      };
    case ADD_EVENT:
    case ADD_EVENT_FAIL:
    case TOGGLE_ACTIVATED:
    case TOGGLE_ACTIVATED_FAIL:
    case UPDATE_EVENT_FAIL:
    case UPDATE_EVENT:
    default:
      return state;
  }
}
