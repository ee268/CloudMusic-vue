<template>
  <div class="container">
    <el-container>
      <el-header>
        <pageHeader />
      </el-header>
      <el-main>
        <router-view></router-view>
        <el-backtop :right="250" :bottom="100" >
          <div style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      ">
            <el-icon color="#C20C0C">
              <Top />
            </el-icon>
          </div>
        </el-backtop>
      </el-main>
      <el-footer>
        <pageFooter />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import pageHeader from '../components/pageHeader.vue'
import pageFooter from '../components/pageFooter.vue';
</script>

<style lang="scss" scoped>
.container {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;

  .el-container {
    height: 100%;

    .el-header {
      height: auto;
      padding: 0;
    }

    .el-main {
      padding: 0;
    }

    .el-footer {
      border-top: 1px solid #D3D3D3;
      background: #F2F2F2;
      padding: 0;
    }
  }
}
</style>