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
        }
    ])

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
                belong_ablum: '123456'
            })
        }

        localStorage.setItem('audioInfo', JSON.stringify(audioInfo))
    }

    const ablum = [
        {
            name: '专辑123',
            id: '123456',
            author: '0000000000',
            public_time: '2025-06-06',
            public_company: '123123',
            intro: 'testtest',
            audios: [audioInfo[0], audioInfo[1], audioInfo[2], audioInfo[3]]
        }
    ]

    const playList = [
        {
            name: '歌单123',
            id: '1234567',
            creator_id: '0000000000',
            intro: 'testtest',
            label: ['流行'],
            create_time: '2025-06-06',
            collect_user_cnt: 0,
            audios: [audioInfo[0], audioInfo[1]]
        }
    ]

    function getAudioInfo(id) {
        return audioInfo.find(item => item.id == id)
    }

    const audio = ''
    const isPlaying = ref(false)

    return {
        playList,
        audioInfo,
        ablum,
        audio,
        audioList,
        isPlaying,
        getAudioInfo
    }
})