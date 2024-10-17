<!-- tab栏切换组件 -->
<template>
  <div class="headBox">
    <div class="sw-box" :class="routeType === 'config' ? 'configTpye' : ''">
      <div
        v-for="(item, index) in data"
        :key="index"
        :class="{ title: true, line: currentId == index }"
        @click.stop="changeId(item.id, index)"
      >
        <span class="content">
          <span
            class="name"
            :class="userStore.unusualFloorId.includes(item.id) ? 'unusual' : ''"
          >
            {{ item.name }}
          </span>
        </span>

        <span v-if="item.value" class="value">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '@/store'
// 父组件传值
const props = defineProps({
  data: {
    type: Array<any>,
    default: []
  },
  routeType: {
    type: String,
    default: null
  },
  bedSelectData: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// 触发父组件事件
const emit: Function = defineEmits(['changeId', 'handleFloorEdit'])
// 当前选中id
const currentId = ref(0)
const isTabCheck = ref(false)
const userStore = useUserStore()
// 点击切换
const changeId = (id, i) => {
  isTabCheck.value = true
  currentId.value = i
  emit('changeId', id, i, true)
}
watch(
  () => props.data,
  (val) => {
    console.log(val, '============')
  }
)
// 传给父级
defineExpose({
  currentId
})
</script>
<style lang="less" scoped>
.content {
  position: relative;
}
.unusual::after {
  display: inline-block;
  content: '';
  background-color: #e34d59;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  position: absolute;
  top: 0;
  right: -12px;
}
.headBox {
  padding-right: 0;
}
.value {
  margin-left: 5px;
}
</style>
