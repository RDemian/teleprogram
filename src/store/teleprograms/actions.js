import * as api from '../../api';

export const TYPES = {
    TELEPROGRAMS_FETCH: 'TELEPROGRAMS_FETCH',
    TELEPROGRAMS_SUCCESS: 'TELEPROGRAMS_SUCCESS',
    TELEPROGRAMS_ERROR: 'TELEPROGRAMS_ERROR',
}

export function fetchList(params) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.TELEPROGRAMS_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const list = await api.getTeleprograms(params);
            dispatch({
                type: TYPES.TELEPROGRAMS_SUCCESS,
                payload: {
                    fetching: false,
                    items: list,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.TELEPROGRAMS_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
            console.error(err);
        }
    }
}