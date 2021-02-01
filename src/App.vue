<template>
  <div id="app">
    <component :is="layout">
      <template #router>
        <router-view />
      </template>
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
export default {
  components: { EmptyLayout },

  created() {
    if (sessionStorage.length) {
      this.$router.push({ name: 'Home' })
    } else {
      this.$router.push({ name: 'Login' })
    }
  },

  computed: {
    layout() {
      return this.$route.meta.layout ? `${this.$route.meta.layout}-layout` : 'empty-layout'
    }
  }
}
</script>

<style lang="less">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
