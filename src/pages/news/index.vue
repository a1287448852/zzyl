<!-- 消息列表页 -->
<template>
  <div class="min-h subscribe bg-wt">
    <!-- 筛选区域 -->
    <SearchFormBox
      :search-data="pagination"
      @handle-search="handleSearch"
      @handle-reset="handleReset"
      @handle-clear="handleClear"
    ></SearchFormBox>
    <!-- end -->
    <!-- tab导航 -->
    <div class="marg-main newBox">
      <SwitchBar
        ref="tabBar"
        :isTab="isTab"
        :data="newNewsData"
        @change-id="changeId"
      ></SwitchBar>
      <div class="tabBtn">
        语音提醒<t-switch v-model="checked" @change="onChange" />
        <button
          class="bt wt-120"
          :class="operateData.length > 0 ? '' : 'bt-forbid'"
          @click="handleDelClick('delete')"
        >
          删除
        </button>
        <button
          class="bt wt-120"
          :class="
            operateData.length > 0 && pagination.isRead === 0 ? '' : 'bt-forbid'
          "
          @click="handleReadClick('read')"
        >
          标记为已读
        </button>
        <button
          class="bt wt-120"
          :class="
            listData.length > 0 && pagination.isRead === 0 ? '' : 'bt-forbid'
          "
          @click="handleAllReadClick('allRead')"
        >
          全部已读
        </button>
        <button
          class="bt wt-120"
          :class="listData.length > 0 ? '' : 'bt-forbid'"
          @click="handleAllDelClick('allDelete')"
        >
          全部删除
        </button>
      </div>
    </div>
    <!-- 表格 -->
    <TableList
      ref="table"
      :list-data="listData"
      :pagination="pagination"
      :total="total"
      @handleClickDelete="getIds"
      @handle-open="handleOpen"
      @get-current="getCurrent"
      @handle-cancel-open="handleCancelOpen"
      @getDeleteNum="getDeleteNum"
      @handleOperate="handleOperate"
    ></TableList>
    <!-- end -->
    <!-- 删除弹层 -->
    <Delete
      :visible="dialogOperateVisible"
      :title="operateTitle"
      :delete-text="operateText"
      @handle-delete="handleOperate"
      @handle-close="handleOperateClose"
    ></Delete>
    <!-- end -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getStartTimeStr, getEndTimeStr } from '@/utils/date'
// 基本数据
import { newsData } from '@/utils/commonData'
// 接口
import {
  getMessageList,
  batchDelete,
  allDelete,
  allMarkRead,
  batchMarkRead,
  updateVoiceNotifyStatus,
  countByReadStatus,
  queryVoiceNotifyStatus
} from '@/api/news'
// tab切换
import SwitchBar from '@/components/switchBar/switchBar.vue'
// 表格列表
import TableList from './components/TableList.vue'
// 搜索框表单
import SearchFormBox from './components/SearchForm.vue'
// 删除弹层
import Delete from '@/components/OperateDialog/index.vue'
import { useUserStore } from '@/store'
// ------定义变量------
const userStore = useUserStore()
const visible = ref(false) // 支付弹层
const cancelVisible = ref(false) // 取消弹层
const listData = ref([]) // 列表数据
const dataLoading = ref(false) // 加载中
const total = ref(0) // 总条数
const billId = ref('') // 业务系统订单号
const tabBar = ref(null) // tab ref
const operateData = ref(0) // 需要操作的消息ids
const dialogOperateVisible = ref(false) // 控制操作弹层显示隐藏
const table = ref(null) // table ref
const deleteType = ref(null) // 判断是全部删除还是单独删除某几个
const checked = ref(true) // 是否打开语音播报
const operateTitle = ref(null) // 操作标题
const operateText = ref('') // 要操作的内容提示
const newNewsData = ref([]) // 组合新的消息tab
const isTab = ref(false) // 用来解决组件数据不更新问题
// 分页
const pagination = ref<Object | any>({
  pageSize: 10,
  pageNum: 1,
  isRead: 0
})
// 生命周期
onMounted(() => {
  getQueryVoiceNotifyStatus()
  getList()
  getCountStatus()
})
// ------定义方法------
// 获取列表数据
const getList = async () => {
  dataLoading.value = false
  try {
    const res: any = await getMessageList(pagination.value) // 获取列表数据
    listData.value = res.data.records
    total.value = Number(res.data.total)
  } finally {
    dataLoading.value = false
  }
}
// 获取已读未读消息数量
const getCountStatus = async () => {
  await countByReadStatus().then((res) => {
    if (res.code === 200) {
      const data = res.data
      newsData.forEach((ele: any) => {
        if (ele.id === 0) {
          ele.value = data.unReadCount
        } else {
          ele.value = data.completedReadCount
        }
      })
      newNewsData.value = newsData
    }
  })
}
// 查询语音通知状态
const getQueryVoiceNotifyStatus = async () => {
  await queryVoiceNotifyStatus().then((res) => {
    if (res.code === 200) {
      if (res.data === 0) {
        checked.value = false
      } else {
        checked.value = true
      }
    }
  })
}
// 搜索功能
const handleSearch = (time) => {
  pagination.value.pageNum = 1
  if (time.length > 0) {
    pagination.value.startTime = getStartTimeStr(time[0])
    pagination.value.endTime = getEndTimeStr(time[1])
  }
  getList()
  getCountStatus()
}
// 重置，清空搜索框
const handleReset = () => {
  // 重置页码
  tabBar.value.currentId = 0
  pagination.value = {
    pageSize: 10,
    pageNum: 1
  }
  getList()
  getCountStatus()
}
// 翻页设置当前页
const getCurrent = (val) => {
  pagination.value.pageNum = val.current
  pagination.value.pageSize = val.pageSize
  getList()
  getCountStatus()
}
// 获取tab触发的当前值
const changeId = (val) => {
  operateData.value = []
  table.value.selectedRowKeys = []
  pagination.value = {
    pageSize: pagination.value.pageSize,
    isRead: val
  }
  pagination.value.pageNum = 1
  getList()
  getCountStatus()
}

