export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

export function formatDate(date, fmt) {
    /*
    1.获取年份
    y+ > 1个或者多个y
    y* > 0个或者多个y
    y? > 0个或者1个y
    */
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    //2.获取
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};

export function TotaltimeFormat(time) {
    // console.log(time);
    let Totaltime = parseInt(time / 1000);
    //分钟
    var minute = Totaltime / 60;
    var minutes = parseInt(minute);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    //秒
    var second = Totaltime % 60;
    var seconds = Math.round(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
}

export function NowtimeFormat(time) {
    let Nowtime = time
    //分钟
    var minute = Nowtime / 60;
    var minutes = parseInt(minute);

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    //秒
    var second = Nowtime % 60;
    var seconds = Math.round(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
}