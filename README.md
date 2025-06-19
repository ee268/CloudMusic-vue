# 项目结构
    ├─.gitignore
    ├─index.html
    ├─package-lock.json
    ├─package.json
    ├─README.md
    ├─vite.config.js
    ├─src
    |  ├─App.vue
    |  ├─main.js
    |  ├─playMusic.vue
    |  ├─style.css
    |  ├─views
    |  |   └homePage.vue
    |  ├─stores
    |  |   ├─login.js
    |  |   ├─menu.js
    |  |   ├─music.js
    |  |   └user.js
    |  ├─router
    |  |   └route.js
    |  ├─pages
    |  |   ├─artitstMusic.vue
    |  |   ├─collectDialog.vue
    |  |   ├─findMusic.vue
    |  |   ├─myMusic.vue
    |  |   ├─search.vue
    |  |   ├─song.vue
    |  |   ├─songList.vue
    |  |   ├─upload.vue
    |  |   ├─userConfig.vue
    |  |   ├─findMusicSubPages
    |  |   |         ├─album.vue
    |  |   |         ├─playList.vue
    |  |   |         ├─recommend
    |  |   |         |     ├─hotRecommend.vue
    |  |   |         |     ├─newAlbum.vue
    |  |   |         |     ├─newAlbumCarousel.vue
    |  |   |         |     ├─personRecommend.vue
    |  |   |         |     ├─recommend.vue
    |  |   |         |     └recommendCarousel.vue
    |  |   |         ├─artist
    |  |   |         |   ├─areaArtist.vue
    |  |   |         |   ├─artist.vue
    |  |   |         |   ├─recommendArtist.vue
    |  |   |         |   └signedArtist.vue
    |  ├─components
    |  |     ├─pageFooter.vue
    |  |     ├─pageHeader.vue
    |  |     ├─pageHeaderMenu.vue
    |  |     └pageHeaderSubMenu.vue
    |  ├─axios
    |  |   └request.js
    |  ├─assets
    |  |   ├─COVER.jpg
    |  |   ├─github.svg
    |  |   ├─headerLogo.svg
    |  |   ├─selected.svg
    |  |   ├─ttf
    |  |   |  └JMH.ttf

# 安装依赖项
    npm i
# 启动项目
    npm run dev