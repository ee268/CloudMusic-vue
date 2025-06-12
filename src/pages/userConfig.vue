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
                        <el-image src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
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
                                <el-option v-for="y in year" :key="y" :value="y" :label="y">
                                </el-option>
                            </el-select>

                            <el-select v-model="birthday[1]" style="width: 100px" placeholder="月">
                                <el-option v-for="m in month" :key="m" :value="m" :label="m">
                                </el-option>
                            </el-select>

                            <el-select v-model="birthday[2]" style="width: 100px" placeholder="日" @click="isExistDays">
                                <el-option v-for="d in day" :key="d" :value="d" :label="d">
                                </el-option>
                            </el-select>
                        </div>
                    </div>

                    <div class="area">
                        <div>地区：</div>

                        <div>
                            <el-select v-model="area[0]" style="width: 100px" placeholder="省">
                                <el-option v-for="(value, key, index) in provincesWithCities" :key="index" :value="key" :label="key">
                                </el-option>
                            </el-select>

                            <el-select v-model="area[1]" style="width: 100px" placeholder="市" @click="isExistCitys">
                                <el-option v-for="(value, index) in citys" :key="index" :value="value" :label="value">
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

const year = ref([])
const curYear = new Date().getFullYear()
for (let i = curYear; i >= 1920; i--) {
    year.value.push(i)
}

const month = ref([])
for (let i = 1; i < 13; i++) {
    month.value.push(i)
}

const day = ref([])
const isExistDays = () => {
    day.value = []
    console.log(day.value, birthday.value[0], birthday.value[1]);

    let curYearMonthDay = getMonthDays(parseInt(birthday.value[0]), parseInt(birthday.value[1]))
    console.log(curYearMonthDay);

    for (let i = 1; i <= curYearMonthDay; i++) {
        day.value.push(i)
    }
}
function getMonthDays(year, month) {
    // 创建一个日期对象，月份加1，日期设为0
    // 这样会得到上一个月的最后一天

    let days = new Date(year, month, 0).getDate();
    return days;
}

const provincesWithCities = {
    "北京市": [
        "东城区",
        "西城区",
        "朝阳区",
        "丰台区",
        "石景山区",
        "海淀区",
        "门头沟区",
        "房山区",
        "通州区",
        "顺义区",
        "昌平区",
        "大兴区",
        "怀柔区",
        "平谷区",
        "密云区",
        "延庆区"
    ],
    "上海市": [
        "黄浦区",
        "徐汇区",
        "长宁区",
        "静安区",
        "普陀区",
        "虹口区",
        "杨浦区",
        "闵行区",
        "宝山区",
        "嘉定区",
        "浦东新区",
        "金山区",
        "松江区",
        "青浦区",
        "奉贤区",
        "崇明区"
    ],
    "广东省": [
        "广州市",
        "深圳市",
        "珠海市",
        "汕头市",
        "佛山市",
        "韶关市",
        "湛江市",
        "肇庆市",
        "江门市",
        "茂名市",
        "惠州市",
        "梅州市",
        "汕尾市",
        "河源市",
        "阳江市",
        "清远市",
        "东莞市",
        "中山市",
        "潮州市",
        "揭阳市",
        "云浮市"
    ],
    "浙江省": [
        "杭州市",
        "宁波市",
        "温州市",
        "嘉兴市",
        "湖州市",
        "绍兴市",
        "金华市",
        "衢州市",
        "舟山市",
        "台州市",
        "丽水市"
    ],
    "四川省": [
        "成都市",
        "自贡市",
        "攀枝花市",
        "泸州市",
        "德阳市",
        "绵阳市",
        "广元市",
        "遂宁市",
        "内江市",
        "乐山市",
        "南充市",
        "眉山市",
        "宜宾市",
        "广安市",
        "达州市",
        "雅安市",
        "巴中市",
        "资阳市",
        "阿坝藏族羌族自治州",
        "甘孜藏族自治州",
        "凉山彝族自治州"
    ]
}

const citys = ref([])

const isExistCitys = () => {
    for (let key in provincesWithCities) {
        if (key == area.value[0]) {
            citys.value = provincesWithCities[key]
            return            
        }
    }
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