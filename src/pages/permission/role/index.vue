<!-- 权限管理 - 角色管理 -->
<template>
  <div class="roleAdmin min-h fx">
    <!-- 角色列表模块 - start -->
    <RoleList ref="childRole" @clickRow="getRowId" />
    <!-- 角色列表模块 - end -->
    <!-- 角色对应的权限模块 - start -->
    <div class="permissionCont pd-box">
      <div class="head fx fx-sb">
        <div class="menuTitle">菜单权限</div>
        <!-- <t-space direction="vertical">
          <t-radio-group
            v-model="activeInd"
            variant="default-filled"
            default-value="1"
            @change="handleChange"
          >
            <t-radio-button value="1">菜单权限</t-radio-button>
            <t-radio-button value="2">数据权限</t-radio-button>
          </t-radio-group>
        </t-space> -->
        <div class="btnContent">
          <button
            v-show="type === 'edit'"
            theme="primary"
            type="submit"
            class="bt-grey wt-60"
            @click="handleClose"
          >
            <span>取消</span>
          </button>
          <div class="bt" @click="subPermissionData">
            {{ !type ? '编辑' : '保存' }}
          </div>
        </div>
      </div>
      <!-- 菜单权限 - start -->
      <div v-show="activeInd === '1'">
        <MenuList
          :key="random"
          :data="MenulistData"
          :defaultData="menuPmParams.checkedResourceNos"
          :type="type"
        ></MenuList>
      </div>
      <!-- 菜单权限 - end -->
      <!-- 数据权限 - start -->
      <div v-show="activeInd === '2'">
        <div class="dataPmCont fx">
          <div class="title">数据范围：</div>
          <t-radio-group
            v-model="dataPmParams.dataScope"
            default-value="1"
            :disabled="!type"
            @change="dataPmChange"
          >
            <t-radio value="4">全部</t-radio>
            <t-radio value="3">本级及子级</t-radio>
            <t-radio value="2">本级</t-radio>
            <t-radio value="1">个人</t-radio>
            <t-radio value="0">自定义</t-radio>
          </t-radio-group>
        </div>
        <div v-show="dataPmParams.dataScope === '0'" class="dataPmTree fx">
          <div class="label">组织：</div>
          <t-tree
            v-model="dataPmParams.checkedDeptNos"
            :data="MenuTreeData"
            expand-all
            checkable
            :disabled="!type"
          />
        </div>
      </div>
      <!-- 数据权限 - end -->
    </div>
    <!-- 角色对应的权限模块 - end -->
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeMount } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import { getMenuList, editRolesAll, getMenuByRole } from '@/api/permission'
import RoleList from './components/RoleList.vue' // 菜单列表组件
import MenuList from './components/MenuList.vue' // 菜单列表组件
import { useUserStore } from '@/store'

const userStore = useUserStore()
// 生命周期
onBeforeMount(() => {
  getMenuListData()
})

const childRole = ref(null)
const type = ref('')
const MenuTreeData = ref([]) // 将菜单部门分离报错
const activeInd = ref('1')
const dataLoading = ref(false)
// 获取菜单列表数据
const MenulistData = ref([])

