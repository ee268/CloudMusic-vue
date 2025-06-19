<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="search">
            <div class="search-input">
                <el-input v-model="searchContent" placeholder="音乐/歌单/用户" @keyup.enter="enterSearch">
                    <template #append>
                        <el-button @click="enterSearch">
                            <el-icon>
                                <search />
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>

            <div class="search-tip">
                <div>搜索“{{ searchContent }}”，找到</div>
                <div style="color: #C20C0C; padding: 0 5px 0 5px;">
                    {{ activeMenu[0] ? single_music_result.length : (activeMenu[1] ? playList_result.length :
                        user_result.length)
                    }}
                </div>
                <div>
                    {{ activeMenu[0] ? '首' : '个' }}{{ activeMenu[0] ? '单曲' : (activeMenu[1] ? '歌单' : '用户') }}
                </div>
            </div>

            <div class="search-result">
                <div class="result-classify">
                    <div :class="{ 'is-active': activeMenu[0] }" @click="clickMenu(0)">单曲</div>
                    <div :class="{ 'is-active': activeMenu[1] }" @click="clickMenu(1)">歌单</div>
                    <div :class="{ 'is-active': activeMenu[2] }" @click="clickMenu(2)">用户</div>
                </div>

                <div v-show="activeMenu[0]" class="result-content music">
                    <div class="result-item" :class="{ 'bg': i % 2 == 0 }" v-for="(music, i) in single_music_result"
                        :key="i">
                        <div class="play-btn">
                            <el-button @click="play_singleMusic(i)">
                                <el-icon size="20">
                                    <VideoPlay />
                                </el-icon>
                            </el-button>
                        </div>
                        <div class="song-name" @click="toSongPage(i)">
                            {{ music.audio.name }}
                        </div>
                        <div class="add-btn">
                            <el-button @click="addToCurPlayList(i)">
                                <el-icon size="20">
                                    <Plus />
                                </el-icon>
                            </el-button>
                            <el-button @click="openCollectMusicBtn(i)">
                                <el-icon size="20">
                                    <FolderAdd />
                                </el-icon>
                            </el-button>
                        </div>
                        <div class="play-time">
                            {{ single_music_playTime[i] }}
                        </div>
                        <div class="artist" @click="toUserPage(music.creator_id)">
                            {{ music.creator_name }}
                        </div>
                    </div>
                </div>

                <div v-show="activeMenu[1]" class="result-content musicList">
                    <div class="result-item" :class="{ 'bg': i % 2 == 0 }" v-for="(playList, i) in playList_result"
                        :key="i">
                        <div class="play-btn">
                            <el-button @click="play_playList(i)">
                                <el-icon size="20">
                                    <VideoPlay />
                                </el-icon>
                            </el-button>
                        </div>
                        <div class="song-name" @click="toPlayListPage(i)">
                            {{ playList.name }}
                        </div>
                        <div class="add-btn">
                            <el-button @click="listAddToPlayList(i)">
                                <el-icon size="20">
                                    <Plus />
                                </el-icon>
                            </el-button>
                            <el-button @click="collectPlayList(i)">
                                <el-icon size="20">
                                    <FolderAdd />
                                </el-icon>
                            </el-button>
                        </div>
                        <div class="artist" @click="toUserPage(playList.creator_id)">
                            {{ userStore.getUserId(playList.creator_id).name }}
                        </div>
                    </div>
                </div>

                <div v-show="activeMenu[2]" class="result-content user">
                    <div class="result-item" :class="{ 'bg': i % 2 == 0 }" v-for="(user, i) in user_result" :key="i">
                        <div class="song-name" style="justify-content: center;" @click="toUserPage(user.acc_id)">
                            {{ user.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <collectDialog :openCollectDialog="isOpenCollectDialog" :CloseEvent="closeCollectDialog"
            :collectAudio="setCollectAudio"></collectDialog>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from "../components/pageHeaderSubMenu.vue"
import collectDialog from "./collectDialog.vue"
import { ElMessage } from "element-plus"
import { onMounted, ref } from "vue"
import { useUserStore } from "../stores/user"
import { useMusicStore } from "../stores/music"
import { useRouter } from "vue-router"

const userStore = useUserStore()
const musicStore = useMusicStore()
const router = useRouter()

const searchContent = ref('')

//活动菜单
const activeMenu = ref([true, false, false])

//搜索结果存储
const single_music_result = ref([])
const single_music_playTime = ref([])
const playList_result = ref([])
const user_result = ref([])

const enterSearch = () => {
    single_music_result.value = []
    single_music_playTime.value = []
    playList_result.value = []
    user_result.value = []

    if (searchContent.value == '') {
        ElMessage.warning('请输入搜索内容')
        return
    }

    router.replace({
        params: {
            text: searchContent.value
        }
    })

    for (let i = 0; i < musicStore.audioInfo.length; i++) {
        if (musicStore.audioInfo[i].audio.name.indexOf(searchContent.value) != -1) {
            single_music_result.value.push(musicStore.audioInfo[i])
            single_music_playTime.value.push('')
        }
    }

    for (let i = 0; i < single_music_playTime.value.length; i++) {
        let audio = new Audio(single_music_result.value[i].audio.url)
        audio.addEventListener('loadedmetadata', function () {
            single_music_playTime.value[i] = (Math.floor(audio.duration / 60).toString().padStart(2, '0') + ':' + Math.floor(audio.duration % 60).toString().padStart(2, '0'))
        })
    }

    for (let i = 0; i < musicStore.playList.length; i++) {
        if (musicStore.playList[i].name.indexOf(searchContent.value) != -1) {
            playList_result.value.push(musicStore.playList[i])
        }
    }

    for (let i = 0; i < userStore.userInfo.length; i++) {
        if (userStore.userInfo[i].name.indexOf(searchContent.value) != -1) {
            user_result.value.push(userStore.userInfo[i])
        }
    }

    // console.log('单曲搜索', single_music_result.value.length);
    // console.log('歌单搜索', playList_result.value.length);
    // console.log('用户搜索', user_result.length);
}

const clickMenu = (index) => {
    activeMenu.value = [false, false, false]
    activeMenu.value[index] = true
}

onMounted(() => {
    searchContent.value = router.currentRoute.value.params.text
    enterSearch()
})

const play_singleMusic = (index) => {
    let CurPlayList = musicStore.audio.list.audios
    for (let i = 0; i < CurPlayList.length; i++) {
        if (CurPlayList[i].url == single_music_result.value[index].audio.url) {
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

    musicStore.addCurPlayListActual(single_music_result.value[index].audio)
    musicStore.audio.list.add(single_music_result.value[index].audio)

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

const toSongPage = (index) => {
    router.push({ name: 'song', params: { id: '=' + single_music_result.value[index].id } })
}

const addToCurPlayList = (index) => {
    let CurPlayList = musicStore.audio.list.audios
    for (let i = 0; i < CurPlayList.length; i++) {
        if (CurPlayList[i].url == single_music_result.value[index].audio.url) {
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

    musicStore.addCurPlayListActual(single_music_result.value[index].audio)
    musicStore.audio.list.add(single_music_result.value[index].audio)

    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'info',
        plain: true,
        duration: 2500
    })
}

const toPlayListPage = (index) => {
    router.push({ name: 'list', params: { id: '=' + playList_result.value[index].id } })
}

const listAddToPlayList = (index) => {
    for (let i = 0; i < playList_result.value[index].audios.length; i++) {
        let audioData = playList_result.value[index].audios[i].audio
        let isExist = musicStore.curPlayListActual.find(item => item.url == audioData.url)

        if (isExist) {
            continue
        }

        musicStore.audio.list.add(audioData)
        musicStore.addCurPlayListActual(audioData)
    }

    ElMessage({
        showClose: true,
        message: '已添加到播放列表',
        type: 'info',
        plain: true,
        duration: 2500
    })
}

const collectPlayList = (index) => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    if (playList_result.value[index].creator_id == user.acc_id) {
        ElMessage({
            showClose: true,
            message: '不能收藏自己的歌单',
            type: 'warning',
            plain: true,
            duration: 2500
        })

        return
    }

    if (userStore.updateCollectPlayList(user.acc_id, playList_result.value[index].id)) {
        ElMessage({
            showClose: true,
            message: '收藏成功',
            type: 'success',
            plain: true,
            duration: 2500
        })
    }
}

const play_playList = (index) => {
    musicStore.clearCurPlayListActual()
    musicStore.clearCurPlayList()
    musicStore.audio.list.clear()

    for (let i = 0; i < playList_result.value[index].audios.length; i++) {
        let audioData = playList_result.value[index].audios[i].audio

        musicStore.audio.list.add(audioData)
        musicStore.addCurPlayListActual(audioData)
    }
    console.log(musicStore.curPlayListActual);

    musicStore.audio.list.switch(0)
    setTimeout(() => {
        musicStore.audio.play()
    }, 500)
    musicStore.isPlaying = true
}

const toUserPage = (id) => {
    router.push({ name: 'alterUser', params: { id: id } })
}

const setCollectAudio = ref()

const isOpenCollectDialog = ref(false)

const openCollectMusicBtn = (index) => {
    isOpenCollectDialog.value = true
    setCollectAudio.value = single_music_result.value[index]
}

const closeCollectDialog = () => {
    isOpenCollectDialog.value = false
}

</script>

<style lang="scss" scoped>
.search {
    width: 55%;
    background: white;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    border-left: 1px solid #D3D3D3;
    border-right: 1px solid #D3D3D3;

    .search-input {
        margin-top: 30px;
        margin-bottom: 30px;
        display: flex;
        width: 55%;
        height: 40px;
    }

    .search-tip {
        font-size: 13px;
        color: #9FA19F;
        display: flex;
        flex-direction: row;
    }

    .search-result {
        width: 100%;
        height: 100%;
        // background: green;

        .result-classify {
            display: flex;
            flex-direction: row;
            // background: yellow;
            justify-content: space-between;
            padding: 0 40px 0 40px;

            &>div {
                flex: 1;
                height: 40px;
                background: #F7F7F7;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 15px;
                color: #333333;
                padding: 0 30px 0 30px;
                border-top: 3px solid #CCCCCC;
                border-left: 1px solid transparent;
                border-right: 1px solid transparent;
                border-bottom: 1px solid #CCCCCC;
                transition: all 0.3s ease;
                cursor: pointer;

                &.is-active {
                    border-top: 3px solid #D13030;
                    border-left: 1px solid #CCCCCC;
                    border-right: 1px solid #CCCCCC;
                    border-bottom: 1px solid transparent;
                }

                &:hover {
                    border-top: 3px solid #D13030;
                }
            }

            &>div:first-child {
                border-left: 1px solid #CCCCCC;
            }

            &>div:last-child {
                border-right: 1px solid #CCCCCC;
            }
        }

        .result-content {
            height: 100%;
            // background: purple;
            padding: 20px 40px 0 40px;
            display: flex;
            flex-direction: column;

            .result-item {
                height: 35px;
                background: white;
                display: flex;
                flex-direction: row;
                padding: 3px;
                border: 1px solid transparent;
                transition: all 0.3s ease-in-out;

                &.bg {
                    background: #F7F7F7;
                }

                .play-btn {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .el-button {
                        border: none;
                        background: transparent;
                        padding: 0;
                        color: #B2B2B2;

                        &:hover {
                            color: #C20C0C;
                        }
                    }
                }

                .song-name {
                    flex: 4;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #464033;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    cursor: pointer;

                    &:hover {
                        text-decoration-line: underline;
                    }
                }

                .add-btn {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    visibility: hidden;

                    .el-button {
                        border: none;
                        background: transparent;
                        padding: 0;
                        color: #B2B2B2;

                        &:hover {
                            color: #C20C0C;
                        }
                    }
                }

                .play-time {
                    flex: 1;
                    color: #333333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                }

                .artist {
                    flex: 1;
                    color: #333333;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    // background: pink;
                    text-wrap: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    font-size: 14px;
                    cursor: pointer;

                    &:hover {
                        text-decoration-line: underline;
                    }
                }

                &:hover {
                    .add-btn {
                        visibility: visible;
                    }

                    background: #F2F2F2;
                    border: 1px solid #E1E1E1;
                }
            }
        }
    }
}
</style>