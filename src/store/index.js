import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations"
import actions from "./actions"
import getters from './getters'

// import { playMode } from "common/js/config.js"

Vue.use(Vuex)

//创建Store对象
const state = {
    //当前用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || {},
    // loginStatus: localStorage.getItem('loginStatus') || {},
    //用户登录token
    userToken: localStorage.getItem('userToken') || null,
    //用户登录cookie
    userCookie: localStorage.getItem('userCookie') || null,
    //用户详情信息
    userDetail: JSON.parse(localStorage.getItem('userDetail')) || {},
    // userDetail: localStorage.getItem('userDetail') || {},
    //用户喜欢的音乐ID
    userLikeSongsId: JSON.parse(localStorage.getItem('userLikeSongsId')) || {},

    //搜索历史记录
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],

    //播放器内所存放的歌曲
    musicPlayer: JSON.parse(localStorage.getItem('musicPlayer')) || [],
    //播放器Mini
    musicPlayerMini: localStorage.getItem('musicPlayerMini') || true,
    //播放器全屏
    musicPlayerFull: localStorage.getItem('musicPlayerFull') || false,
    //播放器播放模式
    musicPlayerMode: localStorage.getItem('musicPlayerMode') || 0,
    //当前播放器歌曲详情
    musicPlayerDetail: JSON.parse(localStorage.getItem('musicPlayerDetail')) || {},
    //当前播放器是否为空(0=空,1=不空)
    musicPlayerNum: localStorage.getItem('musicPlayerNum') || 0,
    //当前播放器第几首歌
    musicPlayerCount: localStorage.getItem('musicPlayerCount') || 0,
    //音乐当前播放时间
    musicPlayerCurrentDuration: localStorage.getItem('musicPlayerCurrentDuration') || 0,
    //音乐总时长
    musicPlayerTotalDuration: localStorage.getItem('musicPlayerTotalDuration') || 0,


    // singer: {},
    // playing: false, //是否播放
    // fullScreen: false, //是否全屏
    // playList: [], //播放列表
    // sequenceList: [], //非顺序播放
    // mode: playMode.sequence, //播放模式(顺序0, 循环1, 随机2)
    // currentIndex: -1, //当前播放索引
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
})

export default store
