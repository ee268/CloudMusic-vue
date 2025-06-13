<template>
  <div>
    <pageHeaderSubMenu paddingBottom="7px" height="5px">
    </pageHeaderSubMenu>

    <el-upload drag :auto-upload="true" :http-request="handleUpload" ref="upload" multiple>
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        拖动歌曲到此或 <em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          仅支持MP3，WMA，WAV，APE，FLAC，OGG，AAC格式
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import pageHeaderSubMenu from '../components/pageHeaderSubMenu.vue'
import { ref } from "vue"
import axios from 'axios' // 如果需要后端处理
import { ElMessage } from 'element-plus'
import { useMusicStore } from '../stores/music'

const musicStore = useMusicStore()

// 用于存储上传成功的文件信息
const uploadedFiles = ref('');
// 用于存储上传失败的错误信息
const uploadError = ref('');

const upload = ref(null)

// 修改 handleUpload 方法，确保正确绑定和执行
const handleUpload = async (options) => {
  const file = options.file;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post('http://localhost:5000/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    // 假设后端返回文件信息，格式为 { name: 'filename', url: 'file_url' }
    if (response.data && response.data.files) {
      uploadedFiles.value = response.data.files;

      let name = uploadedFiles.value[0].name.split('.')[0]
      let url = uploadedFiles.value[0].url

      console.log('上传文件信息：', name, url);

      if (musicStore.addAudio(name, url)) {
        ElMessage({
          showClose: true,
          message: '上传成功',
          type: 'success',
          plain: true,
          duration: 2000
        })
      }
      else {
        upload.value.clearFiles()
      }

    } else {
      throw new Error('后端未返回有效文件信息');
    }
  } catch (err) {
    // 检查错误类型并显示相应信息
    if (err.response) {
      // 服务器响应错误
      uploadError.value = err.response.data.message || '格式错误';
    } else if (err.request) {
      // 请求未收到响应
      uploadError.value = '网络错误，请检查您的连接';
    } else {
      // 其他错误
      uploadError.value = err.message || '上传失败，请稍后重试';
    }

    ElMessage({
      showClose: true,
      message: uploadError.value,
      type: 'error',
      plain: true,
      duration: 2000
    });
  }
};

// 确保 handleUpload 方法正确暴露
defineExpose({ handleUpload });
</script>

<style lang="scss" scoped></style>