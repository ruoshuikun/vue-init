<template>
  <div v-if="custVisible" style="width: 100%" v-click-outside="clickOutside">
    <div class="popper-arrow" />
    <ul class="cust-select-wrap">
      <li
        v-for="item in optionData"
        :key="item.id"
        :class="[
          'cust-select-list',
          companyName === item.name ? 'cust-select-list-selected' : '',
        ]"
        @click="keywordsClick(item)"
      >
        {{ item.name }}
      </li>
      <li
        v-show="optionData.length === 0"
        class="cust-select-list cust-select-list-null empty"
      >
        <i class="el-icon-loading" v-if="loading"></i>
        <span v-else>暂无数据</span>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * @desc: 支持分页
 * @author: zhang lin
 * @update: 2021-04-21
 */

import { Request_companyList } from 'apis/panorama/search.js'

export default {
  props: {
    custVisible: {
      type: Boolean,
      default: false,
    },
    companyName: {
      type: String,
      default: '',
    },
    useJS: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      optionData: [],
      loading: false,
    }
  },
  watch: {
    custVisible(newVal, oldVal) {
      if (newVal) {
        this.getList()
      }
    },
  },
  created() {},
  mounted() {
    if (this.useJS) this.useJsFunc()
  },
  methods: {
    useJsFunc() {
      this.$nextTick(() => {
        // el-dialog 内部自定义指令无法触发，所以使用原生解决
        const elDialog = document.getElementsByClassName('el-dialog')
        for (let i = 0; i < elDialog.length; i++) {
          elDialog[i].onclick = (event) => {
            if (!event.target.className.startsWith('cust-select')) {
              this.close()
            }
          }
        }
      })
    },
    getList() {
      this.companyList().then((res) => {
        this.optionData = res.records
        this.loading = false
      })
    },
    reset() {
      this.optionData = []
      this.getList()
    },
    async companyList() {
      this.loading = true
      const params = {
        pageNum: 1,
        pageSize: 500,
        content: this.companyName,
      }
      const { code, data } = await Request_companyList(params)
      if (code === 200) {
        return data
      }
    },
    close() {
      this.$emit('update:custVisible', false)
      this.optionData = []
    },
    keywordsClick(item) {
      this.$emit('update:companyName', item.name)
      this.close()
    },
    clickOutside() {
      this.close()
    },
  },
}
</script>

<style lang="scss" scope>
/*
  自定义 select 的小三角
  */
.popper-arrow {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  border-width: 6px;
  top: -6px;
  left: 10%;
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #d8daf9;
}

.cust-select {
  $padding: 6px;

  &-wrap {
    width: 100%;
    background: white;
    box-shadow: $boxShadow;
    min-height: 30px;
    max-height: 120px;
    padding: $padding;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow-y: auto;
  }
  &-list {
    font-size: 14px;
    padding: 0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    text-align: left;

    &:hover {
      background: #f5f7fa;
    }

    &-selected {
      color: $--color-primary;
      font-weight: 700;
    }

    &-null {
      text-align: center;
    }
  }
}
</style>
