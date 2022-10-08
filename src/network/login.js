import { request } from './request';

export function getLoginStatus() {
    return request({
        url: "/login/status",
    })
}