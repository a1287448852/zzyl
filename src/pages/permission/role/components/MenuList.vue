<!-- 基础表格组件 -->
<template>
  <div class="menuCont">
    <div
      v-for="item in data.filter(
        (n) => n.resourceType === 'm' || n.resourceType === 'c'
      )"
      :key="item.resourceNo"
      class="menuContContent"
    >
      <div class="treeRow fx">
        <div class="icon" @click="openAllOption(item)">
          <t-icon
            name="chevron-right-circle"
            :class="{ open: defaultOpenKey.includes(item.resourceNo) }"
          />
        </div>
        <div class="fx-1">
          <div>{{ item.resourceName }}</div>
          <div
            v-show="defaultOpenKey.includes(item.resourceNo)"
            class="cont"
            :class="item.children.length > 3 ? 'active' : ''"
          >
            <!-- {{ getCheckList(item) }} -->

            <!-- <t-checkbox
              v-if="item.children.some((n) => n.resourceType === 'r')"
              key="all"
              class="btnCheckbox"
              :check-all="true"
              label="全选"
              :disabled="!pageType"
            /> -->
            <t-checkbox
              v-for="it in item.children.filter((n) => n.resourceType === 'r')"
              :key="it.resourceNo"
              v-model="it.checkbox"
              class="btnCheckbox"
              :disabled="!pageType"
              @change="handleCheckAllChange({ val: it, checked: $event })"
              >{{ it.resourceName }}</t-checkbox
            >
            <span
              v-if="item.children.every((n) => n.resourceType !== 'r')"
              class="noBut"
            >
              暂无按钮！
            </span>
          </div>
        </div>
        <div>
          <t-checkbox
            :key="item.checkbox"
            v-model="item.checkbox"
            :disabled="!pageType"
            :indeterminate="item.isIndeterminate"
            @change="handleCheckAllChange({ val: item, checked: $event })"
          ></t-checkbox>
        </div>
      </div>

      <div
        v-show="defaultMenuOpenKey.includes(item.resourceNo)"
        class="childCont"
      >
        <MenuList
          :type="type"
          :data="item.children"
          :defaultData="defaultData"
        ></MenuList>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const props = defineProps({
  data: {
    type: Array<any>,
    default: () => {
      return []
    }
  },
  isChildren: {
    type: Boolean,
    default: false
  },
  type: {
    type: String
  },
  defaultData: {
    type: Array<any>,
    default: () => {
      return []
    }
  }
})

watch(
  () => props.defaultData,
  (val) => {
    checkList.value = val || []
  },
  { deep: true }
)
watch(
  () => props.type,
  (val) => {
    pageType.value = val
  }
)

const pageType = ref('') as any
const defaultOpenKey = ref([]) as any // 默认展开选项

// 所有展开
const openAllOption = (row) => {
  defaultOpenKey.value = defaultOpenKey.value.includes(row.resourceNo)
    ? []
    : [row.resourceNo]
  if (row.children.length > 0) {
    defaultMenuOpenKey.value = defaultMenuOpenKey.value.includes(row.resourceNo)
      ? []
      : [row.resourceNo]
  }
}
const defaultMenuOpenKey = ref([]) as any // 默认展开菜单选项
const checkList = ref([]) as any
const handleCheckAllChange = (data) => {
  console.log(data, 'data')
  const { val, checked } = data
  if (val.resourceType === 'r' && !checked) {
    // 处理本集
    val.checkbox = checked
    return
  }
  // 处理本集
  val.checkbox = checked
  if (val.children.length > 0) {
    // 处理子集
    findChildren(
      [findObjectByResourceNo(userStore.menuListdata, val.resourceNo)],
      checked
    )
  }

  if (val.parentResourceNo !== 100001000000000) {
    // 处理上集
    findParent(userStore.menuListdata, val.parentResourceNo)
  }
  val.isIndeterminate = false

  console.log(userStore.menuListdata, '??????')
}
// 递归根据resourceNo返回该对象
const findObjectByResourceNo = (arr, resourceNo) => {
  for (const item of arr) {
    if (item.resourceNo === resourceNo) {
      return item
    }

    if (item.children && item.children.length > 0) {
      const foundObject = findObjectByResourceNo(item.children, resourceNo)
      if (foundObject) {
        return foundObject
      }
    }
  }

  return null // 如果未找到匹配的项
}
// 设置上集
const findParent = (list, parentId) => {
  list.forEach((k) => {
    handleList(k, parentId)
  })
}
const handleList = (child, parentId) => {
  let parentCheckedLength = 0
  let parentIndeterminateLength = 0
  if (child.resourceNo === parentId) {
    child.children.forEach((children) => {
      if (children.isIndeterminate) {
        parentIndeterminateLength++
      } else if (children.checkbox) {
        parentCheckedLength++
      }
    })

    child.checkbox = parentCheckedLength === child.children.length
    child.isIndeterminate =
      (parentIndeterminateLength > 0 || parentCheckedLength > 0) &&
      parentCheckedLength < child.children.length
    if (child.parentResourceNo !== 100001000000000) {
      findParent(userStore.menuListdata, child.parentResourceNo)
    }
  } else if (child?.children?.length > 0) {
    findParent(child.children, parentId)
  }
}
// 设置子集
const findChildren = (list, checked) => {
  console.log(list, checked, '?????')
  list.forEach((child) => {
    child.checkbox = checked
    child.isIndeterminate = false
    if (child.children.length > 0) {
      findChildren(child.children, checked)
    }
  })
}
</script>

<style lang="less" scoped>
.menuCont {
  .treeRow {
    line-height: 50px;
    border-bottom: solid 1px var(--color-border);
    .icon {
      width: 30px;
      font-size: 16px;
      color: var(--color-bk4);
      transform: rotate(0deg);
      cursor: pointer;
    }
    .arrow {
      width: 20px;
      height: 20px;
      position: relative;
      top: 5px;
    }
    .open {
      transform: rotate(90deg);
    }
    .noBut {
      color: var(--color-bk3);
    }
  }
  .childCont {
    margin-left: 20px;
  }
  :deep(.t-checkbox-group) {
    flex-direction: column;
    width: 100%;
  }
  :deep(.cont .t-checkbox-group) {
    flex-direction: row;
    width: 100%;
    // border-bottom: ;
  }
  :deep(.btnCheckbox) {
    margin-right: 16px;
  }
  .cont.active {
    padding-bottom: 20px;
  }
}
</style>
