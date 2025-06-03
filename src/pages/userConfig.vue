<template>
    <div>
        <pageHeaderSubMenu paddingBottom="7px" height="5px">
        </pageHeaderSubMenu>

        <div class="userConfig">
            <el-card>
                <template #header>
                    <div class="card-header">
                        <div class="card-header-title">个人设置</div>
                    </div>
                </template>
                <div class="config">
                    <div class="avator">
                        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                            fit="cover" />
                        <el-button>更换头像</el-button>
                    </div>

                    <div class="name">
                        <div class="indicate_word">昵称：</div>
                        <el-input v-model="name" maxlength="10" placeholder="昵称" />
                    </div>

                    <div class="intro">
                        <div>介绍：</div>
                        <el-input v-model="intro" maxlength="300" show-word-limit type="textarea"
                            :autosize="{ minRows: 7, maxRows: 7 }" placeholder="个人介绍" />
                    </div>

                    <div class="gender">
                        <div>性别：</div>
                        <el-radio-group v-model="gender">
                            <el-radio value="1">男</el-radio>
                            <el-radio value="2">女</el-radio>
                        </el-radio-group>
                    </div>

                    <div class="birthday">
                        <div>生日：</div>
                        <div>
                            <el-select v-model="birthday[0]" style="width: 100px" placeholder="年">
                                <el-option label="2025">
                                </el-option>
                            </el-select>

                            <el-select v-model="birthday[1]" style="width: 100px" placeholder="月">
                                <el-option label="2025">
                                </el-option>
                            </el-select>

                            <el-select v-model="birthday[2]" style="width: 100px" placeholder="日">
                                <el-option label="2025">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="area">
                        <div>地区：</div>

                        <div>
                            <el-select v-model="area[0]" style="width: 100px" placeholder="省">
                                <el-option label="2025">
                                </el-option>
                            </el-select>

                            <el-select v-model="area[1]" style="width: 100px" placeholder="市">
                                <el-option label="2025">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="saveConfig">
                        <el-button type="primary" @click="saveConfig">保存</el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import pageHeaderSubMenu from '../components/pageHeaderSubMenu.vue'
import { useMenuStore } from '../stores/menu'
import { useUserStore } from '../stores/user'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

const menuStore = useMenuStore()

const userStore = useUserStore()

const name = ref('');
const intro = ref('');
const gender = ref('');
const birthday = ref(['', '', '']);
const area = ref(['', '']);

onMounted(() => {
    menuStore.menuRef.updateActiveIndex("3")
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    name.value = user.name
    intro.value = user.introduce
    gender.value = user.gender
    birthday.value = user.birthday
    area.value = user.area
})

const saveConfig = () => {
    let user = userStore.getUserId(localStorage.getItem('acc_id'))

    console.log(user);

    user.name = name.value
    user.introduce = intro.value
    user.gender = gender.value
    user.birthday = birthday.value
    user.area = area.value

    userStore.updateUserInfo(user)

    localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo))

    ElMessage({
        showClose: true,
        message: '保存成功',
        type: 'success',
        plain: true,
        duration: '1000'
    })
}

</script>

<style lang="scss" scoped>
.userConfig {
    position: relative;
    width: 55%;
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

    .config {
        display: flex;
        flex-direction: column;
        row-gap: 15px;
        align-items: center;
        justify-content: center;

        .avator {
            display: flex;
            flex-direction: column;
            width: 150px;

            .el-image {
                height: 150px;
            }

            .el-button {
                border: none;
                border-radius: 0;
                background: #A5A5A5;
                color: #FFFEFC;

                &:hover {
                    text-decoration-line: underline;
                }
            }
        }

        .name {
            display: flex;
            flex-direction: row;
            align-items: center;

            .el-input {
                width: 300px;

                :deep(.el-input__wrapper) {
                    box-shadow: none;
                    border: 1px solid #CDCDCD;

                    &.is-focus {
                        box-shadow: 0px 0px 3px #C20C0C;
                    }
                }
            }
        }

        .intro {
            display: flex;
            flex-direction: row;
            align-items: center;

            .el-textarea {
                width: 300px;

                :deep(.el-textarea__inner) {
                    box-shadow: none;
                    border: 1px solid #CDCDCD;

                    &:focus {
                        box-shadow: 0px 0px 3px #C20C0C;
                    }
                }
            }
        }

        .gender {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .birthday {
            display: flex;
            flex-direction: row;
            align-items: center;

            &>div:last-child {
                display: flex;
                gap: 10px;
            }
        }

        .area {
            display: flex;
            flex-direction: row;
            align-items: center;

            &>div:last-child {
                display: flex;
                gap: 10px;
            }
        }

        .saveConfig {
            display: flex;
        }
    }
}

:deep(.el-select__wrapper) {
    box-shadow: none;
    border: 1px solid #CDCDCD;

    &:hover {
        box-shadow: none;
        border: 1px solid #CDCDCD;
    }

    &.is-focused {
        box-shadow: 0px 0px 3px #C20C0C;
    }
}
</style>