<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="myMusic">
            <el-card>
                <div class="userInfo">
                    <div class="user-avatar" @click="showPlayList" :style="{
                        background: `url(${userInfo.avatar == '' ? 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' : userInfo.avatar})`,
                        backgroundSize: 'cover'
                    }">
                    </div>

                    <div class="user-data">
                        <div class="user-name">
                            {{ userInfo.name }}
                            <el-button v-show="!isOwner" type="primary" color="#C20C0C" @click="addFollow">{{ isFollow
                            }}</el-button>
                        </div>
                        <div class="user-cnt">
                            <div @click="showFollow">
                                <div>{{ userInfo.follow_cnt }}</div>
                                <div>关注</div>
                            </div>
                            <div @click="showFollower">
                                <div>{{ userInfo.follower_cnt }}</div>
                                <div>粉丝</div>
                            </div>
                        </div>

                        <div class="user-intro">
                            个人介绍：{{ userInfo.introduce }}
                        </div>

                        <div class="user-area-age">
                            <div>所在地区：{{ userInfo.area[1] }}</div>
                            <div>年龄：{{ userInfo.birthday[0].toString().substring(2) }}后</div>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card v-show="showCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">个人单曲{{ '(' + personSongList_info.length + ')' }}</div>
                    </div>
                </template>

                <div class="songList-songs">
                    <el-table :data="personSongList_info" empty-text="暂无歌曲" max-height="400" stripe
                        @cell-mouse-enter="rowEnterHover" @cell-mouse-leave="rowLeaveHover">
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

                        <el-table-column prop="name" label="歌曲标题">
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
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>

            <el-card v-show="showCnt && !isOwner">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">创建的歌单{{ '(' + userInfo.create_playlist.length + ')' }}</div>
                    </div>
                </template>
                <div class="card-music">
                    <div v-for="(list, i) in (playList.filter(item => item.creator_id == userInfo.acc_id))" :key="i">
                        <div class="music-cover"
                            :style="{ background: getPlaylistCover(list), backgroundSize: 'cover' }">
                            <div class="play-info">
                                <div class="play-button">
                                    <el-button @click="toPlayListPage(list.id)">
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
                                        {{ Math.floor(Math.random() * 5000) }}
                                    </el-text>
                                </div>
                            </div>
                        </div>
                        <div class="music-title" @click="toPlayListPage(list.id)">
                            {{ list.name }}
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card v-show="showCnt && !isOwner">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">收藏的歌单{{ '(' + userInfo.collect_playlist.length + ')' }}</div>
                    </div>
                </template>
                <div class="card-music">
                    <div v-for="(list, i) in collectPlayList" :key="i">
                        <div class="music-cover"
                            :style="{ background: getPlaylistCover(list), backgroundSize: 'cover' }">
                            <div class="play-info">
                                <div class="play-button">
                                    <el-button @click="toPlayListPage(list.id)">
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
                                        {{ Math.floor(Math.random() * 5000) }}
                                    </el-text>
                                </div>
                            </div>
                        </div>
                        <div class="music-title" @click="toPlayListPage(list.id)">
                            {{ list.name }}
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card v-show="showFollowCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">关注：{{ '(' + userInfo.follow_cnt + ')' }}</div>
                    </div>
                </template>

                <div class="user-list">
                    <div class="user-item" v-for="(user, i) in userInfo.follow" :key="i">
                        <div class="user-avatar" :style="getUserAvatar(userStore.getUserId(user))"
                            @click="toArtistPage(user)">
                        </div>
                        <div class="user-name" @click="toArtistPage(user)">
                            <p>{{ userStore.getUserId(user).name }}</p>
                        </div>
                    </div>
                </div>
            </el-card>

            <el-card v-show="showFollowerCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">粉丝：{{ '(' + userInfo.follower_cnt + ')' }}</div>
                    </div>
                </template>

                <div class="user-list">
                    <div class="user-item" v-for="(user, i) in userInfo.follower" :key="i">
                        <div class="user-avatar" :style="getUserAvatar(userStore.getUserId(user))"
                            @click="toArtistPage(user)">
                        </div>
                        <div class="user-name" @click="toArtistPage(user)">
                            <p>{{ userStore.getUserId(user).name }}</p>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>

        <collectDialog :openCollectDialog="isOpenCollectDialog" :CloseEvent="closeCollectDialog"
            :collectAudio="setCollectAudio"></collectDialog>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '@/components/pageHeaderSubMenu.vue'
