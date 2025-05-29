<template>
    <el-menu router mode="horizontal" :ellipsis="false" class="menu" :style="{
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        height: props.height
    }" :ref="(event) => { menuRef = event }">
        <slot name="item"></slot>
    </el-menu>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useMenuStore } from '../stores/menu'
import { storeToRefs } from 'pinia'

//接收菜单ref
const menuRef = ref()

//获取菜单store
const Menu = useMenuStore()
const { setSubMenuRef } = storeToRefs(Menu)

//将菜单ref传递给store
onMounted(() => {
    Menu.setSubMenuRef(menuRef.value)
})

const props = defineProps({
    paddingTop: {
        type: String,
        default: '0'
    },
    paddingBottom: {
        type: String,
        default: '0'
    },
    height: {
        type: String,
        default: '40px'
    }
})

</script>

<style lang="scss" scoped>
.menu {
    background: #C20C0C;
    border: none;
    justify-content: center;
    gap: 30px;

    :deep(.el-menu-item) {
        background: #C20C0C;
        font-size: 13px;
        color: white;
        border-radius: 20px;
        padding-top: 12px !important;
        padding-bottom: 12px !important;
        line-height: 20px;
        border: none;

        &:hover {
            background: #9B0909 !important;
            color: white !important;
            border: none;
        }

        &.is-active {
            background: #9B0909 !important;
            color: white !important;
            border: none;
        }
    }
}
</style>