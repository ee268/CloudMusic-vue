<template>
    <div class="area-artist">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">{{ title }}</div>
                </div>
            </template>
            <div class="card-artist">
                <div v-for="(user, i) in displayAreaUser.splice(0, 10)" :key="i">
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
                <div class="artist-name" v-for="(user, i) in displayAreaUserName.splice(0, 52)" :key="i">
                    <div @click="toUserPage(user.acc_id)">{{ user.name }}</div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { onMounted, ref } from 'vue'
import { useUserStore } from '../../../stores/user'

const userStore = useUserStore()

const Menu = useMenuStore()
const router = useRouter()

const title = ref('')

const menuInfo = Menu.menuGroups

const displayAreaUser = ref([])
const displayAreaUserName = ref([])

const initDisplay = () => {
    displayAreaUser.value = []

    for (let i = 0; i < userStore.userInfo.length; i++) {
        if (title.value.substring(2, 3) === '组' || (userStore.userInfo[i].gender === title.value.substring(2, 3) &&
            userStore.userInfo[i].nation === title.value.substring(0, 2))) {
            displayAreaUser.value.push(userStore.userInfo[i])
            displayAreaUserName.value.push(userStore.userInfo[i])
        }
    }

    if (displayAreaUser.value.length && displayAreaUser.value.length < 10) {
        for (let i = displayAreaUser.value.length; i < 10; i++) {
            displayAreaUser.value.push(displayAreaUser.value[displayAreaUser.value.length - 1])
        }
    }

    if (displayAreaUserName.value.length && displayAreaUserName.value.length < 52) {
        for (let i = displayAreaUserName.value.length; i < 50; i++) {
            displayAreaUserName.value.push(displayAreaUserName.value[displayAreaUserName.value.length - 1])
        }
    }

    // console.log(displayAreaUser.value);
}

const judgeTitle = (index) => {
    if (!index) return

    for (let i = 0; i < menuInfo.length; i++) {
        for (let j = 0; j < menuInfo[i].items.length; j++) {
            if (menuInfo[i].items[j].index == index) {
                title.value = menuInfo[i].items[j].label
                return
            }
        }
    }
}

onMounted(() => {
    judgeTitle(router.currentRoute.value.params.id)
    initDisplay()
})

router.beforeEach((to, from, next) => {
    judgeTitle(to.params.id)
    initDisplay()

    next()
})

const toUserPage = (id) => {
    router.push({
        name: 'alterUser',
        params: { id: id }
    })
}

</script>

<style lang="scss" scoped>
.area-artist {
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