// 清空搜索表单
const handleClear = (v) => {
  if (v === 'type') {
    delete pagination.value.type
  } else {
    delete pagination.value.startTime
    delete pagination.value.endTime
  }
  pagination.value = {
    ...pagination.value
  }
  getList()
  getCountStatus()
}
// 支付弹层
const handleOpen = (id) => {
  billId.value = id
  visible.value = true
}
// 打开取消弹层
const handleCancelOpen = (val) => {
  billId.value = val.id
  cancelVisible.value = true
}
// 关闭弹层
const handleOperateClose = () => {
  dialogOperateVisible.value = false
  operateData.value = []
  table.value.selectedRowKeys = []
}
// 获取要删除的消息
const getDeleteNum = (val) => {
  operateData.value = val.map((str) => Number(str))
}
// 获取要操作删除的id
const getIds = (val, type) => {
  deleteType.value = type
  operateData.value = [val.id]
  operateText.value = '消息'
  operateTitle.value = null
  operateOpen()
}
// 批量删除/单独删除
const handleDelClick = (val) => {
  if (operateData.value.length > 0) {
    deleteType.value = val
    operateTitle.value = null
    // 单独/批量删除
    operateText.value = '消息'
    operateOpen()
  }
}
// 单独标记已读
const handleReadClick = (val) => {
  if (operateData.value.length > 0 && pagination.value.isRead === 0) {
    deleteType.value = val
    operateTitle.value = null
    operateTitle.value = '确认已读'
    operateText.value = '该消息标记为已读'
    operateOpen()
  }
}
// 全部已读
const handleAllReadClick = (val) => {
  if (listData.value.length > 0 && pagination.value.isRead === 0) {
    deleteType.value = val
    operateTitle.value = null
    operateTitle.value = '确认已读'
    operateText.value = '所有消息标记为已读'
    operateOpen()
  }
}
// 全部删除
const handleAllDelClick = (val) => {
  if (listData.value.length > 0) {
    deleteType.value = val
    operateTitle.value = null
    // 删除所有
    operateText.value = '全部消息'
    operateOpen()
  }
}
// 打开操作弹层
const operateOpen = () => {
  dialogOperateVisible.value = true
}
// 打开/关闭语音播报
const onChange = async (val) => {
  // val false：关闭，true：开启
  await updateVoiceNotifyStatus(val ? 1 : 0).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('操作成功')
    }
  })
}
// 全部删除
const handleAllDelete = async () => {
  await allDelete(pagination.value.isRead).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('删除成功')
      updateData()
    }
  })
}
// 单独或批量删除
const handleDelete = async () => {
  await batchDelete(operateData.value).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('删除成功')
      updateData()
    }
  })
}
// 全部已读
const handleAllRead = async () => {
  await allMarkRead(operateData.value).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('操作成功')
      updateData()
    }
  })
}
// 单个/批量已读
const handleRead = async () => {
  await batchMarkRead(operateData.value).then((res) => {
    if (res.code === 200) {
      MessagePlugin.success('操作成功')
      updateData()
    }
  })
}
// 需要更新的数据
const updateData = () => {
  isTab.value = true
  handleOperateClose()
  getList()
  getCountStatus()
  // 数据不更新，方案一用定时器来解决
  setTimeout(() => {
    isTab.value = false
  }, 800)
}
// 操作
const handleOperate = async (ids, type) => {
  // 例表页的查看操作，查看跳转前需要标记已读
  if (type !== undefined && ids !== undefined) {
    operateData.value = [ids]
    deleteType.value = type
  }
  // tab的操作
  if (deleteType.value === 'allDelete') {
    // 全部删除
    handleAllDelete()
  } else if (deleteType.value === 'delete') {
    // 单独或批量删除
    handleDelete()
  } else if (deleteType.value === 'allRead') {
    // 全部已读
    handleAllRead()
  } else {
    // 单个/批量已读
    handleRead()
  }
}
</script>
