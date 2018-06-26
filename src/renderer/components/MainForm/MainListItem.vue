<template>
  <el-card shadow="hover" class="card">
    <div class="outerdiv">
      <div class="headdiv">
        <div class="checkdiv">
          <el-checkbox :checked="spider.Active" @change="switchActive"></el-checkbox>
        </div>
        <div class="infos">
          <p>{{spider.EntryName}}</p>
          <p>{{spider.FirstUrl}}</p>
          <p>{{spider.Repeat}}</p>
          <p>{{spider.Time}}</p>
        </div>
      </div>
      <div class="buttondiv">
        <el-button-group>
          <el-button plain size="mini" icon="el-icon-arrow-right" type="success" @click="runSpider"></el-button>
          <el-button plain size="mini" icon="el-icon-edit" type="info" @click="editSpider"></el-button>
          <el-popover placement="top" width="160" v-model="deleteConfirmVisible">
            <p>确定删除{{spider.EntryName}}吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="deleteConfirmVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="removeSpider">确定</el-button>
            </div>
            <el-button plain size="mini" icon="el-icon-delete" type="danger" slot="reference"></el-button>
          </el-popover>
        </el-button-group>
      </div>
    </div>
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
    data () {
      return {
        deleteConfirmVisible: false
      }
    },
    methods: {
      switchActive (value) {
        if (this.$store.state.SpiderList.socket === null) {
          this.$store.dispatch('initSocket')
        }
        let socket = this.$store.state.SpiderList.socket
        let setmessage = { Head: 'SetActive', Body: [this.spider.EntryName, value] }
        socket.send(JSON.stringify(setmessage))
        let getmessage = { Head: 'GetSpiderList', Body: [] }
        socket.send(JSON.stringify(getmessage))
      },
      runSpider () {
        if (this.$store.state.SpiderList.socket === null) {
          this.$store.dispatch('initSocket')
        }
        let socket = this.$store.state.SpiderList.socket
        let message = { Head: 'Run', Body: [JSON.stringify(this.spider)] }
        socket.send(JSON.stringify(message))
        this.$message('执行' + this.spider.EntryName)
      },
      removeSpider () {
        this.deleteConfirmVisible = false
        if (this.$store.state.SpiderList.socket === null) {
          this.$store.dispatch('initSocket')
        }
        let socket = this.$store.state.SpiderList.socket
        let setmessage = { Head: 'RemoveSpider', Body: [JSON.stringify(this.spider)] }
        socket.send(JSON.stringify(setmessage))
        let getmessage = { Head: 'GetSpiderList', Body: [] }
        socket.send(JSON.stringify(getmessage))
        this.$message.error('删除' + this.spider.EntryName)
      },
      editSpider () {
        console.log(this.spider)
        this.$store.commit('setSpiderToEdit', this.spider)
        this.$router.push({ path: '/edit' })
      }
    }
  }
</script>

<style>
  .card {
    min-width: 630px;
    margin-top: 10px;
  }

  .outerdiv {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .headdiv {
    display: flex;
    align-items: center;
  }

  .checkdiv {
    width: 30px;
  }

  .infos p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .infos {
    max-width: 400px;
  }

  .buttondiv {
    min-width: 120px;
  }
</style>