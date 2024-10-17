<!-- 费用清算 -->
<template>
  <div class="dialog-form">
    <!-- 基本信息 -->
    <t-card title="">
      <template #title
        >费用清算<t-popup
          class="placement bottom center titTpopup"
          content=""
          placement="bottom"
          show-arrow
          destroy-on-close
        >
          <t-icon name="error-circle-filled"></t-icon>

          <template #content>
            <div>退住办理前，请优先处理未缴和欠费账单。</div>
            <div>若包含未缴账单，可取消或支付该账单；</div>
            <div>{{ '若最终退款金额< 0，需充值预缴款抵扣账单；' }}</div>
            <div>若最终退款金额 > 0，需线下完成退款，并上传退款凭证；</div>
            <div>若最终退款金额 = 0，可直接办理退住；</div>
          </template>
        </t-popup>
        <span class="update">
          <icon-font name="refresh" size="18px" @click="handleUpdate" />
        </span>
      </template>
      <div
        v-if="
          baseData.dueBackList.length > 0 ||
          baseData.arrearageList.length > 0 ||
          baseData.balanceVo.elderId ||
          baseData.unpaidList.length > 0
        "
        class="billBox"
      >
        <div class="billInfo">
          <!-- 应退 -->
          <div v-if="baseData.dueBackList.length > 0" class="fillCon">
            <div class="titleInfo">
              <div class="lText">应退</div>
              <div class="rText">
                <span>待办：{{ baseData.dueBackList.length }}</span
                ><span>小计：{{ decimalsReplenish(dueBackSum) }}元</span>
              </div>
            </div>
            <div class="itemCon">
              <ul v-for="(item, index) in baseData.dueBackList" :key="index">
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
                  <label>可退金额：</label
                  >{{ decimalsReplenish(item.amount) }}元
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
          <div v-if="baseData.arrearageList.length > 0" class="fillCon">
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
                <span>待办：{{ baseData.arrearageList.length }}</span
                ><span>小计：{{ decimalsReplenish(arrearageSum) }}元</span>
              </div>
            </div>
            <div class="itemCon">
              <ul
                v-for="(item, index) in baseData.arrearageList"
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
                  <label>应付金额：</label
                  >{{ decimalsReplenish(item.amount) }}元
                </li>
              </ul>
            </div>
          </div>
          <!-- end -->
          <!-- 余额 -->
          <div v-if="baseData.balanceVo.id" class="fillCon balanceVo">
            <div class="titleInfo">
              <div class="lText">余额</div>
              <div class="rText">
                <span>小计：{{ balanceSum }}元</span>
              </div>
            </div>
            <div class="itemCon">
              <ul class="bg">
                <li>
                  <label>押金金额：</label
                  >{{ baseData.balanceVo.depositAmount }}元
                </li>
              </ul>
              <ul>
                <li>
                  <span></span>
                  <label>预缴款金额：</label
                  >{{ baseData.balanceVo.prepaidBalance }}元
                </li>
                <li>
                  <button
                    theme="primary"
                    class="bt wt-120"
                    @click="handleUpOpen"
                  >
                    上传充值凭证
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <!-- end -->
          <!-- 未缴 -->
          <div v-if="baseData.unpaidList.length > 0" class="fillCon unpaidVo">
            <div class="titleInfo">
              <div class="lText">未缴</div>
              <div class="rText">
                <span>待办：{{ baseData.unpaidList.length }}</span
                ><span>小计：{{ decimalsReplenish(unpaidSum) }}元</span>
              </div>
            </div>

            <div class="itemCon">
              <ul
                v-for="(item, index) in baseData.unpaidList"
                :key="index"
                class="bg"
              >
                <li class="fist wt-100">
                  <div class="lText">
                    <label>账单编号：</label>{{ item.code
                    }}<span class="bt-small">费用账单</span>
                  </div>
                </li>
                <li><label>护理项目名称：</label>{{ item.nursingName }}</li>
                <li>
                  <label>应付金额：</label
                  >{{ decimalsReplenish(item.amount) }}元
                </li>
                <li>
                  <button
                    theme="primary"
                    class="bt wt-60"
                    @click="handleCancelOpen(item.id)"
                  >
                    取消
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="total">
          <div class="text">
            最终退款金额 = 应退 - 欠费 +余额 =
            {{ decimalsReplenish(moneySum) }}元
          </div>
          <div class="footBtn">
            <span
              class="bt"
              :class="
                moneySum > 0 && baseData.unpaidList.length === 0
                  ? ''
                  : 'bt-forbid'
              "
              @click="handleOpen"
              >{{
                userStore.$state.billVoucheData.refundVoucherUrl
                  ? '编辑退款凭证'
                  : '上传退款凭证'
              }}</span
            >
          </div>
        </div>
      </div>
      <div v-else class="emptyMan">
        <div class="noData">
          <img src="@/assets/default/zwnr@2x.png" />
          <p>请选择老人姓名和退住日期～</p>
        </div>
      </div>
    </t-card>
    <!-- end -->
    <!-- 退款凭证上传 -->
    <UploadVoucher
      ref="fromRef"
      :visible="visible"
      :data="uploadData"
      @handle-close="handleClose"
      @handle-upload="handleUpload"
    ></UploadVoucher>
    <!-- end -->
    <!-- 充值 -->
    <RechargeDialog
      ref="formRef"
      :visible="upVisible"
      :base-data="formData"
      @handle-close="handleUpClose"
      @handle-sub="handleSub"
    >
    </RechargeDialog>
    <!-- end -->
    <!-- 取消 -->
    <CancelFrom
      ref="cancelFormRef"
      :visible="cancelVisible"
      :old-man-data="oldManData"
      @handle-close="handleCancelClose"
      @handle-sub="handleCancelSub"
    ></CancelFrom>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { IconFont } from 'tdesign-icons-vue-next'
