const defaultTable = {
  default: {
    pageNum: 1, // 当前页
    total: 1, // 总条数
    pages: 1, // 总页数
    tableColumn: [
      {
        label: '序号',
        prop: 'index',
        width: '100',
      },
      {
        label: '名称',
        prop: 'name',
        width: '',
      },
      {
        label: '日期',
        prop: 'date',
        // filter: 'holderType',
        width: '',
      },
      {
        label: '图片',
        prop: 'img',
        width: '',
      },
      {
        label: '链接',
        prop: 'link',
        key: 'url',
        width: '',
      },
      {
        label: '过滤',
        prop: 'statusCodePat',
        filter: 'statusCodePat',
        width: '',
      },
      {
        label: '操作',
        prop: 'operating',
        // key: 'holderType',
        width: '',
      },
    ],
  },
}

export default defaultTable
