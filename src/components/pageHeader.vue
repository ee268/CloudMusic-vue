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
                <el-input placeholder="音乐/专辑/歌手" v-model="searchContent">
                    <template #prefix>
                        <el-icon>
                            <search />
                        </el-icon>
                    </template>
                </el-input>
            </div>

            <div class="user">
                <el-dropdown v-show="!isLogin">
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

                <el-dropdown v-show="isLogin">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-icon>
                                    <HomeFilled />
                                </el-icon>
                                我的主页
                            </el-dropdown-item>

                            <el-dropdown-item>
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

        <el-dialog v-model="logging" destroy-on-close align-center>
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

                <el-button @click="loginClick">登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import pageHeaderMenu from './pageHeaderMenu.vue'
import { ref, onMounted } from 'vue'
import { useCounterStore } from '../stores/store.js'
import { storeToRefs } from 'pinia'

const searchContent = ref('')

const counter = useCounterStore()

const {
    isLogin,
    logging,
    account,
    password,
    login,
    logout
} = storeToRefs(counter)

const loginClick = () => { 
    counter.login()
}

const logoutClick = () => { 
    counter.logout()
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
.el-popper {
    background: #2B2B2B !important;
}

// 隐藏三角
.el-popper__arrow {
    &::before {
        background: #2B2B2B !important;
        border-color: #2B2B2B !important;
    }
}

.el-popper.is-light {
    background: #2B2B2B;
    border-color: #2B2B2B;
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

        .el-button {
            margin-top: 50px;
            width: 250px;
            height: 45px;
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
</style>