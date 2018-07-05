<template>
  <div  class="card" v-bind:class="{'selected': isSelected}" @click.exact="$emit('selectItem', spider)" 
    @click.ctrl.exact="$emit('ctrlSelectItem', spider)" @click.shift.exact="$emit('shiftSelectItem', spider)">
    <div class="outerdiv">
      <div class="headdiv">
        <div class="checkdiv">
          <el-switch v-model="isActive" active-text="启用" inactive-text="禁用"></el-switch>
        </div>
        <div class="infos">
          <p>{{spider.EntryName}}</p>
          <p>{{spider.FirstUrl}}</p>
          <p>{{spider.Repeat}}</p>
          <p>{{spider.Time}}</p>
          <p>{{lastExecute.Time}} {{lastExecute.Status}}</p>
        </div>
      </div>
      <div class="buttondiv">
        <el-button-group>
          <el-button plain size="mini" icon="el-icon-arrow-right" type="success" @click.exact.stop="runSpider"></el-button>
          <el-button plain size="mini" icon="el-icon-edit" type="info" @click.exact.stop="editSpider"></el-button>
          <el-popover placement="top" width="300" v-model="logVisible">
            <div class="logpop">
            <p>{{spider.EntryName}} 历史纪录</p>
            <ul v-if="logs.length">
              <li v-for="(item, index) in logs" :key='index'>
                <div>{{item.Time}} {{item.Status}}</div>
              </li>
            </ul>
            <p v-else>
              Nothing left in the log.
            </p>
            </div>
            <el-button plain size="mini" icon="el-icon-document" type="info" slot="reference"></el-button>
          </el-popover>
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
  </div>
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
        deleteConfirmVisible: false,
        logVisible: false
      }
    },
    computed: {
      logs: function () {
        let that = this
        return this.$store.state.SpiderList.loglist.filter(function (item) {
          return item.Name === that.spider.EntryName
        })
      },
      lastExecute: function () {
        if (this.logs.length === 0) {
          return ''
        } else {
          this.logs.sort(this.SortByTime)
          return this.logs[this.logs.length - 1]
        }
      },
      isSelected: function () {
        return this.spider.isSelected
      },
      isActive: {
        get: function () {
          return this.spider.Active
        },
        set (value) {
          if (this.$store.state.SpiderList.socket === null) {
            this.$store.dispatch('initSocket')
          }
          let socket = this.$store.state.SpiderList.socket
          let setmessage = { Head: 'SetActive', Body: [this.spider.EntryName, value] }
          socket.send(JSON.stringify(setmessage))
        }
      }
    },
    methods: {
      runSpider (event) {
        if (this.$store.state.SpiderList.socket === null) {
          this.$store.dispatch('initSocket')
        }
        let socket = this.$store.state.SpiderList.socket
        let message = { Head: 'Run', Body: [JSON.stringify(this.spider)] }
        socket.send(JSON.stringify(message))
        this.$message('执行' + this.spider.EntryName)
        // this.stopBubble(event)
      },
      removeSpider (event) {
        this.deleteConfirmVisible = false
        if (this.$store.state.SpiderList.socket === null) {
          this.$store.dispatch('initSocket')
        }
        let socket = this.$store.state.SpiderList.socket
        let setmessage = { Head: 'RemoveSpider', Body: [JSON.stringify(this.spider)] }
        socket.send(JSON.stringify(setmessage))
        this.$message.error('删除' + this.spider.EntryName)
        // this.stopBubble(event)
      },
      editSpider (event) {
        console.log(this.spider)
        this.$store.commit('setSpiderToEdit', this.spider)
        this.$router.push({ path: '/edit' })
        // this.stopBubble(event)
      },
      SortByTime (x, y) {
        return ((x.Time === y.Time) ? 0 : ((x.Time > y.Time) ? 1 : -1))
      },
      stopBubble (event) {
        if (event & event.stopPropagation) {
          event.stopPropagation()
        } else {
          window.evnet.cancelBubble = true
        }
      }
    }
  }
</script>

<style>
  .card {
    min-width: 630px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 8px;
    border: rgb(201, 201, 201) 1px solid;
  }

  .outerdiv {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .logpop {
    border: rgb(201, 201, 201) 1px solid;
  }

  .headdiv {
    display: flex;
    align-items: center;
  }

  .checkdiv {
    width: 150px;
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

  .selected {
    border: rgb(0, 119, 255) 1px solid;
    box-shadow: rgba(18, 29, 39,0.3) 0 0 10px;
  }
  .card:hover{
    box-shadow: rgba(18, 29, 39,0.3) 0 0 10px;
  }
</style>