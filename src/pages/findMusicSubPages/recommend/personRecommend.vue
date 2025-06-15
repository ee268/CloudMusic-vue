<template>
    <div class="personRecommend" v-show="props.isShow == true">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-icon">
                        <el-icon size="24" color="#C20C0C">
                            <Avatar />
                        </el-icon>
                    </div>
                    <div class="card-header-title">个性化推荐</div>
                </div>
            </template>

            <div class="card-music">
                <div>
                    <div class="music-cover music-cover-person" @click="toDailyPlayList">
                        <div class="week"> {{ getWeek() }} </div>
                        <div class="day"> {{ day }} </div>
                    </div>
                    <div class="music-title" @click="toDailyPlayList">
                        每日歌曲推荐
                    </div>
                    <div class="recommend-content">
                        根据你的口味生成，<br>每天6:00更新
                    </div>
                </div>

                <div>
                    <div class="music-cover music-cover-radar"
                        :style="{ background: `url(/public/cover/${Math.floor(Math.random() * 40) + 1}.jpg)`, backgroundSize: 'cover' }">
                        <div class="play-info">
                            <div class="radar-icon"></div>

                            <div class="play-button">
                                <el-button @click="toPrivacyRadar">
                                    <el-icon size="40">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </div>

                            <div class="play-count">
                                <el-text>
                                    <el-icon>
                                        <Headset />
                                    </el-icon>
                                    {{ Math.floor(Math.random() * 5000) }}
                                </el-text>
                            </div>
                        </div>
                    </div>
                    <div class="music-title" @click="toPrivacyRadar">
                        私人雷达
                    </div>
                    <div class="recommend-content">
                        猜你喜欢
                    </div>
                </div>

                <div v-for="(list, i) in displayPlayList" :key="i">
                    <div class="music-cover" :style="displayPlayListCover[i]">
                        <div class="play-info">
                            <div class="play-button">
                                <el-button
                                    @click="() => { router.push({ name: 'list', params: { id: '=' + list.id } }) }">
                                    <el-icon size="40">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </div>
                            <div class="play-count">
                                <el-text>
                                    <el-icon>
                                        <Headset />
                                    </el-icon>
                                    {{ Math.floor(Math.random() * 5000) }}
                                </el-text>
                            </div>
                        </div>
                    </div>
                    <div class="music-title"
                        @click="() => { router.push({ name: 'list', params: { id: '=' + list.id } }) }">
                        {{ list.name }}
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMusicStore } from '../../../stores/music'
import { useUserStore } from '../../../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const musicStore = useMusicStore()

const dailyPlayList = ref([])
const privacyRadar = ref([])
const displayPlayList = ref([])

for (let i = 0; i < 2; i++) {
    let k = Math.floor(Math.random() * musicStore.playList.length)
    let isExist = displayPlayList.value.find(item => item.id === musicStore.playList[k].id)
    if (isExist || musicStore.playList[k].belong_user || musicStore.playList[k].id.indexOf('privacyRadar') != -1) {
        i--
        continue
    }
    displayPlayList.value.push(musicStore.playList[k])
}

const displayPlayListCover = ref([])
for (let i = 0; i < 2; i++) {
    if (displayPlayList.value[i].cover) {
        displayPlayListCover.value.push({
            background: `url(${displayPlayList.value[i].cover})`,
            backgroundSize: 'cover'
        })
    } else if (displayPlayList.value[i].audios?.length > 0 && displayPlayList.value[i].audios[0].audio?.cover) {
        displayPlayListCover.value.push({
            background: `url(${displayPlayList.value[i].audios[0].audio.cover})`,
            backgroundSize: 'cover'
        })
    } else {
        displayPlayListCover.value.push({
            background: 'url(/public/cover/default-playlist-cover.jpg)',
            backgroundSize: 'cover'
        })
    }
}

const props = defineProps({
    isShow: {
        typeof: String,
        default: "true"
    }
})

const week = ref(new Date().getDay())
const day = ref(new Date().getDate())

const getWeek = () => {
    switch (week.value) {
        case 0:
            return '星期日'
        case 1:
            return '星期一'
        case 2:
            return '星期二'
        case 3:
            return '星期三'
        case 4:
            return '星期四'
        case 5:
            return '星期五'
        case 6:
            return '星期六'
    }
}

function getCurrentTime() {
    const now = new Date(); // 获取当前日期和时间
    const hours = now.getHours(); // 获取小时 (0-23)
    const minutes = now.getMinutes(); // 获取分钟 (0-59)

    return [hours, minutes]
}

function getNowFormatDate() {
    let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate() // 获取当前日(1-31)
    if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
    if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0

    return `${year}-${month}-${strDate}`
}

