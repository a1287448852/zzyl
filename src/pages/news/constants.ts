export const COLUMNS = [
  {
    colKey: 'row-select',
    type: 'multiple',
    width: 46
  },
  {
    title: '消息标题',
    minWidth: 240,
    colKey: 'title'
  },
  {
    title: '消息内容',
    minWidth: 180,
    colKey: 'content'
  },
  {
    title: '接收时间',
    minWidth: 300,
    colKey: 'createTime'
  },
  {
    title: '消息类型',
    minWidth: 180,
    colKey: 'type'
  },
  {
    align: 'left',
    fixed: 'right',
    width: 114,
    minWidth: '114px',
    colKey: 'op',
    title: '操作'
  }
]
