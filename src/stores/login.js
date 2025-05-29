import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
    const isLogin = ref(localStorage.getItem('isLogin') === 'true')
    const logging = ref(false)

    const account = ref('')
    const password = ref('')

    const login = () => {
        if (account.value == '123' && password.value == '123') {
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
    }

    const logout = () => {
        isLogin.value = false
        localStorage.clear()
    }

    return {
        isLogin,
        logging,
        account,
        password,
        login,
        logout,
    }
})