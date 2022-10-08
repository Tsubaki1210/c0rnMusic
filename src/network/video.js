import { request } from './request';

export function getVideoTab() {
    return request({
        url: "/video/group/list",
    })
}