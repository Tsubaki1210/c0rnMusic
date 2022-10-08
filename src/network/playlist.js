import { request } from "./request"

//获取歌单详情
export function getPlayList(id) {
    return request({
        url: '/playlist/detail',
        params: {
            id,
        }
    })
}

//获取歌单评论
export function getPlayListComment(id) {
    return request({
        url: '/comment/playlist',
        params: {
            id,
        }
    })
}