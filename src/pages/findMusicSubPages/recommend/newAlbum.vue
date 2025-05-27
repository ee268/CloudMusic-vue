<template>
    <div class="personRecommend">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-icon">
                        <el-icon size="24" color="#C20C0C">
                            <BellFilled />
                        </el-icon>
                    </div>
                    <div class="card-header-title">新碟上架</div>
                    <div class="more">
                        <el-button>
                            <el-text size="small">
                                更多
                                <el-icon color="#C20C0C">
                                    <Right />
                                </el-icon>
                            </el-text>
                        </el-button>
                    </div>
                </div>
            </template>

            <newAlbumCarousel />
        </el-card>
    </div>
</template>

<script setup>
import newAlbumCarousel from './newAlbumCarousel.vue'
</script>

<style lang="scss" scoped>
.personRecommend {
    width: 100%;

    :deep(.el-card__header) {
        width: 95%;
        padding-left: 20px;
        padding-right: 20px;
        border-bottom: 2px solid #C20C0C;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .el-card {
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        box-shadow: none;
    }

    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 15px;

        .card-header-icon {
            display: flex;
            align-items: center;
        }

        .card-header-title {
            display: flex;
            align-items: center;
            line-height: 1;
            font-size: 20px;
        }

        .more {
            display: flex;
            flex-direction: row;
            margin-left: auto;
            align-items: center;
            gap: 5px;

            .el-button {
                background: none;
                border: none;
                padding: 0;

                .el-text {
                    color: #C20C0C;
                }

                &:hover {
                    .el-text {
                        color: white;

                        .el-icon {
                            color: white;
                        }
                    }

                    background: #C20C0C;
                    transition: all 0.3s ease-in-out;
                }
            }
        }
    }
}
</style>