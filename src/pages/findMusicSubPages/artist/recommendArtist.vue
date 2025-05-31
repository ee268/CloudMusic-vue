<template>
    <div class="recommend-artist">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">入驻歌手</div>
                    <div class="more">
                        <el-button @click="toSignedArtist($event)">
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
            <div class="card-artist">
                <div v-for="i in 10" :key="i">
                    <div class="artist-cover"></div>
                    <div class="artist-name">
                        <div>标题标</div>
                        <el-icon color="#C20C0C">
                            <UserFilled />
                        </el-icon>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">热门歌手</div>
                </div>
            </template>
            <div class="card-artist">
                <div v-for="i in 10" :key="i">
                    <div class="artist-cover"></div>
                    <div class="artist-name">
                        <div>标题标</div>
                        <el-icon color="#C20C0C">
                            <UserFilled />
                        </el-icon>
                    </div>
                </div>
            </div>
            <div class="card-artist-name">
                <div class="artist-name" v-for="i in 52" :key="i">
                    <div>标题标</div>
                    <el-icon color="#C20C0C">
                        <UserFilled />
                    </el-icon>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'

const router = useRouter()

const Menu = useMenuStore()

const toSignedArtist = (event) => {
    router.push({ name: 'signedArtist' })
    Menu.sideMenuRef.updateActiveIndex('1-2')
}

</script>

<style lang="scss" scoped>
.recommend-artist {
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
        border: none;
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

        .card-artist {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            row-gap: 20px;

            .artist-cover {
                aspect-ratio: 1 / 1;
                width: 100%;
                background: green;
                background: url('/public/img/Cover.jpg');
                background-size: cover;
                border-radius: 5%;
                transform: scale(1);
                cursor: pointer;

                &:hover {
                    transform: scale(1.1);

                    transition: all 0.3s ease;
                }
            }
        }

        .artist-name {
            padding-top: 5px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 5px;

            div {
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 100px;
            }

            &:hover {
                color: #C20C0C;
                transition: all 0.3s;
                cursor: pointer;
            }
        }

        .card-artist-name {
            margin-top: 25px;
            padding-top: 10px;
            border-top: 1px solid #D3D3D3;
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            row-gap: 20px;

            .artist-name {
                flex: 5;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 5px;

                div {
                    text-wrap: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    max-width: 100px;
                }

                &:hover {
                    color: #C20C0C;
                    transition: all 0.3s;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>