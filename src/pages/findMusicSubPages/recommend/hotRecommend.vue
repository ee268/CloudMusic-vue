<template>
    <div class="hotRecommend">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-icon">
                        <el-icon size="24" color="#C20C0C">
                            <Menu />
                        </el-icon>
                    </div>
                    <div class="card-header-title">热门推荐</div>
                    <div class="hotMenuContainer">
                        <el-menu class="hotMenu" mode="horizontal" :ellipsis="false">
                            <el-menu-item index="1">华语</el-menu-item>
                            <el-menu-item index="2">流行</el-menu-item>
                            <el-menu-item index="3">摇滚</el-menu-item>
                            <el-menu-item index="4">民谣</el-menu-item>
                            <el-menu-item index="5">电子</el-menu-item>
                        </el-menu>
                    </div>
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
            <div class="card-music">
                <div v-for="i in 8" :key="i">
                    <div class="music-cover">
                        <div class="play-info">
                            <div class="play-button">
                                <el-button>
                                    <el-icon size="40">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </div>
                            <div class="play-count">
                                <el-text>
                                    <el-icon>
                                        <Headset />
                                    </el-icon>
                                    114514
                                </el-text>
                            </div>
                        </div>
                    </div>
                    <div class="music-title">
                        标题标题标题标题标题标题标题标题标题
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import carousel from './recommendCarousel.vue'
</script>

<style lang="scss" scoped>
.hotRecommend {
    width: 100%;

    :deep(.el-card__header) {
        width: 95%;
        padding: 20px;
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

        .hotMenuContainer {
            display: flex;

            .hotMenu {
                border: none;
                display: flex;
                align-items: center;
                gap: 5px;

                .el-menu-item {
                    height: 20px;
                    padding: 0;
                    border: none;
                    padding-right: 10px;
                    padding-left: 10px;
                    border-right: 1px solid black;
                    font-size: 14px;

                    &:hover {
                        color: #C20C0C;
                        background: none;
                        font-size: 17px;
                        transition: all 0.5s ease;
                    }

                    &.is-active {
                        color: inherit !important;
                        background: none;
                    }
                }
            }
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

    .card-music {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        row-gap: 40px;

        .music-cover {
            aspect-ratio: 1 / 1;
            width: 100%;
            background: green;
            background: url('/public/img/Cover.jpg');
            background-size: cover;
            border-radius: 5%;
            transform: scale(1);


            .play-info {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;

                .play-button {
                    height: 100%;
                    backdrop-filter: blur(0);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    visibility: hidden;

                    .el-button {
                        background: none;
                        border: none;
                        padding: 0;

                        .el-icon {
                            color: white;
                        }

                        &:hover {
                            .el-icon {
                                color: #C20C0C;
                                transition: all 0.5s;
                            }
                        }
                    }
                }

                .play-count {
                    height: 20px;
                    background: rgba(0, 0, 0, 0.3);
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    backdrop-filter: blur(5px);

                    .el-text {
                        display: flex;
                        color: white;
                        align-items: center;
                        justify-content: center;
                        gap: 5px;
                    }
                }
            }

            &:hover {
                transform: scale(1.1);

                .play-button {
                    visibility: visible;
                }

                .play-info {
                    border-radius: inherit;
                    backdrop-filter: blur(10px);
                }

                transition: all 0.3s ease;
            }
        }

        .music-title {
            font-size: 15px;
            padding-top: 6px;
            color: black;

            &:hover {
                color: #C20C0C;
                transition: all 0.3s;
                cursor: pointer;
            }
        }
    }
}
</style>