<template>
    <div class="song">
        <el-card>
            <template #header>
                <div>
                    单曲
                </div>
                {{ musicInfo.name }}
            </template>

            <div class="song-cover">
                <div class="cover" :style="cover">
                    <div v-show="!cover.background" class="cover default-cover">
                    </div>
                </div>
            </div>

            <div class="song-info">
                <div class="singer">
                    歌手：
                    <div class="singer singer-name">
                        {{ musicInfo.artist }}
                    </div>
                </div>
                <div class="album">
                    所属专辑：
                    <div class="album album-name">
                        {{ '无' }}
                    </div>
                </div>

                <div class="music-btn">
                    <div class="play-btn">
                        <el-button @click="playMusic" type="primary">
                            <el-icon size="20">
                                <VideoPlay />
                            </el-icon>
                            播放
                        </el-button>
                        <el-button @click="addToAudioList" type="primary">
                            <el-icon size="20">
                                <Plus />
                            </el-icon>
                        </el-button>
                    </div>

                    <div class="collect-btn">
                        <el-button>
                            <el-icon size="20">
                                <FolderAdd />
                            </el-icon>
                            收藏
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMusicStore } from '../stores/music'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()

const musicStore = useMusicStore()

const musicInfo = ref('')
const cover = ref('')
// const playingAnimation = ref(musicStore.audio.list.index == judgeAudioEqually())

// musicStore.audio.on('play', () => {
//     const equalIndex = judgeAudioEqually()

//     if (musicStore.audio.list.index == equalIndex && !playingAnimation.value) {
//         playingAnimation.value = true
//     }
// })

// musicStore.audio.on('pause', () => {
//     playingAnimation.value = false
// })

//判断当前歌曲页面的歌曲是否已存在播放列表中
function judgeAudioEqually() {
    let curAudioList = musicStore.audio.list.audios

    for (let i = 0; i < curAudioList.length; i++) {
        if (curAudioList[i].name == musicInfo.value.name &&
            curAudioList[i].artist == musicInfo.value.artist &&
            curAudioList[i].cover == musicInfo.value.cover &&
            curAudioList[i].url == musicInfo.value.url) {

            return i
        }
    }

    return -1
}

const addToAudioList = () => {
    const equalIndex = judgeAudioEqually()

    if (equalIndex != -1) {
        musicStore.audio.list.switch(equalIndex)
        musicStore.audio.pause()
        musicStore.isPlaying = false

        ElMessage({
            showClose: true,
            message: '已添加到播放列表',
            type: 'primary',
            plain: true,
            duration: '2500'
        })

        return
    }

    musicStore.audio.list.add(musicInfo.value)
    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'primary',
        plain: true,
        duration: '2500'
    })
}

const playMusic = () => {
    const equalIndex = judgeAudioEqually()

    if (equalIndex != -1) {
        musicStore.audio.list.switch(equalIndex)
        musicStore.audio.play()
        musicStore.isPlaying = true

        ElMessage({
            showClose: true,
            message: '开始播放',
            type: 'primary',
            plain: true,
            duration: '2500'
        })
    }
}

router.beforeEach(async(to, from, next) => {
    if (to.fullPath.indexOf('song') != -1) {
        musicInfo.value = musicStore.getAudioInfo(to.params.id.substring(1))
        musicInfo.value = musicInfo.value.audio
        cover.value = musicInfo.value.cover

        if (!cover.value) {
            cover.value = {}
        }
        else {
            cover.value = { background: 'url(' + musicInfo.value.cover + ')', backgroundSize: 'cover' }
        }
    }
    next()
})

onMounted(() => {
    if (router.currentRoute.value.fullPath.indexOf('song') != -1) {
        musicInfo.value = musicStore.getAudioInfo(router.currentRoute.value.params.id.substring(1))
        musicInfo.value = musicInfo.value.audio
        cover.value = musicInfo.value.cover

        if (!cover.value) {
            cover.value = {}
        }
        else {
            cover.value = { background: 'url(' + musicInfo.value.cover + ')', backgroundSize: 'cover' }
        }
    }
})

</script>

<style lang="scss" scoped>
@keyframes playingRotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.playingAnimation {
    animation: playingRotate 4s linear infinite;
}

.song {
    width: 55%;
    background: pink;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;

    :deep(.el-card__header) {
        padding: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        border: none;
        font-size: 22px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 15px;

        &>div:first-child {
            font-size: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 55px;
            height: 30px;
            background: #C20C0C;
            color: white;
            border-radius: 5px;
        }
    }

    .el-card {
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        box-shadow: none;
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .song-cover {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 250px;
            height: 250px;
            background: linear-gradient(135deg, black, rgb(83, 83, 83));
            box-shadow: 0px 0px 5px black;
            border-radius: 50%;
            margin: 70px 0 100px 0;

            .cover {
                width: 200px;
                height: 200px;
                background: #F5F5F5;
                border-radius: 50%;

                &.default-cover {
                    width: 200px;
                    height: 200px;
                    background: url('/public/cover/defaultCover.svg') no-repeat center;
                    background-size: cover;
                    border-radius: 50%;
                }
            }
        }

        .song-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: 30px;

            .singer {
                display: flex;
                flex-direction: row;
                color: #999;

                &.singer-name {
                    color: #0C73C2;
                    cursor: pointer;

                    &:hover {
                        text-decoration-line: underline;
                    }
                }
            }

            .album {
                display: flex;
                flex-direction: row;
                color: #999;

                &.album-name {
                    color: #0C73C2;
                    cursor: pointer;

                    &:hover {
                        text-decoration-line: underline;
                    }
                }
            }

            .music-btn {
                display: flex;
                flex-direction: row;
                gap: 20px;
                margin-top: 20px;

                .play-btn {
                    display: flex;
                    flex-direction: row;

                    .el-button {
                        border-radius: 0;
                        margin: 0;

                        &:first-child {
                            border-top-left-radius: 4px;
                            border-bottom-left-radius: 4px;
                            border-right: 1px solid #235B92;
                        }

                        &:last-child {
                            border-top-right-radius: 4px;
                            border-bottom-right-radius: 4px;
                            border-left: 2px solid #5092CF;
                        }
                    }
                }

                .collect-btn {
                    display: flex;
                    justify-content: center;
                }
            }
        }
    }
}
</style>