<!-- 申请入住 -->
<template>
  <!-- 基本信息 -->
  <t-card title="基本信息">
    <t-form-item label="老人姓名：" name="name">
      <t-input
        v-model="formData.name"
        placeholder="请输入"
        class="wt-300"
        clearable
        show-limit-number
        :maxlength="10"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="老人身份证号：" name="idCardNo">
      <t-input
        v-model="formData.idCardNo"
        placeholder="请输入"
        class="wt-300"
        show-limit-number
        :maxlength="18"
        clearable
        @blur="handleCardNo"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="出生日期：">
      <t-input
        v-model="formData.birthday"
        placeholder="出生日期"
        class="wt-300"
        :disabled="disabled"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="年龄：">
      <t-input
        v-model="formData.age"
        placeholder="年龄"
        class="wt-300"
        :disabled="disabled"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="性别：" name="sex">
      <t-radio-group v-model="formData.sex">
        <t-radio
          v-for="(item, index) in sexData"
          :key="index"
          :value="item.id"
          :disabled="disabled"
          >{{ item.value }}</t-radio
        >
      </t-radio-group>
    </t-form-item>
    <t-form-item label="联系方式：" name="phone">
      <t-input
        v-model="formData.phone"
        placeholder="请输入"
        class="wt-300"
        clearable
        show-limit-number
        :maxlength="11"
        @change="handlePhone"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="家庭住址：" name="address">
      <t-textarea
        v-model="formData.address"
        placeholder="请输入"
        class="t-textarea wt-300"
        name="description"
        :maxlength="100"
        clearable
        show-limit-number
      >
      </t-textarea>
    </t-form-item>
    <Upload
      ref="uploadImg"
      :urls="urls"
      :formData="formData"
      @getUpdateImg="getUpdateImg"
    ></Upload>

    <!-- end -->
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { isCardID, validatePhone } from '@/utils/validate'
import { useUserStore } from '@/store'
import { getIsCard } from '@/api/oldMan'
// 组件
// 图片上传
import Upload from './upload.vue'
// 基本数据
import { sexData } from '@/utils/commonData'

// 获取父组件值、方法
const props = defineProps({
  formData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 本地储存的基本信息
  storageData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  infoActive: {
    type: Number,
    default: 0
  },
  isSave: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit = defineEmits(['getUpdateImg', 'handleCardNo', 'handlePhone'])
// 基本信息
const disabled = ref(true) // 是否只读
const active = ref(0) // 当前tab选中的值
const tabBar = ref(null) // tabref
const uploadImg = ref(null)

const userStore = useUserStore()
// 校验老人是否入住
const validateIsCard = async (val) => {
  console.log(val)
  if (val !== undefined && val !== '') {
    const res: any = await getIsCard({ idCard: val })
    if (res.code === 200) {
      if (res.data && res.data !== undefined && val === res.data.idCardNo) {
        return false
      }
      return true
    }
  } else {
    return false
  }
}
// 表单校验
const formRule = {
  name: [
    {
      required: true,
      message: '老人姓名为空，请输入老人姓名',
      type: 'error',
      trigger: 'blur'
    }
  ],
  idCardNo: [
    {
      required: true,
      message: '老人身份证号为空，请输入老人身份证号',
      trigger: 'blur'
    },
    {
      validator: isCardID,
      message: '身份证格式错误，请重新输入',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validateIsCard,
      message: '该老人已入住，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '联系方式为空，请输入联系方式',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: validatePhone,
      message: '手机号格式错误，请重新输入',
      type: 'error',
      trigger: 'blur'
    }
  ],
  address: [
    {
      required: true,
      message: '家庭住址为空，请输入家庭住址',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
const rules = ref({}) // 表单校验
const urls = ref({}) // 资料
// -----定义方法------
// 监听器，监听父级传递的data值，控制表单数据
watch(props, (val) => {
  if (val.isSave) {
    const obj = userStore.$state.enterBaseData
    if (obj.otherApplyInfo !== undefined) {
      formData.value = userStore.$state.enterBaseData.otherApplyInfo
    }
    if (obj.memberElderDtos !== undefined && obj.memberElderDtos.length > 0) {
      familyUserData.value = obj.memberElderDtos
    }
  }
  if (val.infoActive > 0) {
    active.value = val.infoActive
    tabBar.value.currentId = active.value
  }
})
onMounted(() => {
  // urls.value = {
  //   url1: props.baseData.retreat.url1,
  //   url2: props.baseData.retreat.url2,
  //   url3: props.baseData.retreat.url3
  // }
  rules.value = { ...formRule, ...uploadImg.value.rules }
  console.log(rules)
})
// 基本信息
// 获取性别、出生日期和年龄
const handleCardNo = () => {
  emit('handleCardNo')
}
// 判断是否填写的数字
const handlePhone = (val) => {
  emit('handlePhone', val)
}
// 获取照片
const getUpdateImg = (url, val) => {
  emit('getUpdateImg', url, val)
}
defineExpose({
  rules
})
</script>
