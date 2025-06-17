import { createRouter, createWebHistory } from "vue-router"
import { ElMessage } from 'element-plus'
import { id } from "element-plus/es/locales.mjs";

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
            meta: {
                mainMenu: true,
                index: '0',
            },
            redirect: "/find/recommend",
            component: () => import('../pages/findMusic.vue'),
            children: [
                {
                    path: 'recommend',
                    name: 'recommend',
                    meta: {
                        subMenu: true,
                        index: '0'
                    },
                    component: () => import('../pages/findMusicSubPages/recommend/recommend.vue')
                },
                {
                    path: 'playList',
                    name: 'playList',
                    meta: {
                        subMenu: true,
                        index: '1'
                    },
                    component: () => import('../pages/findMusicSubPages/playList.vue')
                },
                {
                    path: 'artist',
                    name: 'artist',
                    meta: {
                        subMenu: true,
                        index: '2'
                    },
                    redirect: '/find/artist/recommendArtist',
                    component: () => import('../pages/findMusicSubPages/artist/artist.vue'),
                    children: [
                        {
                            path: 'recommendArtist',
                            name: 'recommendArtist',
                            meta: {
                                id: '1-1',
                            },
                            component: () => import('../pages/findMusicSubPages/artist/recommendArtist.vue')
                        },
                        {
                            path: 'signedArtist',
                            name: 'signedArtist',
                            meta: {
                                id: '1-2'
                            },
                            component: () => import('../pages/findMusicSubPages/artist/signedArtist.vue')
                        },
                        {
                            path: 'areaArtist/:id',
                            name: 'areaArtist',
                            component: () => import('../pages/findMusicSubPages/artist/areaArtist.vue')
                        }
                    ]
                },
                {
                    path: 'album',
                    name: 'album',
                    meta: {
                        subMenu: true,
                        index: '3'
                    },
                    component: () => import('../pages/findMusicSubPages/album.vue')
                },
            ]
        },
        {
            path: "/search/content=:text",
            name: "search",
            component: () => import("../pages/search.vue")
        },
        {
            path: "/my/:id",
            name: "my",
            meta: {
                mainMenu: true,
                index: '1',
            },
            component: () => import("../pages/myMusic.vue"),
        },
        {
            path: "/alterUser_id=:id",
            name: "alterUser",
            component: () => import("../pages/artitstMusic.vue"),
            props: true
        },
        {
            path: "/upload",
            name: "upload",
            meta: {
                mainMenu: true,
                index: '2',
            },
            component: () => import("../pages/upload.vue"),
        },
        {
            path: "/userConfig/:id",
            name: "userConfig",
            component: () => import("../pages/userConfig.vue")
        },
        {
            path: "/song:id",
            name: 'song',
            component: () => import('../pages/song.vue')
        },
        {
            path: "/list:id",
            name: 'list',
            component: () => import('../pages/songList.vue')
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        // if (to.name =) {
        //     return
        // }
        return { top: 0, behavior: 'smooth' }
    }
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

        next({ name: 'find' })
    }
    else {

        next(true)
    }
})

export default router
