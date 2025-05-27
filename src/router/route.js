import { createRouter, createWebHistory } from "vue-router"
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            redirect: "/find/recommend",
        },
        {
            path: "/find",
            name: "find",
            redirect: "/find/recommend",
            component: () => import('../pages/findMusic.vue'),
            children: [
                {
                    path: 'recommend',
                    name: 'recommend',
                    component: () => import('../pages/findMusicSubPages/recommend/recommend.vue')
                },
                {
                    path: 'playList',
                    name: 'playList',
                    component: () => import('../pages/findMusicSubPages/playList.vue')
                },
                {
                    path: 'artist',
                    name: 'artist',
                    component: () => import('../pages/findMusicSubPages/artist.vue')
                },
                {
                    path: 'album',
                    name: 'album',
                    component: () => import('../pages/findMusicSubPages/album.vue')
                },
            ]
        },
        {
            path: "/my",
            name: "my",
            component: () => import("../pages/myMusic.vue"),
        },
        {
            path: "/friend",
            name: "friend",
            component: () => import("../pages/friend.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isLogin = localStorage.getItem('isLogin') === 'true'
    console.log(to.fullPath);
    

    if (!isLogin && to.fullPath.indexOf('find') == -1) {        
        ElMessage({
            showClose: true,
            message: '请先登录',
            type: 'error',
            plain: true,
            duration: '1000'
        })
        
        next({name: 'find'})
    }
    else {
        next(true)
    }
})

export default router
