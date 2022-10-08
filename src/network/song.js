import { request } from "./request"
import store from "@/store/index.js";

const usercookie = store.state.userCookie

// const time = new Date().getTime()

//获取推荐歌曲
export function getRecommendSongs() {
    return request({
        url: '/personalized/newsong',
    })
}

//获取歌曲详情
export function getSongsDetail(ids) {
    return request({
        url: '/song/detail',
        params: {
            ids,
        }
    })
}

//获取歌曲评论数(歌曲评论有新接口)
export function getSongsCommentCount(id) {
    return request({
        url: '/comment/music',
        params: {
            id,
        }
    })
}

//获取歌曲评论
export function getSongsComment(id, type, sortType) {
    return request({
        url: '/comment/new',
        params: {
            id,
            type,
            sortType,
        }
    })
}

//获取最近播放的歌曲
export function getRecentSongs() {
    return request({
        url: '/record/recent/song',
        params: {
            cookie: usercookie,
        }

    })
}

//获取用户的听歌排行 type=0为所有，1为当前周
export function getUserListenSongs() {
    return request({
        url: '/user/record?uid=532542657&type=0',
    })
}

//获取用户喜欢的音乐
export function getUserLikeSongs(uid) {
    return request({
        url: '/likelist',
        params: {
            uid,
            cookie: usercookie,
        }
    })
}

//用户点击喜欢音乐按钮
export function getUserLike(id, like) {
    return request({
        url: '/like',
        params: {
            id,
            like,
            cookie: usercookie,
        }
    })
}