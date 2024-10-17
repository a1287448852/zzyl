export const COLUMNS = [
  {
    title: '序号',
    align: 'left',
    width: 100,
    minWidth: 100,
    colKey: 'rowIndex'
  },
  {
    title: '老人姓名',
    minWidth: 180,
    colKey: 'elderName'
  },
  {
    title: '老人身份证号',
    minWidth: 220,
    colKey: 'elderIdCardNo'
  },
  {
    title: '入住床位',
    minWidth: 160,
    colKey: 'bedNumber'
  },
  {
    title: '护理等级',
    minWidth: 180,
    colKey: 'nursingLevelName'
  },
  {
    title: '入住期限',
    minWidth: 300,
    colKey: 'checkInStartTime'
  },
  {
    title: '创建人',
    minWidth: 160,
    colKey: 'applicat'
  },
  {
    title: '创建时间',
    minWidth: 300,
    colKey: 'createTime'
  },

  {
    align: 'left',
    fixed: 'right',
    width: '65px',
    colKey: 'op',
    title: '操作'
  }
]
