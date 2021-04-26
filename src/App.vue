<template>
  <div id="nav">
    <router-link :to="item.to" v-for="(item, index) in router" :key="index">{{
      item.name
    }}</router-link>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      router: [
        {
          to: '/',
          name: 'Home',
        },
        {
          to: '/about',
          name: 'About',
        },
        {
          to: '/list',
          name: 'List',
        },
        {
          to: '/table',
          name: 'Table',
        },
        {
          to: '/listTable',
          name: 'listTable',
        },
      ],
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: rgba(135, 206, 235, 0.3);
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 5px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
