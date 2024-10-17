export interface ListCheckin {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  adminCreator: string
  applicat: string
  applicatId: string
  checkInCode: string
  checkInTime: string
  counselor: string
  createBy: string
  createDay: string
  createTime: string
  createType: number
  creator: string
  dataState: string
  deptNo: string
  elderId: string
  elderVo: string
  flowStatus: number
  id: string
  otherApplyInfo: string
  reason: string
  remark: ''
  reviewInfo: string
  status: number
  title: string
  updateBy: string
  updateTime: string
  updater: string
}
export interface FormApply {
  checkInTime: string
  elderDto: {
    arrearsAmount: number
    id: number
    idCardNo: string
    image: string
    name: string
    paymentDeadline: string
    phone: string
    remark: string
    status: number
  }
  id: number
  otherApplyInfo: string
  remark: string
  reviewInfo: string
}
// 配置提交
export interface ConfigApply {
  bedCost: number
  bedId: number
  checkInEndTime: string
  checkInId: number
  checkInStartTime: string
  costEndTime: string
  costStartTime: string
  depositAmount: number
  elderId: number
  governmentSubsidy: number
  id: number
  medicalInsurancePayment: number
  nursingCost: number
  nursingLevelId: number
  otherCost: number
  remark: string
}
// 签约办理
export interface SignTransaction {
  checkInId: number
  checkInNo: string
  contractNo: string
  elderId: number
  elderName: string
  endTime: string
  id: number
  levelDesc: string
  memberId: number
  memberName: string
  memberPhone: string
  name: string
  pdfUrl: string
  releaseDate: string
  releasePdfUrl: string
  releaseSubmitter: string
  remark: string
  signDate: string
  sort: number
  startTime: string
  status: number
}
export interface FormCheck {
  checkInConfigDto: checkInConfigDto
  checkInContractDto: checkInContractDto
  checkInElderDto: checkInElderDto
  elderFamilyDtoList: [elderFamilyDtoList]
}
// 配置
export interface checkInConfigDto {
  bedCost: Number
  bedId: Number
  checkInEndTime: string
  checkInStartTime: string
  code: string
  costEndTime: string
  costStartTime: string
  depositAmount: Number
  floorId: Number
  floorName: string
  governmentSubsidy: Number
  medicalInsurancePayment: Number
  nursingCost: Number
  nursingLeveName: string
  nursingLevelId: Number
  otherCost: Number
  roomId: Number
}
// 合同
export interface checkInContractDto {
  id: Number
  memberName: string
  memberPhone: string
  name: string
  pdfUrl: string
  remark: string
  signDate: string
}
// 基本信息
export interface checkInElderDto {
  address: string
  age: Number
  birthday: string
  idCardNationalEmblemImg: string
  idCardNo: string
  idCardPortraitImg: string
  name: string
  oneInchPhoto: string
  phone: string
  sex: string
}
// 家庭信息
export interface elderFamilyDtoList {
  kinship: string
  name: string
  phone: string
}
