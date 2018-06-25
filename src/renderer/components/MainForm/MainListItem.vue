<template>
  <el-card shadow="hover">
    <el-row type="flex" align="middle" justify="center">
      <el-col :span="2">
        <el-checkbox :checked="spider.Active" @change="switchActive"></el-checkbox>
      </el-col>
      <el-col :span="18">
        <el-row>{{spider.EntryName}}</el-row>
        <el-row>{{spider.FirstUrl}}</el-row>
        <el-row>{{spider.Repeat}}</el-row>
        <el-row>{{spider.Time}}</el-row>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" align="middle" justify="center">
          <el-button type="success" @click="runSpider">Run</el-button>
        </el-row>
        <el-row type="flex" align="middle" justify="center">
          <el-button round size="mini" type="info" @click="editSpider">Mod</el-button>
          <el-button round size="mini" type="danger" @click="removeSpider">Del</el-button>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    spider: {
      type: Object,
      required: true
    }
  },
  methods: {
    switchActive (value) {
      let socket = this.$store.state.SpiderList.socket
      let setmessage = {Head: 'SetActive', Body: [this.spider.EntryName, value]}
      socket.send(JSON.stringify(setmessage))
      let getmessage = {Head: 'GetSpiderList', Body: []}
      socket.send(JSON.stringify(getmessage))
    },
    runSpider () {
      let socket = this.$store.state.SpiderList.socket
      let message = {Head: 'Run', Body: [this.spider]}
      socket.send(JSON.stringify(message))
    },
    removeSpider () {
      let socket = this.$store.state.SpiderList.socket
      let setmessage = {Head: 'RemoveSpider', Body: [this.spider]}
      socket.send(JSON.stringify(setmessage))
      let getmessage = {Head: 'GetSpiderList', Body: []}
      socket.send(JSON.stringify(getmessage))
    },
    editSpider () {
      console.log(this.spider)
      this.$store.commit('setSpiderToEdit', this.spider)
      this.$router.push({path: '/edit'})
    }
  }
}
</script>
