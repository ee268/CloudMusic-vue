<template>
    <div class="container" :ref="($event) => container = $event">
        <el-button @click="prevCarousel">
            <el-icon>
                <ArrowLeft />
            </el-icon>
        </el-button>
        <div class="carouselContainer">
            <el-carousel class="elCarousel" height="200px" :autoplay="false" arrow="never" indicator-position="none"
                :ref="($event) => carousel = $event">

                <el-carousel-item v-for="i in 2" :key="i">
                    <div class="albumContainer" v-for="i in 5" :key="i">
                        <div class="album">
                            <div class="albumCover">
                                <div class="play-button">
                                    <el-button>
                                        <el-icon size="40">
                                            <VideoPlay />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                            <div class="albumTitle">标题标题标题</div>
                            <div class="albumAuthor">作者作者</div>
                        </div>
                    </div>
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

const carousel = ref(null)

const prevCarousel = () => {
    carousel.value.prev()
}

const nextCarousel = () => {
    carousel.value.next()
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
    background: #F5F5F5;
    border-radius: 5px;

    .carouselContainer {
        width: 100%;

        .el-carousel__indicator {
            background-color: transparent;
            cursor: pointer;
        }

        :deep(.elCarousel) {

            .el-carousel__indicator--horizontal .el-carousel__button {
                width: 8px;
                height: 8px;
                margin-left: 20px;
                background: rgba(255, 255, 255);
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
            display: flex;
            justify-content: center;
            align-items: center;
            justify-items: center;
            gap: 20px;

            @media (max-width: 1400px) {
                gap: 80px;
            }

            @media (max-width: 1200px) {
                gap: 50px;
            }

            .albumContainer {

                .album {
                    display: flex;
                    flex-direction: column;

                    .albumCover {
                        width: 120px;
                        height: 120px;
                        backdrop-filter: blur(0);
                        background: url('/public/cover/1.jpg');
                        background-size: cover;
                        border-radius: 5%;

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

                        &:hover {
                            .play-button {
                                border-radius: 5%;
                                backdrop-filter: blur(10px);
                                visibility: visible;
                            }

                            cursor: pointer;
                            transform: scale(1.1);
                            transition: all 0.3s ease;
                        }
                    }

                    .albumTitle {
                        margin-top: 5px;
                        color: black;
                        font-size: 14px;

                        &:hover {
                            color: #C20C0C;
                            transition: color 0.5s ease;
                            cursor: pointer;
                        }
                    }

                    .albumAuthor {
                        font-size: 13px;
                        color: #666666;
                    }
                }
            }

            &.is-animating {
                transition: transform 1s ease-in-out;
            }
        }
    }

    .el-button {
        border: none;
        background: none;
        padding: 0;

        .el-icon {
            font-size: 2rem;
            color: #898989;

            &:hover {
                color: #C20C0C;
            }
        }
    }
}
</style>