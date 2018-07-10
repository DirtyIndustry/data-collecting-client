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
          <el-button size="mini" type="primary" @click="massDelete">确定</el-button>
        </div>
        <el-button :disabled="!hasSelection" icon="el-icon-delete" type="danger" slot="reference">Delete</el-button>
      </el-popover>
      <el-checkbox-button :disabled="!hasSelection" v-model="massActiveValue" @change="massActive">Active</el-checkbox-button>
      <el-button :disabled="!hasSelection" @click="massRun">Run</el-button>
      <el-button @click="importSpiders">Import</el-button>
      <el-button @click="exportSpiders">Export</el-button>
    </div>
    <div class="search">
      <el-select v-model="filterValue">
        <el-option v-for="item in filterOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input v-model="searchString" clearable placeholder="搜索采集计划"></el-input>
    </div>
  </div>
  <div>
    <ul v-if="mainList.length">
      <MainListItem v-for="item in mainList" :key="item.name" :spider="item" @selectItem="selectItem" @ctrlSelectItem="ctrlSelectItem" @shiftSelectItem="shiftSelectItem"></MainListItem>
    </ul>
    <p v-else>Nothing left in the list.</p>
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
    filteredList () {
      if (this.filterValue === 'All') {
        return this.$store.state.SpiderList.spiders
      } else if (this.filterValue === 'Active') {
        return this.$store.state.SpiderList.spiders.filter(function (item) {
          return item.Active === true
        })
      } else if (this.filterValue === 'Inactive') {
        return this.$store.state.SpiderList.spiders.filter(function (item) {
          return item.Active === false
        })
      }
    },
    mainList () {
      if (this.searchString === '') {
        return this.filteredList
      } else {
        let that = this
        return this.filteredList.filter(function (item) {
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
      deleteConfirmVisible: false,
      filterValue: 'All',
      filterOptions: [
        {value: 'All', label: '全部'},
        {value: 'Active', label: '启用'},
        {value: 'Inactive', label: '禁用'}
      ]
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
      for(let i = 0; i < this.$store.state.SpiderList.spiders.length; i++) {
        if (this.$store.state.SpiderList.spiders[i].EntryName !== spider.EntryName) {
          if (this.$store.state.SpiderList.spiders[i].isSelected === true) {
            this.$store.commit('toggleSelect', this.$store.state.SpiderList.spiders[i].EntryName)
          }
        }
      }
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
      let spiderlist =this.$store.state.SpiderList.spiders
      for (let i = 0; i < spiderlist.length; i++) {
        if (spiderlist[i].EntryName >= min & spiderlist[i].EntryName <= max) {
          if (spiderlist[i].isSelected !== true) {
            this.$store.commit('toggleSelect', spiderlist[i].EntryName)
          }
        } else if (spiderlist[i].isSelected === true) {
          this.$store.commit('toggleSelect', spiderlist[i].EntryName)
        }
      }
      this.setLocalValues()
    },
    massDelete () {
      this.deleteConfirmVisible = false
      let that = this
      for (let i = 0; i < this.mainList.length; i++) {
        if (this.mainList[i].isSelected === true) {
          let setmessage = {Head: 'RemoveSpider', Body: [JSON.stringify(this.mainList[i])]}
          this.$store.state.SpiderList.socket.send(JSON.stringify(setmessage))
          this.$message.error('删除' + this.mainList[i].EntryName);
        }
      }
      this.hasSelection = false
    },
    massActive () {
      let that = this
      for (let i = 0; i < this.mainList.length; i++) {
        if (this.mainList[i].isSelected === true) {
          let setmessage = {Head: 'SetActive', Body: [this.mainList[i].EntryName, this.massActiveValue]}
          this.$store.state.SpiderList.socket.send(JSON.stringify(setmessage))
        }
      }
      this.hasSelection = false
    },
    massRun () {
      let that = this
      for (let i = 0; i < this.mainList.length; i++) {
        if (this.mainList[i].isSelected === true) {
          let message = {Head: 'Run', Body: [JSON.stringify(this.mainList[i])]}
          this.$store.state.SpiderList.socket.send(JSON.stringify(message))
          this.$message('执行' + this.mainList[i].EntryName)
        }
      }
    },
    setLocalValues () {
      let that = this
      this.hasSelection = false
      this.massActiveValue = true
      for (let i = 0; i < this.mainList.length; i++) {
        if (this.mainList[i].isSelected === true) {
          this.hasSelection = true
          if (this.mainList[i].Active === false) {
            this.massActiveValue = false
          }
        }
      }
    },
    importSpiders () {
      let filepaths = this.$electron.remote.dialog.showOpenDialog({
        properties: ['openFile', 'multiSelections'],
        filters: [{name: 'JSON File', extensions: ['json']}]
      })
      if (!filepaths) {
        return
      }
      let fs = require('fs')
      for (let i = 0; i < filepaths.length; i++) {
        let content = fs.readFileSync(filepaths[i]).toString()
        let spider = JSON.parse(content)
        if (!this.$store.state.SpiderList.filelist.includes(spider.EntryName) & spider.EntryName !== '') {
          let addmessage = {Head: 'AddSpider', Body: [JSON.stringify(spider)]}
          this.$store.state.SpiderList.socket.send(JSON.stringify(addmessage))
        }
      }
    },
    exportSpiders () {
      let folderpaths = this.$electron.remote.dialog.showOpenDialog({
        properties: ['openDirectory']
      })
      if (!folderpaths) {
        return
      }
      let path = require('path')
      let fs = require('fs')
      for (let i = 0; i < this.mainList.length; i++) {
        if (this.hasSelection === false | this.mainList[i].isSelected === true) {
          let filepath = path.join(folderpaths[0], this.mainList[i].EntryName + '.json')
          fs.writeFile(filepath, JSON.stringify(this.mainList[i]), err => {
            if (err) {
              return console.log(err)
            }
          })
        }
      }
    }
  }
}
</script>

<style scoped>
  .wrap{
    display: flex;
    justify-content: space-between;
  }
</style>