import { decimalsReplenish } from '@/utils/index'
import { useUserStore } from '@/store'
// 接口
import { uploadRefundVoucher, getUploadRefund } from '@/api/synergy'
import { creatRecharge, cancelBill } from '@/api/finance'

// 组件
import UploadVoucher from './UploadVoucher.vue'
// 充值弹层
import RechargeDialog from '@/components/rechargeDialog/index.vue'
// 取消
import CancelFrom from '@/components/BillCancel/index.vue'
// 获取父组件值、方法
const props = defineProps({
  // 基本信息数据
  formData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  // 账单信息数据
  baseData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// ------定义变量------
const emit: Function = defineEmits(['upLoadSuccess', 'getRetreat'])
// 触发父级事件
const userStore = useUserStore() // 储存器
const visible = ref(false) // 退款凭证弹窗
const cancelVisible = ref(false) // 取消弹层
const fromRef = ref(null)
const cancelFormRef = ref(null) // 取消账单ref
const uploadData = ref({}) // 获取上传凭证的详情
const upVisible = ref(false) // 上传充值凭证
const formRef = ref(null) // 上传充值凭证ref
const billId = ref('') // 业务系统订单号
// -----定义方法------
// 余额小计
const balanceSum = computed(() => {
  const data = props.baseData.balanceVo
  let bSum = 0
  if (data) {
    bSum = data.arrearsAmount + data.prepaidBalance + data.depositAmount
  }
  return bSum
})
// 欠费小计
const arrearageSum = computed(() => {
  const data = props.baseData.arrearageList
  let aSum = 0
  if (data && data.length > 0) {
    data.forEach((ele) => {
      aSum += ele.amount
    })
  }
  return aSum
})
// 未缴小计
const unpaidSum = computed(() => {
  //
  const data = props.baseData.unpaidList
  let aSum = 0
  if (data && data.length > 0) {
    data.forEach((ele) => {
      aSum += ele.amount
    })
  }
  return aSum
})
// 应退小计
const dueBackSum = computed(() => {
  //
  const data = props.baseData.dueBackList
  let aSum = 0
  if (data && data.length > 0) {
    data.forEach((ele) => {
      aSum += ele.amount
    })
  }
  return aSum
})
// 总计金额
const moneySum = computed(() => {
  let mSum = 0
  // mSum = balanceSum.value - arrearageSum.value
  mSum = dueBackSum.value - arrearageSum.value + balanceSum.value
  return mSum
})
// 关闭弹窗
const handleClose = () => {
  visible.value = false // 关闭新增弹窗
  console.log(userStore.$state.billVoucheData)
}
const handleOpen = () => {
  if (moneySum.value > 0 && props.baseData.unpaidList.length === 0) {
    visible.value = true
    uploadData.value = userStore.$state.billVoucheData
  }
}
// 上传退款凭证
const handleUpload = async (val) => {
  console.log(val)
  const params = {
    ...val,
    refundAmount: moneySum
  }
  userStore.setBillVoucher(params)
  emit('upLoadSuccess', true)
  handleClose()
}
// 充值
const handleSub = async (val) => {
  const parent = {
    ...val,
    elderId: props.formData.id
  }
  console.log(parent)
  const res: any = await creatRecharge(parent)
  if (res.code === 200) {
    MessagePlugin.success('充值成功')
    emit('getRetreat')
    handleClose()
    formRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 取消
const handleCancelSub = async (val) => {
  const res: any = await cancelBill(val, billId.value)
  if (res.code === 200) {
    MessagePlugin.success('操作成功')
    emit('getRetreat')
    handleCancelClose()
    cancelFormRef.value.handleClear()
  } else {
    MessagePlugin.error(res.msg)
  }
}
// 更新当前账单
const handleUpdate = () => {
  emit('getRetreat')
}
// 充值弹层
const handleUpOpen = (id) => {
  billId.value = id
  upVisible.value = true
}
// 关闭弹窗
const handleUpClose = () => {
  upVisible.value = false
}
// 打开取消弹层
const handleCancelOpen = (val) => {
  billId.value = val
  cancelVisible.value = true
}
// 关闭取消弹层
const handleCancelClose = () => {
  cancelVisible.value = false
}
// 向父组件暴露数据与方法
defineExpose({
  moneySum
})
</script>
