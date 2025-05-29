import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    const menuRef = ref()
    const isMenuActive = ref([false, false, false])//判断主菜单是否活动，是则加上底部三角符号
    const setMenuRef = (ref) => {
        menuRef.value = ref
    }

    const subMenuRef = ref()
    const setSubMenuRef = (ref) => {
        subMenuRef.value = ref
    }

    return { menuRef, isMenuActive, setMenuRef, subMenuRef, setSubMenuRef }
})