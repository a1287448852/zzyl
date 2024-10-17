<!-- 入住配置表单 -->
<template>
  <!-- 基本信息 -->
  <t-card title="">
    <template #title
      >入住配置<t-popup
        class="placement bottom center titTpopup"
        content="该费用为月账单，每月1号收当月费用"
        placement="bottom"
        overlayClassName="titTpopup"
        show-arrow
        destroy-on-close
      >
        <t-icon name="error-circle-filled"></t-icon></t-popup
    ></template>
    <t-form-item label="入住期限：" name="checkInTime">
      <t-date-range-picker
        v-model="formData.checkInTime"
        :disable-date="{ before: dayjs().subtract(1, 'day').format() }"
        :time-picker-props="timePickerProps"
        :placeholder="['开始日期', '结束日期']"
        class="wt-300"
        clearable
      />
    </t-form-item>
    <t-form-item label="费用期限：" name="costTime">
      <t-date-range-picker
        v-model="formData.costTime"
        :disable-date="{ before: dayjs().subtract(1, 'day').format() }"
        :time-picker-props="timePickerProps"
        :placeholder="['开始日期', '结束日期']"
        clearable
        class="wt-300"
        @change="handleCheck"
      />
    </t-form-item>
    <t-form-item label="护理等级：" name="nursingLevelId">
      <t-select
        v-model="formData.nursingLevelId"
        clearable
        filterable
        placeholder="请选择"
        class="wt-300"
        @change="handleNursing"
      >
        <t-option
          v-for="(item, index) in nursData"
          :key="index"
          :value="item.id"
          :label="item.name"
          title=""
        >
          {{ item.name }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item label="入住床位：" name="bedId">
      <t-cascader
        v-model="value"
        :keys="{ label: 'code', value: 'ids', children: 'children' }"
        :options="floorData"
        class="wt-300"
        @change="handleFloor"
      />
    </t-form-item>

    <t-form-item label="押金：" class="dislodgeInputHover">
      <span class="method">+</span>
      <t-input
        v-model="formData.depositAmount"
        class="form-item-content wt-300"
        type="search"
        placeholder="请输入"
        clearable
        :readonly="true"
      /><span class="unit">元</span>
    </t-form-item>
    <t-form-item label="护理费用：" name="nursingCost">
      <span class="method">+</span>
      <t-input-number
        v-model="formData.nursingCost"
        :min="0"
        :step="10"
        placeholder="0.00"
        :decimal-places="2"
        :disabled="formData.nursingLevelId === undefined"
        @blur="textBlurPrice($event, 1)"
        @change="textBlurPrice($event, 1)"
      ></t-input-number
      ><span class="unit">元/月</span>
    </t-form-item>
    <t-form-item label="床位费用：" name="bedCost">
      <span class="method">+</span>
      <t-input-number
        v-model="formData.bedCost"
        :min="0"
        :step="10"
        placeholder="0.00"
        :decimal-places="2"
        :disabled="formData.bedId === undefined"
        @blur="textBlurPrice($event, 2)"
        @change="textBlurPrice($event, 2)"
      ></t-input-number
      ><span class="unit">元/月</span>
    </t-form-item>
    <t-form-item label="其他费用：">
      <span class="method">+</span>
      <t-input-number
        v-model="formData.otherCost"
        :min="0"
        :step="10"
        placeholder="0.00"
        :decimal-places="2"
        @blur="textBlurPrice($event, 3)"
        @change="textBlurPrice($event, 3)"
      ></t-input-number
      ><span class="unit">元/月</span>
    </t-form-item>
    <t-form-item label="医保支付：">
      <span class="method2">- </span>
      <t-input-number
        v-model="formData.medicalInsurancePayment"
        :min="0"
        :step="10"
        placeholder="0.00"
        :decimal-places="2"
        @blur="textBlurPrice($event, 4)"
        @change="textBlurPrice($event, 4)"
      ></t-input-number
      ><span class="unit">元/月</span>
    </t-form-item>
    <t-form-item label="政府补贴：">
      <span class="method2"> - </span>
      <t-input-number
        v-model="formData.governmentSubsidy"
        :min="0"
        :step="10"
        placeholder="0.00"
        :decimal-places="2"
        @blur="textBlurPrice($event, 5)"
        @change="textBlurPrice($event, 5)"
      ></t-input-number
      ><span class="unit">元/月</span>
    </t-form-item>
  </t-card>
  <!-- end -->
  <!-- end -->
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import dayjs from 'dayjs'
import { getLevelAllList } from '@/api/serve'
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
  // 楼层房间床位数据
  floorData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
// ------定义变量------
// 触发父级事件
const emit: Function = defineEmits([
  'textBlurPrice',
  'getNewCostTime',
  'handleNursing',
  'setBedId'
])
const value = ref('')
// 表单数据
const nursData = ref([]) // 护理等级列表

// 表单校验
const rules = {
  checkInTime: [
    {
      required: true,
      message: '入住期限为空，请选择入住期限',
      type: 'error',
      trigger: 'change'
    }
  ],
  nursingLevelId: [
    {
      required: true,
      message: '护理等级为空，请选择护理等级',
      type: 'error',
      trigger: 'change'
    }
  ],
  bedId: [
    {
      required: true,
      message: '入住床位为空，请选择入住床位',
      type: 'error',
      trigger: 'change'
    }
  ],
  costTime: [
    {
      required: true,
      message: '费用期限为空，请选择费用期限',
      type: 'error',
      trigger: 'change'
    }
  ],
  nursingCost: [
    {
      required: true,
      message: '护理费用为空，请输入护理费用',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '护理费用为空，请输入护理费用',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: (val) => {
        console.log(val, props.formData.fee * 1.1)
        if (val < props.formData.fee * 0.9 || val > props.formData.fee * 1.1) {
          return false
        }
        return true
      },
      message: '该费用已超出/低于原费用10%，请重新输入',
      type: 'error',
      trigger: 'change'
    }
  ],
  bedCost: [
    {
      required: true,
      message: '床位费用为空，请输入床位费用',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => val >= 0.01,
      message: '床位费用为空，请输入床位费用',
      type: 'error',
      trigger: 'change'
    },
    {
      validator: (val) => {
        // 费用上下浮动不能超过10%
        if (
          val < props.formData.price * 0.9 ||
          val > props.formData.price * 1.1
        ) {
          return false
        }
        return true
      },
      message: '该费用已超出/低于原费用10%，请重新输入',
      type: 'error',
      trigger: 'change'
    }
  ]
}
const timePickerProps = computed(() => {
  return {
    disableTime: () => {
      if (pickDate.value === dayjs().format('YYYY-MM-DD')) {
        return {
          hour: [0, 1, 2, 3, 4, 5, 6]
        }
      }
      return {}
    }
  }
})
// -----定义方法------
onMounted(() => {
  getList()
})
// 获取等级列表
const getList = async () => {
  const res: any = await getLevelAllList()
  if (res.code === 200) {
    nursData.value = res.data
  }
}

// 监听课程价格
const textBlurPrice = (val, num) => {
  emit('textBlurPrice', val, num)
}
// 选择护理等级显示护理费用
const handleNursing = (val, obj) => {
  emit('handleNursing', obj.selectedOptions[0], nursData.value)
}
// 触发时间
const handleCheck = (val) => {
  emit('getNewCostTime', val)
}
//
const handleFloor = (val, obj) => {
  console.log(val, obj.node.data)
  value.value = val
  emit('setBedId', val.substring(1), obj.node.data)
}
// 向父组件暴露数据与方法
defineExpose({
  rules
})
</script>
<style lang="less" scoped>
:deep(.t-popup .t-popup__content--text) {
  width: 100px;
}
</style>
