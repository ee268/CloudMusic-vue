<template>
    <div class="playMusic">
        <div v-show="false" class="aplayer"></div>

        <div class="control-btn">
            <div class="pre-play-btn">
                <el-button @click="preMusic">
                    <el-icon size="25">
                        <CaretLeft />
                    </el-icon>
                </el-button>
            </div>

            <div class="play-btn" @click="playMusic">
                <el-button>
                    <el-icon v-show="!isPlaying" size="45">
                        <VideoPlay />
                    </el-icon>
                    <el-icon v-show="isPlaying" size="45">
                        <VideoPause />
                    </el-icon>
                </el-button>
            </div>

            <div class="next-play-btn">
                <el-button @click="nextMusic">
                    <el-icon size="25">
                        <CaretRight />
                    </el-icon>
                </el-button>
            </div>
        </div>

        <div class="music-info">
            <div @click="toSongPage" class="music-cover" :style="getCurrentSongCover()">
                <div v-show="!currentSongCover" class="default-cover"></div>
            </div>
            <div class="music-text-progress">
                <div class="music-text">
                    <div>{{ curPlayListActual.length > curPlayIndex ? curPlayListActual[curPlayIndex].name : '' }}</div>
                    <div>{{ curPlayListActual.length > curPlayIndex ? curPlayListActual[curPlayIndex].artist : '' }}</div>
                </div>
                <div class="music-progress">
                    <div class="progress">
                        <el-slider @change="changePlayTime" @click="clickChangePlayTime" v-model="progressTime"
                            :show-tooltip="false" />
                    </div>
                    <div class="time">
                        {{ musicCurrentTime[0] + ':' + musicCurrentTime[1] }} / {{ musicTotalTime[0] + ':' +
                            musicTotalTime[1] }}
                    </div>
                </div>
            </div>

            <div class="music-volume">
                <el-dropdown popper-class="volumeDropDown" trigger="click">
                    <el-button>
                        <el-icon size="20">
                            <Headset />
                        </el-icon>
                    </el-button>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-slider class="volumeSlider" @change="changeVolume" @click="clickChangeVolume"
                                    v-model="volume" :vertical="true" style="height: 100px;"></el-slider>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <div class="playList">
                <el-dropdown popper-class="playListDropdown" trigger="click">
                    <el-button>
                        <el-icon size="20">
                            <Tickets />
                        </el-icon>
                    </el-button>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="playListClick(index)" :class="{ 'playListOnPlay': true }"
                                v-for="(song, index) in curPlayListActual" :key="index">
                                <el-icon v-show="curPlayIndex == index" size="20" color="#C20C0C">
                                    <CaretRight />
                                </el-icon>

                                <el-icon v-show="curPlayIndex != index" size="20" color="#C20C0C">
                                </el-icon>

                                <div class="song-item">
                                    <div>
                                        {{ song.name }}
                                    </div>

                                    <div>
                                        {{ song.artist }}
                                    </div>

                                    <div>
                                        {{ song.playTime }}
                                    </div>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { useMusicStore } from './stores/music'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const musicStore = useMusicStore()
const { audio, audioList, curPlayListActual, isPlaying } = storeToRefs(musicStore)

const toSongPage = () => {
    let id = 0

    for (let i = 0; i < musicStore.audioInfo.length; i++) {
        if (musicStore.curPlayListActual[curPlayIndex.value].url == musicStore.audioInfo[i].audio.url) {
            id = musicStore.audioInfo[i].id

            break
        }
    }

    router.push({
        name: 'song',
        params: { id: '=' + id }
    })
}

const playListClick = (index) => {
    musicStore.audio.list.switch(index)
    musicStore.isPlaying = true
    musicStore.audio.play()
}

const currentSongCover = computed(() => {
    return curPlayListActual.value[curPlayIndex.value]?.cover
})

