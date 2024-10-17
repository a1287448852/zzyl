<template>
    <div class="formBox">
        <t-form :model="searchData">
            <t-row>
                <t-col>
                    <t-form-item label="护理项目名称：" name="name" initial-data="TDesign">
                        <t-input clearable v-model="searchData.name" placeholder="请输入内容" @clear="handleClear('name')" />
                    </t-form-item>
                </t-col>
                <t-col>
                    <t-form-item label="状态：" name="tel" initial-data="123456">
                        <t-select v-model="searchData.status" placeholder="请输入内容" clearable @clear="handleClear('status')" >
                            <t-option v-for="(item,index) in statusData" :key="index" :label="item.value" :value="item.id" />
                        </t-select>
                    </t-form-item>
                </t-col>
                <t-col class="searchBtn">
                    <button type="button" class="bt-grey wt-60" @click="handleReset()">重置</button>
                    <button type="button" class="bt wt-60" @click="handleSearch()">搜索</button>
                </t-col>
            </t-row>
        </t-form>
    </div>
  </template>

<script setup lang="ts">

import { ref } from 'vue'
import { statusData } from '@/utils/commonData'

//接收父组件的属性
const props = defineProps({
    searchData:{
        type:Object,
        default:()=>({})
    }
})

//声明父组件的方法
const emits = defineEmits(['handleSearch','handleClear','handleReset'])

//定义属性，表单的数据对象
// const searchData = ref({})

//搜索方法
const handleSearch = () =>{
    emits('handleSearch')
}

//清理方法
const handleClear =(val) =>{
    emits('handleClear',val)
}

//重置方法
const handleReset =() =>{
    emits('handleReset')
}

</script>