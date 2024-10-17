<template>
          <div class="baseList">
            <div class="newBox">
              <button class="bt wt-120" @click="handleBulid()">
                  新增护理项目
              </button>
          </div>
            <div class="tableBoxs">
              <t-table
              row-key="index"
              :data="data"
              :columns="COLUMNS"
              :hover="hover"
            >
            <!-- 序号处理 -->
            <template #rowIndex="{rowIndex}">{{ rowIndex+1 }}</template>
  
            <!-- 是否包含小数点 -->
            <template #price="{row}">{{ isDecimals(row.price)? row.price : row.price+'.00' }}</template>
  
            <!-- 图片处理 -->
            <template #image="{row}">
              <div class="tdesign-demo-image-viewer__base">
              <t-image-viewer :images="[row.image]">
                <template #trigger="{ open }">
                  <div class="tdesign-demo-image-viewer__ui-image">
                    <img alt="test" :src="row.image" class="tdesign-demo-image-viewer__ui-image--img" />
                    <div class="tdesign-demo-image-viewer__ui-image--hover" @click="open">
                      <span><BrowseIcon size="1.4em" /> 预览</span>
                    </div>
                  </div>
                </template>
              </t-image-viewer>
            </div>
            </template>
  
            <!-- 按钮展示 -->
            <template #op="{row}">
              <div class="operateCon">
                <a 
                class="btn-dl"
                >删除</a>
                <a 
                class="font-bt" @click="handleEdit(row)"
                >编辑</a>
                <a 
                class="delete"
                >禁用</a>
            </div>
            </template>
            </t-table>
            <t-pagination
              v-if="total > 10"
              v-model="pagination.pageNum"
              v-model:pageSize="pagination.pageSize"
              :total="total"
              @change="onChange"
            />
            </div>
          </div>
  </template>
  
  <script setup lang="jsx">
  import { ref,onMounted } from 'vue';
  import { COLUMNS } from '../constants'
  
  const hover = ref(true);//鼠标悬停

  //接收父组件的属性
  const props = defineProps({
    data:{
        type:Object,
        default:()=>({})
    },
    total:Number,
    pagination:{
        type:Object,
        default:()=>({})
    }
  })

  //声明父组件的方法
  const emits = defineEmits(['onChange','handleBulid','handleEdit'])
  //调用页码变动方法
  const onChange = (pageInfo) =>{
    emits('onChange',pageInfo)
  }

  //打开弹窗
  const handleBulid = ()=>{
    emits('handleBulid')
  }

  //编辑
  const handleEdit = (row) =>{
    emits('handleEdit',row)
  }
  
  
  //判断当前数据是否包含小数点
  const isDecimals = (val) => {
    if(String(val).indexOf('.') > -1){
      return true
    }
    return false
  }

  
  </script>
  