<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="myMusic">
            <el-card>
                <div class="userInfo">
                    <div class="user-avatar" @click="showPlayList"></div>

                    <div class="user-data">
                        <div class="user-name">
                            {{ userInfo.name }}
                            <el-button @click="editUserInfo">编辑个人资料</el-button>
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
                        <div class="card-header-title">我创建的歌单{{ '(' + userInfo.create_playlist.length + ')' }}</div>

                        <div class="hot">
                            <el-button @click="createPlayList">
                                创建歌单
                            </el-button>
                        </div>
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
            <el-card v-show="showCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">我收藏的歌单{{ '(' + userInfo.collect_playlist.length + ')' }}</div>
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
            </el-card>

            <el-card v-show="showFollowerCnt">
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">粉丝：{{ '(' + userInfo.follower_cnt + ')' }}</div>
                    </div>
                </template>
            </el-card>
        </div>

        <el-dialog v-model="openCreatePlayList" title="创建歌单" width="500" align-center>
            <div class="label-dialog">
                <el-dialog v-model="openSelectLabel" title="选择标签" align-center>
                    <div class="label-content">
                        <div>选择合适的标签，最多可选3个</div>
                        <div class="label-type" v-for="(item, row) in selectLabel" :key="row">
                            <div>{{ item.type }}：</div>
                            <div class="label-grid-container">
                                <div class="label-grid">
                                    <el-button v-for="(label, col) in item.label" :key="col" class="label-btn"
                                        @click="clickLabel(row, col, label)"
                                        :class="{ 'active': selectedLabel_btn[row][col] }">
                                        {{ label }}
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <div style="text-align: center; border-top: 1px solid #999; padding: 16px 0 0 0;">
                            <el-button type="primary" @click="openSelectLabel = false">
                                保存并关闭
                            </el-button>
                        </div>
                    </template>
                </el-dialog>
            </div>

            <div class="dialog-content">
                <div class="playlist-content">
                    <div class="playlist-title">
                        <div>歌单名：</div>
                        <el-input v-model="playListName" maxlength="20"></el-input>
                    </div>
                    <div class="playlist-label">
                        <div>标签：</div>
                        <div>
                            <div @click="openSelectLabel = true">选择标签</div>
                            <div>
                                <el-tag v-for="label in seletedLabel" :key="label" @close="deleteLabel(label)"
                                    :closable="true" type="info">{{ label[0] }}</el-tag>
                            </div>
                            <div>选择适合的标签，最多选3个</div>
                        </div>
                    </div>
                    <div class="playlist-introduce">
                        <div>介绍：</div>
                        <el-input v-model="playListIntro" maxlength="1000" show-word-limit type="textarea"
                            :autosize="{ minRows: 8, maxRows: 8 }" />
                    </div>
                </div>
                <div class="playlist-cover">
                    <div class="edit-cover">
                        <div>编辑封面</div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <el-button @click="createPlayList('close')">取消</el-button>
                    <el-button type="primary" @click="createPlayList('correct')">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '@/components/pageHeaderSubMenu.vue'
import { useUserStore } from '../stores/user'
import { useMusicStore } from '../stores/music'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const showCnt = ref(true)
const showArticleCnt = ref(false)
const showFollowCnt = ref(false)
const showFollowerCnt = ref(false)

const openCreatePlayList = ref(false)
const openSelectLabel = ref(false)

const userInfo = ref(userStore.getUserId(localStorage.getItem('acc_id')))

const musicStore = useMusicStore()
const { playList } = storeToRefs(musicStore)

const collectPlayList = ref([])
for (let i = 0; i < userInfo.value.collect_playlist.length; i++) {
    let list = musicStore.getPlayListId(userInfo.value.collect_playlist[i])
    if (list) {
        collectPlayList.value.push(list)
    }
}

const selectLabel = musicStore.selectLabel

const playListName = ref('')
const playListIntro = ref('')

const playList_info = ref([])
for (let i = 0; i < userInfo.value.create_playlist.length; i++) {
    playList_info.value.push(musicStore.getPlayListId(userInfo.value.create_playlist[i]))
}

let seletedLabel = ref([])
const selectedLabel_btn = ref([])
for (let i = 0; i < selectLabel.length; i++) {
    selectedLabel_btn.value.push([])
    for (let j = 0; j < selectLabel[i].label.length; j++) {
        selectedLabel_btn.value[i].push(false)
    }
}
let selectedLabelCnt = 0

const clickLabel = (row, col, label) => {
    if (selectedLabel_btn.value[row][col]) {
        selectedLabel_btn.value[row][col] = !selectedLabel_btn.value[row][col]
        seletedLabel.value.pop()
        selectedLabelCnt--

        return
    }

    if (selectedLabelCnt == 3) {
        ElMessage.error('标签最多不能超过3个')

        return
    }

    selectedLabel_btn.value[row][col] = !selectedLabel_btn.value[row][col]
    seletedLabel.value.push([label, [row, col]])
    selectedLabelCnt++
}

const deleteLabel = (label) => {
    selectedLabel_btn.value[label[1][0]][label[1][1]] = false
    seletedLabel.value.pop()
    selectedLabelCnt--
}

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

const createPlayList = (signal) => {
    if (signal == 'correct') {
        if (playListName.value == '') {
            ElMessage.error('歌单名不能为空')
            return
        }

        let playListLabel = []
        for (let i = 0; i < seletedLabel.value.length; i++) {
            playListLabel.push(seletedLabel.value[i][0])
        }

        let playList_id = Math.random().toString().substring(5, 12)

        while (musicStore.getPlayListId(playList_id)) {
            playList_id = Math.random().toString().substring(5, 12)
        }

        musicStore.addPlayList({
            name: playListName.value,
            id: playList_id,
            cover: '',
            creator_id: localStorage.getItem('acc_id'),
            intro: playListIntro.value,
            label: playListLabel,
            create_time: getNowFormatDate(),
            audios: []
        })

        userStore.updateCreatePlayList(userInfo.value.acc_id, playList_id)
        localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo))

        console.log(musicStore.playList);
    }
    else if (signal == 'close') {
        playListName.value = playListIntro.value = ''
        selectedLabelCnt = 0
        for (let i = 0; i < selectedLabel_btn.value.length; i++) {
            for (let j = 0; j < selectedLabel_btn.value[i].length; j++) {
                selectedLabel_btn.value[i] = false
            }
        }
    }

    openCreatePlayList.value = !openCreatePlayList.value
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

const showArticle = () => {
    showCnt.value = showFollowCnt.value = showFollowerCnt.value = false
    showArticleCnt.value = true
}

const showFollow = () => {
    showCnt.value = showArticleCnt.value = showFollowerCnt.value = false
    showFollowCnt.value = true
}

const showFollower = () => {
    showCnt.value = showArticleCnt.value = showFollowCnt.value = false
    showFollowerCnt.value = true
}

const editUserInfo = () => {
    router.push({ name: 'userConfig' })
}

const getPlaylistCover = (list) => {
    if (!list.audios?.length || !list.audios[0]?.audio?.cover) {
        return 'url(/public/cover/default-playlist-cover.jpg)'
    }
    return `url(${list.audios[0].audio.cover})`
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
                justify-content: space-between;
                align-items: center;
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