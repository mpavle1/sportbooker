import { SET_SEARCH_PARAMS } from '../actions/search';

const initialState = {
    type: 'location',
    id: null,
    date: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SEARCH_PARAMS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
