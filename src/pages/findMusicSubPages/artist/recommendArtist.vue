<template>
    <div class="recommend-artist">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">入驻歌手</div>
                    <div class="more">
                        <el-button @click="toSignedArtist($event)">
                            <el-text size="small">
                                更多
                                <el-icon color="#C20C0C">
                                    <Right />
                                </el-icon>
                            </el-text>
                        </el-button>
                    </div>
                </div>
            </template>
            <div class="card-artist">
                <div v-for="(user, i) in displayRecommendUser" :key="i">
                    <div class="artist-cover" @click="toUserPage(user.acc_id)">
                        <div class="artist-cover cover"
                            :style="{ background: `url(${user.avatar})`, backgroundSize: 'cover' }">
                        </div>
                    </div>
                    <div class="artist-name" @click="toUserPage(user.acc_id)">
                        <div>{{ user.name }}</div>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">热门歌手</div>
                </div>
            </template>
            <div class="card-artist">
                <div v-for="(user, i) in displaySignedUser" :key="i">
                    <div class="artist-cover" @click="toUserPage(user.acc_id)">
                        <div class="artist-cover cover"
                            :style="{ background: `url(${user.avatar})`, backgroundSize: 'cover' }">
                        </div>
                    </div>
                    <div class="artist-name" @click="toUserPage(user.acc_id)">
                        <div>{{ user.name }}</div>
                    </div>
                </div>
            </div>
            <div class="card-artist-name">
                <div class="artist-name" v-for="(user, i) in displayUser" :key="i">
                    <div @click="toUserPage(user.acc_id)">{{ user.name }}</div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useUserStore } from '../../../stores/user'

const userStore = useUserStore()

const router = useRouter()

const Menu = useMenuStore()

const toSignedArtist = (event) => {
    router.push({ name: 'signedArtist' })
    Menu.sideMenuRef.updateActiveIndex('1-2')
}

const displayRecommendUser = ref([])
const displaySignedUser = ref([])
const displayUser = ref([])

const initDisplay = () => {
    for (let i = 0; i < 10; i++) {
        let k = Math.floor(Math.random() * userStore.userInfo.length)
        displayRecommendUser.value.push(userStore.userInfo[k])

        k = Math.floor(Math.random() * userStore.userInfo.length)
        displaySignedUser.value.push(userStore.userInfo[k])
    }

    for (let i = 0; i < 52; i++) {
        let k = Math.floor(Math.random() * userStore.userInfo.length)
        displayUser.value.push(userStore.userInfo[k])
    }
}

initDisplay()

const toUserPage = (id) => {
    router.push({
        name: 'alterUser',
        params: { id: id }
    })
}

</script>

<style lang="scss" scoped>
.recommend-artist {
    :deep(.el-card__header) {
        width: 95%;
        padding-left: 0;
        padding-right: 0;
        border-bottom: 2px solid #C20C0C;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .el-card {
        width: 100%;
        box-shadow: none;
        border: none;
        border-radius: 0;

        .card-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 15px;

            .card-header-title {
                display: flex;
                align-items: center;
                line-height: 1;
                font-size: 20px;
            }

            .more {
                display: flex;
                flex-direction: row;
                margin-left: auto;
                align-items: center;
                gap: 5px;

                .el-button {
                    background: none;
                    border: none;
                    padding: 0;

                    .el-text {
                        color: #C20C0C;
                    }

                    &:hover {
                        .el-text {
                            color: white;

                            .el-icon {
                                color: white;
                            }
                        }

                        background: #C20C0C;
                        transition: all 0.3s ease-in-out;
                    }
                }
            }
        }

        .card-artist {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            row-gap: 20px;

            .artist-cover {
                aspect-ratio: 1 / 1;
                width: 100%;
                // background: green;
                // background: url('/public/img/Cover.jpg');
                background-size: cover;
                border-radius: 50%;
                border: 1px solid rgba(0, 0, 0, 0.1);
                transform: scale(1);
                cursor: pointer;
                overflow: hidden;
                transition: all 0.3s ease;

                .cover {
                    transition: all 0.3s ease;

                    &:hover {
                        transform: scale(1.2);
                    }
                }

                &:hover {
                    border-color: #C20C0C;
                }
            }
        }

        .artist-name {
            width: inherit;
            padding-top: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            transition: all 0.3s;

            div {
                height: max-content;
                width: max-content;
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 100px;
            }

            &:hover {
                color: #C20C0C;
                cursor: pointer;
            }
        }

        .card-artist-name {
            margin-top: 25px;
            padding-top: 10px;
            border-top: 1px solid #D3D3D3;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            row-gap: 20px;

            .artist-name {
                flex: 5;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 5px;
                transition: all 0.3s;

                div {
                    text-wrap: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 100px;
                }

                &:hover {
                    color: #C20C0C;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>