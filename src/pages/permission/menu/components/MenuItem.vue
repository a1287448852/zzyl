<!-- 左侧菜单树形列表 -->
<template>
  <div
    :class="`menuItem ${isGrandSon ? 'isGrandSon' : ''} ${
      isChildren ? 'isChildren' : ''
    }`"
  >
    <div
      class="fx pt-rt z-1 pt"
      :class="{
        'bd-non':
          (isChildren
            ? isExpand
            : (pageDefalutOpenKey || defalutOpenKey) === listData.id) ||
          isChildren ||
          isGrandSon ||
          clickIndex - 1 === index
      }"
      @click.stop="
        activeHandle(
          listData.resourceNo,
          listData.children.length,
          isChildren || isGrandSon,
          listData.id
        )
      "
    >
      <div
        class="toggle icon"
        :class="`${listData.children.length ? 'show' : 'hidden'}`"
        @click.stop="handleClickExpand(listData)"
      >
        <t-icon
          name="chevron-right-circle"
          :class="{
            open: isChildren
              ? isExpand
              : (pageDefalutOpenKey || props.defalutOpenKey) === listData.id
          }"
        />
      </div>

      <!-- <div
        :class="`toggle ${
          (
            isChildren
              ? isExpand
              : (pageDefalutOpenKey || props.defalutOpenKey) === listData.id
          )
            ? 'up'
            : 'down'
        } ${listData.children.length ? 'show' : 'hidden'}`"
        @click.self.stop="handleClickExpand(listData)"
      ></div> -->
      <div class="flexName resourceName">
        {{ listData.resourceName }}
      </div>
      <div class="flexSort">{{ listData.sortNo }}</div>
      <div class="flexState">
        <span
          :class="`status-dot status-dot-${
            listData.dataState === '0' ? '1' : '0'
          }`"
          >{{ listData.dataState === '0' ? '启用' : '禁用' }}</span
        >
      </div>
      <div class="flexOperate">
        <span class="font-del btn-split-right" @click.stop="delHandle(listData)"
          >删除</span
        >
        <span
          :class="`${
            listData.dataState === '0' ? 'btn-dl' : ''
          } line btn-split-right font-bt`"
          @click.stop="disableHandle(listData)"
          >{{ listData.dataState === '0' ? '禁用' : '启用' }}</span
        >
        <span class="font-bt btn-split-right" @click.stop="editHandle(listData)"
          >编辑</span
        >
        <span class="font-bt" @click.stop="handleSearch()">查看</span>
      </div>
    </div>
    <div
      v-show="
        isChildren
          ? isExpand
          : (pageDefalutOpenKey || defalutOpenKey) === listData.id
      "
      :class="`child`"
    >
      <MenuItem
        v-for="(item, index) in listData.children"
        :key="index"
        :data="item"
        :isChildren="true"
        :isGrandSon="isChildren ? true : false"
        :defalutOpenKey="pageDefalutOpenKey"
        :active-index="pageaActiveIndex"
        @editHandle="editHandle"
        @active-handle="activeHandle"
        @delHandle="delHandle"
        @disableHandle="disableHandle"
        @handleClickExpand="handleClickExpand"
        @handleSearch="handleSearch"
      ></MenuItem>
    </div>
    <div
      v-show="pageaActiveIndex === listData.id"
      :class="`${activeIndex === listData.id ? 'active' : ''} activeRow ${
        isChildren || isGrandSon ? 'activeChildRow' : ''
      }`"
      :style="{ top: `0px` }"
    ></div>
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect, watch } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  },
  isChildren: {
    type: Boolean,
    default: false
  },
  isGrandSon: {
    type: Boolean,
    default: true
  },
  index: {
    type: Number
  },
  clickIndex: {
    type: Number
  },
  // 展开
  defalutOpenKey: {
    type: String
  },
  // active状态
  activeIndex: {
    type: String
  }
})
watch(
  () => props.activeIndex,
  (val) => {
    pageaActiveIndex.value = val
  }
)
watch(
  () => props.defalutOpenKey,
  (val) => {
    pageDefalutOpenKey.value = val
  }
)
const emit = defineEmits([
  'fetchData',
  'editHandle',
  'delHandle',
  'disableHandle',
  'activeHandle',
  'handleClickExpand'
])
const pageDefalutOpenKey = ref('')
const pageaActiveIndex = ref('') // 角色点击项
// const isNoDate = ref(false)
const isExpand = ref(false)
const listData = ref({} as any)

const handleClickExpand = (params) => {
  // 子元素直接走isExpand展开收起逻辑
  if (props.isChildren) {
    console.log(props.isChildren, isExpand.value, 'props.isChildren')
    isExpand.value = !isExpand.value

    // 最外层要实现互斥显示走pageDefalutOpenKey逻辑
  } else {
    emit(
      'handleClickExpand',
      params.id === (pageDefalutOpenKey.value || props.defalutOpenKey)
        ? ''
        : params,
      params.id === pageDefalutOpenKey.value ? '' : props.index
    )
  }
}

const activeHandle = (rowId, childLength, isChild, id) => {
  emit('activeHandle', rowId, childLength, isChild, id)
  pageaActiveIndex.value = id
}
const handleSearch = () => {
  return MessagePlugin.info('程序员小哥哥实现中')
}
const editHandle = (params) => {
  emit('editHandle', params)
}
const delHandle = (params) => {
  emit('delHandle', params)
}

const disableHandle = (params) => {
  emit('disableHandle', params)
}

watchEffect(() => {
  listData.value = props.data
  pageaActiveIndex.value = props.activeIndex
})
</script>

<style lang="less" scoped>
.flexSort {
  flex: 7%;
}
.flexState {
  flex: 25%;
}
.flexName {
  flex: 40%;
}
.flexOperate {
  flex: 45%;
}
.menuList {
  background-color: #f2f2f2;
  min-width: 392px;
  .menuItem {
    position: relative;
    .toggle.hidden {
      visibility: hidden;
    }
    .toggle.show {
      visibility: visible;
    }
  }
  .isChildren {
    .resourceName {
      position: relative;
      left: 20px;
      width: 150px;
    }
    .toggle {
      left: 40px !important;
      z-index: 999;
    }
  }
  .child {
    .menuItem.isChildren:last-child > div.fx {
      border-bottom: none !important;
    }
  }
  .isGrandSon {
    // padding-left: 20px;
  }
  .roleTable {
    min-height: 82vh;
    text-align: center;
    padding: 20px 0;
    line-height: 50px;
    .tabHead {
      font-weight: 500;
      color: #262626;
      border-bottom: solid 1px var(--color-border);
      .fx-1:last-child {
        text-align: left;
      }
    }
    .tabList {
      .fx {
        .fx-1:last-child {
          white-space: nowrap;
        }
        border-bottom: solid 1px var(--color-border);
        align-items: center;
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
        .toggle {
          position: relative;
          left: 20px;
          z-index: 9999;
        }
      }
      .font-del,
      .btn-split-right {
        margin-right: 7.5px;
        padding-right: 7.5px;
      }
    }
    .searchBox {
      width: 200px;
    }
    .activeRow {
      position: absolute;
      background-color: #fff;
      // border-radius: 8px 0 0 0px;
      width: calc(100% + 20px);
      height: 50px;
      right: -20;
      left: 0;

      .topTag,
      .botTag {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: #fff;
        top: -8px;
        right: 0;
        &::after {
          position: relative;
          content: '';
          display: block;
          width: 8px;
          height: 8px;
          border-radius: 0 0 8px 0;
          background-color: #fafafa;
        }
      }
      .topTag {
        &::after {
          background-color: #f2f2f2;
        }
      }
      .botTag {
        top: auto;
        bottom: -8px;
        &::after {
          border-radius: 0 8px 0 0;
        }
      }
    }
    // .activeChildRow {
    //   background-color: #fafafa;
    //   border-radius: 0;
    // }
  }
}
</style>
