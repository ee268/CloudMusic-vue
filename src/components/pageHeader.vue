<template>
    <div class="head">
        <div class="headContent">
            <div class="logoContent">
                <div class="logo"></div>
                <div class="headTitle">网易云音乐</div>
            </div>
            <div class="menu">
                <pageHeaderMenu />
            </div>

            <div class="search">
                <el-input placeholder="音乐/歌单/用户" v-model="searchContent" @keyup.enter="enterSearch">
                    <template #prefix>
                        <el-icon>
                            <search />
                        </el-icon>
                    </template>
                </el-input>
            </div>

            <div class="user">
                <el-dropdown v-show="!isLogin" popper-class="userDropDown">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="logging = true">
                                <el-icon>
                                    <UserFilled />
                                </el-icon>
                                登录
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <el-dropdown v-show="isLogin" popper-class="userDropDown">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="updateUserInfo">
                                <el-icon>
                                    <Tools />
                                </el-icon>
                                个人设置
                            </el-dropdown-item>

                            <el-dropdown-item @click="logoutClick">
                                <el-icon>
                                    <SwitchButton />
                                </el-icon>
                                登出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>

        <el-dialog v-model="logging" destroy-on-close align-center @close="handleClose">
            <div class="el-dialog-body">
                <div class="el-dialog-header">
                    <div class="loginLogo"></div>
                    <div class="loginTitle">网易云音乐</div>
                </div>

                <el-input v-model="account" placeholder="账号" maxlength="11">
                    <template #prefix>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                    </template>
                </el-input>

                <el-input v-model="password" type="password" show-password placeholder="密码" maxlength="18">
                    <template #prefix>
                        <el-icon>
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>

                <el-input v-show="isSign" v-model="confirmPassword" type="password" show-password placeholder="确认密码"
                    maxlength="18">
                    <template #prefix>
                        <el-icon>
                            <Lock />
                        </el-icon>
                    </template>
                </el-input>

                <div class="sign-login">
                    <el-button class="sign-btn" @click="signClick">{{ signText }}</el-button>
                    <el-button class="login-btn" @click="loginClick">{{ loginText }}</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import pageHeaderMenu from './pageHeaderMenu.vue'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '../stores/login.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const isSign = ref(false)

const loginText = ref('登录')
const signText = ref('注册')

const searchContent = ref('')

const counter = useCounterStore()

const router = useRouter()

const {
    isLogin,
    logging,
    account,
    password,
    login,
    logout,
    sign,
    confirmPassword
} = storeToRefs(counter)

const updateUserInfo = () => {
    router.push({ name: 'userConfig', params: { id: counter.acc_id } })
}

const handleClose = () => {
    isSign.value = false
    loginText.value = '登录'
    signText.value = '注册'
}

const signClick = () => {
    if (!isSign.value) {
        loginText.value = signText.value
        signText.value = '返回'

        isSign.value = true
    }
    else {
        loginText.value = '登录'
        signText.value = '注册'

        isSign.value = false
    }

    account.value = password.value = confirmPassword.value = ''
}

const loginClick = () => {
    console.log(isSign.value);

    if (isSign.value) {
        if (counter.sign()) {
            loginText.value = '登录'
            signText.value = '注册'

            isSign.value = false
        }
    }
    else {
        if (counter.login()) {
            router.push({ name: 'find' })
        }
    }
}

const logoutClick = () => {
    router.push({ name: 'find' })
    counter.logout()
}

const enterSearch = () => {
    if (searchContent.value == '') {
        ElMessage.warning('请输入搜索内容')
        return
    }

    let content = searchContent.value

    searchContent.value = ''

    router.push({ name: 'search', params: { text: content } })
}

</script>

