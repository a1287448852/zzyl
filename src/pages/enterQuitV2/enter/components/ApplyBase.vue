<!-- 需要展示的基本信息 -->
<template>
  <div class="detail-base">
    <!-- 基本信息 -->
    <t-card title="基本信息">
      <div class="info-block">
        <div class="info-item">
          <h1 class="label-wt">老人姓名：</h1>
          <span>{{ baseData.name }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">老人身份证号：</h1>
          <span>{{ baseData.idCardNo }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">出生日期：</h1>
          <span>{{ baseData.birthday }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">年龄：</h1>
          <span>{{ baseData.age }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">性别：</h1>
          <span>{{ baseData.sex === 0 ? '男' : '女' }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">联系方式：</h1>
          <span>{{ baseData.phone }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">家庭住址：</h1>
          <span>{{ baseData.address }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">一寸照片：</h1>
          <span
            ><t-upload
              ref="uploadRef"
              v-model="oneInchPhoto"
              action=""
              theme="image"
              :disabled="true"
            ></t-upload
          ></span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">身份证人像面：</h1>
          <span
            ><t-upload
              ref="uploadRef"
              v-model="idCardPortraitImg"
              action=""
              theme="image"
              :disabled="true"
            ></t-upload
          ></span>
        </div>
        <div class="info-item">
          <h1 class="label-wt">身份证国徽面：</h1>
          <span
            ><t-upload
              ref="uploadRef"
              v-model="idCardNationalEmblemImg"
              action=""
              theme="image"
              :disabled="true"
            ></t-upload
          ></span>
        </div>
      </div>
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick, watch } from 'vue'
import { download } from '@/utils/index'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
const oneInchPhoto = ref([
  {
    url: ''
  }
])
const idCardNationalEmblemImg = ref([
  {
    url: ''
  }
])
const idCardPortraitImg = ref([
  {
    url: ''
  }
])
// 绑定上传的文件
watch(props, (val) => {
  const data = props.baseData
  oneInchPhoto.value[0].url = data.oneInchPhoto
  idCardNationalEmblemImg.value[0].url = data.idCardNationalEmblemImg
  idCardPortraitImg.value[0].url = data.idCardPortraitImg
})
const form = ref() // 表单
// 向父组件暴露数据与方法
defineExpose({
  form
})
</script>
