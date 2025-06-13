<template>
    <div class="artist">
        <div class="artist-classify">
            <el-menu router ref="menuRef">
                <el-menu-item-group v-for="(group, gIndex) in Menu.menuGroups" :key="gIndex" :title="group.title">
                    <el-menu-item v-for="item in group.items" :key="item.index" :index="item.index" :route="{
                        name: item.name || 'areaArtist',
                        params: item.id ? { id: item.index } : {}
                    }">
                        <el-icon v-show="item.label == '热门歌手'">
                            <StarFilled />
                        </el-icon>
                        <el-icon v-show="item.label == '入驻歌手'">
                            <Avatar />
                        </el-icon>
                        <el-icon v-show="!item.name">
                            <Mic />
                        </el-icon>
                        {{ item.label }}
                    </el-menu-item>
                </el-menu-item-group>
            </el-menu>
        </div>
        <div class="artist-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'

const Menu = useMenuStore()

const menuRef = ref()
const router = useRouter()

onMounted(() => {
    Menu.setSideMenuRef(menuRef.value)
    menuRef.value.updateActiveIndex(router.currentRoute.value.params.id)
    menuRef.value.updateActiveIndex(router.currentRoute.value.meta.id)
})

</script>

<style lang="scss" scoped>
.artist {
    width: 55%;
    display: flex;
    flex-direction: row;
    position: relative;
    background: pink;
    left: 50%;
    transform: translateX(-50%);

    .artist-classify {
        padding-top: 18px;
        background: white;
        border-right: 1px solid #D3D3D3;

        .el-menu {
            border: none;

            :deep(.el-menu-item-group__title) {
                font-size: 20px;
                font-weight: bold;
                color: black;
            }

            .el-menu-item-group {
                border-bottom: 1px solid #D3D3D3;
                margin-left: 10px;
                margin-right: 10px;
            }

            .el-menu-item {
                color: #333;
                transition: all 0.3s;

                &:hover {
                    background-color: rgba(194, 12, 12, 0.1);
                    color: #C20C0C;
                }

                &.is-active {
                    background-color: #C20C0C;
                    color: white;
                }
            }
        }
    }

    .artist-content {
        flex: 1;
        background: white;
    }
}
</style>