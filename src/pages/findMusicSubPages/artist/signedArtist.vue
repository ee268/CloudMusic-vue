<template>
    <div class="signed-artist">
        <el-card>
            <template #header>
                <div class="card-header">
                    <div class="card-header-title">入驻歌手</div>
                </div>
            </template>
            <div class="card-artist">
                <div v-for="i in 50" :key="i">
                    <div class="artist-cover"></div>
                    <div class="artist-name">
                        <div>标题标</div>
                        <el-icon color="#C20C0C">
                            <UserFilled />
                        </el-icon>
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
.signed-artist {
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
        height: 100%;
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
        }

        .card-artist {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            row-gap: 40px;

            .artist-cover {
                aspect-ratio: 1 / 1;
                width: 100%;
                background: green;
                background: url('/public/img/Cover.jpg');
                background-size: cover;
                border-radius: 5%;
                transform: scale(1);
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover {
                    transform: scale(1.1);
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
            transition: all 0.3s;

            div {
                text-wrap: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                max-width: 100px;
            }

            &:hover {
                color: #C20C0C;
                cursor: pointer;
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