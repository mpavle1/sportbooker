import {
  GET_ALL_USERS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_SUCCESS,
} from "../actions/users";

const initialState = {
  users: [],
  isInitialized: false,
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS_SUCCESS:
      return {
        users: [...state.users, ...action.payload],
        isInitialized: true,
        isLoading: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        isInitialized: false,
        isLoading: true,
      };
    case GET_ALL_USERS_FAIL:
      return {
        ...state,
        isInitialized: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
