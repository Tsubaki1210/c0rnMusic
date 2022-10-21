export default {
    getLoginStatus(context, newVal) {
        // return new Promise((resolve, reject) => {})
        context.commit('SET_LOGIN_STATUS', newVal)
    },
    getUserToken(context, newVal) {
        context.commit('SET_USER_TOKEN', newVal)
    },
    getUserCookie(context, newVal) {
        context.commit('SET_USER_COOKIE', newVal)
    },
    getUserDetail(context, newVal) {
        context.commit('SET_USER_DETAIL', newVal)
    },
    getUserLikeSongsId(context, newVal) {
        context.commit('SET_USER_LIKE_SONGS_ID', newVal)
    },
    getSearchHistory(context, newVal) {
        context.commit('SET_SEARCH_HISTORY', newVal)
    },
    getSearchKeyword(context, newVal) {
        context.commit('SET_SEARCH_KEYWORD', newVal)
    },
    getSearchHeight(context, newVal) {
        context.commit('SET_SEARCH_HEIGHT', newVal)
    },
    getSearchTabHeight(context, newVal) {
        context.commit('SET_SEARCH_TAB_HEIGHT', newVal)
    },
    getMiniPlayerHeight(context, newVal) {
        context.commit('SET_MINI_PLAYER_HEIGHT', newVal)
    },
    getMusicPlayer(context, newVal) {
        context.commit('SET_MUSIC_PLAYER', newVal)
    },
    getMusicPlayerMini(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_Mini', newVal)
    },
    getMusicPlayerFull(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_Full', newVal)
    },
    getMusicPlayerMode(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_MODE', newVal)
    },
    // getMusicPlayerCount(context, newVal) {
    //     context.commit('SET_MUSIC_PLAYER_COUNT', newVal)
    // },
    // delMusicPlayer(context, newVal) {
    //     context.commit('DEL_MUSIC_PLAYER', newVal)
    // },
    getMusicPlayerDetail(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_DETAIL', newVal)
    },
    getMusicPlayerNum(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_NUM', newVal)
    },
    getMusicPlayerCurrentDuration(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_CURRENT_DURATION', newVal)
    },
    getMusicPlayerTotalDuration(context, newVal) {
        context.commit('SET_MUSIC_PLAYER_TOTAL_DURATION', newVal)
    },
}