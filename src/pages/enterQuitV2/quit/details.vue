<!-- 详情 -->
<template>
  <!-- 表单页 -->
  <div class="apply detail-base checkInDetail">
    <div class="bg-wt min-steph height">
      <!-- 退住表单填写 -->
      <div v-if="quitId === ''" class="dialog-form cleckInForm">
        <t-form ref="form" :data="formData" :rules="rules" :label-width="135">
          <!-- 基本信息 -->
          <ApplyForm
            ref="applyForm"
            :formData="formData"
            @handleSelectOld="handleSelectOld"
            @setQuitTime="setQuitTime"
          ></ApplyForm>
          <!-- end -->
          <!-- 解除合同 -->
          <ContractForm
            ref="contract"
            :formData="formData"
            @getContractPdf="getContractPdf"
          ></ContractForm>
          <!-- end -->
          <!-- 费用清算 -->
          <Liquidation
            ref="liquidation"
            :base-data="billData"
            :formData="formData"
            @upLoadSuccess="upLoadSuccess"
            @getRetreat="getRetreat"
          ></Liquidation>
          <!-- end -->
        </t-form>
      </div>
      <!-- end -->
      <!-- 详情 -->
      <div v-else class="applyBaseInfo">
        <ApplyBaseInfo
          :base-data="baseData"
          :billData="billData"
        ></ApplyBaseInfo>
      </div>
      <!-- end -->
    </div>
  </div>
  <!-- end -->
  <!-- 底部 -->
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
    <button
      v-if="quitId === ''"
      theme="primary"
      class="bt wt-60"
      @click="handleSub"
    >
      提交
    </button>
  </div>
  <!-- end -->
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import { useUserStore } from '@/store'
import { getDateInfo, getEndTime, getTateDt } from '@/utils/date'
// 接口
import { getCheckInInfo } from '@/api/oldMan'
import { getRetreatSettlement } from '@/api/finance'
import { addApply, getDetailCode } from '@/api/synergy'
// 组件
// 基本信息
import ApplyForm from './components/ApplyForm.vue'
// 上传解除合同
import ContractForm from './components/ContractForm.vue'
// 费用清算
import Liquidation from './components/Liquidation.vue'
// 基本信息
import ApplyBaseInfo from './components/ApplyBaseInfo.vue'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const userStore = useUserStore()
const form = ref(null) // 申请表单的ref
const footFlex = ref(false) // 定位底部提交按钮
const applyForm = ref(null) // 申请表单的ref
const rules = ref({}) // 表单校验
const contract = ref(null) // 合同ref
const baseData = ref<Object | any>({
  retreatElderVo: {},
  refundVoucherVo: {}
}) // 详情数据
const liquidation = ref(null) // 费用清算res
const quitId = ref('') // 入住id
const isUpload = ref(false) // 是否校验完成
const billData = ref<Object | any>({
  arrearageList: [], // 欠费
  balanceVo: [], // 余额
  dueBackList: [], // 应退
  unpaidList: [] // 未缴
}) // 费用清算数据

// 表单数据
const formData = ref<Object | any>({
  releaseDate: new Date()
})
const isChick = ref(false) // 是否触发了提交按钮，触发3秒后才可以再次触发
// 生命周期
onMounted(() => {
  // 首次进来先清空上传退款凭证数据
  userStore.setBillVoucher({})
  nextTick(() => {
    window.addEventListener('scroll', scrollToTop, true) // 添加页面滚动事件
  })
  rules.value = {
    ...applyForm.value.rules,
    ...contract.value.rules
  }
  if (route.query.id) {
    quitId.value = route.query.id
    getDetail(quitId.value)
  }
})
// ------定义方法------
// 滚动事件，控制底部按钮距离底部的高度
const scrollToTop = (e) => {
  e.stopPropagation()
  if (e.target.className === 't-layout czri-layout') {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight === scrollHeight) {
      footFlex.value = true
    } else {
      footFlex.value = false
    }
  }
}
// 按钮触发3秒后才可以再次触发
const handleIsChick = () => {
  setTimeout(() => {
    getIsChick()
    clearTimeout()
  }, 3000)
}
// 获取详情
const getDetail = async (id) => {
  await getDetailCode(id).then((res) => {
    if (res.code === 200) {
      baseData.value = res.data
      billData.value = JSON.parse(baseData.value.billJson)
    }
  })
}
// 触发按钮可以触发
const getIsChick = () => {
  isChick.value = false
}
// 提交普通列表弹层
const handleSelectOld = async (obj) => {
  const time = {
    releaseDate: formData.value.releaseDate
  }
  await getCheckInInfo(obj.id).then((res) => {
    if (res.code === 200) {
      formData.value = Object.assign(formData.value, time, res.data)
      // 处理入住期限
      formData.value.checkInTime = `${getDateInfo(
        formData.value.checkInStartTime
      )}~${getDateInfo(formData.value.checkInEndTime)}`
      // 处理费用期限
      formData.value.costTime = `${getDateInfo(
        formData.value.costStartTime
      )}~${getDateInfo(formData.value.costEndTime)}`
      // 获取老人的清算账单
      getRetreat()
    }
  })
}
// 设置退住日期
const setQuitTime = (time) => {
  formData.value.checkOutTime = getEndTime(time)
  getRetreat()
}
// 获取费用清算数据
const getRetreat = async () => {
  const data = formData.value
  if (data.id && data.checkOutTime) {
    const parent = {
      elderId: data.id,
      checkOutTime: data.checkOutTime
    }
    await getRetreatSettlement(parent).then((res) => {
      if (res.code === 200) {
        billData.value = res.data
      }
    })
  }
}
// 获取合同文件链接
const getContractPdf = (url) => {
  formData.value.releasePdfUrl = url
}
// 提交
const handleSub = () => {
  if (isChick.value) {
    return false
  }
  const billDatas = billData.value

  form.value.validate().then(async (valid) => {
    const data = formData.value
    const datas = {
      retreatElderDto: {
        ...data
      },
      billJson: JSON.stringify(billData.value),
      releaseDate: getTateDt(data.releaseDate),
      releasePdfUrl: data.releasePdfUrl,
      refundVoucherDto: {
        ...userStore.$state.billVoucheData,
        elderId: data.id
      }
    }
    if (valid === true) {
      // 如果缓存有上传图片改变上传状态isUpload.value：true代表已经有图片了，直接提交
      if (userStore.$state.billVoucheData.refundVoucherUrl) {
        isUpload.value = true
      }
      if (billDatas.unpaidList.length > 0) {
        MessagePlugin.error('请先取消/支付未缴纳账单')
      } else if (liquidation.value.moneySum < 0) {
        MessagePlugin.error('请充值预缴款，缴纳剩余欠费账单')
      } else if (liquidation.value.moneySum > 0 && !isUpload.value) {
        MessagePlugin.error('请上传退款凭证')
      } else {
        await addApply(datas).then((res) => {
          if (res.code === 200) {
            MessagePlugin.success('操作成功')
            handleReturn()
          }
        })
      }
    }
  })
}
// 上传退款凭证是否成功
const upLoadSuccess = (val) => {
  isUpload.value = val
}
// 返回
const handleReturn = () => {
  router.push({
    path: `/enterQuit/quitManage`
  })
}
</script>
<style lang="less" scoped src="./../index.less"></style>
