<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="songList">
            <el-card>
                <div class="songList-info">
                    <div class="songList-cover" :style="songListCover"></div>
                    <div class="songList-info-text">
                        <div class="songList-title">
                            <div>歌单</div>
                            <div>{{ songList.name }}</div>
                        </div>

                        <div class="songList-creator-info">
                            <div class="creator-avatar"></div>
                            <div class="creator-name">{{ '歌单创建者' }}</div>
                            <div class="creator-time">{{ songList.create_time }}创建</div>
                        </div>

                        <div class="songList-btn">
                            <div class="play-btn">
                                <el-button type="primary" @click="paly_playList">
                                    <el-icon size="20">
                                        <VideoPlay />
                                    </el-icon>
                                    播放
                                </el-button>
                                <el-button type="primary" @click="addToPlayList">
                                    <el-icon size="20">
                                        <Plus />
                                    </el-icon>
                                </el-button>
                            </div>

                            <div class="collect-btn">
                                <el-button @click="collectPlayList($event)" :disabled="isCollect == '已收藏'">
                                    <el-icon size="20">
                                        <FolderAdd />
                                    </el-icon>
                                    {{ isCollect }}
                                </el-button>
                            </div>
                        </div>

                        <div class="songList-tag">
                            标签：
                            <el-tag v-for="tag in songListTag" :key="tag" type="info">{{ tag }}</el-tag>
                        </div>

                        <div class="songList-intro">
                            介绍：{{ songList.intro }}
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card>
                <template #header>
                    <div>歌曲列表</div>
                    <div>{{ songList.audios.length }}首歌</div>
                </template>
                <div class="songList-songs">
                    <el-table :data="songListData" stripe @cell-mouse-enter="rowEnterHover"
                        @cell-mouse-leave="rowLeaveHover">
                        <el-table-column type="index" width="30" />
                        <el-table-column width="50">
                            <template #default="scope">
                                <el-button class="song-play-btn">
                                    <el-icon size="20" @click="singleSongPlayBtn(scope.row.index)">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="歌曲标题" width="340" />
                        <el-table-column prop="playTime" label="时长" width="100">
                            <template #default="scope">
                                <span v-show="!isHoverRow[scope.row.index]">{{ scope.row.playTime }}</span>
                                <span v-show="isHoverRow[scope.row.index]" style="margin-right: 5px;">
                                    <el-icon class="add-btn" size="20"
                                        @click="singleSongAddToPlayList(scope.row.index)">
                                        <Plus />
                                    </el-icon></span>
                                <span v-show="isHoverRow[scope.row.index]">
                                    <el-icon class="add-btn" size="20" @click="openCollectMusicBtn(scope.row)">
                                        <FolderAdd />
                                    </el-icon></span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="artist" label="歌手" widh="100" />
                        <el-table-column prop="belong_album" label="专辑" />
                    </el-table>
                </div>
            </el-card>
        </div>

        <collectDialog :openCollectDialog="isOpenCollectDialog" :CloseEvent="closeCollectDialog"></collectDialog>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '../components/pageHeaderSubMenu.vue'
import collectDialog from './collectDialog.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMusicStore } from '../stores/music'
import { useUserStore } from '../stores/user'
import { useMenuStore } from '../stores/menu'
import { ElMessage } from 'element-plus'

const isHoverRow = ref([])

const menuStore = useMenuStore()
menuStore.menuRef.updateActiveIndex("3")

const router = useRouter()
const musicStore = useMusicStore()
const userStore = useUserStore()

const songList = ref(musicStore.getPlayListId(router.currentRoute.value.params.id.substring(1)))
const songListTag = ref(songList.value.label)
const songListCover = ref(songList.value.cover == '' ? {} : {
    background: 'url(' + songList.value.cover + ')',
    backgroundSize: 'cover'
})

const data = songList.value.audios

