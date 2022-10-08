export default {
    routes: [
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('../views/home/Home'),
            children: [
                {
                    path: 'recommend',
                    component: () => import('../views/home/childHome/recommend/Recommend')
                },
                {
                    path: 'radio',
                    component: () => import('../views/home/childHome/radio/Radio')
                },
            ]
        },
        {
            path: '/user',
            component: () => import('../views/user/User'),
            children: [
                {
                    path: '',
                    component: () => import('../views/user/childComps/UserMain'),
                },
                {
                    path: 'usermusic',
                    name: 'usermusic',
                    component: () => import('../views/user/childComps/UserMusic')
                },
            ]
        },
        {
            path: '/profile',
            // name: 'Profile',
            component: () => import('../views/profile/Profile'),
            children: [
                {
                    path: '',
                    component: () => import('../views/profile/childComps/ProfileMain'),
                    children: [
                        {
                            path: 'homepage',
                            // path: '',
                            // component: { render(c) { return c('router-view') } },
                            component: () => import('../views/profile/childHome/homepage/Homepage'),
                        },
                        {
                            path: 'dynamics',
                            component: () => import('../views/profile/childHome/dynamics/Dynamics')
                        },
                        {
                            path: 'blog',
                            component: () => import('../views/profile/childHome/blog/Blog')
                        },
                    ]
                },
                {
                    path: 'profiledata',
                    name: 'profiledata',
                    component: () => import('../views/profile/childComps/ProfileData')
                },
                {
                    //Homepage的基本信息的查看全部
                    path: 'baseinfo',
                    name: 'baseinfo',
                    component: () => import('../views/profile/childHome/homepage/childComps/BaseInfo')
                },
                {
                    path: 'profilefollow',
                    name: 'profilefollow',
                    component: () => import('../views/profile/childComps/ProfileFollow')
                },
            ]
        },
        // {
        //     path: '/music',
        //     name: 'Music',
        //     component: () => import('../views/user/childComps/Music')
        // },
        {
            path: '/video',
            name: 'Video',
            component: () => import('../views/video/Video')
        },
        {
            path: '/websearch',
            name: 'Websearch',
            component: () => import('../views/websearch/WebSearch')
        },
        {
            path: '/playlist/:playlistid',
            name: 'Playlist',
            component: () => import('../views/playlist/PlayList'),
            // children: [
            //     {
            //         path: 'localmusic',
            //         component: () => import('../views/playlist/childComps/localMusicTop')
            //     },
            // ]
        },
        {
            path: '/login',
            component: () => import('../views/login/Login'),
            children: [
                {
                    path: '',
                    component: () => import('../views/login/LoginChoice')
                },
                {
                    path: 'phone',
                    name: 'loginphone',
                    component: () => import('../views/login/LoginPhone')
                },
                {
                    path: 'email',
                    name: 'loginemail',
                    component: () => import('../views/login/LoginEmail')
                },
            ]
        },
        {
            path: '/comment',
            name: 'Comment',
            component: () => import('../views/comment/Comment')
        },
    ],
    mode: 'history',
}
