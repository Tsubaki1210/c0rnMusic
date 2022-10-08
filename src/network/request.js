import axios from 'axios'

export function request(config) {
    //创建axios实例
    const instance1 = axios.create({
        baseURL: '/api',
        timeout: 30000
    })

    //请求拦截
    instance1.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    //响应拦截
    instance1.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err);
    })

    //发送真正的网络请求
    return instance1(config)
}