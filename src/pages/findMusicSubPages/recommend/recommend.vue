<template>
    <el-container>
        <el-header>
            <recommendCarousel></recommendCarousel>
        </el-header>
        <el-main>
            <hotRecommend></hotRecommend>
            <personRecommend :isShow="isLogin"></personRecommend>
            <newAlbum></newAlbum>
        </el-main>
    </el-container>
</template>

<script setup>
import recommendCarousel from './recommendCarousel.vue'
import hotRecommend from './hotRecommend.vue'
import personRecommend from './personRecommend.vue'
import newAlbum from './newAlbum.vue'
import { useCounterStore } from '@/stores/store.js'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()

const {
    isLogin
} = storeToRefs(counter)

</script>

<style lang="scss" scoped>
.el-container {
    height: 100%;

    .el-header {
        height: auto;
        padding: 0;
    }

    .el-main {
        width: 55%;
        padding: 0;
        display: flex;
        background: green;
        flex-direction: column;
        align-items: center;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>