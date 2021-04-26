<template>
  <h1 class="module-title">list 基础版</h1>
  <custList ref="defaultList" @getList="getList({ key: 'default' })">
    <template v-slot:list>
      <ul>
        <li v-for="(item, index) in listData" :key="index" class="list-item">
          {{ item }}
        </li>
      </ul>
    </template>
  </custList>
</template>

<script>
import custList from 'comps/list/index.vue'
export default {
  name: 'List',
  components: {
    custList,
  },
  data() {
    return {
      listData: 5,
    }
  },
  mounted() {
    this.$refs.defaultList.pageNum = 1
    this.$refs.defaultList.pages = 4
  },
  methods: {
    getList({ key }) {
      setTimeout(() => {
        this.listData += 5
        this.$refs.defaultList.pageNum++
        this.$refs.defaultList.loading = false
      }, 1000)
    },
  },
}
</script>

<style lang="scss" scoped>
.list {
  &-item {
    padding: 10px;
    font: {
      size: 30px;
      weight: $fontWeightSmall;
    }
    &:hover {
      background: rgba(255, 0, 0, 0.3);
      color: white;
    }
  }
}
</style>
