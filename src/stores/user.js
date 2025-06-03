import { defineStore } from 'pinia'

export const useUserStore = defineStore('userInfo', () => {
    const userInfo = [
        {
            account: '123',
            password: '123',
            aritcle_cnt: 0,
            follow_cnt: 0,
            follower_cnt: 0,
            name: 'test',
            introduce: '',
            birthday: ['', '', ''],
            area: ['', ''],
            age: '',
            gender: '',
            create_playlist: [],
            collect_playlist: [],
            acc_id: '0000000000'
        }
    ]

    if (localStorage.getItem('userInfo')) {
        let JsonUserInfo = JSON.parse(localStorage.getItem('userInfo'))
        
        for (let i = 0; i < userInfo.length; i++){
            userInfo[i] = JsonUserInfo[i]
        }

        for (let i = userInfo.length; i < JsonUserInfo.length; i++) {
            userInfo.push(JsonUserInfo[i])
        }
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
    } 

    return { userInfo, getUser, addUser, getUserId, updateUserInfo }
})