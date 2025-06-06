<template>
  <div>
    <homePage />

    <div class="hover-animation" :class="{ 'animating': isHovering }" @mouseover="isHovering = !isLock ? true : false"
      @mouseout="isHovering = false">
      <div class="play">
        <div class="lock">
          <div>
            <el-icon v-show="isLock" @click="lockPos">
              <Lock />
            </el-icon>
            <el-icon v-show="!isLock" @click="lockPos">
              <Unlock />
            </el-icon>
          </div>
        </div>
        <footer>
          <playMusic />
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import homePage from './views/homePage.vue'
import playMusic from './playMusic.vue'
import { ref } from 'vue'

const isLock = ref(false)
const isHovering = ref(false)

const lockPos = () => {
  isLock.value = !isLock.value

  const element = document.querySelector('.hover-animation')

  if (isLock.value) {
    element.style.bottom = '0'
    isHovering.value = false
  } else {
    element.style.bottom = '-50px'
    isHovering.value = true
  }
}
</script>

<style lang="scss" scoped>
@keyframes expandPlay {
  0% {
    bottom: -50px;
  }

  100% {
    bottom: 0;
  }
}

.hover-animation {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: -50px;
  width: 100%;

  .play {
    .lock {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      padding-right: 20px;

      div {
        box-shadow: 0px 0px 10px #2F2E2E;
        display: flex;
        flex-direction: column;
        background: linear-gradient(to top, #414141, #2F2E2E);
        padding: 0 18px 0 18px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;

        .el-icon {
          color: white;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    footer {
      display: flex;
      box-shadow: 0px 0px 10px #2F2E2E;
      margin: 0;
      padding: 0;
      height: 50px;
      background: linear-gradient(to bottom, #414141, #2F2E2E);
    }
  }

  &.animating {
    animation: expandPlay .2s linear forwards;
  }
}
</style>