import axios from "axios";

export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
export const GET_ALL_REVIEWS_SUCCESS = "GET_ALL_REVIEWS_SUCCESS";
export const GET_ALL_REVIEWS_FAIL = "GET_ALL_REVIEWS_FAIL";

export const GET_ALL_USER_REVIEWS = "GET_ALL_USER_REVIEWS";
export const GET_ALL_USER_REVIEWS_SUCCESS = "GET_ALL_USER_REVIEWS_SUCCESS";
export const GET_ALL_USER_REVIEWS_FAIL = "GET_ALL_USER_REVIEWS_FAIL";

export const GET_ALL_SPORT_CENTER_REVIEWS = "GET_ALL_SPORT_CENTER_REVIEWS";
export const GET_ALL_SPORT_CENTER_REVIEWS_SUCCESS =
  "GET_ALL_SPORT_CENTER_REVIEWS_SUCCESS";
export const GET_ALL_SPORT_CENTER_REVIEWS_FAIL =
  "GET_ALL_SPORT_CENTER_REVIEWS_FAIL";

export const ADD_REVIEW = "ADD_REVIEW";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAIL = "ADD_REVIEW_FAIL";

export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAIL = "UPDATE_REVIEW_FAIL";

export const DELETE_REVIEW = "DELETE_REVIEW";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAIL = "DELETE_REVIEW_FAIL";

export const getAllReviews = () => (dispatch) => {
  dispatch({ type: GET_ALL_REVIEWS });
  axios
    .get("/api/reviews")
    .then((res) => {
      dispatch({
        type: GET_ALL_REVIEWS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_REVIEWS_FAIL,
      });
    });
};

export const getAllUserReviews = (userId) => (dispatch) => {
  dispatch({ type: GET_ALL_USER_REVIEWS });
  axios
    .get(`/api/reviews/user/${userId}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_USER_REVIEWS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_USER_REVIEWS_FAIL,
      });
    });
};

export const getAllSportCenterReviews = (sportCenterId) => (dispatch) => {
  dispatch({ type: GET_ALL_SPORT_CENTER_REVIEWS });
  axios
    .get(`/api/reviews/sportCenter/${sportCenterId}`)
    .then((res) => {
      dispatch({
        type: GET_ALL_SPORT_CENTER_REVIEWS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ALL_SPORT_CENTER_REVIEWS_FAIL,
      });
    });
};

export const addReview = (review) => (dispatch) => {
  dispatch({ type: ADD_REVIEW });
  axios
    .post(`/api/reviews/`, {
      review
    })
    .then((res) => {
      dispatch({
        type: ADD_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: ADD_REVIEW_FAIL,
      });
    });
};

export const deleteReview = (review) => (dispatch) => {
  dispatch({ type: DELETE_REVIEW });
  axios
    .post(`/api/reviews/delete`, {
      review
    })
    .then((res) => {
      dispatch({
        type: DELETE_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: DELETE_REVIEW_FAIL,
      });
    });
};

export const updateReview = (review) => (dispatch) => {
  dispatch({ type: UPDATE_REVIEW });
  axios
    .patch(`/api/reviews/`, {
      review
    })
    .then((res) => {
      dispatch({
        type: UPDATE_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_REVIEWFAIL,
      });
    });
};

export const approveReview = (review) => (dispatch) => {
  dispatch({ type: UPDATE_REVIEW });
  axios
    .patch(`/api/reviews/approve`, {
      review
    })
    .then((res) => {
      dispatch({
        type: UPDATE_REVIEW_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_REVIEWFAIL,
      });
    });
};
