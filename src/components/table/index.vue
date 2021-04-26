<template>
  <el-card class="cust-card-table">
    <template #header>
      <div class="cust-card-header">
        <span class="cust-card-header-title">{{ title }}</span>
      </div>
    </template>
    <el-table :data="tableData" style="width: 100%" empty-text="暂无数据">
      <el-table-column
        :label="item.label"
        v-for="(item, index) in tableColumn"
        :key="index"
        :width="item.width"
      >
        <!-- 数据的遍历 row 当前数据, $index 当前下标-->
        <template v-slot="{ row, $index }">
          <div v-if="item.prop === 'index'">
            <span>{{ $index + 1 }}</span>
          </div>
          <div v-else-if="item.prop === 'operating'">
            <slot name="operating" :scope="{ row, $index }">operating</slot>
          </div>
          <div v-else-if="item.prop === 'img'" class="cust-card-table-img">
            <img
              :src="require('imgs/default.jpeg')"
              alt="logo"
              width="50"
              height="50"
              class="list-img-item"
              v-real-img="imgBaseUrl + row[item.key]"
            />
          </div>
          <div v-else-if="item.prop === 'link'" class="cust-card-table-link">
            <el-link type="primary" :href="row[item.key]" target="_blank">{{
              row[item.key]
            }}</el-link>
          </div>
          <span v-else>{{
            filterFunc({ filter: item.filter, value: row[item.prop] })
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { inject } from 'vue'
import { mapState } from 'vuex'
export default {
  name: 'custTable',
  props: {
    title: {
      type: String,
      required: true,
    },
    tableColumn: {
      type: Array,
      default: () => {
        return []
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      imgBaseUrl: inject('imgBaseUrl'),
    }
  },
  computed: mapState({
    statusCodePat: (state) => state.enumData.statusCodePat,
  }),
  methods: {
    filterFunc({ filter, value }) {
      if (filter) return this[filter][value]
      return value
    },
  },
}
</script>

<style scoped lang="scss">
// @import 'views/panorama/components/table/style/card.scss';
.cust-card-table {
  &-img {
    display: flex;
    align-items: center;
  }
  &-link {
    width: 150px;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }
}
</style>
