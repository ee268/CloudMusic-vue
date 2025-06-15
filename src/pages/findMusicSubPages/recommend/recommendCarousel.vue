<template>
    <div class="container" :ref="($event) => container = $event">
        <div class="bgBlur"></div>

        <el-button @click="prevCarousel">
            <el-icon>
                <ArrowLeft />
            </el-icon>
        </el-button>
        <div class="carouselContainer">
            <el-carousel class="elCarousel" @change="changeContainerBg" trigger="click" height="300px" :interval="3000"
                arrow="never" indicator-position="" :ref="($event) => carousel = $event">

                <el-carousel-item class="carouselImg" v-for="song in randSong" :key="song"
                    @click="toSingleSongPage(song)">
                    <div :style="{
                        width: '100%',
                        height: '100%',
                        background: `url(${song.audio.cover})`,
                        backgroundSize: 'cover'
                    }"></div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <el-button @click="nextCarousel">
            <el-icon>
                <ArrowRight />
            </el-icon>
        </el-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMusicStore } from '@/stores/music'
import { useRouter } from 'vue-router'

const route = useRouter()

const musicStore = useMusicStore()

const carousel = ref(null)
const container = ref(null)

const randSong = ref([])
for (let i = 0; i < 5; i++) {
    let k = Math.floor(Math.random() * musicStore.audioInfo.length)
    if (!musicStore.audioInfo[k].audio.cover) {
        i--
        continue
    }
    randSong.value.push(musicStore.audioInfo[k])
}

onMounted(() => {
    container.value.style.backgroundImage = `url(${randSong.value[carousel.value.activeIndex].audio.cover})`
})

const changeContainerBg = (cur, pre) => {
    container.value.style.backgroundImage = `url(${randSong.value[carousel.value.activeIndex].audio.cover})`
}

const prevCarousel = () => {
    carousel.value.prev()
}

const nextCarousel = () => {
    carousel.value.next()
}

const toSingleSongPage = (song) => {
    route.push({ name: 'song', params: { id: '=' + song.id } })
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    gap: 30px;

    .bgBlur {
        position: absolute;
        background-color: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(50px);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
    }

    .carouselContainer {
        width: 55%;

        .el-carousel__indicator {
            background-color: transparent;
            cursor: pointer;
        }

        :deep(.elCarousel) {
            .el-carousel__indicator--horizontal .el-carousel__button {
                width: 8px;
                height: 8px;
                margin-left: 20px;
                background: rgba(255, 255, 255, );
                border-radius: 50%;
                opacity: 0.5;
            }

            .el-carousel__indicator--horizontal.is-active .el-carousel__button {
                background: #C20C0C;
                border-radius: 50%;
                opacity: 1;
            }
        }

        .el-carousel__item {
            // opacity: 0.3;
            filter: blur(10px);
            cursor: pointer;

            &.is-animating {
                transition: filter 1s ease-in-out !important;
                filter: blur(0px);
            }
        }
    }

    .el-button {
        border: none;
        background: none;

        .el-icon {
            font-size: 2.6rem;
            color: rgb(244, 240, 240);

            &:hover {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 50%;
            }
        }
    }
}
</style>