import collectDialog from './collectDialog.vue'
import { useUserStore } from '../stores/user'
import { useMusicStore } from '../stores/music'
import { useMenuStore } from '../stores/menu'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const menuStore = useMenuStore()
menuStore.menuRef.updateActiveIndex("3")

const router = useRouter()
const userStore = useUserStore()
const showCnt = ref(true)
const showArticleCnt = ref(false)
const showFollowCnt = ref(false)
const showFollowerCnt = ref(false)

const isHoverRow = ref([])

const curUserId = ref(router.currentRoute.value.params.id)

const userInfo = ref(userStore.getUserId(curUserId.value))
const isOwner = ref(curUserId.value == localStorage.getItem("acc_id"))

const isFollow = ref('关注')
if (userInfo.value.follower) {
    for (let i = 0; i < userInfo.value.follower.length; i++) {
        if (userInfo.value.follower[i] == localStorage.getItem("acc_id")) {
            isFollow.value = '取消关注'
            break
        }
    }
}

const musicStore = useMusicStore()
const { playList } = storeToRefs(musicStore)

const collectPlayList = ref([])
for (let i = 0; i < userInfo.value.collect_playlist.length; i++) {
    let list = musicStore.getPlayListId(userInfo.value.collect_playlist[i])

    if (list) {
        collectPlayList.value.push(list)
    }
}

const playList_info = ref([])
for (let i = 0; i < userInfo.value.create_playlist.length; i++) {
    playList_info.value.push(musicStore.getPlayListId(userInfo.value.create_playlist[i]))
}

const personSongList = ref([])

const personSongList_info = ref([])

const initPersonSongList = () => {
    personSongList.value = []
    personSongList_info.value = []

    for (let i = 0; i < musicStore.audioInfo.length; i++) {
        if (musicStore.audioInfo[i].creator_id == curUserId.value) {
            personSongList.value.push(musicStore.audioInfo[i])
        }
    }

    for (let i = 0; i < personSongList.value.length; i++) {
        let ad = {
            id: personSongList.value[i].id,
            name: personSongList.value[i].audio.name,
            artist: personSongList.value[i].audio.artist,
            cover: personSongList.value[i].audio.cover,
            url: personSongList.value[i].audio.url,
            creator_id: personSongList.value[i].creator_id,
            index: i
        }
        personSongList_info.value.push(ad)

        let au = new Audio(personSongList.value[i].audio.url);
        au.addEventListener('loadedmetadata', function () {
            personSongList_info.value[i].playTime = (Math.floor(au.duration / 60).toString().padStart(2, '0') + ':' + Math.floor(au.duration % 60).toString().padStart(2, '0'))
        })
    }

    isHoverRow.value = new Array(personSongList_info.value.length).fill(false)
}

initPersonSongList()

//获取当前日期函数
function getNowFormatDate() {
    let date = new Date(),
        year = date.getFullYear(), //获取完整的年份(4位)
        month = date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
        strDate = date.getDate() // 获取当前日(1-31)
    if (month < 10) month = `0${month}` // 如果月份是个位数，在前面补0
    if (strDate < 10) strDate = `0${strDate}` // 如果日是个位数，在前面补0

    return `${year}-${month}-${strDate}`
}

const toPlayListPage = (id) => {
    let list = musicStore.getPlayListId(id)
    if (list) {
        router.push({ name: 'list', params: { id: '=' + id } })
    }
    else {
        ElMessage({
            showClose: true,
            message: '歌单不存在',
            type: 'warning',
            plain: true,
            duration: 2500
        })
    }

}

const showPlayList = () => {
    showArticleCnt.value = showFollowCnt.value = showFollowerCnt.value = false
    showCnt.value = true
}