const createDailyPlayList = () => {
    let list = []
    for (let i = 0; i < 30; i++) {
        let rand = Math.floor(Math.random() * musicStore.audioInfo.length)
        let isExist = list.find(item => item.id == musicStore.audioInfo[rand].id)
        if (isExist) {
            i--
            continue
        }

        list.push(musicStore.audioInfo[rand])
    }

    dailyPlayList.value = {
        name: '每日推荐',
        id: `dailyPlayList_${Date.now()}`,
        cover: '',
        creator_id: '3638546782',
        intro: '每日推荐',
        label: ['推荐'],
        create_time: getNowFormatDate(),
        audios: list,
        belong_user: localStorage.getItem('acc_id')
    }

    musicStore.addPlayList(dailyPlayList.value)
}

const toDailyPlayList = () => {
    let time = getCurrentTime()
    let date = getNowFormatDate().substring(5)
    console.log(date);

    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    let isExist = musicStore.playList.find(item => item.belong_user == user.acc_id)
    dailyPlayList.value = isExist
    console.log(dailyPlayList.value);

    if (!isExist || (isExist && isExist.create_time.substring(5) != date) || (time[0] == 6 && time[1] == 0)) {
        dailyPlayList.value = []
        createDailyPlayList()
    }

    router.push({ name: 'list', params: { id: '=' + dailyPlayList.value.id } })
}

const toPrivacyRadar = () => {
    let isExist = musicStore.getPlayListId('privacyRadar')

    let list = []
    for (let i = 0; i < 30; i++) {
        let rand = Math.floor(Math.random() * musicStore.audioInfo.length)
        let isExist = list.find(item => item.id == musicStore.audioInfo[rand].id)
        if (isExist) {
            i--
            continue
        }

        list.push(musicStore.audioInfo[rand])
    }

    if (isExist) {
        isExist.audios = list
        isExist.create_time = getNowFormatDate()

        router.push({ name: 'list', params: { id: '=' + isExist.id } })
    }
    else {
        privacyRadar.value = {
            name: '私人雷达',
            id: 'privacyRadar',
            cover: '',
            creator_id: '3638546782',
            intro: '私人雷达',
            label: ['雷达'],
            create_time: getNowFormatDate(),
            audios: list,
        }

        musicStore.addPlayList(privacyRadar.value)
    }
}

</script>

<style lang="scss" scoped>
.personRecommend {
    width: 100%;

    :deep(.el-card__header) {
        width: 95%;
        padding-left: 20px;
        padding-right: 20px;
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
        justify-content: flex-start;
        gap: 15px;

        .card-header-icon {
            display: flex;
            align-items: center;
        }

        .card-header-title {
            display: flex;
            align-items: center;
            line-height: 1;
            font-size: 20px;
        }
    }

    .card-music {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        row-gap: 40px;

        .music-cover {
            aspect-ratio: 1 / 1;
            width: 100%;
            background: green;
            background: url('/public/img/Cover.jpg');
            background-size: cover;
            border-radius: 5%;
            transform: scale(1);
            transition: all 0.3s ease;

            &.music-cover-person {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(to bottom,
                        #C20C0C,
                        #dd6f6f,
                        #56a6e3);
                color: white;

                .week {
                    font-size: 2vw;
                    text-align: center;
                }

                .day {
                    font-size: 5vw;
                }

                &:hover {
                    cursor: pointer;
                }
            }

            &.music-cover-radar {
                background: url('/public/cover/11.jpg') no-repeat center;
                background-size: cover;
            }

            .play-info {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;

                .radar-icon {
                    width: 30px;
                    height: 40px;
                    background: url('/src/assets/headerLogo.svg') no-repeat center;
                    background-size: cover;
                    margin-left: 3px;
                    margin-top: 3px;
                }

                .play-button {
                    height: 100%;
                    backdrop-filter: blur(0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    visibility: hidden;

                    .el-button {
                        background: none;
                        border: none;
                        padding: 0;

                        .el-icon {
                            color: white;
                        }

                        &:hover {
                            .el-icon {
                                color: #C20C0C;
                                transition: all 0.5s;
                            }
                        }
                    }
                }

                .play-count {
                    height: 20px;
                    background: rgba(0, 0, 0, 0.3);
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    backdrop-filter: blur(5px);

                    .el-text {
                        display: flex;
                        color: white;
                        align-items: center;
                        justify-content: center;
                        gap: 5px;
                    }
                }
            }

            &:hover {
                transform: scale(1.1);

                .play-button {
                    visibility: visible;
                }

                .radar-icon {
                    height: 0;
                    visibility: hidden;
                }

                .play-info {
                    border-radius: inherit;
                    backdrop-filter: blur(10px);
                }
            }
        }

        .music-title {
            font-size: 15px;
            padding-top: 6px;
            color: black;

            &:hover {
                color: #C20C0C;
                transition: all 0.3s;
                cursor: pointer;
            }
        }

        .recommend-content {
            font-size: 13px;
            padding-top: 3px;
            color: grey;
        }
    }
}
</style>