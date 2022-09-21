import {
  GET_ALL_SPORT_CENTERS,
  GET_ALL_SPORT_CENTERS_FAIL,
  GET_ALL_SPORT_CENTERS_SUCCESS,
} from "../actions/sportCenters";

const initialState = [];

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SPORT_CENTERS_SUCCESS:
      return [...action.payload];
    case GET_ALL_SPORT_CENTERS:
    case GET_ALL_SPORT_CENTERS_FAIL:
    default:
      return state;
  }
}
