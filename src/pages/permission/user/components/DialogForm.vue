<!-- 用户的新增编辑弹窗 -->
<template>
  <div class="dialog-form">
    <t-dialog
      v-model:visible="formVisible"
      :footer="false"
      :on-close="handleClose"
      :closeOnEscKeydown="false"
    >
      <!-- 对话框头部 -->
      <template #header>
        <div class="dialog-header">
          <span class="dialog-title">{{ pageTitle }}</span>
        </div>
      </template>
      <!-- end -->
      <template #body>
        <!-- 表单内容 -->
        <t-form
          ref="form"
          :data="formData"
          :rules="rules"
          :label-width="90"
          on-cancel="onClickCloseBtn"
          :reset-type="resetType"
          label-align="right"
          @submit="onSubmit"
        >
          <t-form-item label="所在部门：" name="deptNo">
            <t-cascader
              v-model="formData.deptNo"
              :keys="{ label: 'label', value: 'id', children: 'children' }"
              :options="dialogData"
              placeholder="请选择"
              filterable
              check-strictly
              @change="clickHandler"
            />
          </t-form-item>
          <div class="fx">
            <t-form-item label="姓名：" name="realName">
              <t-input
                v-model="formData.realName"
                clearable
                :maxlength="10"
                show-limit-number
                placeholder="请输入 "
              >
              </t-input>
            </t-form-item>
            <t-form-item label="邮箱：" name="email">
              <t-input
                v-model="formData.email"
                clearable
                :maxlength="30"
                show-limit-number
                placeholder="请输入 "
              >
              </t-input>
            </t-form-item>
          </div>
          <div class="fx">
            <t-form-item label="绑定角色：" name="roleVoIds">
              <t-select
                v-model="formData.roleVoIds"
                :options="rolesList"
                placeholder="请选择"
                multiple
                filterable
                :minCollapsedNum="2"
              />
            </t-form-item>
            <t-form-item label="所属职位：" name="postNo">
              <t-select
                v-model="formData.postNo"
                :options="postsList"
                placeholder="请选择"
                filterable
                clearable
                :disabled="!formData.deptNo"
              />
            </t-form-item>
          </div>
          <div class="fx">
            <t-form-item label="手机号：" name="mobile">
              <t-input
                v-model="formData.mobile"
                clearable
                placeholder="请输入 "
              >
              </t-input>
            </t-form-item>
            <t-form-item label="性别：" name="sex">
              <t-radio-group
                v-model="formData.sex"
                :default-value="formData.dataState"
              >
                <t-radio :value="'0'">男</t-radio>
                <t-radio :value="'1'">女</t-radio>
              </t-radio-group>
            </t-form-item>
          </div>
          <t-form-item style="float: right">
            <div class="bt bt-grey btn-submit" @click="handleClose">
              <span>取消</span>
            </div>
            <button theme="primary" type="submit" class="bt btn-submit">
              <span>确定</span>
            </button>
          </t-form-item>
        </t-form>
        <!-- end -->
      </template>
    </t-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ValidateResultContext } from 'tdesign-vue-next'
import { getPostList } from '@/api/permission'
import { useUserStore } from '@/store'

// 接收数据
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  rolesList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  title: {
    type: String,
    default: '新建产品'
  },
  dialogData: {
    type: Object
  }
})

const clickHandler = (data) => {
  getPostsList(data)
  formData.value.postNo = ''
  // console.log(data)
}
const userStore = useUserStore()
// 表单数据
const resetType = ref('empty')
// 触发事件
const emit: Function = defineEmits(['handleClose', 'addUserDeta'])
// 表单数据
const formVisible = ref(false)
// 表单数据
const formData = ref({
  realName: '', // 用户账号
  mobile: '', // 手机
  deptNo: '', // 部门Id
  roleVoIds: [], // 角色
  postNo: '', // 岗位
  email: '', // 邮箱
  sex: '', // 性别
  dataState: '0' // 状态
})
const originEmail = ref('') // 原有的邮箱
const originDataState = ref('') // 原有的状态
const id = ref('') // 修改人id
// 生命周期
onMounted(() => {})
// 岗位下拉
const postsList = ref([])

// 获取岗位下拉数据
const getPostsList = async (val) => {
  await getPostList({ deptNo: val }).then((res) => {
    if (res.code === 200) {
      postsList.value = (res.data as any).map((el) => ({
        value: el.postNo,
        label: el.postName
      }))
    }
  })
}

