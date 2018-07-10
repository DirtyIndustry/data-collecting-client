<template>
<div class="card" v-bind:class="{'selected': spider.isSelected}" @click.exact="$emit('selectItem', spider)" @click.ctrl.exact="$emit('ctrlSelectItem', spider)" @click.shift.exact="$emit('shiftSelectItem', spider)">
  <div class="headdiv">
    <div class="checkdiv">
      <el-switch v-model="isActive" @click.stop></el-switch>
      <div>{{isActiveDesc}}</div>
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
            <li v-for="(item, index) in logs" :key="index">
              <div>{{item.Time}} {{item.Status}}</div>
            </li>
          </ul>
          <p v-else>Nothing left in the log.</p>
        </div>
        <el-button plain size="mini" icon="el-icon-document" type="info" slot="reference"></el-button>
      </el-popover>
      <el-popover placement="top" width="160" v-model="deleteConfirmVisible">
        <p>确定删除{{spider.EntryName}}吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deleteConfirmVisible = false">取消</el-button>
          <el-button size="mini" type="primary" @click="removeSpider">确定</el-button>
        </div>
        <el-button plain size="mini" icon="el-icon-delete" type="danger" slot="reference"></el-button>
      </el-popover>
    </el-button-group>
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
        this.logs.sort(function (x, y) {
          return ((x.Time === y.Time) ? 0: ((x.Time > y.Time) ? 1 : -1))
        })
        return this.logs[this.logs.length - 1]
      }
    },
    isActive: {
      get: function () {
        return this.spider.Active
      },
      set (value) {
        let setmessage = {Head: 'SetActive', Body: [this.spider.EntryName, value]}
        this.$store.state.SpiderList.socket.send(JSON.stringify(setmessage))
      }
    },
    isActiveDesc () {
      if (this.isActive ===  true) {
        return '启用'
      } else {
        return '禁用'
      }
    }
  },
  methods: {
    runSpider (event) {
      let message = {Head: 'Run', Body: [JSON.stringify(this.spider)]}
      this.$store.state.SpiderList.socket.send(JSON.stringify(message))
      this.$message('执行' + this.spider.EntryName)
    },
    removeSpider (event) {
      this.deleteConfirmVisible = false
      let setmessage = {Head: 'RemoveSpider', Body: [JSON.stringify(this.spider)]}
      this.$store.state.SpiderList.socket.send(JSON.stringify(setmessage))
      this.$message.error('删除' + this.spider.EntryName)
    },
    editSpider (event) {
      this.$store.commit('setSpiderToEdit', this.spider)
      this.$router.push({path: '/edit'})
    }
  }
}
</script>

<style scoped>
  .card {
    min-width: 630rem;
    margin-top: 10rem;
    padding: 10rem;
    border-radius: 8rem;
    border: rgb(200, 200, 200) 1rem solid;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .logpop {
    border: rgb(200, 200, 200) 1rem solid;
  }
  .headdiv {
    display: flex;
    align-items: center;
  }
  .checkdiv {
    width: 50rem;
  }
  .infos p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .infos {
    max-width: 400rem;
  }
  .buttondiv {
    min-width: 120rem;
  }
  .selected {
    border: rgb(0, 120, 255) 1rem solid;
    box-shadow: rgba(20, 30, 40, 0.3) 0 0 10rem;
  }
  .card:hover {
    box-shadow: rgba(20, 30, 40, 0.3) 0 0 10rem;
  }
</style>