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
    watch: {
      '$store.state.SpiderList.messageIn': {
        handler: function (newer, older) {
          if (newer !== null) {
            if (newer.Head === 'TaskStart') {
              if (newer.Body[1] === 'True') {
                this.$notify.info({
                  title: '任务开始',
                  message: '任务' + newer.Body[0] + '开始执行。'
                })
              } else if (newer.Body[1] === 'False') {
                this.$notify({
                  title: '任务跳过',
                  message: '任务' + newer.Body[0] + '没有激活，跳过本次执行。',
                  type: 'warning'
                })
              }
            } else if (newer.Head === 'TaskFinish') {
              if (newer.Body[1] === 'True') {
                this.$notify({
                  title: '任务完成',
                  message: '任务' + newer.Body[0] + '完成。',
                  type: 'success'
                })
              } else if (newer.Body[1] === 'False') {
                this.$notify.error({
                  title: '任务失败',
                  message: '任务' + newer.Body[0] + '执行失败。'
                })
              }
            } else {
              console.log(newer)
            }
            this.$store.commit('setMessageIn', null)
          }
        }
      },
      '$store.state.SpiderList.socket': {
        handler: function (newer, older) {
          if (newer === null) {
            this.$store.commit('initSocket')
          }
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
  :not(input):not(textarea),
  :not(input):not(textarea)::after,
  :not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
  }
</style>
