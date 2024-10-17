<!-- 入住配置 -->
<template>
  <div class="detail-base">
    <!-- 基本信息 -->
    <t-card title="入住配置">
      <div class="info-block">
        <div class="info-item">
          <h1>入住期限：</h1>
          <span
            >{{ getDateInfo(baseData.checkInStartTime) }}~{{
              getDateInfo(baseData.checkInEndTime)
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>费用期限：</h1>
          <span
            >{{ getDateInfo(baseData.costStartTime) }}~{{
              getDateInfo(baseData.costEndTime)
            }}</span
          >
        </div>
        <div class="info-item">
          <h1>护理等级：</h1>
          <span>{{ baseData.nursingLevelName }}</span>
        </div>
        <div class="info-item">
          <h1>入住床位：</h1>
          <span>{{ baseData.bedNumber }}</span>
        </div>
        <div class="info-item">
          <h1>押金：</h1>
          <span>{{ decimalsReplenish(baseData.depositAmount) }} 元</span>
        </div>
        <div class="info-item">
          <h1>护理费用：</h1>
          <span>{{ decimalsReplenish(baseData.nursingCost) }} 元/月</span>
        </div>
        <div class="info-item">
          <h1>床位费用：</h1>
          <span>{{ decimalsReplenish(baseData.bedCost) }} 元/月</span>
        </div>
        <div class="info-item">
          <h1>其他费用：</h1>
          <span>{{
            baseData.otherCost
              ? decimalsReplenish(baseData.otherCost) + ' 元/月'
              : '--'
          }}</span>
        </div>
        <div class="info-item">
          <h1>医保支付：</h1>
          <span>{{
            baseData.medicalInsurancePayment
              ? decimalsReplenish(baseData.medicalInsurancePayment) + ' 元/月'
              : '--'
          }}</span>
        </div>
        <div class="info-item">
          <h1>政府补贴：</h1>
          <span>{{
            baseData.governmentSubsidy
              ? decimalsReplenish(baseData.governmentSubsidy) + '元/月'
              : '--'
          }}</span>
        </div>
      </div>
    </t-card>
    <!-- end -->
    <BillDetails
      :visible="billVisible"
      :form-data="formData"
      @handleClose="handleClose"
    ></BillDetails>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDateInfo } from '@/utils/date'
import { decimalsReplenish } from '@/utils/index'
// 账单预览
import BillDetails from './BillDetails.vue'
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

// 关闭账单预览
const handleClose = () => {
  billVisible.value = false
}
</script>
