import Vue from 'vue'
import VueRouter from 'vue-router'
import config from './config'

Vue.use(VueRouter)

const router = new VueRouter(config)

//vue-router重写push方法,解决相同路径跳转报错 
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return VueRouterPush.call(this, location).catch(err => err)
}

const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return VueRouterReplace.call(this, location).catch(err => err)
}

export default router

