<!-- 申请入住 -->
<template>
  <!-- 家属信息 -->
  <t-card title="家属信息" class="familyBox">
    <t-table
      ref="tableRef"
      row-key="key"
      :columns="FROMCOLUMNS"
      :data="baseData"
      table-layout="auto"
    >
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 组件

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
const tableRef = ref()

// 家属信息
// 保存变化过的行信息
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '家属姓名',
      colKey: 'name',
      minWidth: 200
    },
    {
      title: '家属联系方式',
      colKey: 'phone',
      minWidth: 200
    },
    {
      title: '与老人关系',
      colKey: 'kinship',
      minWidth: 200
    }
  ]
})
</script>
