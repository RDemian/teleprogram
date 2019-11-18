import * as api from '../../api';

export const TYPES = {
    CHANNELS_FETCH: 'CHANNELS_FETCH',
    CHANNELS_SUCCESS: 'CHANNELS_SUCCESS',
    CHANNELS_ERROR: 'CHANNELS_ERROR',
}

export function fetchList(params) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.CHANNELS_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const list = await api.getChannels(params);
            dispatch({
                type: TYPES.CHANNELS_SUCCESS,
                payload: {
                    fetching: false,
                    items: list,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.CHANNELS_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
            console.error(err);
        }
    }
}