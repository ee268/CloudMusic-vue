import { defineStore } from 'pinia'
import { ElMessage } from "element-plus"
import { useMusicStore } from './music'
import { Logger } from 'sass'

export const useUserStore = defineStore('userInfo', () => {
    const musicStore = useMusicStore()

    const userInfo = [
        {
            account: '123',
            password: '123',
            article_cnt: 0,
            follow_cnt: 0,
            follower_cnt: 0,
            name: 'test',
            introduce: '',
            birthday: ['', '', ''],
            area: ['', ''],
            age: '',
            gender: '',
            create_playlist: ['1234567'],
            collect_playlist: [],
            acc_id: '0000000000'
        }
    ]

    console.log('全部用户', userInfo);

    if (localStorage.getItem('userInfo')) {
        let JsonUserInfo = JSON.parse(localStorage.getItem('userInfo'))

        for (let i = 0; i < userInfo.length; i++) {
            userInfo[i] = JsonUserInfo[i]
        }

        for (let i = userInfo.length; i < JsonUserInfo.length; i++) {
            userInfo.push(JsonUserInfo[i])
        }
    }

    for (let i = 0; i < userInfo.length; i++) {
        let newCreatePlaylist = []

        for (let j = 0; j < userInfo[i].create_playlist.length; j++) {
            let list = musicStore.playList.find(item => item.id === userInfo[i].create_playlist[j])

            if (list) {
                newCreatePlaylist.push(list.id)
            }
        }
        userInfo[i].create_playlist = newCreatePlaylist
    }

    const getUser = (account) => {
        return userInfo.find(item => item.account === account)
    }

    const getUserId = (id) => {
        return userInfo.find(item => item.acc_id === id)
    }

    const addUser = (user) => {
        userInfo.push(user)
    }

    const updateUserInfo = (user) => {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id === user.acc_id) {
                userInfo[i] = user
            }
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    const updateCreatePlayList = (userId, playListId) => {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id === userId) {
                userInfo[i].create_playlist.push(playListId)
            }
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    const updateCollectPlayList = (userId, playListId) => {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id === userId) {
                let isExist = userInfo[i].collect_playlist.find(item => item == playListId)

                if (isExist) {
                    ElMessage({
                        showClose: true,
                        message: '已经收藏过了',
                        type: 'warning',
                        plain: true,
                        duration: 2500
                    })

                    return false
                }

                userInfo[i].collect_playlist.push(playListId)
                break
            }
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        return true
    }

    const removeCollectPlayList = (userId, playListId) => {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id == userId) {
                for (let j = 0; j < userInfo[i].collect_playlist.length; j++) {
                    if (userInfo[i].collect_playlist[j] == playListId) {
                        userInfo[i].collect_playlist.splice(j, 1)
                    }
                }
            }
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    const addFollow = (userId, followUserId) => {
        // console.log(userId, followUserId);

        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id == userId) {

                userInfo[i].follow.push(followUserId)
                userInfo[i].follow_cnt = userInfo[i].follow_cnt + 1
                break
            }
        }

        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id == followUserId) {

                userInfo[i].follower.push(userId)
                userInfo[i].follower_cnt = userInfo[i].follower_cnt + 1
                break
            }
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    const removeFollow = (userId, followUserId) => {
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id == userId) {
                for (let j = 0; j < userInfo[i].follow.length; j++) {
                    if (userInfo[i].follow[j] == followUserId) {
                        userInfo[i].follow.splice(j, 1)
                        break
                    }
                }

                userInfo[i].follow_cnt = userInfo[i].follow_cnt - 1
                break
            }
        }

        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].acc_id == followUserId) {
                for (let j = 0; j < userInfo[i].follower.length; j++) {
                    if (userInfo[i].follower[j] == userId) {
                        userInfo[i].follower.splice(j, 1)
                        break
                    }
                }

                userInfo[i].follower_cnt = userInfo[i].follower_cnt - 1
                break
            }
        }

        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }

    return {
        userInfo,
        getUser,
        addUser,
        getUserId,
        updateUserInfo,
        updateCreatePlayList,
        updateCollectPlayList,
        removeCollectPlayList,
        addFollow,
        removeFollow,
    }
})