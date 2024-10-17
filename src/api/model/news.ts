// 列表
export interface ListResult {
  data: any[]
  list: Array<ListModel>
}
export interface ListModel {
  id: string
  title: string
  content: string
  type: number
  userId: string
  isRead: number
  relevantId: string
  createTime: string
}
