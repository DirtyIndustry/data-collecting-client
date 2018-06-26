<template>
  <div id="app">
    <Header></Header>
    <div style="height:120px;"></div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'

  export default {
    name: 'data-collecting-client',
    components: {
      Header,
      Footer
    },
    computed: {
      socket: {
        get () {
          return this.$store.state.SpiderList.socket
        },
        set (value) {
          this.$store.commit('setSocket', value)
        }
      }
    },
    created () {
      this.$store.dispatch('initSocket')
    }
  }
</script>

<style>
  /* CSS */
</style>
