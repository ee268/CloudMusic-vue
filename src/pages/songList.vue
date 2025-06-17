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
                            <div>
                                <el-button v-show="isOwnPlayList" @click="deletePlayList">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>
                                </el-button>
                            </div>
                        </div>

                        <div class="songList-creator-info">
                            <div class="creator-avatar"></div>
                            <div class="creator-name"
                                @click="toUserPage(userStore.getUserId(songList.creator_id).acc_id)">{{
                                    userStore.getUserId(songList.creator_id).name }}</div>
                            <div class="creator-time">{{ songList.create_time }}创建</div>
                        </div>

                        <div class="songList-btn">
                            <div class="play-btn">
                                <el-button type="primary" @click="play_playList">
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
                                <el-button @click="collectPlayList($event)">
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
                    <el-table :data="songListData" empty-text="暂无歌曲" stripe @cell-mouse-enter="rowEnterHover"
                        @cell-mouse-leave="rowLeaveHover">
                        <el-table-column type="index" />

                        <el-table-column width="50">
                            <template #default="scope">
                                <el-button class="song-play-btn">
                                    <el-icon size="20" @click="singleSongPlayBtn(scope.row.index)">
                                        <VideoPlay />
                                    </el-icon>
                                </el-button>
                            </template>
                        </el-table-column>

                        <el-table-column prop="name" label="歌曲标题" width="340">
                            <template #default="scope">
                                <div class="song-title" @click="toSingleSongPage(scope.row)">{{ scope.row.name }}</div>
                            </template>
                        </el-table-column>

                        <el-table-column prop="playTime" label="时长" width="100">
                            <template #default="scope">
                                <span v-show="!isHoverRow[scope.row.index]">{{ scope.row.playTime }}</span>

                                <span v-show="isHoverRow[scope.row.index]" style="margin-right: 5px;">
                                    <el-icon class="add-btn" size="20"
                                        @click="singleSongAddToPlayList(scope.row.index)">
                                        <Plus />
                                    </el-icon>
                                </span>

                                <span v-show="isHoverRow[scope.row.index]">
                                    <el-icon class="add-btn" size="20" @click="openCollectMusicBtn(scope.row)">
                                        <FolderAdd />
                                    </el-icon>
                                </span>

                                <span v-show="isHoverRowDelete[scope.row.index]" @click="deleteSong(scope.row.index)">
                                    <el-icon class="add-btn" size="20">
                                        <Delete />
                                    </el-icon>
                                </span>
                            </template>
                        </el-table-column>

                        <el-table-column prop="artist" label="歌手" widh="100" />

                        <el-table-column prop="belong_album" label="专辑" />
                    </el-table>
                </div>
            </el-card>
        </div>

        <collectDialog :openCollectDialog="isOpenCollectDialog" :CloseEvent="closeCollectDialog"
            :collectAudio="setCollectAudio"></collectDialog>
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
const isHoverRowDelete = ref([])

const menuStore = useMenuStore()
menuStore.menuRef.updateActiveIndex("3")

const router = useRouter()
const musicStore = useMusicStore()
const userStore = useUserStore()

const songList = ref(musicStore.getPlayListId(router.currentRoute.value.params.id.substring(1)))
const songListTag = ref(songList.value.label)
const songListCover = ref({})

const data = songList.value.audios

const isOwnPlayList = ref(songList.value.creator_id == localStorage.getItem('acc_id'))

const initializeSongList = () => {
    const list = musicStore.getPlayListId(router.currentRoute.value.params.id.substring(1))
    if (!list) {
        console.error('歌单不存在')
        return
    }

    songList.value = list
    songListTag.value = list.label || []

    // 设置封面
    if (list.cover) {
        songListCover.value = {
            background: `url(${list.cover})`,
            backgroundSize: 'cover'
        }
    } else if (list.audios?.length > 0 && list.audios[0].audio?.cover) {
        songListCover.value = {
            background: `url(${list.audios[0].audio.cover})`,
            backgroundSize: 'cover'
        }
    } else {
        songListCover.value = {
            background: 'url(/public/cover/default-playlist-cover.jpg)',
            backgroundSize: 'cover'
        }
    }
}

initializeSongList()

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
// 临时跳过音频时长加载，只测试数据转换
songListData.value = data.map((item, index) => ({
    id: item.id,
    name: item.audio?.name || '未知',
    artist: item.audio?.artist || '未知',
    cover: item.audio?.cover || '/public/cover/default-playlist-cover.jpg',
    url: item.audio?.url || '#',
    playTime: '00:00', // 临时固定值
    index
}))