// 表头
const pageTitle = ref()
// 表单
const form = ref()
// 提交表单
const onSubmit = (result: ValidateResultContext<FormData>) => {
  if (result.validateResult === true) {
    console.log(formData.value)
    // 当修改了
    if (
      userStore.userInfo.id === id.value &&
      (formData.value.email !== originEmail.value ||
        formData.value.dataState === '1')
    ) {
      emit('addUserDeta', formData.value, false)
    } else {
      emit('addUserDeta', formData.value, true)
    }
  }
}
const handleClose = () => {
  onClickCloseBtn()
  emit('handleClose')
}
// 关闭弹窗
const onClickCloseBtn = () => {
  // 重置表单
  form.value.reset()
  formData.value.deptNo = ''
  formData.value.realName = ''
  formData.value.mobile = ''
  formData.value.dataState = '0'
  formData.value.sex = ''
  formData.value.email = ''
  formData.value.postNo = ''
  formData.value.roleVoIds = []
  console.log(formData.value, 'fff')
}
// 关闭添加修改弹窗
watch(
  () => props.visible,
  async () => {
    formVisible.value = props.visible
    pageTitle.value = props.title
    console.log(props.data, 'props.visible')
    formData.value.deptNo = props.data.deptNo
  }
)
// 主要针对编辑打开弹窗的时候触发
watch(
  () => props.data,
  async (val) => {
    console.log(val, 'props.data')
    formData.value.deptNo = props.data.deptNo
    formData.value.mobile = props.data.mobile
    formData.value.realName = props.data.realName
    formData.value.email = props.data.email
    formData.value.sex = props.data.sex
    formData.value.dataState = props.data.dataState
    formData.value.roleVoIds = props.data.roleVoIds
    formData.value.id = props.data.id
    await getPostsList(formData.value.deptNo)
    formData.value.postNo = props.data.postNo
    originEmail.value = props.data.email
    originDataState.value = props.data.dataState
    id.value = props.data.id
    console.log(formData.value, '00000000000000')
  },
  { deep: true }
)

// 表单校验
const rules = {
  dataState: [
    // 调用次数校验
    {
      required: true,
      message: '请选择用户状态',
      type: 'error',
      trigger: 'blur'
    }
  ],
  roleVoIds: [
    // 调用次数校验
    {
      required: true,
      message: '请选择角色',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => {
        if (val && val.length < 0) {
          return {
            result: false,
            message: '请选择角色',
            type: 'error'
          }
        }
        return true
      }
    }
  ],
  sex: [
    // 调用次数校验
    {
      required: false,
      message: '请选择性别',
      type: 'error',
      trigger: 'blur'
    }
  ],
  postNo: [
    // 调用次数校验
    {
      required: true,
      message: '请选择职位',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => {
        if (!val) {
          return {
            result: false,
            message: '请选择职位',
            type: 'error'
          }
        }
        return true
      }
    }
  ],
  deptNo: [
    // 调用次数校验
    {
      required: true,
      message: '请选择所在部门',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => {
        if (!val) {
          return {
            result: false,
            message: '请选择所在部门',
            type: 'error'
          }
        }
        return true
      }
    }
  ],
  mobile: [
    {
      required: true,
      message: '请输入正确的手机号',
      type: 'error',
      trigger: 'blur'
    },
    {
      validator: (val) => {
        const reg = /^1[3456789]\d{9}$/
        // console.log(val, val.trim() !== '', !reg.test(val), 'val')
        if (val && val.trim() !== '' && !reg.test(val)) {
          return {
            result: false,
            message: '请输入正确的手机号',
            type: 'error'
          }
        }
        return true
      }
    },
    {
      min: 11,
      message: '请输入正确的手机号',
      type: 'error'
    },
    {
      max: 11,
      message: '请输入正确的手机号',
      type: 'error'
    }
  ],
  email: [
    {
      required: true,
      type: 'error',
      trigger: 'blur',
      message: '请输入正确的邮箱号码'
    },
    {
      trigger: 'blur',
      validator: (val) => {
        const reg =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        if (!reg.test(val)) {
          return {
            result: false,
            message: '请输入正确的邮箱号码',
            type: 'error'
          }
        }
        return true
      }
    },
    {
      min: 6,
      message: '请输入正确的邮箱号码',
      type: 'error'
    },
    {
      max: 30,
      message: '请输入正确的邮箱号码',
      type: 'error'
    }
  ],
  realName: [
    // 调用次数校验
    {
      required: true,
      message: '请输入姓名',
      type: 'error',
      trigger: 'blur'
    }
  ]
}
defineExpose({
  onClickCloseBtn
})
</script>
<style lang="less" scoped>
.btn-submit {
  margin-left: 15.5px;
  width: 60px;
}

:deep(.t-dialog) {
  width: 687px;

  .t-dialog__body {
    padding-left: 23px;
  }
}

:deep(.t-form) {
  .fx {
    justify-content: space-between;

    .t-input {
      width: 212px;
    }

    .t-form-item__dataState {
      margin-right: 60px;
    }

    .t-form__label {
      text-align: right;
    }

    .t-form-item__sex {
      margin-right: 60px;
      .t-form__controls {
        width: 150px;
      }
    }
  }
}

.nickname {
  margin-right: 2px;
  z-index: 100;
  color: var(--color-bk4);
}

:deep(.t-textarea__limit) {
  color: var(--color-bk4);
  right: 10px;
}

.information {
  margin-left: 10px;
  font-weight: 400;
  font-size: 14px;
  color: var(--color-bk4);
}

.t-input {
  margin-bottom: 20px;
}
</style>
