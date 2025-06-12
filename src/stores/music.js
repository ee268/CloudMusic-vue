import { defineStore } from 'pinia'
import { ref } from 'vue'
import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import { id } from 'element-plus/es/locales.mjs'

export const useMusicStore = defineStore('music', () => {
    const audioList = ref([
        {
            name: 'Advertime',
            artist: 'Advertime',
            cover: '/public/cover/1.jpg',
            url: '/public/song/Advertime.mp3',
        },
        {
            name: 'City Sunshine',
            artist: 'City Sunshine',
            cover: '/public/cover/4.jpg',
            url: '/public/song/City Sunshine.mp3',
        },
        {
            name: 'Inspiration',
            artist: 'Inspiration',
            cover: '/public/cover/5.jpg',
            url: '/public/song/Inspiration.mp3'
        },
        {
            name: 'Limit 70',
            artist: 'Limit 70',
            url: '/public/song/Limit 70.mp3'
        },
        {
            name: 'NOMELON NOLEMON',
            artist: 'HALO',
            cover: '/public/cover/12.jpg',
            url: '/public/song/NOMELON NOLEMON - HALO.mp3'
        }
    ])
    


    const curPlayList = ref(JSON.parse(JSON.stringify(audioList.value)))

    function clearCurPlayList() {
        for (let i = 0; i < curPlayList.value.length; i++) {
            curPlayList.value.pop()
        }
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
                belong_album: '123456'
            })
        }

        localStorage.setItem('audioInfo', JSON.stringify(audioInfo))
    }

    const ablum = [
        {
            name: '专辑123',
            cover: '',
            id: '123456',
            author: '0000000000',
            public_time: '2025-06-06',
            public_company: '123123',
            intro: 'testtest',
            audios: [audioInfo[0], audioInfo[1], audioInfo[2], audioInfo[3]]
        }
    ]

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

    function getPlayListId(id) {
        return playList.value.find(item => item.id === id)
    }

    function addPlayList(val) {
        playList.value.push(val)

        localStorage.setItem('playList', JSON.stringify(playList.value))
    }

    function getAudioInfo(id) {
        return audioInfo.find(item => item.id === id)
    }

    const audio = ''
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
        audioInfo,
        ablum,
        audio,
        audioList,
        isPlaying,
        getAudioInfo,
        getPlayListId,
        selectLabel,
        addPlayList
    }
})