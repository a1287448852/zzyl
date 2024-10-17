<!-- 签约办理 -->
<template>
  <div class="detail-base sign">
    <!-- 签约办理 -->
    <t-card title="签约办理">
      <div class="info-block">
        <div class="info-item">
          <h1>合同名称：</h1>
          <span> {{ baseData.name }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">签约日期：</h1>
          <span>{{ getDateInfo(baseData.signDate) }}</span>
        </div>
        <div class="info-item">
          <h1>丙方姓名：</h1>
          <span> {{ baseData.memberName ? baseData.memberName : '--' }}</span>
        </div>
        <div class="info-item">
          <h1 class="label-wt-long">丙方联系方式：</h1>
          <span> {{ baseData.memberPhone ? baseData.memberPhone : '--' }}</span>
        </div>
        <div class="info-item">
          <h1>入住合同：</h1>
          <span
            >{{ elderVo.name }}的入住合同.pdf
            <i
              ><a class="font-bt" :href="baseData.pdfUrl" target="black"
                >查看</a
              ></i
            >
            <!-- <i
              class="font-bt"
              @click="handleDown(formData.pdfUrl, '体检报告文件')"
              >下载</i
            > -->
          </span>
        </div>
      </div>
    </t-card>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { download } from '@/utils/index'
import { getDateInfo } from '@/utils/date'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 老人信息
  elderVo: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------

// TODO 暂时保留
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
</script>
