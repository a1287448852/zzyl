<!-- 申请退住-详细信息 -->
<template>
  <!-- 基本信息 -->
  <t-card title="基本信息">
    <div class="info-block">
      <div class="info-item">
        <h1 class="label-wt-s">老人姓名：</h1>
        <span>{{ baseData.retreatElderVo.name }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt">退住日期：</h1>
        <span>{{ getDateInfo(baseData.retreatElderVo.checkOutTime) }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-s">退住原因：</h1>
        <span>{{ baseData.retreatElderVo.reason }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt">老人身份证号：</h1>
        <span>{{ baseData.retreatElderVo.idCardNo }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-s">入住期限：</h1>
        <span
          >{{ getDateInfo(baseData.retreatElderVo.checkInStartTime) }} ~
          {{ getDateInfo(baseData.retreatElderVo.checkInEndTime) }}</span
        >
      </div>
      <div class="info-item">
        <h1 class="label-wt">费用期限：</h1>
        <span
          >{{ getDateInfo(baseData.retreatElderVo.costStartTime) }} ~
          {{ getDateInfo(baseData.retreatElderVo.costEndTime) }}</span
        >
      </div>
      <div class="info-item">
        <h1 class="label-wt-s">护理等级：</h1>
        <span>{{ baseData.retreatElderVo.nursingLevelName }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt">入住床位：</h1>
        <span>{{ baseData.retreatElderVo.bedNumber }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt-s">护理员姓名：</h1>
        <span>{{
          baseData.retreatElderVo.nursingName
            ? baseData.retreatElderVo.nursingName
            : '无'
        }}</span>
      </div>
      <div class="info-item">
        <h1 class="label-wt">联系方式：</h1>
        <span>{{ baseData.retreatElderVo.phone }}</span>
      </div>
      <div class="info-item lastText">
        <h1 class="label-wt-s">家庭住址：</h1>
        <span>{{ baseData.retreatElderVo.address }}</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
  <!-- 解除记录 -->
  <t-card title="解除协议">
    <div class="info-block">
      <div class="info-item">
        <h1>解除日期：</h1>
        <span>{{ getDateInfo(baseData.releaseDate) }}</span>
      </div>

      <div class="info-item">
        <h1>解除协议：</h1>
        <span
          >{{ baseData.retreatElderVo.name }}的解除协议.pdf<i class="font-bt"
            ><a class="font-bt" :href="baseData.releasePdfUrl" target="black"
              >查看</a
            ></i
          >
        </span>
      </div>
    </div>
  </t-card>
  <!-- end -->
  <!-- 费用清算 -->
  <t-card title="" class="billLiqui">
    <template #title>费用清算</template>
    <!-- 应退 -->
    <div v-if="billData.dueBackList.length > 0" class="fillCon">
      <div class="titleInfo">
        <div class="lText">应退</div>
        <div class="rText">
          <span>待办：{{ billData.dueBackList.length }}</span
          ><span>小计：{{ decimalsReplenish(dueBackSum) }}元</span>
        </div>
      </div>
      <div class="itemCon">
        <ul v-for="(item, index) in billData.dueBackList" :key="index">
          <li class="fist wt-100">
            <div class="lText">
              <label>账单编号：</label>{{ item.code
              }}<span class="bt-small">{{
                item.type === 0 ? '月度账单' : '费用账单'
              }}</span>
            </div>
          </li>
          <li v-if="item.type === 0">
            <label>账单月份：</label>{{ item.billMonth }}
          </li>
          <li>
            <label>可退金额：</label>{{ decimalsReplenish(item.amount) }}元
          </li>
          <li v-if="item.type === 0">
            <label>实际天数：</label>{{ item.realDay }}天
          </li>
          <li v-if="item.type === 0">
            <label>退款天数：</label>{{ item.dueBackDay }}天
          </li>
          <li v-if="item.type === 1">
            <label>护理项目名称：</label>{{ item.nursingName }}
          </li>
        </ul>
      </div>
    </div>
    <!-- end -->
    <!-- 欠费 -->
    <div v-if="billData.arrearageList.length > 0" class="fillCon">
      <div class="titleInfo">
        <div class="lText">
          欠费
          <t-tooltip
            class="placement right-full align"
            content=""
            :show-arrow="false"
            placement="right"
          >
            <template #content>
              可联系老人及家属进行线下支付或充值预缴款</template
            >
            <t-icon class="warnIcon"></t-icon>
          </t-tooltip>
        </div>
        <div class="rText">
          <span>待办：{{ billData.arrearageList.length }}</span
          ><span>小计：{{ decimalsReplenish(arrearageSum) }}元</span>
        </div>
      </div>
      <div class="itemCon">
        <ul
          v-for="(item, index) in billData.arrearageList"
          :key="index"
          class="bg"
        >
          <li class="fist wt-100">
            <div class="lText">
              <label>账单编号：</label>{{ item.code
              }}<span class="bt-small">{{
                item.type === 0 ? '月度账单' : '订单'
              }}</span>
            </div>
          </li>
          <li><label>账单月份：</label>{{ item.billMonth }}</li>
          <li>
            <label>应付金额：</label>{{ decimalsReplenish(item.amount) }}元
          </li>
        </ul>
      </div>
    </div>
    <!-- end -->
    <!-- 余额 -->
    <div v-if="billData.balanceVo.id" class="fillCon balanceVo">
      <div class="titleInfo">
        <div class="lText">余额</div>
        <div class="rText">
          <span>小计：{{ balanceSum }}元</span>
        </div>
      </div>
      <div class="itemCon">
        <ul class="bg">
          <li>
            <label>押金金额：</label>{{ billData.balanceVo.depositAmount }}元
          </li>
        </ul>
        <ul>
          <li>
            <span></span>
            <label>预缴款金额：</label>{{ billData.balanceVo.prepaidBalance }}元
          </li>
        </ul>
      </div>
    </div>
    <!-- end -->
    <!-- 未缴 -->
    <div v-if="billData.unpaidList.length > 0" class="fillCon unpaidVo">
      <div class="titleInfo">
        <div class="lText">未缴</div>
        <div class="rText">
          <span>待办：{{ billData.unpaidList.length }}</span
          ><span>小计：{{ decimalsReplenish(unpaidSum) }}元</span>
        </div>
      </div>

      <div class="itemCon">
        <ul
          v-for="(item, index) in billData.unpaidList"
          :key="index"
          class="bg"
        >
          <li class="fist wt-100">
            <div class="lText">
              <label>账单编号：</label>{{ item.code
              }}<span class="bt warBtn">费用账单</span>
            </div>
          </li>
          <li><label>护理项目名称：</label>{{ item.nursingName }}</li>
          <li>
            <label>应付金额：</label>{{ decimalsReplenish(item.amount) }}元
          </li>
        </ul>
      </div>
    </div>
  </t-card>
  <!-- end -->
  <!-- 解除记录 -->
  <t-card v-if="baseData.refundVoucherVo.refundVoucherUrl" title="退款凭证">
    <div class="info-block">
      <div class="info-item">
        <h1>提交人：</h1>
        <span>{{ baseData.retreatElderVo.applicat }}</span>
      </div>
      <div class="info-item">
        <h1>提交时间：</h1>
        <span>{{ baseData.refundVoucherVo.createTime }}</span>
      </div>
      <div class="info-item">
        <h1>退款方式：</h1>
        <span>{{ baseData.refundVoucherVo.tradingChannel }}</span>
      </div>
      <div class="info-item">
        <h1>退款凭证：</h1>
        <span>
          <t-upload
            ref="uploadRef"
            v-model="photoFile"
            action=""
            theme="image"
            :disabled="true"
          ></t-upload>
        </span>
      </div>
      <div class="info-item">
        <h1>退款备注：</h1>
        <span>{{ baseData.refundVoucherVo.remark }}</span>
      </div>
    </div>
  </t-card>
  <!-- end -->
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { download, decimalsReplenish } from '@/utils/index'
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
  billData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
const photoFile = ref([
  {
    url: ''
  }
])
const arrearageSum = ref(0) // 欠费
const unpaidSum = ref(0) // 未缴
const dueBackSum = ref(0) // 应退
const balanceSum = ref(0) // y余额
watch(props, (val) => {
  const data = val.billData
  // 欠费小计
  if (data.arrearageList && data.arrearageList.length > 0) {
    data.arrearageList.forEach((ele) => {
      arrearageSum.value += ele.amount
    })
  }
  // 余额
  if (data.balanceVo) {
    balanceSum.value =
      data.balanceVo.arrearsAmount +
      data.balanceVo.prepaidBalance +
      data.balanceVo.depositAmount
    console.log(data.balanceVo)
  }
  // 未缴小计
  if (data.unpaidList && data.unpaidList.length > 0) {
    data.unpaidList.forEach((ele) => {
      unpaidSum.value += ele.amount
    })
  }
  // 应退小计
  if (data.dueBackList && data.dueBackList.length > 0) {
    data.dueBackList.forEach((ele) => {
      dueBackSum.value += ele.amount
    })
  }
})
// 绑定上传的文件
watch(props, (val) => {
  const data = props.baseData.refundVoucherVo
  console.log(data)
  photoFile.value[0].url = data.refundVoucherUrl
})
const form = ref() // 表单
// TODO 暂时保留
// const downType = ref('application/pdf') // pdf格式
// // 合同下载文件
// const handleDown = (url, name) => {
//   download(url, downType.value, name)
// }
// 向父组件暴露数据与方法
defineExpose({
  form
})
</script>
