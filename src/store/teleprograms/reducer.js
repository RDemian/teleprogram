import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    items: {},
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case TYPES.TELEPROGRAMS_FETCH:
            return {...state, ...action.payload}
        case TYPES.TELEPROGRAMS_SUCCESS:
            const {fetching, fetchError, items} = action.payload;
            return {...state, fetching, fetchError, items: {...state.items, ...items}}
        case TYPES.TELEPROGRAMS_ERROR:
            return {...state, ...action.payload}
        default:
            return state;
    }
}