import { request } from './request';

export function getSearchDefault() {
    return request({
        url: "/search/default",
    })
}

export function getHotSearch() {
    return request({
        url: "/search/hot",
    })
}

export function getSearch(keywords, type, limit) {
    return request({
        url: "/search",
        params: {
            keywords,
            type,
            limit,
        }
    })
}

export function getCloudSearch(keywords, type) {
    return request({
        url: "/cloudsearch",
        params: {
            keywords,
            type,
        }
    })
}
