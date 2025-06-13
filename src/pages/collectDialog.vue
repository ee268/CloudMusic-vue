<template>
    <div class="collectDialog">
        <el-dialog v-model="props.openCollectDialog" @close="props.CloseEvent" width="500" title="添加到歌单">
            <div class="collectDialogContent">
                <div class="collectDialogContent collect-menu" v-for="(list, index) in createPlayList" :key="index"
                    @click="collectAudioToPlayList(props.collectAudio, index)">
                    <div class="cover" :style="{ background: getPlaylistCover(list), backgroundSize: 'cover' }">
                    </div>
                    <div class="info">
                        <div class="info name">{{ list.name }}</div>
                        <div class="info cnt-song">{{ list.audios.length }}首</div>
                        <div></div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMusicStore } from '../stores/music';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const props = defineProps({
    openCollectDialog: {
        type: Boolean,
        default: false
    },
    CloseEvent: {
        type: Function,
        default: () => { }
    },
    collectAudio: {
        type: Object,
        default: () => { }
    }
})

const musicStore = useMusicStore()
const userStore = useUserStore()
const roure = useRouter()

const curUser = userStore.getUserId(localStorage.getItem('acc_id'))
const createPlayList = ref([])
for (let i = 0; i < curUser.create_playlist.length; i++) {
    let list = musicStore.getPlayListId(curUser.create_playlist[i])
    if (list) {
        createPlayList.value.push(list)
    }
}
console.log(createPlayList.value);



const getPlaylistCover = (list) => {
    if (!list.audios?.length || !list.audios[0]?.audio?.cover) {
        return 'url(/public/cover/default-playlist-cover.jpg)'
    }
    return `url(${list.audios[0].audio.cover})`
}

const collectAudioToPlayList = (audioData, index) => {
    if (musicStore.getSongInPlayList(createPlayList.value[index].id, audioData.id)) {
        ElMessage.warning('歌曲已存在')
        return
    }

    musicStore.addToPlayList(createPlayList.value[index].id, audioData)
    ElMessage.success('添加成功')
    // console.log(audioData);
}

</script>

<style lang="scss" scoped>
.collectDialog {

    :deep(.el-dialog__header) {
        padding-left: 16px;
    }

    :deep(.el-dialog) {
        padding-left: 0;
        padding-right: 0;

        .el-dialog__body {
            height: 400px;
            overflow-y: auto;
        }
    }


    .collectDialogContent {
        display: flex;
        flex-direction: column;

        .collect-menu {
            flex: 1;
            padding: 16px;
            border-bottom: 1px solid #E0E0E0;
            background: none;
            transition: background 0.3s ease;
            display: flex;
            flex-direction: row;

            .cover {
                width: 60px;
                height: 60px;
                border-radius: 5px;
                background: pink;
                margin-right: 20px;
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .name {
                    font-size: 17px;
                    color: black;
                }

                .cnt-song {
                    font-size: 14px;
                    color: #666666;
                }
            }

            &:hover {
                cursor: pointer;
                background: #F2F2F2;
            }
        }
    }
}
</style>