import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ALL_USERS_SUCCESS = "GET_ALL_USERS_SUCCESS";
export const GET_ALL_USERS_FAIL = "GET_ALL_USERS_FAIL";

export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAIL = "UPDATE_USER_FAIL";

// export const ADD_SPORT = 'ADD_SPORT';
// export const ADD_SPORT_SUCCESS = 'ADD_SPORT_SUCCESS';
// export const ADD_SPORT_FAIL = 'ADD_SPORT_FAIL';

// export const DELETE_SPORT = 'DELETE_SPORT';
// export const DELETE_SPORT_SUCCESS = 'DELETE_SPORT_SUCCESS';
// export const DELETE_SPORT_FAIL = 'DELETE_SPORT_FAIL';

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: GET_ALL_USERS });
  axios
    .get("/api/users")
    .then((res) => {
      dispatch({
        type: GET_ALL_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_USERS_FAIL,
      });
    });
};

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: UPDATE_USER });
  return axios
    .patch("/api/users", {
      user,
    })
    .then((res) => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAIL,
      });
    });
};
