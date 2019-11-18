export const BASE_URL = 'http://epg.domru.ru/';

const getData = async (catalog, params) => {
    const url = new URL(`${BASE_URL}${catalog}`);
    url.search = new URLSearchParams(params).toString();

    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Запрос по URL ${`${url}`}, вернул статус ${resp.status}`);
    }
    const body = await resp.json();
    return body;
}

/*
* domain
*/
export const getChannels = (params) => {
    return getData('channel/list', params);
}

/*
* domain
* date_from
* date_to
* xvid
*/
export const getTeleprograms = (params) => {
    return getData('program/list', params);
}