const getCurrentSongCover = () => {    
    return currentSongCover.value
        ? { background: `url(${currentSongCover.value})`, backgroundSize: 'cover' }
        : {}
}

// const audioPlayTime = ref([])

// for (let i = 0; i < musicStore.curPlayListActual.length; i++) {
//     audioPlayTime.value.push('00:00')
// }

// for (let i = 0; i < musicStore.curPlayListActual.length; i++) {
//     let audio = new Audio(musicStore.curPlayListActual[i].url);
//     audio.addEventListener('loadedmetadata', function () {
//         audioPlayTime.value[i] = (Math.floor(audio.duration / 60).toString().padStart(2, '0') + ':' + Math.floor(audio.duration % 60).toString().padStart(2, '0'))
//     })
// }

// const isExistCover = ref([])

// for (let i = 0; i < musicStore.curPlayListActual.length; i++) {
//     if (musicStore.curPlayListActual[i].cover) {
//         isExistCover.value.push({ background: 'url(' + musicStore.curPlayListActual[i].cover + ')', backgroundSize: 'cover' })
//     } else {
//         isExistCover.value.push({})
//     }
// }

const volume = ref(100)

let musicTotalTime = ref(['00', '00'])
let musicCurrentTime = ref(['00', '00'])
let progressTime = ref(0)
const curPlayIndex = ref(0)

onMounted(() => {
    musicStore.audio = new APlayer({
        container: document.querySelector('.aplayer'),
        mini: true,
        audio: musicStore.curPlayList
    })

    musicStore.audio.on('loadeddata', function () {
        musicTotalTime.value = [Math.floor(musicStore.audio.audio.duration / 60).toString().padStart(2, '0'), Math.floor(musicStore.audio.audio.duration % 60).toString().padStart(2, '0')]
        musicStore.audio.volume(1, true);
    })

    musicStore.audio.on('timeupdate', function () {
        musicCurrentTime.value = [Math.floor(musicStore.audio.audio.currentTime / 60).toString().padStart(2, '0'), Math.floor(musicStore.audio.audio.currentTime % 60).toString().padStart(2, '0')]
        curPlayIndex.value = musicStore.audio.list.index
        progressTime.value = Math.floor(musicStore.audio.audio.currentTime / musicStore.audio.audio.duration * 100)
    })
})

const clickChangeVolume = () => {
    musicStore.audio.volume(volume.value / 100, true)
}

const changeVolume = () => {
    musicStore.audio.volume(volume.value / 100, true)
}

const clickChangePlayTime = () => {
    musicStore.audio.play()
    musicStore.isPlaying = true
    musicStore.audio.seek(musicStore.audio.audio.duration * (progressTime.value / 100))
}

const changePlayTime = () => {
    musicStore.audio.play()
    musicStore.isPlaying = true
    musicStore.audio.seek(musicStore.audio.audio.duration * (progressTime.value / 100))
}

const preMusic = () => {
    musicStore.audio.skipBack()
    setTimeout(() => {
        musicStore.audio.play()
    }, 500)
    musicStore.isPlaying = true
}

const playMusic = () => {
    if (!musicStore.isPlaying) {
        musicStore.audio.play()
    }
    else {
        musicStore.audio.pause()
    }
    musicStore.isPlaying = !musicStore.isPlaying
}

const nextMusic = () => {
    musicStore.audio.skipForward()
    setTimeout(() => {
        musicStore.audio.play()
    }, 500)
    musicStore.isPlaying = true
}

</script>