<style lang="scss" scoped>
@font-face {
    font-family: '青鸟华光简美黑';
    src: url('../assets/ttf/JMH.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

.head {
    display: flex;
    width: 100%;
    height: auto;
    background-color: #242424;

    .headContent {
        display: flex;
        position: relative;
        left: 50%;
        transform: translateX(-50%);

        .logoContent {
            display: flex;
            flex-direction: row;

            .logo {
                width: 3rem;
                height: 3rem;
                background: url("../assets/headerLogo.svg") no-repeat center;
                background-size: cover;
                position: relative;
                top: 50%;
                transform: translateY(-50%);
            }

            .headTitle {
                font-size: 25px;
                font-family: "青鸟华光简美黑";
                letter-spacing: 2px;
                color: #fff;
                line-height: 80px;
                margin-left: 10px;
            }
        }

        .menu {
            position: relative;
            height: 100%;
            margin-left: 10px;
        }

        .search {
            position: relative;
            display: flex;
            margin-left: 5px;
            height: 40%;
            top: 50%;
            transform: translateY(-50%);

            :deep(.el-input__wrapper) {
                border-radius: 20px;
                width: 80%;
                box-shadow: none;
            }
        }

        .user {
            display: flex;
            position: relative;
            height: 50%;
            // background-color: pink;
            margin-left: 15px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}

.el-dropdown-menu {
    background: #2B2B2B !important;
}

:deep(.el-dropdown-menu__item) {
    color: rgb(190, 189, 189) !important;
    background: #2B2B2B !important;

    &:hover {
        background: #353535 !important;
        color: white !important;
    }
}

:deep(.el-dropdown__popper) {
    background: #2B2B2B !important;
}
</style>

<style lang="scss">
.userDropDown {
    &.is-light {
        background: #2B2B2B;
        border-color: #2B2B2B;
    }

    .el-popper__arrow {
        &::before {
            background: #2B2B2B !important;
            border-color: #2B2B2B !important;
        }
    }
}
</style>

<style lang="scss" scoped>
:deep(.el-dialog) {
    padding: 0;
    width: 480px;
    height: 380px;
    border-radius: 3%;
    display: flex;
    align-items: center;
    justify-content: center;

    .el-dialog__headerbtn {

        .el-dialog__close {
            color: #FF3A3A;
            width: 30px;
            height: 30px;
            transform: rotate(0deg);

            &:hover {
                transform: rotate(360deg);
                transition: transform 0.5s ease;
            }
        }
    }

    .el-dialog__header {
        padding: 0;
    }

    .el-dialog-body {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;

        .el-dialog-header {
            // background: pink;
            display: flex;
            flex-direction: row;
            align-items: center;

            .loginLogo {
                width: 60px;
                height: 60px;
                background: url("../assets/headerLogo.svg") no-repeat center;
                background-size: cover;
            }

            .loginTitle {
                margin-left: 10px;
                color: #242424;
                font-family: '青鸟华光简美黑';
                font-size: 30px;
            }
        }

        .el-input {
            margin-top: 20px;
            height: 45px;
            width: 250px;
        }

        .el-input__wrapper {
            box-shadow: 0 0 0 1px #E0E2E8;
            border-radius: 20px;

            &:hover {
                box-shadow: 0 0 0 1px #C0C4CC;
            }

            &.is-focus {
                box-shadow: 0px 0px 3px #C20C0C;
            }
        }

        .sign-login {
            display: flex;
            justify-content: space-between;
            width: 250px;
            gap: 10px;

            .sign-btn {
                margin: 0;
                margin-top: 50px;
                height: 45px;
                width: 100%;
                border-radius: 20px;
                background: #F9E6E6;
                color: #C20C0C;
                font-size: 16px;
                border: 1px solid #C20C0C;
                transition: transform 0.2s ease;

                &:active {
                    transform: scale(0.95);
                }
            }

            .login-btn {
                margin: 0;
                margin-top: 50px;
                height: 45px;
                width: 100%;
                border-radius: 20px;
                background: #FF3A3A;
                color: white;
                font-size: 16px;
                border: none;
                transition: transform 0.2s ease;

                &:active {
                    transform: scale(0.95);
                }
            }
        }
    }
}
</style>