const showFollow = () => {
    showCnt.value = showArticleCnt.value = showFollowerCnt.value = false
    showFollowCnt.value = true
}

const showFollower = () => {
    showCnt.value = showArticleCnt.value = showFollowCnt.value = false
    showFollowerCnt.value = true
}

const getPlaylistCover = (list) => {
    if (!list.audios?.length || !list.audios[0]?.audio?.cover) {
        return 'url(/public/cover/default-playlist-cover.jpg)'
    }
    return `url(${list.audios[0].audio.cover})`
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

const rowEnterHover = (row, col, cell, event) => {
    isHoverRow.value[row.index] = true
}

const rowLeaveHover = (row) => {
    isHoverRow.value[row.index] = false
}

const singleSongPlayBtn = (index) => {
    let song = personSongList.value[index].audio

    for (let i = 0; i < musicStore.audio.list.audios.length; i++) {
        if (song.url == musicStore.audio.list.audios[i].url) {

            musicStore.audio.list.switch(i)

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

            return
        }
    }

    musicStore.addCurPlayListActual(song)

    musicStore.audio.list.add(song)

    musicStore.audio.list.switch(musicStore.audio.list.audios.length - 1)

    setTimeout(() => {
        musicStore.audio.play()
    }, 500)

    musicStore.isPlaying = true

    console.log(song);

    ElMessage({
        showClose: true,
        message: '开始播放',
        type: 'info',
        plain: true,
        duration: 2500
    })
}

const toSingleSongPage = (row) => {
    router.push({
        name: 'song',
        params: { id: '=' + row.id }
    })
}

const singleSongAddToPlayList = (index) => {
    let song = personSongList.value[index].audio

    for (let i = 0; i < musicStore.audio.list.audios.length; i++) {
        if (song.url == musicStore.audio.list.audios[i].url) {

            musicStore.audio.list.switch(i)

            setTimeout(() => {
                musicStore.audio.pause()
            }, 500)

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

    musicStore.addCurPlayListActual(song)

    musicStore.audio.list.add(song)

    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'info',
        plain: true,
        duration: 2500
    })
}

const addFollow = () => {

    if (isFollow.value == '取消关注') {
        isFollow.value = '关注'
        userStore.removeFollow(localStorage.getItem('acc_id'), userInfo.value.acc_id)
        return
    }

    userStore.addFollow(localStorage.getItem('acc_id'), userInfo.value.acc_id)
    isFollow.value = '取消关注'
}

const getUserAvatar = (user) => {
    if (user.avatar == '') {
        return {}
    }

    return {
        background: `url(${user.avatar})`,
        backgroundSize: 'cover',
    }
}

const toArtistPage = (id) => {
    console.log(userInfo.value.follower.length)
    console.log(userInfo.value.follower)
    curUserId.value = id
    userInfo.value = userStore.getUserId(id)
    isOwner.value = curUserId.value == localStorage.getItem("acc_id")
    showPlayList()
    initPersonSongList()

    router.push({ name: 'alterUser', params: { id: id } })
}
</script>

<style lang="scss" scoped>
.myMusic {
    width: 55%;
    background: pink;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

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

        .card-music {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 30px;
            row-gap: 40px;

            .music-cover {
                aspect-ratio: 1 / 1;
                width: 100%;
                background: green;
                background: url('/public/cover/default-playlist-cover.jpg');
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
                        backdrop-filter: blur(5px);
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
    }

    .user-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;

        .user-item {
            display: flex;
            flex-direction: row;
            gap: 15px;

            .user-avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
                background-size: cover;
                cursor: pointer;
            }

            .user-name {
                display: flex;
                justify-content: center;
                align-items: center;

                &>p {
                    font-size: 16px;
                    max-width: 80px;
                    text-wrap: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;

                    &:hover {
                        cursor: pointer;
                        text-decoration-line: underline;
                    }
                }
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

    .userInfo {
        display: flex;
        flex-direction: row;
        gap: 40px;

        .user-avatar {
            cursor: pointer;
            width: 150px;
            height: 150px;
            background: url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png') no-repeat center;
            background-size: cover;
        }

        .user-data {
            flex: 1;
            display: flex;
            flex-direction: column;

            .user-name {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                align-items: center;
                gap: 20px;
                border-bottom: 1px solid #D1D0D0;
                padding-bottom: 15px;
                margin-bottom: 15px;
                font-size: 25px;
            }

            .user-cnt {
                $user-cnt-gap: 20px;
                display: flex;
                flex-direction: row;
                gap: $user-cnt-gap;

                &>div {
                    color: #666666;

                    &:hover {
                        color: #0C73C2;
                        cursor: pointer;
                    }
                }

                &>div:nth-child(1) {
                    border-right: 1px solid #D1D0D0;
                    padding-right: $user-cnt-gap;

                    &>div:first-child {
                        font-size: 22px;
                    }
                }

                &>div:nth-child(2) {
                    border-right: 1px solid #D1D0D0;
                    padding-right: $user-cnt-gap;

                    &>div:first-child {
                        font-size: 22px;
                    }
                }

                &>div:nth-child(3) {
                    border-right: 1px solid #D1D0D0;
                    padding-right: $user-cnt-gap;

                    &>div:first-child {
                        font-size: 22px;
                    }
                }
            }

            .user-intro {
                margin-top: 15px;
                color: #666666;
                font-size: 13px;
            }

            .user-area-age {
                margin-top: 13px;
                display: flex;
                flex-direction: row;
                gap: 30px;

                &>div {
                    color: #666666;
                    font-size: 13px;
                }
            }
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
</style>

<style lang="scss" scoped>
.dialog-content {
    display: flex;
    flex-direction: row;
    gap: 30px;

    .playlist-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        row-gap: 20px;

        .playlist-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;

            .el-input {
                :deep(.el-input__wrapper) {
                    box-shadow: none;
                    border: 1px solid #CDCDCD;

                    &.is-focus {
                        box-shadow: 0px 0px 3px #C20C0C;
                    }
                }
            }

            &>div {
                width: auto;
            }
        }

        .playlist-label {
            display: flex;
            flex-direction: row;

            &>div:last-child {

                &>div:first-child {
                    color: #3373CC;
                    width: max-content;

                    &:hover {
                        cursor: pointer;
                        text-decoration-line: underline;
                    }
                }

                &>div:nth-child(2) {
                    margin-right: 5px;
                }

                &>div:last-child {
                    margin-top: 10px;
                    color: #999999;
                    font-size: 12px;
                }
            }
        }

        .playlist-introduce {
            display: flex;
            flex-direction: row;

            &>div {
                text-wrap: nowrap;
                width: max-content;
            }

            .el-textarea {
                width: 100%;

                :deep(.el-textarea__inner) {
                    box-shadow: none;
                    border: 1px solid #CDCDCD;

                    &:focus {
                        box-shadow: 0px 0px 3px #C20C0C;
                    }
                }
            }
        }
    }

    .playlist-cover {
        width: 160px;
        height: 160px;
        background: #000;
        display: flex;
        flex-direction: column;
        justify-content: end;
        background: url('/public/cover/default-playlist-cover.jpg') no-repeat;
        background-size: cover;

        .edit-cover {
            width: 100%;
            height: 30px;
            background: rgba(159, 159, 159, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;

            &>div {
                color: white;
                opacity: 1;

                &:hover {
                    cursor: pointer;
                    text-decoration-line: underline;
                }
            }
        }
    }
}
</style>

<style lang="scss" scoped>
.label-content {
    height: 300px;
    overflow-y: scroll;
    overflow-x: hidden;

    .label-type {
        display: flex;
        margin-bottom: 40px;

        &>div:first-child {
            color: #333333;
        }

        .label-grid-container {
            flex: 1;

            .label-grid {
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 15px;

                .label-btn {
                    margin-left: 0;
                    position: relative;

                    // 新增 active 类名，控制圆形的显示
                    &.active::after {
                        content: '';
                        position: absolute;
                        bottom: -6px;
                        right: -6px;
                        width: 20px;
                        height: 20px;
                        background:
                            url('../assets/selected.svg') center no-repeat,
                            green;
                        background-size: cover;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>