<style lang="scss" scoped>
.playMusic {
    flex: 1;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .aplayer {
        display: flex;
        height: 40px;
        width: 40px;
        margin: 0;

        :deep(.aplayer-body) {

            .aplayer-pic {
                width: 40px;
                height: 40px;
            }
        }
    }

    .control-btn {
        display: flex;
        flex-direction: row;
        gap: 7px;

        .pre-play-btn {
            .el-button {
                padding: 0;
                display: flex;
                width: 30px;
                background: transparent;
                border: 2.4px solid white;
                border-radius: 50%;
                color: white;

                &:hover {
                    border-color: #C20C0C;
                    color: #C20C0C;
                    transition: all 0.3s ease;
                }
            }
        }

        .play-btn {
            .el-button {
                background: transparent;
                border: none;
                padding: 0;
                display: flex;
                color: white;

                &:hover {
                    color: #C20C0C;
                    transition: all 0.3s ease;
                }
            }
        }

        .next-play-btn {
            .el-button {
                padding: 0;
                display: flex;
                width: 30px;
                background: transparent;
                border: 2.4px solid white;
                border-radius: 50%;
                color: white;

                &:hover {
                    border-color: #C20C0C;
                    color: #C20C0C;
                    transition: all 0.3s ease;
                }
            }
        }
    }

    .music-info {
        margin-left: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        .music-cover {
            display: flex;
            width: 40px;
            height: 40px;
            border-radius: 6px;
            background: #F5F5F5;

            .default-cover {
                width: 100%;
                height: 100%;
                background: url('/public/cover/defaultCover.svg');
                background-size: cover;
            }

            &:hover {
                cursor: pointer;
            }
        }

        .music-text-progress {
            display: flex;
            flex-direction: column;
            padding-top: 5px;
            margin-left: 20px;

            .music-text {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                gap: 10px;

                &>div:first-child {
                    font-size: 14px;
                    color: white;
                    font-weight: bold;

                    &:hover {
                        cursor: pointer;
                        text-decoration-line: underline;
                    }
                }

                &>div:last-child {
                    font-size: 12px;
                    color: #7D7D7D;

                    &:hover {
                        cursor: pointer;
                        text-decoration-line: underline;
                    }
                }
            }

            .music-progress {
                display: flex;
                flex-direction: row;

                .progress {
                    width: 500px;

                    :deep(.el-slider__bar) {
                        background-color: #C70C0C;
                    }

                    :deep(.el-slider__button) {
                        width: 17px;
                        height: 17px;
                        background-color: #C70C0C;
                        border: 5px solid white;
                    }
                }

                .time {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: auto;
                    margin-left: 10px;
                    color: white;
                    font-size: 13px;
                }
            }
        }

        .music-volume {
            margin-left: 15px;
            display: flex;
            flex-direction: row;

            .el-button {
                display: flex;
                padding: 0;
                border: none;
                background: none;
                color: #878787;

                &:hover {
                    color: white;
                }
            }
        }

        .playList {
            margin-left: 10px;
            display: flex;
            flex-direction: row;

            .el-button {
                display: flex;
                padding: 0;
                border: none;
                background: none;
                color: #878787;

                &:hover {
                    color: white;
                }
            }
        }
    }
}

.volumeSlider {
    :deep(.el-slider__bar) {
        background-color: #C70C0C;
    }

    :deep(.el-slider__button) {
        width: 15px;
        height: 15px;
        background-color: #C70C0C;
        border: 5px solid white;
    }
}
</style>

<style lang="scss">
.volumeDropDown {

    .el-dropdown-menu {
        background: #2B2B2B !important;
    }

    .el-dropdown-menu__item {
        color: rgb(190, 189, 189) !important;
        background: #2B2B2B !important;
    }

    .el-dropdown__popper {
        background: #2B2B2B !important;
    }

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

.playListDropdown {
    height: 350px;
    overflow-y: scroll;

    .el-dropdown-menu {
        background: #2B2B2B !important;
    }

    .el-dropdown-menu__item {
        color: rgb(190, 189, 189) !important;
        background: #2B2B2B !important;

        .song-item {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 25px;

            &>div:first-child {
                flex: 1;
                margin-right: 140px;
            }
        }

        &:hover {
            color: white !important;
            background: #151615 !important;
        }
    }

    .el-dropdown__popper {
        background: #2B2B2B !important;
    }

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