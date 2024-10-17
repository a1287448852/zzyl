import { request } from '@/utils/request'
import type { ListResult, ListModel } from '@/api/model/news'

// 获取分页查询数据
export function getMessageList(params) {
  return request.get<ListResult>({
    url: '/message/pageQuery',
    params
  })
}
// 批量删除
export function batchDelete(params) {
  return request.delete({
    url: `/message/batchDelete?ids=${params}`
  })
}
// 全部删除
export function allDelete(status) {
  return request.delete({
    url: `/message/allDelete/readStatus/${status}`
  })
}
// 全部标记已读
export function allMarkRead() {
  return request.put({
    url: `/message/allMarkRead`
  })
}
// 批量标记已读
export function batchMarkRead(params) {
  return request.put({
    url: `/message/batchMarkRead?ids=${params}`
  })
}
// 统计已读未读状态数量
export function countByReadStatus(params) {
  return request.get({
    url: `/message/countByReadStatus`,
    params
  })
}
// 查询语音通知状态
export function queryVoiceNotifyStatus(status) {
  return request.get({
    url: `/message/queryVoiceNotifyStatus`
  })
}
// 更新语音通知状态
export function updateVoiceNotifyStatus(status) {
  return request.put({
    url: `/message/updateVoiceNotifyStatus/${status}`
  })
}
