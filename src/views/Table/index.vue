<template>
  <div class="wrap">
    <h1 class="module-title">table 基础版</h1>
    <custTable
      title="default"
      :tableColumn="defaultTable.default.tableColumn"
      :tableData="defaultTable.default.tableData"
    >
      <!--  scope:{row, $index} row: 当前数据，$index：当前下标  -->
      <template v-slot:operating="{ scope: { row, $index } }">
        <span class="operating" @click="jump(row)">详情</span>
      </template>
    </custTable>
  </div>
</template>

<script>
import moment from 'moment'
import defaultTable from './tableColumn/default'
import custTable from 'comps/table'

export default {
  name: 'Table',
  components: {
    custTable,
  },
  data() {
    return {
      defaultTable,
    }
  },
  mounted() {
    this.defaultTable.default.tableData = [
      {
        name: '白熊',
        date: moment(new Date()).format('YYYY/MM/DD'),
        logo: '',
        url: 'https://www.baidu.com',
        statusCodePat: 10,
      },
    ]
  },
  methods: {
    jump({ name }) {
      console.info('name', name)
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 30px;
}
.operating {
  color: $--color-primary;
  cursor: pointer;
}
</style>
