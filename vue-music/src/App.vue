<template>
  <div id="app">
    <m-header/>
    <tab></tab>
    <keep-alive>
  <router-view></router-view>
  </keep-alive>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
export default {
  components: {
    'm-header': MHeader,
    'tab': Tab
  }
}
</script>

<style>

</style>
