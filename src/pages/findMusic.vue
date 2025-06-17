<template>
    <div>
        <pageHeaderSubMenu paddingTop="7px" paddingBottom="7px">
            <template #item>
                <el-menu-item index="0" :route="{ name: 'recommend' }">推荐</el-menu-item>

                <el-menu-item index="1" :route="{ name: 'playList' }">歌单</el-menu-item>

                <el-menu-item index="2" :route="{ name: 'artist' }">歌手</el-menu-item>

                <el-menu-item index="3" :route="{ name: 'album' }">新曲上架</el-menu-item>
            </template>
        </pageHeaderSubMenu>
        <router-view></router-view>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '../components/pageHeaderSubMenu.vue'
import { onMounted } from 'vue'
import { useMenuStore } from '../stores/menu'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const Menu = useMenuStore()
const { setSubMenuRef } = storeToRefs(Menu)

const router = useRouter()

router.beforeEach((to, from, next) => {
    if (to.fullPath.indexOf('recommend') != -1 && to.fullPath.indexOf('Artist') == -1) {
        Menu.subMenuRef.updateActiveIndex(0)
    }
    else if (to.fullPath.indexOf('playList') != -1) {
        Menu.subMenuRef.updateActiveIndex(1)
    }
    else if (to.fullPath.indexOf('artist') != -1) {
        Menu.subMenuRef.updateActiveIndex(2)
    }
    else if (to.fullPath.indexOf('album') != -1) {
        Menu.subMenuRef.updateActiveIndex(3)
    }

    next()
})

onMounted(() => {
    Menu.subMenuRef.updateActiveIndex(router.currentRoute.value.meta.index)
})

</script>

<style lang="scss" scoped></style>