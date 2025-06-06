<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="myMusic">
            <el-card>
                <div class="userInfo">
                    <div class="user-avatar" @click="showPlayList"></div>

                    <div class="user-data">
                        <div class="user-name">
                            {{ getUserName() }}
                            <el-button @click="editUserInfo">编辑个人资料</el-button>
                        </div>
                        <div class="user-cnt">
                            <div @click="showArticle">
                                <div>{{ getUserArticle_cnt() }}</div>
                                <div>动态</div>
                            </div>
                            <div @click="showFollow">
                                <div>{{ getUserFollow_cnt() }}</div>
                                <div>关注</div>
                            </div>
                            <div @click="showFollower">
                                <div>{{ getUserFollower_cnt() }}</div>
                                <div>粉丝</div>
                            </div>
                        </div>

                        <div class="user-intro">
                            个人介绍：{{ getUserIntro() }}
                        </div>

                        <div class="user-area-age">
                            <div>所在地区：{{ getUserCity() }}</div>
                            <div>年龄：{{ getUserAge() }}</div>
                        </div>
                    </div>
                </div>
            </el-card>
     
            <el-card v-show="showCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">我创建的歌单{{ '(' + createPlaylist_cnt() + ')' }}</div>

                        <div class="hot">
                            <el-button>
                                创建歌单
                            </el-button>
                        </div>
                    </div>
                </template>
            </el-card>
            <el-card v-show="showCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">我收藏的歌单{{ '(' + collectPlaylist_cnt() + ')' }}</div>
                    </div>
                </template>
            </el-card>
            
            <el-card v-show="showArticleCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">我的动态{{ '(' + getUserArticle_cnt() + ')' }}</div>
                    </div>
                </template>
            </el-card>

            <el-card v-show="showFollowCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">关注：{{ '(' + getUserFollow_cnt() + ')' }}</div>
                    </div>
                </template>
            </el-card>

            <el-card v-show="showFollowerCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">粉丝：{{ '(' + getUserFollower_cnt() + ')' }}</div>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '@/components/pageHeaderSubMenu.vue'
import { useUserStore } from '../stores/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const showCnt = ref(true)
const showArticleCnt = ref(false)
const showFollowCnt = ref(false)
const showFollowerCnt = ref(false)

const showPlayList = () => {
    showArticleCnt.value = showFollowCnt.value = showFollowerCnt.value = false
    showCnt.value = true
}

const showArticle = () => {
    showCnt.value = showFollowCnt.value = showFollowerCnt.value = false
    showArticleCnt.value = true
}

const showFollow = () => {
    showCnt.value = showArticleCnt.value = showFollowerCnt.value = false
    showFollowCnt.value = true
}

const showFollower = () => {
    showCnt.value = showArticleCnt.value = showFollowCnt.value = false
    showFollowerCnt.value = true
}

const editUserInfo = () => {
    router.push({ name: 'userConfig' })
}

const getUserAge = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.age
}

const getUserCity = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.area[1]
}

const getUserIntro = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.introduce
}

const getUserFollower_cnt = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.follower_cnt
}

const getUserFollow_cnt = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.follow_cnt
}

const getUserArticle_cnt = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.article_cnt
}

const getUserName = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.name
}

const createPlaylist_cnt = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.create_playlist.length
}

const collectPlaylist_cnt = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    return user.collect_playlist.length
}

</script>

<style lang="scss" scoped>
.myMusic {
    width: 55%;
    background: pink;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    :deep(.el-card__header) {
        padding: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 95%;
        border-bottom: 2px solid #C20C0C;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .el-card {
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        box-shadow: none;
    }

    .card-header {
        display: flex;
        flex-direction: row;

        .card-header-title {
            display: flex;
            align-items: center;
            line-height: 1;
            font-size: 20px;
        }
    }

    .hot {
        display: flex;
        flex-direction: row;
        margin-left: auto;
        align-items: center;
        gap: 5px;

        .el-button {
            color: white;
            background: #C20C0C;
            border: none;
            transform: scale(1);

            &:hover {
                transform: scale(1.1);
                transition: all 0.3s ease-in-out;
            }
        }
    }

    .userInfo {
        display: flex;
        flex-direction: row;
        gap: 40px;

        .user-avatar {
            cursor: pointer;
            width: 150px;
            height: 150px;
            background: url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png') no-repeat center;
            background-size: cover;
        }

        .user-data {
            flex: 1;
            display: flex;
            flex-direction: column;

            .user-name {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #D1D0D0;
                padding-bottom: 15px;
                margin-bottom: 15px;
                font-size: 25px;
            }

            .user-cnt {
                $user-cnt-gap: 20px;
                display: flex;
                flex-direction: row;
                gap: $user-cnt-gap;

                &>div {
                    color: #666666;

                    &:hover {
                        color: #0C73C2;
                        cursor: pointer;
                    }
                }

                &>div:nth-child(1) {
                    border-right: 1px solid #D1D0D0;
                    padding-right: $user-cnt-gap;

                    &>div:first-child {
                        font-size: 22px;
                    }
                }

                &>div:nth-child(2) {
                    border-right: 1px solid #D1D0D0;
                    padding-right: $user-cnt-gap;

                    &>div:first-child {
                        font-size: 22px;
                    }
                }

                &>div:nth-child(3) {
                    border-right: 1px solid #D1D0D0;
                    padding-right: $user-cnt-gap;

                    &>div:first-child {
                        font-size: 22px;
                    }
                }
            }

            .user-intro {
                margin-top: 15px;
                color: #666666;
                font-size: 13px;
            }

            .user-area-age {
                margin-top: 13px;
                display: flex;
                flex-direction: row;
                gap: 30px;

                &>div {
                    color: #666666;
                    font-size: 13px;
                }
            }
        }
    }
}
</style>