if (songList.value.cover == '' && data.length > 0) {
    songListCover.value = {
        background: 'url(' + data[0].audio.cover + ')',
        backgroundSize: 'cover'
    }
}

const audioPlayTime = []
const loadAudioMetadata = (url) => {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.addEventListener('loadedmetadata', () => {
            const minutes = Math.floor(audio.duration / 60).toString().padStart(2, '0');
            const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
            audioPlayTime.push(`${minutes}:${seconds}`);
            resolve();
        });
    });
};

const songListData = ref([])

Promise.all(data.map(item => loadAudioMetadata(item.audio.url)))
    .then(() => {
        for (let i = 0; i < data.length; i++) {
            songListData.value.push({
                id: data[i].id,
                name: data[i].audio.name,
                artist: data[i].audio.artist,
                cover: data[i].audio.cover,
                url: data[i].audio.url,
                belong_album: data[i].belong_ablum,
                playTime: audioPlayTime[i],
                index: i
            })

            isHoverRow.value.push(false)
        }
    });

const rowEnterHover = (row, col, cell, event) => {
    isHoverRow.value[row.index] = true
}

const rowLeaveHover = (row) => {
    isHoverRow.value[row.index] = false
}

const singleSongPlayBtn = (index) => {
    let song = songListData.value[index]

    for (let i = 0; i < musicStore.audio.list.audios.length; i++) {
        if (song.url == musicStore.audio.list.audios[i].url) {

            musicStore.audio.list.switch(i)
            musicStore.audio.play()
            musicStore.isPlaying = true

            ElMessage({
                showClose: true,
                message: '开始播放',
                type: 'primary',
                plain: true,
                duration: '2500'
            })

            return
        }
    }

    musicStore.audio.list.add({
        name: song.name,
        artist: song.artist,
        cover: song.cover,
        url: song.url
    })

    ElMessage({
        showClose: true,
        message: '开始播放',
        type: 'primary',
        plain: true,
        duration: '2500'
    })
}

const singleSongAddToPlayList = (index) => {
    let song = songListData.value[index]

    for (let i = 0; i < musicStore.audio.list.audios.length; i++) {
        if (song.url == musicStore.audio.list.audios[i].url) {

            musicStore.audio.list.switch(i)
            musicStore.audio.pause()
            musicStore.isPlaying = false

            ElMessage({
                showClose: true,
                message: '已添加到播放列表',
                type: 'primary',
                plain: true,
                duration: '2500'
            })

            return
        }
    }

    musicStore.audio.list.add({
        name: song.name,
        artist: song.artist,
        cover: song.cover,
        url: song.url
    })

    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'primary',
        plain: true,
        duration: '2500'
    })
}

const paly_playList = () => {
    musicStore.audio.list.clear()
    musicStore.clearCurPlayList()

    for (let i = 0; i < songListData.value.length; i++) {
        musicStore.audio.list.add({
            name: songListData.value[i].name,
            artist: songListData.value[i].artist,
            cover: songListData.value[i].cover,
            url: songListData.value[i].url
        })
    }

    musicStore.audio.list.switch(0)
    musicStore.audio.play()
    musicStore.isPlaying = true
}

const addToPlayList = () => {
    for (let i = 0; i < songListData.value.length; i++) {
        let j = 0

        for (j = 0; j < musicStore.curPlayList.length; j++) {
            if (songListData.value[i].url == musicStore.curPlayList[j].url) {
                break
            }
        }

        if (j == musicStore.curPlayList.length) {
            musicStore.audio.list.add({
                name: songListData.value[i].name,
                artist: songListData.value[i].artist,
                cover: songListData.value[i].cover,
                url: songListData.value[i].url
            })
        }
    }

    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'primary',
        plain: true,
        duration: '2500'
    })
}

const isCollect = ref('收藏')

