import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector
} from '@reduxjs/toolkit';

import * as API from './locationsAPI';

const locationsAdapter = createEntityAdapter({
    selectId: (location) => location._id
});

export const fetchLocations = createAsyncThunk(
    'locations/fetch',
    async () => {
        const response = await API.getLocations();
        return response.data;
    }
);

export const addLocation = createAsyncThunk(
    'locations/get',
    async (location) => {
        const response = await API.addLocation(location);
        return response.data;
    }
);

export const updateLocation = createAsyncThunk(
    'locations/update',
    async (location) => {
        const response = await API.updateLocation(location);
        return response.data;
    }
);

export const deleteLocation = createAsyncThunk(
    'locations/delete',
    async (location) => {
        const response = await API.deleteLocation(location);
        return response.data;
    }
);

const locationsSlice = createSlice({
    name: 'locations',
    initialState: locationsAdapter.getInitialState({
        isLoading: false,
        isInitialized: false,
    }),
    extraReducers: {
        [fetchLocations.pending]: (state) => {
            state.isLoading = true;
            state.isInitialized = false;
        },
        [fetchLocations.fulfilled]: (state, action) => {
            const { payload } = action;
            state.isLoading = false;
            state.isInitialized = true;

            locationsAdapter.addMany(state, payload);
        },
        [fetchLocations.rejected]: (state) => {
            state.isLoading = false;
        },

        [addLocation.pending]: (state) => {
            state.isLoading = true;
        },
        [addLocation.fulfilled]: (state, action) => {
            const { payload } = action;
            state.isLoading = false;

            locationsAdapter.addOne(state, payload);
        },
        [addLocation.rejected]: (state) => {
            state.isLoading = false;
        },

        [updateLocation.pending]: (state) => {
            state.isLoading = true;
        },
        [updateLocation.fulfilled]: (state, action) => {
            const { payload } = action;
            state.isLoading = false;

            locationsAdapter.updateOne(state, {
                id: payload._id,
                changes: {
                    name: payload.name,
                    coordinates: payload.coordinates
                }
            });
        },
        [updateLocation.rejected]: (state) => {
            state.isLoading = false;
        },

        [deleteLocation.pending]: (state) => {
            state.isLoading = true;
        },
        [deleteLocation.fulfilled]: (state, action) => {
            const { payload } = action;
            state.isLoading = false;

            locationsAdapter.removeOne(state, payload._id);
        },
        [deleteLocation.rejected]: (state) => {
            state.isLoading = false;
        },
    }
});

const {
    selectAll,
    selectById,
    selectEntities
} = locationsAdapter.getSelectors((state) => state.locations);

export const locationsSelectors = {
    selectAll,
    selectById,
    selectEntities,
    selectIsLoading: createSelector((state) => state.locations, (locations) => locations.isLoading),
    selectIsInitialized: createSelector((state) => state.locations, (locations) => locations.isInitialized)
}

export default locationsSlice.reducer;
