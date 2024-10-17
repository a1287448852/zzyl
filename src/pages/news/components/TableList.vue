<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="listData"
        :columns="COLUMNS"
        :row-key="rowKey"
        :selected-row-keys="selectedRowKeys"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="fixed"
        table-content-width="100%"
        @select-change="onSelectChange"
      >
        <!-- 消息类型 -->
        <template #type="{ row }">
          <span v-if="row.type === 0">报警通知</span>
          <span v-else>协同工作</span>
        </template>
        <!-- end -->
        <!-- 操作栏 -->
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl" @click="handleClickDelete(row, 'delete')">删除</a>
            <a class="font-bt" @click="handleOpen(row, 'read')">查看</a>
          </div>
        </template>
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-table>
      <!-- 分页 -->
      <t-pagination
        v-if="total > 10"
        v-model="pagination.pageNum"
        v-model:pageSize="pagination.pageSize"
        :total="total"
        @change="onPageChange"
      />
      <!-- end -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { COLUMNS } from '../constants' // 表格列
// 组件
import NoData from '@/components/noData/index.vue'

// 获取父级数据
const props = defineProps({
  // 列表数据
  listData: {
    type: Object,
    default: () => {
      return []
    }
  },
  // 总条数
  total: {
    type: Number,
    default: 0
  },
  // 分页
  pagination: {
    type: Object,
    default: () => ({})
  },
  // 加载状态
  dataLoading: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
const router = useRouter() // 获取全局
const selectedRowKeys = ref([])
// 行的key
const rowKey = 'id'
const emit = defineEmits([
  'getCurrent',
  'handleCancelOpen',
  'handleClickDelete',
  'getDeleteNum',
  'handleOperate'
])
// 打开操作弹窗
const handleOpen = (val, type) => {
  selectedRowKeys.value = [val.id]
  emit('handleOperate', val.id, type)
  router.push({
    path: `/intelligence/facility`,
    query: {
      id: val.relevantId
    }
  })
}
// 点击删除
const handleClickDelete = (row, type) => {
  selectedRowKeys.value = [row.id]
  emit('handleClickDelete', row, type)
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
const onSelectChange = (value, params) => {
  selectedRowKeys.value = value
  emit('getDeleteNum', selectedRowKeys.value)
}
// 向父组件暴露数据与方法
defineExpose({
  selectedRowKeys
})
</script>
