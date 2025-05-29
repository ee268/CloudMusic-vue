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

                <el-carousel-item class="carouselImg" v-for="i in 5" :key="i">
                    <el-image :src="'/public/img/img' + (i + 1) + '.jpg'" fit="cover" lazy/>
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

const container = ref(null)

onMounted(() => {
    container.value.style.backgroundImage = `url(/public/img/img${carousel.value.activeIndex + 2}.jpg)`
})

const changeContainerBg = (cur, pre) => {
    container.value.style.backgroundImage = `url(/public/img/img${carousel.value.activeIndex + 2}.jpg)`
}

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
    gap: 30px;

    .bgBlur {
        position: absolute;
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
            opacity: 0.3;

            &.is-animating {
                transition: opacity 2s ease-in-out !important;
                opacity: 1;
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