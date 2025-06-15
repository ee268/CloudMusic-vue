import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useCounterStore = defineStore('counter', () => {
    const isLogin = ref(localStorage.getItem('isLogin') === 'true')
    const logging = ref(false)

    const account = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const userStore = useUserStore()

    const acc_id = ref(localStorage.getItem('acc_id'))

    const sign = () => {
        console.log('sign');

        if (!account.value || !password.value || !confirmPassword.value) {
            ElMessage({
                showClose: true,
                message: '请填写完整信息',
                type: 'warning',
                plain: true,
                duration: '1000'
            })
        }
        else {
            if (password.value !== confirmPassword.value) {
                ElMessage({
                    showClose: true,
                    message: '两次密码不一致',
                    type: 'warning',
                    plain: true,
                    duration: '1000'
                })
            }
            else if (userStore.getUser(account.value)) {
                ElMessage({
                    showClose: true,
                    message: '账号已存在',
                    type: 'warning',
                    plain: true,
                    duration: '1000'
                })
                account.value = ''
            }
            else {
                ElMessage({
                    showClose: true,
                    message: '注册成功',
                    type: 'success',
                    plain: true,
                    duration: '1000'
                })

                let id = Math.random().toString().substring(2, 12)

                while (userStore.getUserId(id)) {
                    id = Math.random().toString().substring(2, 12)
                }

                let newAccount = {
                    account: account.value,
                    password: password.value,
                    article_cnt: 0,
                    follow_cnt: 0,
                    follower_cnt: 0,
                    name: '用户' + account.value,
                    introduce: '',
                    birthday: ['', '', ''],
                    area: ['', ''],
                    age: '',
                    gender: '',
                    create_playlist: [],
                    collect_playlist: [],
                    acc_id: id
                }

                userStore.addUser(newAccount)

                localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo))

                return true
            }
        }

        return false
    }

    const login = () => {
        const user = userStore.getUser(account.value)

        if (user && user.account == account.value && user.password == password.value) {
            ElMessage({
                showClose: true,
                message: '登录成功',
                type: 'success',
                plain: true,
                duration: '1000'
            })

            logging.value = false
            isLogin.value = true

            localStorage.setItem('isLogin', true)
            localStorage.setItem('account', account.value)
            localStorage.setItem('password', password.value)
            localStorage.setItem('acc_id', user.acc_id)
            localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo))
            acc_id.value = user.acc_id

            return true
        }
        else {
            ElMessage({
                showClose: true,
                message: '账号或密码错误',
                type: 'error',
                plain: true,
                duration: '1000'
            })
        }

        account.value = password.value = ''
        return false
    }

    const logout = () => {
        account.value = password.value = ''
        isLogin.value = false
        localStorage.setItem('isLogin', false)
    }

    return {
        isLogin,
        logging,
        account,
        password,
        login,
        logout,
        sign,
        confirmPassword,
        acc_id
    }
})