<!-- 申请入住 -->
<template>
  <!-- 家属信息 -->
  <t-card title="家属信息" class="familyBox">
    <t-table
      ref="tableRef"
      row-key="key"
      :columns="FROMCOLUMNS"
      :data="familyUserData"
      :editable-row-keys="editableRowKeys"
      table-layout="auto"
      @row-edit="onRowEdit"
      @row-validate="onRowValidate"
    >
      <!-- 操作栏 -->
      <template #op="{ row, rowIndex }">
        <div class="addInput">
          <icon
            v-if="familyUserData.length > 1"
            name="minus-rectangle"
            @click="handleDelete(row, rowIndex)"
          />
          <icon
            v-if="rowIndex === 0 && !isAddData"
            name="add-rectangle"
            @click="handleRowAdd"
          />
        </div>
      </template>
      <!-- end -->
    </t-table>
  </t-card>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { Icon } from 'tdesign-icons-vue-next'
import { MessagePlugin, Input, Select } from 'tdesign-vue-next'
import { useUserStore } from '@/store'
// 组件
// 基本数据
import { relationData } from '@/utils/commonData'

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
  // 本地储存的基本信息
  storageData: {
    type: Object,
    default: () => {
      return {}
    }
  },
  infoActive: {
    type: Number,
    default: 0
  },
  isSave: {
    type: Boolean,
    default: false
  }
})
// ------定义变量------
// 触发父级事件
const emit = defineEmits(['getInfoActive', 'setFamily', 'setIsSave'])
const form = ref() // 表单
const tableRef = ref()
// 基本信息
// 家属信息
// 保存变化过的行信息
const FROMCOLUMNS = computed(() => {
  return [
    {
      title: '家属姓名',
      colKey: 'name',
      minWidth: 200,
      // 编辑状态相关配置，全部集中在 edit
      edit: {
        component: Input,
        props: {
          clearable: true,
          // autofocus: true,
          maxlength: 10
        },
        validateTrigger: 'change',
        // 除了点击非自身元素退出编辑态之外，还有哪些事件退出编辑态
        abortEditOnEvent: ['onEnter'],
        // 编辑完成，退出编辑态后触发
        onEdited: (context) => {
          familyUserData.value.splice(context.rowIndex, 1, context.newRowData)
          MessagePlugin.success('Success')
        },
        rules: [{ required: true, message: '不能为空' }],
        // 默认是否为编辑状态
        defaultEditable: true
      }
    },
    {
      title: '家属联系方式',
      colKey: 'phone',
      minWidth: 200,
      edit: {
        component: Input,
        props: {
          clearable: true,
          // autofocus: true,
          maxlength: 11
        },
        abortEditOnEvent: ['blur'],
        rules: [
          {
            validator: (val) => {
              const reg =
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

              if (val === '') {
                MessagePlugin.error('家属信息不完整，请输入家属信息')
                emit('setFamily', familyUserData.value, false)
              } else {
                if (reg.test(val)) {
                  return true
                }
                MessagePlugin.error('家属联系方式错误，请重新输入')
                emit('setFamily', familyUserData.value, false)
              }
            }
          }
        ],
        // 默认是否为编辑状态
        defaultEditable: true
      }
    },
    {
      title: '与老人关系',
      colKey: 'refId',
      minWidth: 200,
      props: {
        clearable: false
      },
      cell: (h, { row }) =>
        relationData.find((t) => t.value === row.refId)?.label,
      edit: {
        component: Select,
        props: {
          clearable: true,
          options: relationData
        },
        rules: [{ required: true, message: '不能为空' }],
        showEditIcon: false
      }
    },
    {
      align: 'left',
      fixed: 'right',
      width: 100,
      minWidth: 100,
      colKey: 'op',
      title: '操作'
    }
  ]
})
const getBaseData = () => {
  const obj = {
    key: '0',
    name: '',
    phone: '',
    refId: '',
    kinship: ''
  }
  return [obj]
}
const familyUserData = ref<Object | any>(getBaseData())
const editableRowKeys = ref([])
const isAddData = ref(false)
const editMap = {}
// -----定义方法------
// 监听器，监听父级传递的data值，控制表单数据
watch(props, (val) => {
  //   if (val.isSave) {
  //     const obj = userStore.$state.enterBaseData
  //     if (obj.otherApplyInfo !== undefined) {
  //       formData.value = userStore.$state.enterBaseData.otherApplyInfo
  //     }
  //     if (obj.memberElderDtos !== undefined && obj.memberElderDtos.length > 0) {
  //       familyUserData.value = obj.memberElderDtos
  //     }
  //   }
  //   if (val.infoActive > 0) {
  //     active.value = val.infoActive
  //     tabBar.value.currentId = active.value
  //   }
})
onMounted(() => {
  const arr = []
  console.log(props.baseData.retreat)
  if (props.baseData.retreat !== undefined) {
    props.baseData.retreat.memberElderDtos.forEach((ele) => {
      // 把数据处理下付给data，用来回显页面数据
      const obj = {
        key: '0',
        id: ele.id,
        name: ele.name,
        phone: ele.phone,
        refId: ele.refId,
        kinship: ele.kinship
      }
      arr.push(obj)
    })
    familyUserData.value = arr
  }

  getRowKey()
})
// 家属信息
// 编辑行后获取所有触发的数据
const onRowEdit = (params) => {
  // // 修改后的当前行赋值给原始数据
  const { row, col, value, rowIndex } = params
  if (col.title === '与老人关系') {
    relationData.forEach((ele) => {
      if (ele.value === value) {
        row.kinship = ele.label
        row.refId = ele.value
      }
    })
  }

  const oldRowData = editMap[row.key]?.editedRow || row
  if (col.title === '家属姓名' && value === '') {
    oldRowData.name = ''
  } else if (col.title === '家属联系方式' && value === '') {
    oldRowData.phone = ''
  } else if (col.title === '与老人关系' && value === undefined) {
    oldRowData.refId = ''
    oldRowData.kinship = ''
  }
  const editedRow = { ...oldRowData, [col.colKey]: value }
  editMap[row.key] = {
    ...params,
    editedRow
  }

  // ⚠️ 重要：以下内容应用于全量数据校验（单独的行校验不需要）
  const newData = [...familyUserData.value]
  newData[rowIndex] = editedRow
  familyUserData.value = newData
}
// 处理默认编辑
const getRowKey = () => {
  editableRowKeys.value = []
  familyUserData.value.forEach((ele, i) => {
    editableRowKeys.value.push(String(i))
  })
}
// 删除一条护理项目
const handleDelete = (val, index) => {
  familyUserData.value.splice(index, 1)
  isAddData.value = false
}
// 添加
const handleRowAdd = () => {
  const obj = {
    key:
      familyUserData.value.length > 0
        ? String(familyUserData.value.length)
        : '0',
    name: '',
    phone: '',
    refId: '',
    kinship: ''
  }
  familyUserData.value.push(obj)
  getRowKey()
}
// 家属信息保存
const onRowValidate = () => {
  // 查询数据有没有填写完整
  // tableRef.value.validateTableData().then((params) => {
  //   const cellKeys = Object.keys(params.result)
  //   const firstError = params.result[cellKeys[0]]
  //   if (firstError) {
  //     MessagePlugin.error('家属信息为空，请重新输入')
  //   } else {
  //     emit('setFamily', familyUserData.value, true)
  //   }
  // })
}
defineExpose({
  onRowValidate, // 家属信息保存
  tableRef,
  familyUserData
})
</script>
