import {
  GET_ALL_TICKETS_SUCCESS,
  GET_ALL_TICKETS_FAIL,
  GET_ALL_TICKETS,
  ADD_TICKET,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  // TOGGLE_ACTIVATED,
  // TOGGLE_ACTIVATED_SUCCESS,
  // TOGGLE_ACTIVATED_FAIL,
  GET_ALL_EVENT_TICKETS,
  GET_ALL_EVENT_TICKETS_FAIL,
  GET_ALL_EVENT_TICKETS_SUCCESS,
  GET_ALL_USER_TICKETS_SUCCESS,
  GET_ALL_USER_TICKETS,
  GET_ALL_USER_TICKETS_FAIL
} from "../actions/tickets";

const initialState = {
  user: [],
  all: [],
  event: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TICKETS_SUCCESS:
      return {
        user: [...state.user],
        all: [...action.payload],
        event: [...state.event],
      };
    case GET_ALL_EVENT_TICKETS_SUCCESS:
      return {
        user: [...state.user],
        all: [...state.all],
        event: [...action.payload],
      };
    case GET_ALL_USER_TICKETS_SUCCESS:
      return {
        user: [...action.payload],
        all: [...state.all],
        event: [...state.event],
      };
    case ADD_TICKET_SUCCESS:
      return {
        user: [...state.user, ...action.payload],
        all: [...state.all, ...action.payload],
        event: [...state.event, ...action.payload],
      };
    // case TOGGLE_ACTIVATED_SUCCESS:
    //   const newState = state.user.filter(
    //     (ticket) => ticket._id !== action.payload._id
    //   );
    //   return {
    //     user: [...newState, action.payload],
    //     all: [...state.all],
    //   };
    case ADD_TICKET:
    case ADD_TICKET_FAIL:
    case GET_ALL_EVENT_TICKETS:
    case GET_ALL_EVENT_TICKETS_FAIL:
    // case TOGGLE_ACTIVATED:
    // case TOGGLE_ACTIVATED_FAIL:
    case GET_ALL_USER_TICKETS:
    case GET_ALL_USER_TICKETS_FAIL:
    case GET_ALL_TICKETS:
    case GET_ALL_TICKETS_FAIL:
    default:
      return state;
  }
}
