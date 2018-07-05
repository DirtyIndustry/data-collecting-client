<template>
  <div>
    <div class="wrap">
      <div class="btns">
        <el-button icon="el-icon-plus" @click="addNewSpider">Add</el-button>
        <el-button icon="el-icon-refresh" @click="refresh">Refresh</el-button>
        <el-popover placement="top" width="160" v-model="deleteConfirmVisible">
          <p>确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="deleteConfirmVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="massDelete">确定</el-button>
          </div>
          <el-button :disabled="!hasSelection" icon="el-icon-delete" type="danger" slot="reference">Delete</el-button>
        </el-popover>
        <el-checkbox-button :disabled="!hasSelection" v-model="massActiveValue" @change="massActive">Active</el-checkbox-button>
        <el-button :disabled="!hasSelection" @click="massRun">Run</el-button>
      </div>
      <div class="search">
        <el-input v-model="searchString" clearable placeholder="搜索采集计划"></el-input>
      </div>
    </div>
    <div>
      <ul v-if="mainList.length">
        <MainListItem v-for="item in mainList" :key="item.name" :spider="item" @selectItem="selectItem" @ctrlSelectItem="ctrlSelectItem"
          @shiftSelectItem="shiftSelectItem">
        </MainListItem>
      </ul>
      <p v-else>
        Nothing left in the list.
      </p>
    </div>
  </div>
</template>

<script>
import MainListItem from './MainForm/MainListItem.vue'
export default {
  name: 'MainForm',
  components: {
    MainListItem
  },
  computed: {
    mainList () {
      if (this.searchString === '') {
        return this.$store.state.SpiderList.spiders
      } else {
        let that = this
        return this.$store.state.SpiderList.spiders.filter(function (item) {
          return item.EntryName.includes(that.searchString)
        })
      }
    }
  },
  data () {
    return {
      searchString: '',
      hasSelection: false,
      lastSelected: null,
      massActiveValue: true,
      deleteConfirmVisible: false
    }
  },
  methods: {
    refresh () {
      this.$store.dispatch('initSocket')
    },
    addNewSpider: function () {
      this.$router.push({path: '/edit'})
    },
    selectItem (spider) {
      let that = this
      this.$store.commit('toggleSelect', spider.EntryName)
      this.$store.state.SpiderList.spiders.forEach(function (s) {
        if (s.EntryName !== spider.EntryName) {
          if (s.isSelected === true) {
            that.$store.commit('toggleSelect', s.EntryName)
          }
        }
      })
      this.setLocalValues()
      this.lastSelected = spider
    },
    ctrlSelectItem (spider) {
      this.$store.commit('toggleSelect', spider.EntryName)
      this.setLocalValues()
      this.lastSelected = spider
    },
    shiftSelectItem (spider) {
      let that = this
      let min
      let max
      if (spider.EntryName > this.lastSelected.EntryName) {
        min = this.lastSelected.EntryName
        max = spider.EntryName
      } else {
        min = spider.EntryName
        max = this.lastSelected.EntryName
      }
      this.$store.state.SpiderList.spiders.forEach(function (s) {
        if (s.EntryName >= min & s.EntryName <= max) {
          if (s.isSelected !== true) {
            that.$store.commit('toggleSelect', s.EntryName)
          }
        } else if (s.isSelected === true) {
          that.$store.commit('toggleSelect', s.EntryName)
        }
        /*
        if (s.EntryName === that.lastSelected.EntryName & s.isSelected !== true) {
          that.$store.commit('toggleSelect', s.EntryName)
        }
        */
      })
      this.setLocalValues()
    },
    massDelete () {
      this.deleteConfirmVisible = false
      let that = this
      this.mainList.forEach(function (item) {
        if (item.isSelected) {
          console.log(item.EntryName)
          if (that.$store.state.SpiderList.socket === null) {
            that.$store.dispatch('initSocket')
          }
          let socket = that.$store.state.SpiderList.socket
          let setmessage = { Head: 'RemoveSpider', Body: [JSON.stringify(item)] }
          socket.send(JSON.stringify(setmessage))
          that.$message.error('删除' + item.EntryName)
        }
      })
      this.hasSelection = false
    },
    massActive () {
      let that = this
      this.mainList.forEach(function (item) {
        if (item.isSelected) {
          console.log(item.EntryName)
          if (that.$store.state.SpiderList.socket === null) {
            that.$store.dispatch('initSocket')
          }
          let socket = that.$store.state.SpiderList.socket
          let setmessage = { Head: 'SetActive', Body: [item.EntryName, that.massActiveValue] }
          socket.send(JSON.stringify(setmessage))
        }
      })
      this.hasSelection = false
    },
    massRun () {
      let that = this
      this.mainList.forEach(function (item) {
        if (item.isSelected) {
          console.log(item.EntryName)
          if (that.$store.state.SpiderList.socket === null) {
            that.$store.dispatch('initSocket')
          }
          let socket = that.$store.state.SpiderList.socket
          let message = { Head: 'Run', Body: [JSON.stringify(item)] }
          socket.send(JSON.stringify(message))
          that.$message('执行' + item.EntryName)
        }
      })
    },
    setLocalValues () {
      let that = this
      this.hasSelection = false
      this.massActiveValue = true
      this.mainList.forEach(function (item) {
        if (item.isSelected === true) {
          that.hasSelection = true
          if (item.Active === false) {
            that.massActiveValue = false
          }
        }
      })
    }
  }
}
</script>
<style>
  .wrap{
    display: flex;
    justify-content: space-between;
  }
</style>
