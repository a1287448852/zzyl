<!-- 详情 -->
<template>
  <!-- 表单页 -->
  <div class="apply detail-base checkInDetail">
    <div class="bg-wt min-steph height">
      <div v-if="checkinId === ''" class="dialog-form cleckInForm">
        <t-form ref="form" :data="formData" :rules="rules" :label-width="135">
          <!-- 基本信息 -->
          <ApplyForm
            ref="applyForm"
            :formData="formData"
            @getUpdateImg="getUpdateImg"
            @handleCardNo="handleCardNo"
            @handlePhone="handlePhone"
          ></ApplyForm>
          <!-- end -->
          <!-- 家属信息 -->
          <Family ref="family" @setFamily="setFamily"></Family>
          <!-- end -->
          <!-- 入住配置 -->
          <ConfigurationForm
            ref="config"
            :formData="formData"
            :floorData="floorData"
            @setBedId="setBedId"
            @textBlurPrice="textBlurPrice"
            @handleNursing="handleNursing"
          ></ConfigurationForm>
          <!-- end -->
          <!-- 签约办理 -->
          <TransactForm
            ref="transactForm"
            :formData="formData"
            @getContractPdf="getContractPdf"
            @handlePhone="handleContractPhone"
          ></TransactForm>
          <!-- end -->
        </t-form>
      </div>
      <!-- 详情显示 -->
      <div v-else>
        <ApplyBase :baseData="baseData.checkInElderVo"></ApplyBase>
        <baseFamily :baseData="baseData.elderFamilyVoList"></baseFamily>
        <ApplyConfigBase :baseData="baseData.checkInConfigVo"></ApplyConfigBase>
        <SignBaseInfo
          :baseData="baseData.checkInContractVo"
          :elderVo="baseData.checkInElderVo"
        ></SignBaseInfo>
      </div>
      <!-- end -->
    </div>
  </div>
  <!-- end -->
  <!-- 底部 -->
  <div class="boxBottom fx fx-ct bg-wt">
    <button class="bt-grey wt-60" @click="handleReturn">返回</button>
    <button
      v-if="checkinId === ''"
      theme="primary"
      class="bt wt-60"
      @click="handleSub"
    >
      提交
    </button>
    <button theme="primary" class="bt wt-88" @click="handleBill">
      账单预览
    </button>
  </div>
  <!-- end -->
  <!-- 账单预览弹层 -->
  <BillDetails
    :visible="billVisible"
    :form-data="formData"
    :base-data="baseData"
    @handleClose="handleClose"
  ></BillDetails>
  <!-- end -->
</template>
<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { MessagePlugin } from 'tdesign-vue-next'
import { useUserStore } from '@/store'
import {
  isCardID,
  getBirthday,
  validateIdentityNum,
  validatePhone
} from '@/utils/validate'

