<template>
    <div class="signed-artist">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">入驻歌手</div>
                </div>
            </template>
            <div class="card-artist">
                <div v-for="(user, i) in displaySignedUser" :key="i">
                    <div class="artist-cover">
                        <div class="artist-cover cover"
                            :style="{ background: `url(${user.avatar})`, backgroundSize: 'cover' }"
                            @click="toUserPage(user.acc_id)">
                        </div>
                    </div>
                    <div class="artist-name" @click="toUserPage(user.acc_id)">
                        <div>{{ user.name }}</div>
                    </div>
                </div>
            </div>
            <div class="card-pagination">
                <el-pagination background layout="prev, pager, next" :hide-on-single-page="true" :page-size="50"
                    :total="userStore.userInfo.length" @current-change="changePage" />
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../stores/user'

const userStore = useUserStore()

const router = useRouter()

const seperateUser = ref([])
const displaySignedUser = ref([])

let startIndex = 0

const initDisplay = () => {
    for (let i = 0; i < userStore.userInfo.length; i++) {
        displaySignedUser.value.push(userStore.userInfo[i])

        if (displaySignedUser.value.length >= 50) {

            break
        }
    }
}

initDisplay()

const changePage = (page) => {
    displaySignedUser.value = []
    startIndex = (page - 1) * 50

    for (let i = startIndex; i < userStore.userInfo.length; i++) {
        displaySignedUser.value.push(userStore.userInfo[i])
        if (displaySignedUser.value.length >= 50) {

            break
        }
    }
}

const toUserPage = (id) => {
    router.push({
        name: 'alterUser',
        params: { id: id }
    })
}
</script>

<style lang="scss" scoped>
.signed-artist {
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
        height: 100%;
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
        }

        .card-artist {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            row-gap: 40px;

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

        .card-pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;

            .el-pagination {
                --el-pagination-button-color: #333333;
                --el-pagination-button-bg-color: white;
                --el-pagination-hover-color: #C20C0C;
            }

            :deep(.el-pagination.is-background .el-pager li) {
                border: 1px solid #CCCCCC;

                &:hover {
                    border-color: black;
                }
            }

            :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
                background-color: #C20C0C !important;
                color: white;
                border-color: transparent;
            }
        }
    }
}
</style>