<template>
  <div id="app">
    <router-view></router-view>
    <!-- <auto-slide-list /> -->
  </div>
</template>

<script>
// import AutoSlideList from './components/AutoSlideList.vue'
export default {
  // components: { AutoSlideList },
  name: 'App'
}
</script>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }
</style>