const beforeTranslateMenulistData = ref([] as any)
const getMenuListData = async () => {
  dataLoading.value = true
  getMenuList()
    .then((res) => {
      dataLoading.value = false
      if (res.code === 200) {
        beforeTranslateMenulistData.value = res.data
        childRole.value.fetchData()
        console.log(
          MenulistData.value,
          userStore.menuListdata,
          '获取菜单平铺数据'
        )
      } else {
        MessagePlugin.error(res.msg)
      }
    })
    .catch(() => {
      dataLoading.value = false
    })
}
// 初始化设置半选状态
const setTreeIndeterminateStatus = (data: any) => {
  data?.forEach((v: any) => {
    let parentCheckedLength = 0
    let parentIndeterminateLength = 0

    // 菜单回选
    v.children.forEach((children: any) => {
      if (children.isIndeterminate) {
        parentIndeterminateLength++
      } else if (children.checkbox) {
        parentCheckedLength++
      }
    })
    v.isIndeterminate =
      (parentIndeterminateLength > 0 || parentCheckedLength > 0) &&
      parentCheckedLength < v.children.length
    if (v.children && v.children.length) {
      setTreeIndeterminateStatus(v.children)
    }
  })
}
const handleChange = () => {
  // 如果处于编辑状态切换tab则重置数据
  if (type.value === 'edit') {
    menuPmParams.checkedResourceNos = currentData.value.checkedResourceNos || []
    dataPmParams.dataScope = currentData.value.dataScope
    dataPmParams.checkedDeptNos = currentData.value.checkedDeptNos || []
  }
  type.value = ''
}
const currentData = ref()
const random = ref(0)
const getRowId = (params) => {
  console.log(params, 'params')
  getMenuByRole(params.id).then((res) => {
    type.value = ''
    menuPmParams.id = params.id
    menuPmParams.checkedResourceNos = res.data || []
    currentData.value = res.data || []
    random.value = Math.random()
    MenulistData.value = treeData(beforeTranslateMenulistData.value)
    // 整理数据并赋值半选状态isIndeterminate
    setTreeIndeterminateStatus(MenulistData.value)
    // 第一遍递归时无法处理子元素只有一个且是选中效果的情况
    setTreeIndeterminateStatus(MenulistData.value)
    userStore.setMenuListdata([...MenulistData.value])
  })
}
// 列表数据处理为树
const treeData = (items) => {
  const result = [] // 结果集
  const itemMap = {}
  // 先转成map存储
  for (const item of items) {
    itemMap[item.resourceNo] = {
      ...item,
      children: [],
      checkbox:
        menuPmParams.checkedResourceNos.findIndex(
          (item1) => item1 === item.resourceNo
        ) !== -1
    }
  }
  for (const item of items) {
    const { resourceNo, parentResourceNo } = item
    const treeItem = itemMap[resourceNo]

    if (
      parentResourceNo === 100000000000000 ||
      parentResourceNo === '100000000000000'
    ) {
      result.push(treeItem)
    } else {
      if (!itemMap[parentResourceNo]) {
        itemMap[parentResourceNo] = { children: [] }
      }
      if (
        // 筛选掉被禁用的数据
        item.dataState === '0'
      ) {
        itemMap[parentResourceNo].children.push({
          ...treeItem,
          btnList: treeItem.children
            .filter((n) => n.resourceType === 'r')
            .map((item) => item.resourceNo)
        })
      }
    }
  }
  return result[0]?.children
}

// 保存菜单权限 - 参数
const menuPmParams = reactive({
  id: NaN,
  checkedResourceNos: [] as any
})

// 保存数据权限 - 参数
const dataPmParams = reactive({
  id: NaN,
  dataScope: '',
  checkedDeptNos: []
})
// 数据权限数据处理 - 数据交互
const dataPmChange = (val) => {
  dataPmParams.dataScope = val
}

// 取消编辑状态
const handleClose = () => {
  type.value = ''
  getRowId(menuPmParams)
}
// 将数据中的checked数据对应的resourceNo取出来
const filterMenuData = (data: any) => {
  let result = [] as any
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (item.checkbox || item.isIndeterminate) {
      result.push(item.resourceNo)
    }
    if (item.children.length > 0) {
      result = result.concat(filterMenuData(item.children))
    }
  }
  return result
}
// 权限数据的保存 - 点击保存按钮
const subPermissionData = async () => {
  if (!type.value) {
    type.value = 'edit'
    return
  }
  // 数据权限和菜单权限数据处理 - 提交
  if (activeInd.value === '1') {
    menuPmParams.checkedResourceNos = filterMenuData(userStore.menuListdata)
    editRolesAll(menuPmParams).then((res) => {
      if (res.code === 200) {
        MessagePlugin.success(res.msg)
        type.value = ''
        childRole.value.fetchData()
      }
    })
  } else {
    if (!dataPmParams.checkedDeptNos.length) {
      MessagePlugin.error('请选择组织')
      return
    }
    editRolesAll(dataPmParams).then((res) => {
      if (res.code === 200) {
        MessagePlugin.success(res.msg)
        type.value = ''
        childRole.value.fetchData()
      }
    })
  }
}
</script>

<style lang="less" scoped>
.roleAdmin {
  height: 770px;
  .permissionCont {
    background-color: #fff;
    overflow-y: scroll;
    .btnContent {
      display: flex;
      .bt-grey {
        margin-right: 20px;
      }
    }
    flex: 2;
    .head {
      padding-bottom: 20px;
      border-bottom: solid 1px var(--color-border);
      .menuTitle {
        // padding: 20px;
        padding-top: 10px;
        font-size: 16px;
      }
    }
    .bt {
      width: 60px;
    }
    .dataPmCont {
      margin-top: 30px;
      .title {
        position: relative;
        top: 1px;
        padding-right: 10px;
      }
    }
    .dataPmTree {
      position: relative;
      padding: 40px 0 0 84px;
      .label {
        position: relative;
        line-height: 35px;
      }
    }
  }

  :deep(.t-pagination) {
    justify-content: center;
    padding-bottom: 40px;
  }
}
</style>
