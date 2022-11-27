import { createSlice, createAsyncThunk, createEntityAdapter,createSelector } from "@reduxjs/toolkit";

import * as API from './sportsAPI';

const sportsAdapter = createEntityAdapter({
  selectId: (sport) => sport._id
});

export const fetchSports = createAsyncThunk('sports/get', (async () => {
  const response = await API.getAllSports();
  return response.data;
}));

export const addSport = createAsyncThunk('sports/get', (async (sport) => {
  const response = await API.addSport(sport);
  return response.data;
}));

export const deleteSport = createAsyncThunk('sports/get', (async (sport) => {
  const response = await API.deleteSport(sport);
  return response.data;
}));

const sportsSlice = createSlice({
  name: "sports",
  initialState: sportsAdapter.getInitialState({
    isLoading: false,
    isInitialized: false,
  }),
  reducers: {
    sportAdded(state, action) {
      return { ...state, sports: [state.sports, action.payload] };
    },
    sportDeleted(state, action) {
      const sports = state.entities.filter(
        (sport) => sport.id !== action.payload
      );
      state.sports = [...sports];
    },
  },
});

export const { todoAdded, todoToggled, sportsLoading } = sportsSlice.actions;

export default sportsSlice.reducer;
