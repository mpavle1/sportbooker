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

export const DELETE_REVIEW = "DELETE_REVIEW";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAIL = "DELETE_REVIEW_FAIL";

export const UPDATE_REVIEW = "UPDATE_REVIEW";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAIL = "UPDATE_REVIEW_FAIL";

const initialState = {
  all: [],
  user: [],
  sportCenter: [],
  isLoading: false,
  isInitialized: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SPORT_CENTER_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        sportCenter: [...action.payload],
      };
    case GET_ALL_USER_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        user: [...action.payload],
      };
    case GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isInitialized: true,
        all: [...action.payload],
      };
    case ADD_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        all: [...state.all, action.payload],
        sportCenter: [...state.sportCenter, action.payload],
        all: [...state.all, action.payload],
      };
    case DELETE_REVIEW_SUCCESS:
      const newAll = [...state.all].filter((review) => review._id !== action.payload._id);
      const newSC = [...state.sportCenter].filter((review) => review._id !== action.payload._id);
      const newUser = [...state.user].filter((review) => review._id !== action.payload._id);

      return {
        ...state,
        isLoading: false,
        all: [...newAll],
        sportCenter: [...newSC],
        user: [...newUser],
      };
    case UPDATE_REVIEW_SUCCESS:
      const updateNewAll = [...state.all].filter((review) => review._id !== action.payload._id);
      const updateNewSC = [...state.sportCenter].filter((review) => review._id !== action.payload._id);
      const updateNewUser = [...state.user].filter((review) => review._id !== action.payload._id);

      return {
        ...state,
        isLoading: false,
        all: [...updateNewAll, action.payload],
        sportCenter: [...updateNewSC, action.payload],
        user: [...updateNewUser, action.payload],
      };
    case GET_ALL_SPORT_CENTER_REVIEWS:
    case GET_ALL_REVIEWS:
    case GET_ALL_USER_REVIEWS:
      return {
        ...state,
        isLoading: true,
        isInitialized: false,
      };
    case GET_ALL_SPORT_CENTER_REVIEWS_FAIL:
    case GET_ALL_REVIEWS_FAIL:
    case GET_ALL_USER_REVIEWS_FAIL:
      return {
        ...state,
        isLoading: false,
        isInitialized: false,
      };
    case ADD_REVIEW:
    case DELETE_REVIEW:
    case ADD_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
