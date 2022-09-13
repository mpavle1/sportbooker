import {
  GET_ALL_USERS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAIL,
  UPDATE_USER_SUCCESS,
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
        ...state,
        users: [...action.payload],
        isInitialized: true,
        isLoading: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: [
          ...users.map((user) => {
            if (user._id === action.payload.user._id) {
              return action.payload.user;
            }
            return user;
          }),
        ],
        isLoading: false,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        isInitialized: false,
        isLoading: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_USERS_FAIL:
    case UPDATE_USER_FAIL:
      return {
        ...state,
        isInitialized: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