import { getStartTime, getEndTime, getTateDt } from '@/utils/date'
import type { FormCheck } from '@/api/model/checkInModel'
// 接口
import { getAllBedStatus } from '@/api/liveIn'
import { addCheckIn, checkInDetail } from '@/api/checkin'
// 组件
// 基本信息
import ApplyForm from './components/ApplyForm.vue'
// 家属信息
import Family from './components/family.vue'
// 入住配置
import ConfigurationForm from './components/ConfigurationForm.vue'
// 签约办理
import TransactForm from './components/TransactForm.vue'
// 账单预览
import BillDetails from './components/BillDetails.vue'
// 查看详情
import ApplyBase from './components/ApplyBase.vue'
// 配置详情
import ApplyConfigBase from './components/ApplyConfigBase.vue'
// 家属信息
import baseFamily from './components/baseFamily.vue'
// 合同详情
import SignBaseInfo from './components/SignBaseInfo.vue'
// ------定义变量------
const route = useRoute() // 获取局部
const router = useRouter() // 获取全局
const userStore = useUserStore() // 储存器
const form = ref(null) // 申请表单的ref
const footFlex = ref(false) // 定位底部提交按钮
const applyForm = ref(null) // 申请表单的ref
const config = ref(null) // 配置ref
const transactForm = ref(null) // 签约办理ref
const rules = ref({}) // 表单校验
const billVisible = ref(false) // 账单预览弹层
const family = ref(null) // 家属信息ref
const familyUserData = ref([]) // 家属信息
const isFull = ref(false) // 家属信息是否填写完整
const floorData = ref([]) // 楼层信息
const checkinId = ref('') // 入住id
const baseData = ref<Object | any>({
  checkInConfigVo: {},
  checkInContractVo: {},
  checkInElderVo: {},
  elderFamilyVoList: []
}) // 入住详情
// 表单数据
const formData = ref<Object | any>({
  checkInElderDto: {},
  depositAmount: '3000.00',
  signDate: new Date()
})
const isChick = ref(false) // 是否触发了提交按钮，触发3秒后才可以再次触发
// 生命周期
onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', scrollToTop, true) // 添加页面滚动事件
  })
  rules.value = {
    ...applyForm.value.rules,
    ...config.value.rules,
    ...transactForm.value.rules
  }
  if (route.query.id) {
    checkinId.value = route.query.id
    getCheckInDetail(checkinId.value)
  }
  getAllFloorList() // 获取楼层，房间床位
})
// ------定义方法------
// 滚动事件，控制底部按钮距离底部的高度
const scrollToTop = (e) => {
  e.stopPropagation()
  if (e.target.className === 't-layout czri-layout') {
    const { scrollTop, clientHeight, scrollHeight } = e.target
    if (scrollTop + clientHeight === scrollHeight) {
      footFlex.value = true
    } else {
      footFlex.value = false
    }
  }
}
// 获取详情
const getCheckInDetail = async (id) => {
  await checkInDetail(id).then((res) => {
    if (res.code === 200) {
      baseData.value = res.data
      // 年龄需要前端算
      baseData.value.checkInElderVo.age = getBirthday(
        baseData.value.checkInElderVo.idCardNo
      ).age
    }
  })
}
// 获取照片
const getUpdateImg = (url, val) => {
  console.log(url)
  if (val === 1) {
    formData.value.oneInchPhoto = url
  } else if (val === 2) {
    formData.value.idCardPortraitImg = url
  } else {
    formData.value.idCardNationalEmblemImg = url
  }
}
// 获取性别、出生日期和年龄
const handleCardNo = () => {
  const data = getBirthday(formData.value.idCardNo)
  const isCard = isCardID(formData.value.idCardNo)
  if (isCard) {
    formData.value.sex = data.sex
    formData.value.birthday = data.birthday
    formData.value.age = data.age
  }
}
// 手机号校验
const handlePhone = (val) => {
  const isNumber = validateIdentityNum(val)
  // console.log(isNumber)
  if (!isNumber) {
    formData.value.phone = ''
  }
}
// 合同手机号校验
const handleContractPhone = (val) => {
  const isNumber = validateIdentityNum(val)
  if (!isNumber) {
    formData.value.memberPhone = ''
  }
}
// 配置
// 监听课程价格
const textBlurPrice = (val, num) => {
  let data = null
  if (num === 1) {
    data = Number(formData.value.nursingCost)
    formData.value.nursingCost = data < 0 ? '0.00' : formData.value.nursingCost
  } else if (num === 2) {
    data = Number(formData.value.bedCost)
    formData.value.bedCost = data < 0 ? '0.00' : formData.value.bedCost
  } else if (num === 3) {
    data = Number(formData.value.otherCost)
    formData.value.otherCost = data < 0 ? '0.00' : formData.value.otherCost
  } else if (num === 4) {
    data = Number(formData.value.medicalInsurancePayment)
    formData.value.medicalInsurancePayment =
      data < 0 ? '0.00' : formData.value.medicalInsurancePayment
  } else {
    data = Number(formData.value.governmentSubsidy)
    formData.value.governmentSubsidy =
      data < 0 ? '0.00' : formData.value.governmentSubsidy
  }
}
// 选择护理等级显示护理费用
const handleNursing = (val, data) => {
  formData.value.nursingLevelName = val.label
  if (val !== undefined) {
    const obj = data.find((item) => item.id === val.value)
    formData.value.nursingCost = obj.fee
    formData.value.fee = obj.fee
  } else {
    formData.value.nursingCost = ''
    formData.value.fee = ''
  }
}
// 获取床位id
const setBedId = (val, obj) => {
  formData.value.bedId = val
  floorData.value.forEach((ele) => {
    ele.children.forEach((room) => {
      if (room.floorId === ele.id && room.id === obj.roomId) {
        formData.value.floorName = ele.name
        formData.value.floorId = ele.id
        formData.value.bedCost = room.price
        formData.value.price = room.price
        formData.value.code = room.code
        formData.value.roomId = room.id
      }
    })
  })
}
// 完成签约办理
// 获取合同文件链接
const getContractPdf = (url) => {
  formData.value.pdfUrl = url
}
// 账单预览
const handleBill = () => {
  billVisible.value = true
}
// 关闭账单预览
const handleClose = () => {
  billVisible.value = false
}
// 设置家属信息
const setFamily = (val, bool) => {
  familyUserData.value = val
  isFull.value = bool
}
// 获取楼层，房间床位
// 获取楼层数据，因为有重复的id，所以把id做了特殊处理分别加了f\r\b
const getAllFloorList = async () => {
  const res: any = await getAllBedStatus(0)
  if (res.code === 200) {
    floorData.value = res.data
    // 筛选出有房间的楼层
    floorData.value.forEach((ele, i) => {
      ele.code = ele.name
      ele.ids = `f${ele.id}`
      // 需要把没有房间的数据过略掉
      if (ele.roomVoList.length === 0) {
        floorData.value.splice(i, 1)
      } else {
        ele.children = ele.roomVoList
        ele.children.forEach((val) => {
          val.ids = `r${val.id}`
          // 筛选出有房间的楼层
          if (val.bedVoList.length === 0) {
            // 需要把有房间没有床位的数据过略掉
            floorData.value.splice(i, 1)
          } else {
            val.children = val.bedVoList
            val.children.forEach((obj) => {
              obj.ids = `b${obj.id}`
              obj.code = obj.bedNumber
            })
          }
        })
      }
    })
  }
}
const handleIsChick = () => {
  setTimeout(() => {
    isChick.value = false
    clearTimeout()
  }, 3000)
}
const firstError = ref([])
// 提交
const handleSub = () => {
  if (isChick.value) {
    return false
  }
  // 家属信息校验
  family.value.tableRef.validateTableData().then((params) => {
    const cellKeys = Object.keys(params.result)
    firstError.value = params.result[cellKeys[0]]
    if (firstError.value) {
      isFull.value = false
      // const data = []
      // cellKeys.forEach((ele) => {
      //   console.log(ele)
      //   const index = ele.indexOf('__refId')
      //   const result = ele.substring(0, index)
      //   family.value.familyUserData.forEach((val) => {
      //     if (result === val.key) {
      //       val.kinship = ''
      //     }
      //   })
      // })
      // console.log(data)
      handleIsChick()
      MessagePlugin.error('家属信息为空，请重新输入')
    } else {
      isFull.value = true
      familyUserData.value = family.value.familyUserData
      handleIsChick()
    }
  })
  // 表单校验
  form.value.validate().then(async (valid) => {
    // 查询数据有没有填写完整
    const formOjb = formData.value
    const datas = {
      checkInElderDto: {
        oneInchPhoto: formOjb.oneInchPhoto,
        idCardPortraitImg: formOjb.idCardPortraitImg,
        idCardNationalEmblemImg: formOjb.idCardNationalEmblemImg,
        address: formOjb.address,
        age: formOjb.age,
        birthday: formOjb.birthday,
        idCardNo: formOjb.idCardNo,
        name: formOjb.name,
        phone: formOjb.phone,
        sex: formOjb.sex
      },
      elderFamilyDtoList: familyUserData.value,
      checkInContractDto: {
        name: formOjb.contractName,
        signDate: getTateDt(formOjb.signDate),
        memberName: formOjb.memberName,
        memberPhone: formOjb.memberPhone,
        pdfUrl: formOjb.pdfUrl
      },
      checkInConfigDto: {
        bedCost: formOjb.bedCost,
        bedId: formOjb.bedId,
        checkInStartTime: getStartTime(formOjb.checkInTime[0]),
        checkInEndTime: getEndTime(formOjb.checkInTime[1]),
        code: formOjb.code,
        roomId: formOjb.roomId,
        floorId: formOjb.floorId,
        floorName: formOjb.floorName,
        costStartTime: getStartTime(formOjb.costTime[0]),
        costEndTime: getEndTime(formOjb.costTime[1]),
        depositAmount: formOjb.depositAmount,
        governmentSubsidy: formOjb.governmentSubsidy
          ? formOjb.governmentSubsidy
          : 0,
        medicalInsurancePayment: formOjb.medicalInsurancePayment
          ? formOjb.medicalInsurancePayment
          : 0,
        nursingCost: formOjb.nursingCost,
        nursingLevelId: formOjb.nursingLevelId,
        nursingLevelName: formOjb.nursingLevelName,
        otherCost: formOjb.otherCost ? formOjb.otherCost : 0
      }
    }
    if (formOjb.memberPhone) {
      const phone = validatePhone(formData.value.memberPhone)
      if (!phone) {
        MessagePlugin.error('丙方联系方式错误，请重新输入')
        handleIsChick()
        isFull.value = true
        return false
      }
    }
    if (valid === true && isFull.value) {
      isChick.value = true
      isFull.value = true
      await addCheckIn(datas).then((res) => {
        if (res.code === 200) {
          handleIsChick()
          MessagePlugin.success('添加成功')
          router.push({
            path: `/enterQuit/enterManage`
          })
        } else {
          handleIsChick()
        }
      })
    }
  })
}
// 返回
const handleReturn = () => {
  router.push({
    path: `/enterQuit/enterManage`
  })
}
</script>
<style lang="less" scoped src="./../index.less"></style>
