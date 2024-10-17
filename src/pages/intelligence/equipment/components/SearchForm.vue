<!-- 搜索框区域 -->
<template>
  <div class="formBox">
    <t-form ref="form" :model="searchData" :label-width="68">
      <t-row>
        <t-col>
          <t-form-item label="设备名称：" name="deviceName">
            <t-input
              v-model="searchData.deviceName"
              class="form-item-content"
              type="search"
              placeholder="请输入"
              clearable
              @clear="handleClear('deviceName')"
            />
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="所属产品：" name="productKey">
            <t-select
              v-model="searchData.productKey"
              filterable
              clearable
              placeholder="请选择"
              @clear="handleClear('productKey')"
            >
              <t-option
                v-for="(item, index) in productData"
                :key="index"
                :value="item.productKey"
                :label="item.productName"
                title=""
              ></t-option>
            </t-select>
          </t-form-item>
        </t-col>
        <t-col>
          <t-form-item label="设备类型：" name="locationType">
            <t-select
              v-model="searchData.locationType"
              filterable
              clearable
              placeholder="请选择"
              @clear="handleClear('locationType')"
            >
              <t-option
                v-for="(item, index) in cutInData"
                :key="index"
                :value="item.id"
                :label="item.value"
                title=""
              ></t-option>
            </t-select>
          </t-form-item>
        </t-col>
        <!-- 按钮区域 -->
        <t-col class="searchBtn">
          <button type="button" class="bt-grey wt-60" @click="handleReset()">
            重置
          </button>
          <button type="button" class="bt wt-60" @click="handleSearch()">
            搜索
          </button>
        </t-col>
      </t-row>
    </t-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { cutInData } from '@/utils/commonData'
// 获取父组件值、方法
const props = defineProps({
  // 搜索对象
  searchData: {
    type: Object,
    default: () => ({})
  },
  // 所属产品
  productData: {
    type: Array,
    default: () => []
  }
})
// 触发父组件的方法
const emit: Function = defineEmits([
  'handleReset',
  'handleSearch',
  'handleClear'
])
const form = ref(null)
// 搜索表单
const handleSearch = () => {
  emit('handleSearch')
}
// 重置表单
const handleReset = () => {
  form.value.reset()
  emit('handleReset')
}
// 清空
const handleClear = (v) => {
  emit('handleClear', v)
}
</script>
