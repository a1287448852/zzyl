<template>
  <div class="min-h serveProject bg-wt">
    <!-- 引入搜索组件 -->
    <SearchForm
      :searchData="pagination"
      @handleSearch="handleSearch"
      @handleClear="handleClear"
      @handleReset="handleReset"
    ></SearchForm>

      <!-- 引入表格组件 -->
      <TableList 
      :data="data" 
      :total="total"
      :pagination="pagination"
      @onChange="onChange"
      @handleBulid="handleBulid"
      @handleEdit="handleEdit"
      ></TableList>

      <!-- 引入弹窗组件 -->
      <DialogForm 
      ref="formRef"
      :visible="visible" 
      :data="baseFormData"
      :title="title"
      @handleClose="handleClose"
      @handleAdd="handleAdd"
      @handleEdit="handleEditForm"></DialogForm>
  </div>
</template>

<script setup lang="jsx">
import { ref,onMounted } from 'vue';
import { COLUMNS } from './constants'
import { getProjectList ,projectAdd,getProjectDetails,projectUpdate} from '@/api/serve'
import TableList from './components/TableList.vue'
import SearchForm from './components/SearchForm.vue'
import DialogForm from './components/DialogForm.vue'
import { MessagePlugin } from 'tdesign-vue-next'

const data = ref([]);
const total = ref(0);
const hover = ref(true);//鼠标悬停
const visible = ref(false)
const formRef = ref(null)
const baseFormData = ref({})
const title = ref('')

onMounted(()=>{
  getList()
})

const handleEditForm = async (val) =>{
  const res = await projectUpdate(val)
  if(res.code === 200){
    //提示，编辑成功
    MessagePlugin.success('编辑成功')
    getList()
    handleClose()
    formRef.value.handleClear()//调用子组件的方法，清理数据
  }else{
    MessagePlugin.error(res.msg);
  }
}

//编辑弹窗，回显数据
const handleEdit = (row) =>{

  title.value = '编辑'
 
  //调用查询一个的接口
  getDetails(row.id)

  //修改visible的值
  visible.value = true
  
}


const getDetails = async (id) => {
  const res = await getProjectDetails(id)
  baseFormData.value = res.data
}

//新增护理项目
const handleAdd = async (val) =>{
  const res = await projectAdd(val)
  if(res.code === 200){
    //提示，添加成功
    MessagePlugin.success('添加成功')
    getList()
    handleClose()
    formRef.value.handleClear()//调用子组件的方法，清理数据
  }else{
    MessagePlugin.error(res.msg);
  }
}

 //打开弹窗
const handleBulid = ()=>{
  title.value = '新增'
  visible.value=true
}
//关闭弹窗
const handleClose = () =>{
  visible.value=false
}


//调用接口返回数据
const getList = async () => {
  const res = await getProjectList(pagination.value)
  data.value = res.data.records;
  total.value = res.data.total
}

//分页变动触发
const onChange = (pageInfo) =>{
  pagination.value.pageNum=pageInfo.current
  pagination.value.pageSize=pageInfo.pageSize
  getList()
}

//判断当前数据是否包含小数点
const isDecimals = (val) => {
  if(String(val).indexOf('.') > -1){
    return true
  }
  return false
}

//参数
const pagination = ref({
  pageNum: 1,
  pageSize : 10
})


const handleRowClick = (e) => {
  console.log(e);
};

//搜索方法
const handleSearch = () =>{
    getList();
}

//清理方法
const handleClear =(val) =>{
  if(val === 'name'){
    delete pagination.value.name
  }else{
    delete pagination.value.status
  }
  getList();
}

//重置方法
const handleReset =() =>{
  pagination.value={
    pageNum: 1,
    pageSize : 10
  }
  getList();
}


</script>
