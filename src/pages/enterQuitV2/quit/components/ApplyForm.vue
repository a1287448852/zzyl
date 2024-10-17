<!-- 申请退住 -->
<template>
  <t-card title="基本信息">
    <t-form-item label="老人姓名：" name="name">
      <t-input
        v-model="formData.name"
        placeholder="请选择"
        class="wt-300"
        :readonly="readonly"
        @focus="selectFlavor"
        @blur="outSelect"
      >
        <template #suffixIcon
          ><t-icon :name="mak ? 'chevron-up' : 'chevron-down'"></t-icon
        ></template>
      </t-input>
    </t-form-item>
    <t-form-item label="退住日期：" name="checkOutTime">
      <t-date-picker
        v-model="formData.checkOutTime"
        placeholder="请选择"
        class="wt-sm300"
        @change="handleOutTime"
      />
    </t-form-item>
    <t-form-item label="退住原因：" name="reason">
      <t-select
        v-model="formData.reason"
        clearable
        filterable
        placeholder="请选择"
        class="wt-300"
      >
        <t-option
          v-for="(item, index) in quitCauseData"
          :key="index"
          :value="item.value"
          :label="item.value"
          title=""
        >
          {{ item.value }}
        </t-option>
      </t-select>
    </t-form-item>
    <t-form-item label="老人身份证号：" name="idCardNo">
      <t-input
        v-model="formData.idCardNo"
        placeholder="老人身份证号"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="入住期限：">
      <t-input
        v-model="formData.checkInTime"
        placeholder="入住期限"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="费用期限：">
      <t-input
        v-model="formData.costTime"
        placeholder="费用期限"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="护理等级：" name="nursingLevelName">
      <t-input
        v-model="formData.nursingLevelName"
        placeholder="护理等级"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="入住床位：" name="bedNo">
      <t-input
        v-model="formData.bedNo"
        placeholder="入住床位"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="护理员姓名：" name="nursingName">
      <t-input
        v-model="formData.nursingName"
        placeholder="护理员"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="联系方式：" name="phone">
      <t-input
        v-model="formData.phone"
        placeholder="联系方式"
        class="wt-300"
        :disabled="true"
      >
      </t-input>
    </t-form-item>
    <t-form-item label="家庭住址：" class="lastText" name="address">
      <t-textarea
        v-model="formData.address"
        placeholder="家庭住址"
        class="t-textarea"
        name="description"
        :maxlength="100"
        clearable
        show-limit-number
        :disabled="true"
      >
      </t-textarea>
    </t-form-item>
  </t-card>
  <!-- end -->

  <!-- 老人选择弹层 -->
  <OldManSelect
    :dialog-visible="dialogVisible"
    :dialog-data="listOldManData"
    :pagination="pagination"
    :formData="formData"
    @handle-search="handleSearch"
    @handle-reset="handleReset"
    @handle-close-dialog="handleCloseDialog"
    @get-current="getCurrent"
    @handle-select-old="handleSelectOld"
  ></OldManSelect>
  <!-- end -->
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { validateTextLen } from '@/utils/validate'

// 基本数据
import { quitCauseData } from '@/utils/commonData'
// 接口
import { getSelectPageQuery } from '@/api/oldMan'

// 选择老人列表弹层
import OldManSelect from './OldManSelect.vue'

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
  }
})
const emit = defineEmits(['handleSelectOld', 'setQuitTime'])
// ------定义变量------
// 触发父级事件
const resetType = ref('empty') // 重置表单
const form = ref() // 表单
const mak = ref(false) // 控制input上下箭头
const readonly = ref(false) // 是否只读
const dialogVisible = ref(false) // 老人选择弹窗
const listOldManData = ref([]) // 获取所有老人
const pagination = ref<Object | any>({
  pageSize: 5,
  pageNum: 1, // 默认当前页
  status: 0
})
const checkInTime = ref('') // 设置入住期限
const costTime = ref('') // 设置配用期限
// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: '老人姓名为空，请选择老人姓名',
      type: 'error',
      trigger: 'change'
    }
  ],
  checkOutTime: [
    {
      required: true,
      message: '退住日期为空，请选择退住日期',
      type: 'error',
      trigger: 'change'
    }
  ],
  reason: [
    // 房间校验
    {
      required: true,
      message: '退住原因为空，请选择退住原因',
      type: 'error',
      trigger: 'change'
    }
  ]
}
// -----定义方法------
// 获取老人列表数据
const getOldList = async () => {
  const res: any = await getSelectPageQuery(pagination.value) // 获取列表数据
  if (res.code === 200) {
    listOldManData.value = res.data.records
    pagination.value.total = Number(res.data.total)
  }
}
// 搜索功能
const handleSearch = () => {
  pagination.value.pageNum = 1
  getOldList()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  pagination.value = {
    pageSize: 5,
    pageNum: 1
  }
  getOldList()
}
// 选择老人获取相关联的信息
const selectFlavor = () => {
  mak.value = true
  readonly.value = true
  dialogVisible.value = true
  getOldList()
}
const outSelect = (e) => {
  setTimeout(function () {
    mak.value = false
    readonly.value = false
  }, 200)
}
// 关闭普通列表弹层
const handleCloseDialog = () => {
  dialogVisible.value = false
  pagination.value = {
    pageSize: 5,
    pageNum: 1
  }
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getOldList()
}
// 提交普通列表弹层
const handleSelectOld = (val) => {
  const obj = val[0]
  emit('handleSelectOld', obj)
}
// 选择退住日期
const handleOutTime = (val) => {
  emit('setQuitTime', val)
}
// 向父组件暴露数据与方法
defineExpose({
  rules
})
</script>
