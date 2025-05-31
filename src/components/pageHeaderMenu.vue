<template>
    <el-menu router mode="horizontal" :ellipsis="false" class="menu" :ref="(event) => { mainMenuRef = event }">

        <el-menu-item index="0" :route="{ name: 'find' }">
            发现音乐
            <div v-show="isMenuActive[0]" class="activeIcon"></div>
        </el-menu-item>

        <el-menu-item index="1" :route="{ name: 'my' }">
            我的音乐
            <div v-show="isMenuActive[1]" class="activeIcon"></div>
        </el-menu-item>

        <el-menu-item index="2" :route="{ name: 'friend' }">
            关注
            <div v-show="isMenuActive[2]" class="activeIcon"></div>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../stores/menu'

const router = useRouter()

const mainMenuRef = ref()

const Menu = useMenuStore()
const { menuRef, isMenuActive, setMenuRef } = storeToRefs(Menu)

onMounted(() => {
    Menu.setMenuRef(mainMenuRef.value)
    
    router.beforeEach((to, from, next) => {
        if (!to.meta.subMenu) {
            console.log(to.meta);
            Menu.menuRef.updateActiveIndex(to.meta.index)
            Menu.isMenuActive = [false, false, false]
            Menu.isMenuActive[Number(to.meta.index)] = true
        }
        if (to.fullPath.indexOf('find') != -1) {
            Menu.menuRef.updateActiveIndex('0')
            Menu.isMenuActive = [true, false, false]
        }

        next()
    })
})

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

        &.is-active {
            background-color: #000000 !important;
            color: #fff !important;
        }
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