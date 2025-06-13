<template>
    <div class="album">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">热门新碟</div>
                </div>
            </template>
            <div class="card-album">
                <div v-for="i in 10" :key="i">
                    <div class="album-cover">
                        <div class="play-info">
                            <div class="play-button">
                                <el-button>
                                    <el-icon size="40">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div class="albumTitle">
                        标题标题标题
                    </div>
                    <div class="albumAuthor">
                        作者作者
                    </div>
                </div>
            </div>
        </el-card>

        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">热门新碟</div>
                    <div class="hotMenuContainer">
                        <el-menu class="hotMenu" mode="horizontal" :ellipsis="false">
                            <el-menu-item index="1">全部</el-menu-item>
                            <el-menu-item index="2">华语</el-menu-item>
                            <el-menu-item index="3">欧美</el-menu-item>
                            <el-menu-item index="4">韩国</el-menu-item>
                            <el-menu-item index="5">日本</el-menu-item>
                        </el-menu>
                    </div>
                </div>
            </template>
            <div class="card-album">
                <div v-for="i in 30" :key="i">
                    <div class="album-cover">
                        <div class="play-info">
                            <div class="play-button">
                                <el-button>
                                    <el-icon size="40">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </div>
                        </div>
                    </div>
                    <div class="albumTitle">
                        标题标题标题
                    </div>
                    <div class="albumAuthor">
                        作者作者
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

</script>

<style lang="scss" scoped>
.album {
    position: relative;
    width: 55%;
    left: 50%;
    transform: translateX(-50%);
    background: pink;

    :deep(.el-card__header) {
        padding: 0;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 95%;
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
                height: auto;

                .el-menu-item {
                    height: 20px;
                    padding: 0;
                    border: none;
                    padding-right: 10px;
                    padding-left: 10px;
                    border-right: 1px solid black;
                    font-size: 14px;
                    transition: all 0.5s ease;

                    &:hover {
                        color: #C20C0C;
                        background: none;
                        font-size: 17px;
                    }

                    &.is-active {
                        color: inherit !important;
                        background: none;
                    }
                }
            }
        }
    }

    .card-album {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 30px;
        row-gap: 40px;

        .album-cover {
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

        .albumTitle {
            font-size: 15px;
            padding-top: 6px;
            color: black;
            overflow: hidden;
            text-overflow: ellipsis;
            text-wrap: nowrap;
            max-width: 133px;

            &:hover {
                color: #C20C0C;
                transition: all 0.3s;
                cursor: pointer;
            }
        }

        .albumAuthor {
            font-size: 13px;
            color: #666666;
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
</style>