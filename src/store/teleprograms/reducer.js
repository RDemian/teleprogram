import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    items: {},
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case TYPES.TELEPROGRAMS_FETCH:
            return {...state, ...payload}
        case TYPES.TELEPROGRAMS_SUCCESS:
            const {fetching, fetchError, items} = payload;
            return {...state, fetching, fetchError, items: {...state.items, ...items}}
        case TYPES.TELEPROGRAMS_ERROR:
            return {...state, ...payload}
        default:
            return state;
    }
}