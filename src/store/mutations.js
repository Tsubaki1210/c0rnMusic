export default {
    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的时间比较单一一点
    SET_LOGIN_STATUS(state, newVal) {
        localStorage.setItem('loginStatus', JSON.stringify(newVal))
        state.loginStatus = newVal
    },
    SET_USER_TOKEN(state, newVal) {
        localStorage.setItem('userToken', newVal)
        state.userToken = newVal
    },
    SET_USER_COOKIE(state, newVal) {
        localStorage.setItem('userCookie', newVal)
        state.userCookie = newVal
    },
    SET_USER_DETAIL(state, newVal) {
        localStorage.setItem('userDetail', JSON.stringify(newVal))
        state.userDetail = newVal
    },
    SET_USER_LIKE_SONGS_ID(state, newVal) {
        localStorage.setItem('userLikeSongsId', JSON.stringify(newVal))
        state.userLikeSongsId = newVal
    },
    SET_SEARCH_HISTORY(state, newVal) {
        localStorage.setItem('searchHistory', JSON.stringify(newVal))
        // localStorage.setItem('searchHistory', newVal)
        state.searchHistory = newVal
        // state.searchHistory.push(newVal)
    },
    SET_MUSIC_PLAYER(state, newVal) {
        localStorage.setItem('musicPlayer', JSON.stringify(newVal))
        state.musicPlayer = newVal
    },
    SET_MUSIC_PLAYER_Mini(state, newVal) {
        localStorage.setItem('musicPlayerMini', newVal)
        state.musicPlayerMini = newVal
    },
    SET_MUSIC_PLAYER_Full(state, newVal) {
        localStorage.setItem('musicPlayerFull', newVal)
        state.musicPlayerFull = newVal
    },
    SET_MUSIC_PLAYER_MODE(state, newVal) {
        localStorage.setItem('musicPlayerMode', newVal)
        state.musicPlayerMode = newVal
    },
    delMusicPlayer(state, newVal) {
        state.musicPlayer.forEach((item, index) => {
            if (newVal === item) {
                state.musicPlayer.splice(index, 1)
                let change = state.musicPlayer
                localStorage.setItem('musicPlayer', JSON.stringify(change))
            }
        })
    },
    addCount(state, newVal) {
        if (state.musicPlayerCount < state.musicPlayer.length - 1) {
            // if (state.musicPlayer.length > 0 && state.musicPlayerCount + 1 < state.musicPlayer.length) {
            state.musicPlayer.forEach((item, index) => {
                if (newVal === item.id) {
                    state.musicPlayerCount = index
                    state.musicPlayerCount++;
                    console.log(state.musicPlayerCount)
                }
            })
        } else if (state.musicPlayerCount >= state.musicPlayer.length - 1) {
            state.musicPlayerCount = 0
            console.log("列表循环+");
        }
    },
    subCount(state, newVal) {
        if (state.musicPlayerCount > 0 && state.musicPlayerCount <= state.musicPlayer.length - 1) {
            // if (state.musicPlayer.length > 0 && state.musicPlayerCount + 1 < state.musicPlayer.length) {
            state.musicPlayer.forEach((item, index) => {
                if (newVal === item.id) {
                    state.musicPlayerCount = index
                    state.musicPlayerCount--;
                    localStorage.setItem('musicPlayerCount', state.musicPlayerCount)
                    console.log(state.musicPlayerCount)
                }
            })
        } else if (state.musicPlayerCount <= 0) {
            state.musicPlayerCount = state.musicPlayer.length - 1;
            console.log("列表循环-");
        }
    },
    SET_MUSIC_PLAYER_DETAIL(state, newVal) {
        localStorage.setItem('musicPlayerDetail', JSON.stringify(newVal))
        state.musicPlayerDetail = newVal
    },
    SET_MUSIC_PLAYER_NUM(state, newVal) {
        localStorage.setItem('musicPlayerNum', newVal)
        state.musicPlayerNum = newVal
    },
    SET_MUSIC_PLAYER_CURRENT_DURATION(state, newVal) {
        localStorage.setItem('musicPlayerCurrentDuration', newVal)
        state.musicPlayerCurrentDuration = newVal
    },
    SET_MUSIC_PLAYER_TOTAL_DURATION(state, newVal) {
        localStorage.setItem('musicPlayerTotalDuration', newVal)
        state.musicPlayerTotalDuration = newVal
    },
}