<template>
  <div class="wrap">
    <slot name="list"></slot>
    <div class="view-more view-more-end" v-if="pageNum >= pages">
      <span v-if="pages === 0"></span>
      <span v-else>已经到底啦</span>
    </div>
    <div class="view-more" v-else>
      <i v-if="loading" class="el-icon-loading"></i>
      <div class="view-more-btn" v-else @click="moreClick()">
        <span>查看更多</span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @desc: 点击按钮，加载更多
 * @author: zhang lin
 * @update: 2021-04-26
 */

export default {
  name: 'custList',
  data() {
    return {
      loading: false,
      pageNum: 1,
      pages: 0,
    }
  },
  methods: {
    moreClick() {
      this.loading = true
      setTimeout(() => {
        this.$emit('getList')
      }, 500)
    },
  },
}
</script>

<style lang="scss" scoped>
.wrap {
  display: flex;
  flex-direction: column;

  .view-more {
    display: inline-block;
    margin: 15px auto;
    font: {
      size: 15px;
    }
    &-btn {
      cursor: pointer;
      display: inline-block;
    }
    &-end {
      color: #909399;
    }
  }
}
.el-icon-loading {
  color: $--color-primary;
}
</style>
