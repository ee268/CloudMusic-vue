<template>
    <div style="width: 100px; height: 100px; background-color: green;">
        artist
        <el-button type="success" class="flash animated infinite">按钮</el-button>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both
}

.animated.infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite
}

.flash {
    -webkit-animation-name: flash;
    animation-name: flash;
}

@-webkit-keyframes flash {

    /*只用修改这里就可以实现不同动画。例如大小闪烁transform: scale(.9);*/
    0%,
    100%,
    50% {
        opacity: 1;
        transform: scale(1);
    }

    25%,
    75% {
        opacity: 0.4;
        transform: scale(.9);
    }
}

@keyframes flash {

    0%,
    100%,
    50% {
        opacity: 1;
        transform: scale(1);
    }

    25%,
    75% {
        opacity: 0.4;
        transform: scale(.9);
    }
}
</style>