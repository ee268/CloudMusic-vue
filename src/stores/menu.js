import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    const menuRef = ref()
    const isMenuActive = ref([false, false, false])//判断主菜单是否活动，是则加上底部三角符号
    const setMenuRef = (ref) => {
        menuRef.value = ref
    }

    const subMenuRef = ref()
    const setSubMenuRef = (ref) => {
        subMenuRef.value = ref
    }

    const sideMenuRef = ref()
    const setSideMenuRef = (ref) => {
        sideMenuRef.value = ref
    }

    const menuGroups = [
        {
            title: '推荐',
            items: [
                { index: '1-1', name: 'recommendArtist', label: '热门歌手' },
                { index: '1-2', name: 'signedArtist', label: '入驻歌手' }
            ]
        },
        {
            title: '华语',
            items: [
                { index: '2-1', id: 1001, label: '华语男歌手' },
                { index: '2-2', id: 1002, label: '华语女歌手' },
                { index: '2-3', id: 1003, label: '华语组合/乐队' }
            ]
        },
        {
            title: '欧美',
            items: [
                { index: '3-1', id: 2001, label: '欧美男歌手' },
                { index: '3-2', id: 2002, label: '欧美女歌手' },
                { index: '3-3', id: 2003, label: '欧美组合/乐队' }
            ]
        },
        {
            title: '日本',
            items: [
                { index: '4-1', id: 3001, label: '日本男歌手' },
                { index: '4-2', id: 3002, label: '日本女歌手' },
                { index: '4-3', id: 3003, label: '日本组合/乐队' }
            ]
        },
        {
            title: '韩国',
            items: [
                { index: '5-1', id: 4001, label: '韩国男歌手' },
                { index: '5-2', id: 4002, label: '韩国女歌手' },
                { index: '5-3', id: 4003, label: '韩国组合/乐队' }
            ]
        },
        {
            title: '其他',
            items: [
                { index: '6-1', id: 5001, label: '其他男歌手' },
                { index: '6-2', id: 5002, label: '其他女歌手' },
                { index: '6-3', id: 5003, label: '其他组合/乐队' }
            ]
        }
    ]

    return { 
        menuRef, 
        isMenuActive, 
        setMenuRef, 
        subMenuRef, 
        setSubMenuRef, 
        sideMenuRef, 
        setSideMenuRef, 
        menuGroups
    }
})