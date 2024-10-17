<!-- 基础表格组件 -->
<template>
  <div class="deptAdmin baseList">
    <div class="tableBoxs">
      <div class="newBox">
        <button class="bt newBoxbutton mt-16" @click="handleBulid()">
          新增部门
        </button>
      </div>
      <t-enhanced-table
        ref="table"
        :data="data"
        :tree="treeConfig"
        :columns="COLUMNS"
        row-key="deptNo"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="auto"
        @tree-expand-change="rehandleExpandChange"
      >
        <!-- 更新时间-->
        <template #updateTime="{ row }">
          <div class="updateTime">
            <span>{{ row.updateTime || `2023-3-23 3:33:33` }}</span>
          </div>
        </template>
        <!-- 部门说明-->
        <template #remark="{ row }">
          <t-tooltip
            v-if="row.remark?.length > 18"
            class="title4"
            :content="row.remark || '--'"
            >{{ row.remark || '--' }}</t-tooltip
          >
          <span v-else>{{ row.remark || '--' }}</span>
        </template>
        <!-- end -->
        <!-- 在操作栏添加删除、编辑、查看三种操作 -->
        <template #op="{ row }">
          <a
            class="btn-dl line btn-split-right pdo"
            @click="handleClickDelete(row)"
            >删除</a
          >
          <a
            :class="`${
              row.dataState === '0' ? 'btn-dl' : ''
            } line btn-split-right font-bt`"
            @click="handleClickDisable(row)"
            >{{ row.dataState === '0' ? '禁用' : '启用' }}</a
          >
          <a class="font-bt line" @click="handleSetupContract(row, 'edit')"
            >编辑</a
          >
          <a
            :class="row.dataState === '0' ? '' : 'disabled'"
            class="font-bt btn-split-left"
            @click="handleSetupContract(row, 'add')"
            >新增部门</a
          >
        </template>
        <!-- end -->
        <!-- 展开 -->
        <!-- <template #expandedRow="{ row }">
          <Table
            :rowData="row"
            @handleSetupContract="handleSetupContract"
            @handleBulid="handleBulid"
            @handleClickDelete="handleClickDelete"
            @handleClickDisable="handleClickDisable"
            @fetchData="fetchData"
          ></Table>
        </template> -->
        <!-- end -->
        <!-- 暂无数据 -->
        <template #empty>
          <NoData></NoData>
        </template>
        <!-- end -->
      </t-enhanced-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { COLUMNS } from '../constants' // 表格列
// 组件
import NoData from '@/components/noData/index.vue'
import { getDeptList } from '@/api/permission'
import Table from './Table.vue'

const treeConfig = reactive({
  childrenKey: 'childCount',
  treeNodeColumnIndex: 0,
  indent: 25,
  expandTreeNodeOnClick: true
})
const table = ref(null)
// 展开列表
const rehandleExpandChange = (value) => {
  console.log(value, 'value')
  getDeptList({
    parentDeptNo: value.row.deptNo
  }).then((res) => {
    const arr = res.data.map((item) => {
      return { ...item, childCount: Boolean(item.childCount) }
    })
    if (value.row.deptNo === '100001000000000') {
      table.value.resetData(arr)
    } else {
      table.value.appendTo(value.row.deptNo, arr)
    }
    console.log(res, 'ffffff')
  })
}
// // 向列表中增加节点（新增部门）
// const insertRefreshTable = (key, val) => {
//   table.value.appendTo(key, val)
// }
// 删除操作后更新列表
const deleteRefreshTable = (key) => {
  console.log('刷新列表数据', key)
  table.value.remove(key)
}
// 启用、编辑操作更新列表
const editRefreshTable = (key, val) => {
  console.log('刷新列表数据', key, val)
  table.value.setData(key, val)
  if (val.childCount && val.childCount.length > 0) {
    val.childCount.forEach((item) => {
      // table.value.setData(item.deptNo, { ...item, dataState: val.dataState })
      editRefreshTable(item.deptNo, { ...item, dataState: val.dataState })
    })
  }
}

const props = defineProps({
  listData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pagination: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
defineExpose({ deleteRefreshTable, editRefreshTable, rehandleExpandChange })
const emit = defineEmits([
  'fetchData',
  'handleSetupContract',
  'handleBulid',
  'handleClickDelete',
  'handleClickDisable'
])

// 监听器赋值
watch(props, () => {
  data.value = props.listData
  pagination.value = props.pagination
  dataLoading.value = false
})

// 表格数据
const data: any = ref([])
// 分页
const pagination: any = ref({
  defaultPageSize: 10,
  total: 0,
  defaultCurrent: 1 // 默认当前页
})

// 加载状态
const dataLoading = ref(true)

// 打开编辑弹窗
const handleSetupContract = (val, tg) => {
  console.log(val, tg, 'ffffffffff')
  if (val.dataState !== '0' && tg === 'add') return
  // 这个方法可能是递归子组件来的 所有需要判断
  if (val.tg) {
    emit('handleSetupContract', { ...val })
  } else {
    emit('handleSetupContract', { data: val, tg })
  }
}
// 点击删除
const deleteIdx = ref(-1) // 删除的索引
const handleClickDelete = (row: { rowIndex: any }) => {
  emit('handleClickDelete', row)
  deleteIdx.value = row.rowIndex
}

// 点击禁用/启用
const handleClickDisable = (row: { rowIndex: any }) => {
  emit('handleClickDisable', row)
}

// 点击新建
const handleBulid = () => {
  emit('handleBulid')
}
</script>

<style lang="less" scoped src="../../index.less"></style>
<style lang="less" scoped>
:deep(.title4) {
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  display: -webkit-box;
  text-overflow: -o-ellipsis-lastline;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
