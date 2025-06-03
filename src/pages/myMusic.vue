<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="myMusic">
            <el-card>
                <div class="userInfo">
                    <div>

                    </div>
                </div>
            </el-card>
            <el-card>
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
            <el-card>
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">我收藏的歌单{{ '(' + collectPlaylist_cnt() + ')' }}</div>
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

const userStore = useUserStore()

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
        
    }
}
</style>