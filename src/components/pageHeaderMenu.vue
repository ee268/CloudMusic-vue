<template>
    <el-menu router mode="horizontal" :ellipsis="false" class="menu" @select="handleMenuSelect"
        :default-active="isMenuActiveLoad">

        <el-menu-item index="0" :class="{ 'isActive': isMenuActive[0]['find'] }" :route="{ name: 'find' }">
            发现音乐
            <div v-show="isMenuActive[0]['find']" class="activeIcon"></div>
        </el-menu-item>

        <el-menu-item index="1" :class="{ 'isActive': isMenuActive[1]['my'] }" :route="{ name: 'my' }">
            我的音乐
            <div v-show="isMenuActive[1]['my']" class="activeIcon"></div>
        </el-menu-item>

        <el-menu-item index="2" :class="{ 'isActive': isMenuActive[2]['friend'] }" :route="{ name: 'friend' }">
            关注
            <div v-show="isMenuActive[2]['friend']" class="activeIcon"></div>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/store.js'
import { storeToRefs } from 'pinia'

const counter = useCounterStore()

const {
    isMenuActive,
    handleSelect
} = storeToRefs(counter)

const isMenuActiveLoad = ref(localStorage.getItem('menuActive'))

if (isMenuActiveLoad) {
    counter.handleSelect(isMenuActiveLoad.value)
}
else {
    isMenuActiveLoad.value = 0
    counter.handleSelect(0)
}

const handleMenuSelect = (index) => {
    counter.handleSelect(index)
}

</script>

<style lang="scss" scoped>
.menu {
    background-color: #242424 !important;
    border: none;
    width: 100%;

    .el-menu-item {
        background-color: #242424 !important;
        color: rgb(190, 189, 189) !important;
        border: none;

        &:hover {
            background-color: #000000 !important;
            color: #fff !important;
        }
    }

    .isActive {
        background-color: #000000 !important;
        color: #fff !important;
        border: none;
    }

    .disableActive {
        background-color: #242424 !important;
        color: rgb(190, 189, 189);
        border: none;
    }

    .activeIcon {
        border-right: 5px solid transparent;
        border-bottom: 6px solid #C20C0C;
        border-left: 5px solid transparent;
        position: absolute;
        bottom: 0%;
    }
}
</style>