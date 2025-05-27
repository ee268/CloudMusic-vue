<template>
    <div>
        <pageHeaderSubMenu activeIndex="1" paddingTop="7px" paddingBottom="7px">
            <template #item>
                <el-menu-item index="1" :route="{name: 'recommend'}">推荐</el-menu-item>

                <el-menu-item index="2" :route="{name: 'playList'}">歌单</el-menu-item>

                <el-menu-item index="3" :route="{name: 'artist'}">歌手</el-menu-item>

                <el-menu-item index="4" :route="{name: 'album'}">新碟上架</el-menu-item>
            </template>
        </pageHeaderSubMenu>

        <router-view></router-view>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '../components/pageHeaderSubMenu.vue'

</script>

<style lang="scss" scoped></style>