import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector
} from "@reduxjs/toolkit";

import * as API from './sportsAPI';

const sportsAdapter = createEntityAdapter({
  selectId: (sport) => sport._id
});

export const fetchSports = createAsyncThunk('sports/fetch', (async () => {
  const response = await API.getAllSports();
  return response.data;
}));

export const addSport = createAsyncThunk('sports/add', (async (sport) => {
  const response = await API.addSport(sport);
  return response.data;
}));

export const deleteSport = createAsyncThunk('sports/delete', (async (sport) => {
  const response = await API.deleteSport(sport);
  return response.data;
}));

const sportsSlice = createSlice({
  name: "sports",
  initialState: sportsAdapter.getInitialState({
    isLoading: false,
    isInitialized: false,
  }),
  extraReducers: {
    [fetchSports.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchSports.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;
      state.isInitialized = true;

      sportsAdapter.addMany(state, payload);
    },
    [fetchSports.rejected]: (state) => {
      state.isLoading = false;
    },
    [addSport.pending]: (state) => {
      state.isLoading = true;
    },
    [addSport.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;

      sportsAdapter.addOne(state, payload);
    },
    [addSport.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteSport.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteSport.fulfilled]: (state, action) => {
      const { payload } = action;
      state.isLoading = false;

      sportsAdapter.removeOne(state, payload._id);
    },
    [deleteSport.rejected]: (state) => {
      state.isLoading = false;
    },
  }
});


const { selectAll, selectById, selectEntities } = sportsAdapter.getSelectors((state) => state.sports);

export const sportsSelectors = {
  selectAll,
  selectById,
  selectEntities,
  selectIsLoading: createSelector((state) => state.sports, (sports) => sports.isLoading),
  selectIsInitialized: createSelector((state) => state.sports, (sports) => sports.isInitialized)
};

export default sportsSlice.reducer;
