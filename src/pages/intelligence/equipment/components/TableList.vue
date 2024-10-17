<!-- 基础表格组件 -->
<template>
  <div class="baseList">
    <div class="tableBoxs">
      <t-table
        :data="listData"
        :columns="COLUMNS"
        :row-key="rowKey"
        vertical-align="middle"
        :hover="true"
        :loading="dataLoading"
        table-layout="fixed"
        table-content-width="100%"
      >
        <template #loading>
          <div class="t-table--loading-message">数据同步中...</div>
        </template>
        <!-- 序号 -->
        <template #rowIndex="{ rowIndex }">{{ rowIndex + 1 }}</template>
        <!-- end -->
        <!-- 接入位置 -->
        <template #remark="{ row }">
          {{ getStr(row.remark) }}
        </template>
        <!-- end -->
        <!-- 设备状态 -->
        <!-- <template #deviceStatus="{ row }">
          <span v-if="row.deviceStatus === 'ONLINE'">在线</span>
          <span v-else-if="row.deviceStatus === 'OFFLINE'">离线</span>
          <span v-else-if="row.deviceStatus === 'UNACTIVE'">未激活</span>
          <span v-else>已禁用</span>
        </template> -->
        <!-- end -->
        <template #creator="{ row }">
          {{ row.creator ? row.creator : '--' }}
        </template>
        <!-- 操作栏 -->
        <!-- 节点类型 -->
        <template #locationType="{ row }">
          {{ row.locationType === 0 ? '随身设备' : '固定设备' }}
        </template>
        <!-- end -->
        <!-- 节点类型 -->
        <template #utcModified="{ row }">{{
          row.utcModified !== undefined ? getTateDt(row.utcModified) : '--'
        }}</template>
        <!-- end -->
        <template #op="{ row }">
          <div class="operateCon">
            <a class="btn-dl" @click="handleClickDelete(row)">删除</a>
            <a class="font-bt" @click="handleEdit(row)">编辑</a>
            <a class="font-bt" @click="handleLook(row)">查看</a>
            <a
              class="font-bt"
              :class="row.haveEntranceGuard === 0 ? 'disabled' : ''"
              @click="handleOpen(row)"
              >开门</a
            >
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
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import { COLUMNS } from '../constants' // 表格列
import { getTateDt } from '@/utils/date'
import { getStr } from '@/utils/index'
import { deviceOpenDoor } from '@/api/intelligence'
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
  },
  // 所属产品
  productData: {
    type: Array,
    default: () => []
  }
})
// 监听父级传过来的数据
watch(props, (val) => {
  productKey.value = val.pagination.productKey
})
// ------定义变量------
const router = useRouter() // 获取全局
const productKey = ref('') // 产品key
// 行的key
const rowKey = 'index'
const emit = defineEmits([
  'handleOpen',
  'getCurrent',
  'handleEdit',
  'handleClickDelete',
  'getList'
])
// 打开编辑弹窗
const handleEdit = (val) => {
  emit('handleEdit', val)
}
// 点击删除
const handleClickDelete = (row) => {
  emit('handleClickDelete', row)
}
// 打开操作弹窗
const handleLook = (val) => {
  router.push({
    path: `/intelligence/equiDetails`,
    query: { iotId: val.iotId, productKey: val.productKey }
  })
}
// 开门
const handleOpen = async (val) => {
  if (val.haveEntranceGuard === 1) {
    await deviceOpenDoor(val.iotId).then((res) => {
      if (res.code === 200) {
        MessagePlugin.success('开门成功')
        emit('getList')
      }
    })
  }
}
// 点击翻页
const onPageChange = (pageInfo) => {
  emit('getCurrent', pageInfo)
}
</script>
