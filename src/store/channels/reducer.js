import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    items: [],
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case TYPES.CHANNELS_FETCH:
            return {...state, ...action.payload}
        case TYPES.CHANNELS_SUCCESS:
            return {...state, ...action.payload}
        case TYPES.CHANNELS_ERROR:
            return {...state, ...action.payload}
        default:
            return state;
    }
}