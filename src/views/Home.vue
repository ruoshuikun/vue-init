<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { testMock } from 'apis/login'

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  mounted() {
    this.testMock()
  },
  methods: {
    testMock() {
      testMock().then((res) => {
        console.info('res', res)
      })
    },
  },
}
</script>
