import { request } from './request';

export function getHomeTopSwipe() {
    return request({
        url: "/banner?type=2",
    })
}

export function getRecommendMusic() {
    return request({
        url: "/personalized?limit=6",
    })
}

export function getNewMusic() {
    return request({
        url: "/personalized/newsong",
    })
}

export function getHostRadio() {
    return request({
        url: '/dj/hot?limit=6'
    })
}

export function getRadioTopSwipe() {
    return request({
        url: '/dj/banner',
    })
}

export function getMusicUrl(id) {
    return request({
        url: "song/url",
        params: {
            id,
        }
    })
}