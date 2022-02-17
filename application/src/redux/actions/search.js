export const SET_SEARCH_PARAMS = "SET_SEARCH_PARAMS";

export const setSearchParameters =
  (type, date, id) =>
  (dispatch) => {
    dispatch({
      type: SET_SEARCH_PARAMS,
      payload: {
        type,
        date,
        id
      },
    });
  };
