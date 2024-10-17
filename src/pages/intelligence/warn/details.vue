<!-- 报警规则详情 -->
<template>
  <div class="apply detail-base intelligenc">
    <!-- end -->
    <div ref="mainHeight" class="bg-wt min-steph height">
      <div class="dialog-form">
        <!-- 基本信息 -->
        <t-form ref="form" :data="formData" :rules="rules" :label-width="108">
          <t-card title="报警规则">
            <t-form-item label="所属产品：" name="productKey">
              <t-select
                v-model="formData.productKey"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
                @change="handleProduct"
              >
                <t-option
                  v-for="(item, index) in productData"
                  :key="index"
                  :value="item.productKey"
                  :label="item.productName"
                  title=""
                ></t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="模块：" name="moduleId">
              <t-select
                v-model="formData.moduleId"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
                :disabled="formData.productKey !== undefined ? false : true"
                @change="handleModele"
              >
                <t-option
                  v-for="(item, index) in itemData"
                  :key="index"
                  :value="item.functionBlockId"
                  :label="item.functionBlockName"
                  title=""
                >
                  {{ item.functionBlockName }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="功能名称：" name="functionId">
              <t-select
                v-model="formData.functionId"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
                :disabled="formData.moduleId !== undefined ? false : true"
                @change="handleIdentifier"
              >
                <t-option
                  v-for="(item, index) in publishedData"
                  :key="index"
                  :value="item.identifier"
                  :label="item.name"
                  title=""
                >
                  {{ item.name }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="关联设备：" name="iotId">
              <t-select
                v-model="formData.iotId"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
                :disabled="formData.productKey !== undefined ? false : true"
                @change="handleDevice"
              >
                <t-option
                  v-for="(item, index) in listData"
                  :key="index"
                  :value="item.iotId"
                  :label="item.deviceName"
                  title=""
                >
                  {{ item.deviceName }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="报警数据类型：" name="alertDataType">
              <t-radio-group
                v-model="formData.alertDataType"
                @change="handleRadio"
              >
                <t-radio
                  v-for="(item, index) in dataType"
                  :key="index"
                  :value="item.id"
                  >{{ item.value }}</t-radio
                >
              </t-radio-group>
            </t-form-item>
            <t-form-item label="报警规则名称：" name="alertRuleName">
              <t-input
                v-model="formData.alertRuleName"
                placeholder="请输入"
                class="wt-300"
                show-limit-number
                :maxlength="20"
              >
              </t-input>
            </t-form-item>
            <t-form-item label="持续周期：" name="duration">
              <t-select
                v-model="formData.duration"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
              >
                <t-option
                  v-for="(item, index) in continuePeriodData"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                  title=""
                >
                  {{ item.label }}
                </t-option>
              </t-select>
            </t-form-item>
            <!-- TODO 暂时干掉-->
            <!-- <t-form-item label="统计字段：" name="statisticField">
              <t-select
                v-model="formData.statisticField"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
              >
                <t-option
                  v-for="(item, index) in statistFicalData"
                  :key="index"
                  :value="item.value"
                  :label="item.value"
                  title=""
                >
                  {{ item.value }}
                </t-option>
              </t-select>
            </t-form-item> -->
            <t-form-item label="运算符：" name="operator">
              <t-select
                v-model="formData.operator"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
              >
                <t-option
                  v-for="(item, index) in operatorData"
                  :key="index"
                  :value="item.value"
                  :label="item.value"
                  title=""
                >
                  {{ item.value }}
                </t-option>
              </t-select>
            </t-form-item>
            <t-form-item label="阈值：" name="value">
              <t-input-number
                v-model="formData.value"
                :step="1"
                placeholder="0.0"
                :decimal-places="1"
              ></t-input-number>
            </t-form-item>
            <t-form-item label="报警生效时段：" name="alertEffectivePeriod">
              <t-time-range-picker
                v-model="formData.alertEffectivePeriod"
                class="wt-300"
                clearable
                format="HH:mm:ss"
                allow-input
                @pick="handleRangePick"
              />
            </t-form-item>
            <t-form-item label="报警沉默周期：" name="alertSilentPeriod">
              <t-select
                v-model="formData.alertSilentPeriod"
                clearable
                filterable
                placeholder="请选择"
                class="wt-300"
                @change="handlePeriod"
              >
                <t-option
                  v-for="(item, index) in silenceCycleData"
                  :key="index"
                  :value="item.value"
                  :label="
                    item.id >= 4 ? item.value + '小时' : item.value + '分钟'
                  "
                  title=""
                >
                  {{ item.id >= 4 ? item.value + '小时' : item.value + '分钟' }}
                </t-option>
              </t-select>
            </t-form-item>
          </t-card>
        </t-form>
        <!-- end -->
      </div>
    </div>
  </div>
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
    <button class="bt wt-60" theme="primary" @click="handleSub">提交</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import { getNum } from '@/utils/validate'
// 接口
import {
  getProductList,
  getPublishedList,
  getDeviceList,
  createRule,
  updateRule,
  getRuleDetail
  // getPropertyStatusList
} from '@/api/intelligence'
// 基础数据
import {
  // statistFicalData,
  operatorData,
  continuePeriodData,
  dataType,
  silenceCycleData
} from '@/utils/commonData'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const ruleId = ref(null) // 规则id
const formData = ref({
  alertEffectivePeriod: ['00:00:00', '23:59:59'],
  // takeEffect: ['00:00:00', '23:59:59'],
  status: 1
})
const productData = ref([]) // 产品数据
const takeEffect = ref(['00:00:00', '23:59:59']) // 生效时间段
const form = ref(null) // 定义表单ref
const publishedData = ref([]) // 功能
const itemData = ref([]) // 模块
const listData = ref() // 关联设备
const statusObj = ref({}) // 获取运行管理所需要的参数
const published = ref({})
const pagination = ref<Object | any>({
  pageSize: 100,
  currentPage: 1 // 默认当前页
})
// 表单校验
const rules = {
  productKey: [
    {
      required: true,
      message: '所属产品为空，请选择所属产品',
      type: 'error',
      trigger: 'change'
    }
  ],
  moduleId: [
    {
      required: true,
      message: '模块为空，请选择模块',
      type: 'error',
      trigger: 'change'
    }
  ],
  functionId: [
    {
      required: true,
      message: '功能名称为空，请选择功能名称',
      type: 'error',
      trigger: 'change'
    }
  ],
  iotId: [
    {
      required: true,
      message: '关联设备为空，请选择关联设备',
      type: 'error',
      trigger: 'change'
    }
  ],
  alertRuleName: [
    {
      required: true,
      message: '报警规则名称为空，请输入报警规则名称',
      type: 'error',
      trigger: 'blur'
    }
  ],
  // TODO 暂时干掉
  // statisticField: [
  //   {
  //     required: true,
  //     message: '统计字段为空，请选择统计字段',
  //     type: 'error',
  //     trigger: 'change'
  //   }
  // ],
  operator: [
    {
      required: true,
      message: '运算符为空，请选择运算符',
      type: 'error',
      trigger: 'change'
    }
  ],
  value: [
    {
      required: true,
      message: '阈值为空，请输入阈值',
      type: 'error',
      trigger: 'change'
    }
  ],
  duration: [
    {
      required: true,
      message: '持续周期为空，请选择持续周期',
      type: 'error',
      trigger: 'change'
    }
  ],
  alertDataType: [
    {
      required: true,
      message: '数据聚合周期为空，请选择数据聚合周期',
      type: 'error',
      trigger: 'change'
    }
  ],
  alertEffectivePeriod: [
    {
      required: true,
      message: '报警生效时段为空，请选择报警生效时段',
      type: 'error',
      trigger: 'change'
    }
  ],
  alertSilentPeriod: [
    {
      required: true,
      message: '报警沉默周期为空，请选择报警沉默周期',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// 生命周期
onMounted(() => {
  if (route.query.id) {
    ruleId.value = route.query.id
    getFromData()
  }
  getProduct()
})
// ------定义方法------
// 获取详情
const getFromData = async () => {
  const res: any = await getRuleDetail(ruleId.value)
  if (res.code === 200) {
    formData.value = res.data
    formData.value.duration = String(formData.value.duration)
    console.log(formData.value.alertEffectivePeriod)
    formData.value.alertEffectivePeriod =
      formData.value.alertEffectivePeriod.split('~') // 需要把日期转为数组
    getPublished(formData.value.productKey)
    getList(formData.value.productKey)
  }
}
// 提交表单
const handleSub = () => {
  console.log(formData.value)
  form.value.validate().then(async (valid) => {
    if (valid === true) {
      const num = formData.value.alertSilentPeriod
      if (typeof num === 'number') {
        formData.value.alertSilentPeriod = num
      } else {
        formData.value.alertSilentPeriod = Number(getNum(num))
      }
      formData.value.alertEffectivePeriod =
        formData.value.alertEffectivePeriod.join('~') // 提交时需要把数组转为字符串
      formData.value = {
        ...formData.value,
        alertSilentPeriod: formData.value.alertSilentPeriod,
        alertDataType: Number(formData.value.alertDataType),
        duration:
          typeof num === 'number'
            ? formData.value.duration
            : Number(formData.value.duration),
        value: Number(formData.value.value)
      }

      if (ruleId.value) {
        const res: any = await updateRule(formData.value)
        if (res.code === 200) {
          MessagePlugin.success('编辑成功')
          router.push({
            path: `/intelligence/rule`
          })
        }
      } else {
        const res: any = await createRule(formData.value)
        if (res.code === 200) {
          MessagePlugin.success('添加成功')
          router.push({
            path: `/intelligence/rule`
          })
        }
      }
    }
  })
}
// 获取产品列表
const getProduct = async () => {
  const res: any = await getProductList()
  if (res.code === 200) {
    productData.value = res.data
  }
}
// 获取运行状态
const getPublished = async (val) => {
  const params = {
    ...published.value,
    productKey: val // 产品key
  }
  const res: any = await getPublishedList(params) // 获取列表数据
  if (res.code === 200) {
    if (res.data !== undefined) {
      const data = JSON.parse(res.data.thingModelJson)
      itemData.value = []
      const obj = {
        functionBlockId: '-1',
        functionBlockName: '默认模块'
      }
      if (data.functionBlocks !== undefined) {
        itemData.value = data.functionBlocks
      }
      publishedData.value = data.properties
      itemData.value.unshift(obj)
    }
  }
}
// 设备列表
// 获取列表数据
const getList = async (val) => {
  const pages = {
    pageSize: 100,
    pageNum: 1,
    productKey: val // 产品key
  }
  const res: any = await getDeviceList(pages) // 获取列表数据
  if (res.data) {
    listData.value = res.data.records
    const obj = {
      id: '-1',
      iotId: '-1',
      deviceName: '全部设备'
    }
    listData.value.unshift(obj)
  }
}
// // 详情运行状态状态的卡片
// const getPropertyStatus = async () => {
//   statusObj.value = {
//     ...statusObj.value,
//     productKey: formData.value.productKey
//   }
//   const res: any = await getPropertyStatusList(statusObj.value) // 获取列表数据
//   if (res.code === 200) {
//     if (res.data) {
//       const data = res.data.list.propertyStatusInfo
//       publishedData.value = data
//     } else {
//       publishedData.value = []
//     }
//   }
// }
// 触发产品
const handleProduct = (val, e) => {
  formData.value.productName = e.selectedOptions[0].label
  formData.value.productKey = val
  getPublished(val)
  getList(val)
  delete formData.value.functionId
}
// 触发模块
const handleModele = (val, e) => {
  formData.value.moduleName = e.selectedOptions[0].label
  // 如果选择的是自定义模块需要传functionBlockId
  if (val !== '-1') {
    published.value.functionBlockId = e.selectedOptions[0].value
  } else {
    // 否则删除functionBlockId，显示默认模块的数据
    delete published.value.functionBlockId
  }
  getPublished(formData.value.productKey)
}
// 触发功能
const handleIdentifier = (val, e) => {
  formData.value.functionName = e.selectedOptions[0].label
}
// 触发设备
const handleDevice = (val, e) => {
  formData.value.deviceName = e.selectedOptions[0].label
}
// 触发沉默周期
const handlePeriod = (val, e) => {
  if (e.selectedOptions[0].key > 4) {
    formData.value.remark = e.selectedOptions[0].value * 60
  } else {
    formData.value.remark = e.selectedOptions[0].value
  }
}
// 时间段选择
const handleRangePick = (v) => {
  formData.value.alertEffectivePeriod = v
}
// 返回
const handleReturn = () => {
  router.go(-1)
}
</script>
<style lang="less" scoped src="./../index.less"></style>