const loadSongs = async () => {
    try {
        // console.log('原始歌单数据:', songList.value) // 检查歌单结构
        // console.log('歌曲数据原始数组:', data) // 检查data内容

        if (!Array.isArray(data) || data.length === 0) {
            // console.error('无效的歌单数据', data)
            return
        }

        const validSongs = data.filter(item => {
            const isValid = item?.audio?.url
            // console.log('检查歌曲项:', item);

            // if (!isValid) console.warn('无效的歌曲项:', item) // 标记无效数据
            return isValid
        })

        // console.log('有效歌曲:', validSongs) // 检查过滤后的数据

        await Promise.all(
            validSongs.map(item => {
                // console.log('正在加载:', item.audio.url) // 跟踪加载过程
                return loadAudioMetadata(item.audio.url)
            })
        )

        // console.log('音频时长数组:', audioPlayTime) // 检查时长数据

        songListData.value = validSongs.map((item, index) => {
            const song = {
                id: item.id,
                name: item.audio.name,
                artist: item.audio.artist,
                cover: item.audio.cover || '/public/cover/default-playlist-cover.jpg',
                url: item.audio.url,
                belong_album: item.belong_ablum,
                playTime: audioPlayTime[index] || '00:00',
                index
            }
            // console.log('转换后的歌曲:', song) // 检查最终数据结构
            return song
        })

        // console.log('最终songListData:', songListData.value) // 确认结果
        isHoverRow.value = new Array(songListData.value.length).fill(false)
        isHoverRowDelete.value = new Array(songListData.value.length).fill(false)

    } catch (error) {
        console.error('加载歌曲失败:', error)
        ElMessage.error('加载歌曲列表失败')
    }
}

loadSongs()

const rowEnterHover = (row, col, cell, event) => {
    if (isOwnPlayList.value) {
        isHoverRowDelete.value[row.index] = true
    }

    isHoverRow.value[row.index] = true
}

const rowLeaveHover = (row) => {
    if (isOwnPlayList.value) {
        isHoverRowDelete.value[row.index] = false
    }

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
                type: 'info',
                plain: true,
                duration: 2500
            })

            return
        }
    }

    musicStore.addCurPlayListActual({
        name: song.name,
        artist: song.artist,
        cover: song.cover,
        url: song.url
    })

    musicStore.audio.list.add({
        name: song.name,
        artist: song.artist,
        cover: song.cover,
        url: song.url
    })

    musicStore.audio.list.switch(musicStore.audio.list.audios.length - 1)

    setTimeout(() => {
        musicStore.audio.play()
    }, 500)

    musicStore.isPlaying = true

    ElMessage({
        showClose: true,
        message: '开始播放',
        type: 'info',
        plain: true,
        duration: 2500
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
                type: 'info',
                plain: true,
                duration: 2500
            })

            return
        }
    }

    musicStore.addCurPlayListActual({
        name: song.name,
        artist: song.artist,
        cover: song.cover,
        url: song.url
    })

    musicStore.audio.list.add({
        name: song.name,
        artist: song.artist,
        cover: song.cover,
        url: song.url
    })

    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'info',
        plain: true,
        duration: 2500
    })
}

const deletePlayList = () => {
    musicStore.removePlayList(songList.value.id)

    ElMessage({
        showClose: true,
        message: '已删除歌单',
        type: 'info',
        plain: true,
        duration: 2500
    })

    router.push({ name: 'my', params: { id: '=' + localStorage.getItem('acc_id') } })
}

const deleteSong = (index) => {
    songListData.value.splice(index, 1)

    musicStore.removeFromPlayList(songList.value.id, data[index].id)
    ElMessage({
        showClose: true,
        message: '已移除歌曲',
        type: 'info',
        plain: true,
        duration: 2500
    })
}

const play_playList = () => {
    musicStore.clearCurPlayListActual()
    musicStore.clearCurPlayList()
    musicStore.audio.list.clear()

    for (let i = 0; i < songListData.value.length; i++) {
        let audioData = {
            name: songListData.value[i].name,
            artist: songListData.value[i].artist,
            cover: songListData.value[i].cover,
            url: songListData.value[i].url
        }
        musicStore.audio.list.add(audioData)
        musicStore.addCurPlayListActual(audioData)
    }
    // console.log(musicStore.curPlayListActual);

    musicStore.audio.list.switch(0)
    setTimeout(() => {
        musicStore.audio.play()
    }, 500)
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
        type: 'info',
        plain: true,
        duration: 2500
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

    if (isCollect.value == '已收藏') {
        ElMessage({
            showClose: true,
            message: '已取消收藏',
            type: 'info',
            plain: true,
            duration: 2500
        })
        isCollect.value = '收藏'
        userStore.removeCollectPlayList(user.acc_id, songList.value.id)

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

const toSingleSongPage = (row) => {
    router.push({
        name: 'song',
        params: { id: '=' + row.id }
    })
}

const setCollectAudio = ref()

const isOpenCollectDialog = ref(false)

const openCollectMusicBtn = (row) => {
    isOpenCollectDialog.value = true
    setCollectAudio.value = musicStore.getAudioInfo(row.id)
}

const closeCollectDialog = () => {
    isOpenCollectDialog.value = false
}

const toUserPage = (id) => {
    
    if (isOwnPlayList.value) {
        router.push({
            name: 'my',
            params: { id: 'id=' + id }
        })
        return
    }

    router.push({
        name: 'alterUser',
        params: { id: id }
    })
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

                    &>div:nth-child(2) {
                        font-size: 22px;
                    }

                    &>div:last-child {
                        flex: 1;
                        display: flex;
                        justify-content: flex-end;
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

                .song-title {
                    cursor: pointer;

                    &:hover {
                        text-decoration-line: underline;
                    }
                }

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