const collectPlayList = (event) => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    if (songList.value.creator_id == user.acc_id) {
        ElMessage({
            showClose: true,
            message: '不能收藏自己的歌单',
            type: 'warning',
            plain: true,
            duration: 2500
        })

        return
    }


    isCollect.value = '已收藏'
    userStore.updateCollectPlayList(user.acc_id, songList.value.id)
}

onMounted(() => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))
    
    for (let i = 0; i < user.collect_playlist.length; i++) {
        if (user.collect_playlist[i] == songList.value.id) {

            isCollect.value = '已收藏'
            break
        }
    }
})

const isOpenCollectDialog = ref(false)

const openCollectMusicBtn = (row) => {
    isOpenCollectDialog.value = true
}

const closeCollectDialog = () => {
    isOpenCollectDialog.value = false
}
</script>

<style lang="scss" scoped>
.songList {
    width: 55%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;

    :deep(.el-card__header) {
        width: 95%;
        padding: 15px 0 0 0;
        border-bottom: 2px solid #C20C0C;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: row;
        align-items: end;
        gap: 15px;

        &>div:first-child {
            font-size: 22px;
        }

        &>div:last-child {
            font-size: 16px;
            color: #666666;
        }
    }

    .el-card {
        border-radius: 0;
        border-top: none;
        border-bottom: none;
        box-shadow: none;
        display: flex;
        width: 100%;
        flex-direction: column;

        .songList-info {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            gap: 30px;

            .songList-cover {
                width: 200px;
                height: 200px;
                border-radius: 5px;
                background: url('/public/cover/default-playlist-cover.jpg') no-repeat;
                background-size: cover;
            }

            .songList-info-text {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .songList-title {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 10px;

                    &>div:first-child {
                        font-size: 15px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 55px;
                        height: 30px;
                        background: #C20C0C;
                        color: white;
                        border-radius: 5px;
                    }

                    &>div:last-child {
                        font-size: 22px;
                    }
                }

                .songList-creator-info {
                    margin-top: 15px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .creator-avatar {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png') no-repeat;
                        background-size: cover;
                        cursor: pointer;
                    }

                    .creator-name {
                        margin-left: 5px;
                        font-size: 12px;
                        color: #0C9DDE;
                        cursor: pointer;

                        &:hover {
                            text-decoration-line: underline;
                        }
                    }

                    .creator-time {
                        margin-left: 30px;
                        font-size: 12px;
                        color: #999999;
                    }
                }

                .songList-btn {
                    display: flex;
                    flex-direction: row;
                    gap: 20px;
                    margin-top: 20px;

                    .play-btn {
                        display: flex;
                        flex-direction: row;

                        .el-button {
                            border-radius: 0;
                            margin: 0;

                            &:first-child {
                                border-top-left-radius: 4px;
                                border-bottom-left-radius: 4px;
                                border-right: 1px solid #235B92;
                            }

                            &:last-child {
                                border-top-right-radius: 4px;
                                border-bottom-right-radius: 4px;
                                border-left: 2px solid #5092CF;
                            }
                        }
                    }

                    .collect-btn {
                        display: flex;
                        justify-content: center;
                    }
                }

                .songList-tag {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    margin-top: 10px;
                    font-size: 15px;
                    color: #666666;
                }

                .songList-intro {
                    margin-top: 10px;
                    font-size: 15px;
                    color: #666666;
                }
            }
        }

        &:last-child {
            :deep(.el-card__body) {
                padding-top: 0;
            }
        }

        .songList-songs {
            width: 100%;

            .el-table {
                border: 1px solid #D9D9D9;
                border-top: 0;
                box-sizing: border-box;

                .btn {
                    background: #000;
                }

                .song-play-btn {
                    padding: 0;
                    width: 100%;
                    border: none;
                    background: transparent;

                    &:hover {
                        color: #C20C0C;
                    }
                }

                .add-btn {
                    cursor: pointer;

                    &:hover {
                        color: #C20C0C;
                    }
                }
            }
        }
    }
}
</style>