<template>
    <div class="playList">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">全部</div>
                    <div class="select-classify">
                        <el-popover trigger="click" placement="bottom">
                            <template #default>
                                <div class="classify-list">
                                    <div class="classify-header">
                                        <el-button>
                                            全部风格
                                        </el-button>
                                    </div>
                                    <div class="classify-body">
                                        <div class="classify-item" v-for="(item, index) in label" :key="index">
                                            <div class="classify-name">
                                                <el-icon size="27" color="#9D9D9D">
                                                    <Comment />
                                                </el-icon>
                                                {{ item.type }}
                                            </div>
                                            <div class="classify-sub-name">
                                                <div class="item" v-for="tag in item.label" :key="tag">
                                                    <el-button>{{ tag }}</el-button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <template #reference>
                                <el-button>
                                    选择分类
                                    <el-icon>
                                        <ArrowDown />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-popover>
                    </div>
                    <div class="hot">
                        <el-button>
                            热门
                        </el-button>
                    </div>
                </div>
            </template>
            <div class="card-music">
                <div v-for="i in 35" :key="i">
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
            <div class="card-pagination">
                <el-pagination background layout="prev, pager, next" :total="1000" />
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMusicStore } from '../../stores/music'

const musicStore = useMusicStore()

const label = musicStore.selectLabel
</script>

<style lang="scss" scoped>
.playList {
    width: 55%;
    display: flex;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    :deep(.el-card__header) {
        width: 95%;
        padding-left: 0;
        padding-right: 0;
        border-bottom: 2px solid #C20C0C;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
    }

    .el-card {
        width: 100%;
        box-shadow: none;
        border-radius: 0;

        .card-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 15px;

            .card-header-title {
                display: flex;
                align-items: center;
                line-height: 1;
                font-size: 20px;
            }

            .select-classify {
                display: flex;
                align-items: center;

                .el-button {
                    padding-left: 10px;
                    padding-right: 10px;
                    color: #0C73C2;

                    .el-icon {
                        margin-left: 5px;
                    }
                }
            }

            .hot {
                display: flex;
                flex-direction: row;
                margin-left: auto;
                align-items: center;
                gap: 5px;

                .el-button {
                    color: white;
                    background: #C20C0C;
                    border: none;
                    transform: scale(1);
                    transition: all 0.3s ease-in-out;

                    &:hover {
                        transform: scale(1.1);
                    }
                }
            }
        }

        .card-music {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
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
                transition: all 0.3s ease;

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

        .card-pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;

            .el-pagination {
                --el-pagination-button-color: #333333;
                --el-pagination-button-bg-color: white;
                --el-pagination-hover-color: #C20C0C;
            }

            :deep(.el-pagination.is-background .el-pager li) {
                border: 1px solid #CCCCCC;

                &:hover {
                    border-color: black;
                }
            }

            :deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
                background-color: #C20C0C !important;
                color: white;
                border-color: transparent;
            }
        }
    }
}
</style>

<style lang="scss">
// 修改弹出框样式
.el-popper {
    padding: 0 !important;
    background: white !important;
    border: none !important;
    min-width: 0 !important;
    width: auto !important;
    max-width: none !important;
    box-shadow: 0px 0px 12px rgb(0, 0, 0, 0.5) !important;
}

.el-popper__arrow {
    &::before {
        background: white !important;
        border-color: white !important;
    }
}

.el-popper.is-light {
    background: white;
    border-color: white;
}

//修改弹出框内容
.classify-list {
    display: flex;
    flex-direction: column;
    padding: 15px;

    .classify-header {
        padding-bottom: 10px;
        border-bottom: 1px solid #E6E6E6;

        .el-button {
            background: white;
            color: #4D4D4D;
            transform: scale(1);

            &:hover {
                background: white;
                color: #4D4D4D;
                border-color: #DCDFE6;
            }

            &:active {
                transform: scale(0.9);
                transition: transform 0.1s ease-in-out;
            }
        }
    }

    .classify-body {
        display: flex;
        flex-direction: column;

        .classify-item {
            display: flex;
            flex-direction: row;

            .classify-name {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                padding: 15px;
                color: #333333;
                font-size: 16px;
                font-weight: 600;
                border-right: 1px solid #E6E6E6;
            }

            .classify-sub-name {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                align-content: center;
                padding: 5px;
                row-gap: 5px;

                .item {
                    width: 80px;
                    text-align: center;
                    box-sizing: border-box;
                    border-right: 1px solid #E6E6E6;
                    padding-left: 12px;
                    padding-right: 12px;

                    .el-button {
                        background: none;
                        border: none;
                        padding: 0;
                        color: #4D6A82;

                        &:hover {
                            color: #C20C0C;
                        }
                    }
                }
            }

            @media (max-width: 900px) {
                .classify-sub-name {
                    grid-template-columns: repeat(5, 1fr);
                }
            }
        }
    }
}
</style>