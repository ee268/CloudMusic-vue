import { defineStore } from 'pinia'
import { ref } from 'vue'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { ElMessage } from 'element-plus'
import { useUserStore } from './user'
import { id } from 'element-plus/es/locales.mjs'

export const useMusicStore = defineStore('music', () => {
    const userStore = useUserStore()

    const audio = ''

    const audioList = ref([
        {
            name: 'Advertime',
            artist: 'Advertime',
            cover: '/public/cover/1.jpg',
            url: 'http://localhost:5000/files/Advertime.mp3',
        },
        {
            name: 'City Sunshine',
            artist: 'City Sunshine',
            cover: '/public/cover/4.jpg',
            url: 'http://localhost:5000/files/City_Sunshine.mp3',
        },
        {
            name: 'Inspiration',
            artist: 'Inspiration',
            cover: '/public/cover/5.jpg',
            url: 'http://localhost:5000/files/Inspiration.mp3'
        },
        {
            name: 'Limit 70',
            artist: 'Limit 70',
            cover: '/public/cover/default-playlist-cover.jpg',
            url: 'http://localhost:5000/files/Limit_70.mp3'
        },
        {
            name: 'NOMELON NOLEMON',
            artist: 'HALO',
            cover: '/public/cover/12.jpg',
            url: 'http://localhost:5000/files/NOMELON_NOLEMON_-_HALO.mp3'
        }
    ])

    const curPlayList = ref(JSON.parse(JSON.stringify(audioList.value)))
    const curPlayListActual = ref(JSON.parse(JSON.stringify(audioList.value)))
    for (let i = 0; i < curPlayListActual.value.length; i++) {
        let audio = new Audio(curPlayListActual.value[i].url);
        audio.addEventListener('loadedmetadata', function () {
            curPlayListActual.value[i].playTime = (Math.floor(audio.duration / 60).toString().padStart(2, '0') + ':' + Math.floor(audio.duration % 60).toString().padStart(2, '0'))
        })
    }

    if (localStorage.getItem('audioList')) {
        let jsonAudioList = JSON.parse(localStorage.getItem('audioList'))

        for (let i = audioList.value.length; i < jsonAudioList.length; i++) {
            audioList.value.push(jsonAudioList[i])
        }
    }
    else {
        localStorage.setItem('audioList', JSON.stringify(audioList.value))
    }

    function clearCurPlayList() {
        curPlayList.value = []
    }

    function clearCurPlayListActual() {
        curPlayListActual.value = []
    }

    function addCurPlayListActual(audio) {
        curPlayListActual.value.push(audio)
        let i = curPlayListActual.value.length - 1
        let au = new Audio(curPlayListActual.value[i].url);
        au.addEventListener('loadedmetadata', function () {
            curPlayListActual.value[i].playTime = (Math.floor(au.duration / 60).toString().padStart(2, '0') + ':' + Math.floor(au.duration % 60).toString().padStart(2, '0'))
        })
    }

    const audioInfo = []

    if (localStorage.getItem('audioInfo')) {
        let jsonAduioInfo = JSON.parse(localStorage.getItem('audioInfo'))
        for (let i = 0; i < jsonAduioInfo.length; i++) {
            audioInfo.push(jsonAduioInfo[i])
        }
    }
    else {
        for (let i = 0; i < audioList.value.length; i++) {
            audioInfo.push({
                id: Math.random().toString().substring(4, 12),
                audio: audioList.value[i],
            })
        }

        localStorage.setItem('audioInfo', JSON.stringify(audioInfo))
    }

    const playList = ref([
        {
            name: '歌单123',
            id: '1234567',
            cover: '',
            creator_id: '0000000000',
            intro: 'testtest',
            label: ['流行'],
            create_time: '2025-06-06',
            audios: [audioInfo[0], audioInfo[1]]
        }
    ])

    if (localStorage.getItem('playList')) {
        let jsonPlayList = JSON.parse(localStorage.getItem('playList'))

        for (let i = 0; i < playList.value.length; i++) {
            playList.value.pop()
        }

        for (let i = 0; i < jsonPlayList.length; i++) {
            playList.value.push(jsonPlayList[i])
        }
    }
    else {
        localStorage.setItem('playList', JSON.stringify(playList.value))
    }
    console.log('全部歌单', playList.value);

    // localStorage.setItem('backupPlayList', JSON.stringify(playList.value))

    function randPlayList() {
        const chinesePlaylistNames = [
            "星空下的旋律",
            "时光漫步",
            "心灵共鸣",
            "梦境边缘",
            "晨曦微露",
            "夜色温柔",
            "城市脉搏",
            "流光溢彩",
            "心灵之旅",
            "追梦人",
            "月光奏鸣曲",
            "风的低语",
            "云端漫步",
            "无尽之海",
            "繁星点点",
            "心灵港湾",
            "时光隧道",
            "梦幻泡影",
            "晨露未晞",
            "星河长明",
            "心灵捕手",
            "夜未央",
            "晨光熹微",
            "心灵捕梦网",
            "时光剪影",
            "梦的彼岸",
            "风之谷",
            "心灵交响曲",
            "晨曦初上",
            "星空物语",
            "心灵驿站",
            "时光倒影",
            "梦回故里",
            "风起云涌",
            "心灵捕手",
            "晨光微曦",
            "星空下的约定",
            "心灵捕梦网",
            "时光的河",
            "梦的轨迹",
            "风之翼",
            "心灵捕手",
            "晨曦中的希望",
            "星空下的秘密",
            "心灵捕梦人",
            "时光的旋律",
            "梦的延续",
            "风之舞",
            "心灵捕梦网",
            "晨曦中的光辉",
            "星空下的誓言",
            "心灵捕梦人",
            "时光的碎片",
            "梦的旅程",
            "风之诗",
            "心灵捕梦网",
            "晨曦中的温暖",
            "星空下的思念",
            "心灵捕梦人",
            "时光的印记",
            "梦的彼岸",
            "风之歌",
            "心灵捕梦网",
            "晨曦中的宁静",
            "星空下的约定",
            "心灵捕梦人",
            "时光的倒影",
            "梦的延续",
            "风之语",
            "心灵捕梦网",
            "晨曦中的希望",
            "星空下的秘密",
            "心灵捕梦人",
            "时光的旋律",
            "梦的旅程",
            "风之梦",
            "心灵捕梦网",
            "晨曦中的光辉",
            "星空下的思念",
            "心灵捕梦人",
            "时光的碎片",
            "梦的彼岸",
            "风之歌",
            "心灵捕梦网",
            "晨曦中的温暖",
            "星空下的约定",
            "心灵捕梦人",
            "时光的倒影",
            "梦的延续",
            "风之语",
            "心灵捕梦网",
            "晨曦中的宁静",
            "星空下的秘密",
            "心灵捕梦人",
            "时光的旋律",
            "梦的旅程",
            "风之梦",
            "心灵捕梦网"
        ];
        for (let i = 0; i < chinesePlaylistNames.length; i++) {
            let randAudioCnt = Math.floor(Math.random() * 20)
            let randAudios = []

            let randUser = Math.floor(Math.random() * userStore.userInfo.length)

            let playList_id = Math.random().toString().substring(5, 12)

            while (getPlayListId(playList_id)) {
                playList_id = Math.random().toString().substring(5, 12)
            }

            let randLabelCnt = Math.floor(Math.random() * 5)
            let randLabels = []

            let randName = Math.floor(Math.random() * chinesePlaylistNames.length)

            for (let i = 0; i < randAudioCnt; i++) {
                let k = Math.floor(Math.random() * audioInfo.length)
                randAudios.push(audioInfo[k])
            }

            for (let j = 0; j < randLabelCnt; j++) {
                let k = Math.floor(Math.random() * selectLabel[randLabelCnt].label.length)
                randLabels.push(selectLabel[randLabelCnt].label[k])
            }

            let newPlayList = {
                audios: randAudios,
                create_time: '2025-6-19',
                creator_id: userStore.userInfo[randUser].acc_id,
                id: playList_id,
                intro: 'test',
                label: randLabels,
                name: chinesePlaylistNames[randName]
            }

            // addAudio(newPlayList)
            addPlayList(newPlayList)
        }
    }

    function addAudio(name, url) {
        let cover_random = Math.floor(Math.random() * (40 - 1 + 1)) + 1

        let userName = userStore.getUserId(audioInfo[i].creator_id).name

        for (let i = 0; i < audioList.value.length; i++) {
            if (audioList.value[i].url === url) {
                ElMessage({
                    showClose: true,
                    message: '已存在相同歌曲',
                    type: 'warning',
                    plain: true,
                    duration: 2000
                });
                return false
            }
        }

        audioList.value.push({
            name: name,
            artist: name,
            cover: '/public/cover/' + cover_random + '.jpg',
            url: url,
        })

        audioInfo.push({
            id: Math.random().toString().substring(4, 12),
            creator_id: localStorage.getItem('acc_id'),
            creator_name: userName,
            audio: audioList.value[audioList.value.length - 1],
        })

        localStorage.setItem('audioInfo', JSON.stringify(audioInfo))
        localStorage.setItem('audioList', JSON.stringify(audioList.value))

        return true
    }

    console.log('全部歌曲', audioInfo);

    // function randCreator_id() {
    //     for (let i = 0; i < playList.value.length; i++) {
    //         for (let j = 0; j < playList.value[i].audios.length; j++) {
    //             playList.value[i].audios[j] = getAudioInfo(playList.value[i].audios[j].id)
    //         }
    //     }

    //     localStorage.setItem('playList', JSON.stringify(playList.value))
    // }

    function getPlayListId(id) {
        return playList.value.find(item => item.id === id)
    }

    function getSongInPlayList(playListId, audioId) {
        return playList.value.find(item => item.id === playListId).audios.find(item => item.id === audioId)
    }

    function addPlayList(val) {
        playList.value.push(val)

        localStorage.setItem('playList', JSON.stringify(playList.value))
    }

    function addToPlayList(id, audio) {
        let playListId = getPlayListId(id)

        playListId.audios.push(audio)

        localStorage.setItem('playList', JSON.stringify(playList.value))
    }

    function removeFromPlayList(id, audioId) {
        let playListId = getPlayListId(id)

        playListId.audios = playListId.audios.filter(item => item.id !== audioId)

        localStorage.setItem('playList', JSON.stringify(playList.value))
    }

    function removePlayList(id) {
        playList.value = playList.value.filter(item => item.id !== id)

        let userInfo = userStore.getUserId(localStorage.getItem('acc_id'))

        let list_update = []

        for (let i = 0; i < userInfo.create_playlist.length; i++) {
            let list = getPlayListId(userInfo.create_playlist[i])
            if (list) {
                list_update.push(userInfo.create_playlist[i])
            }
        }

        userInfo.create_playlist = list_update

        localStorage.setItem('playList', JSON.stringify(playList.value))
    }

    function syncPlayListAudioId() {
        for (let i = 0; i < playList.value.length; i++) {
            for (let j = 0; j < playList.value[i].audios.length; j++) {
                playList.value[i].audios[j].id = audioInfo.find(item => item.audio.url === playList.value[i].audios[j].audio.url).id
            }
        }
        localStorage.setItem('playList', JSON.stringify(playList.value))
    }

    function getAudioInfo(id) {
        return audioInfo.find(item => item.id === id)
    }

    const isPlaying = ref(false)

    const selectLabel = [
        {
            type: '语种',
            label: ['华语', '欧美', '日本', '韩国', '粤语']
        },
        {
            type: '风格',
            label: ['流行', '摇滚', '民谣', '电子', '舞曲', '说唱', '轻音乐', '爵士', '乡村', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', '另类', ' Folk']
        },
        {
            type: '场景',
            label: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步', '酒吧']
        },
        {
            type: '情感',
            label: ['怀旧', '清新', '浪漫', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念']
        },
        {
            type: '主题',
            label: ['影视原声', 'ACG', '游戏', '民谣', '说唱', '轻音乐', '爵士', '乡村', '古典', '民族', '英伦', '金属', '朋克', '蓝调', '雷鬼', '世界音乐', '拉丁', '另类/独立', '怀旧', '清新', '浪漫', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念']
        }
    ]

    return {
        playList,
        curPlayList,
        clearCurPlayList,
        curPlayListActual,
        clearCurPlayListActual,
        addCurPlayListActual,
        addToPlayList,
        removeFromPlayList,
        removePlayList,
        addAudio,
        audioInfo,
        audio,
        audioList,
        isPlaying,
        getAudioInfo,
        getPlayListId,
        getSongInPlayList,
        selectLabel,
        addPlayList,
        syncPlayListAudioId,
    }
})