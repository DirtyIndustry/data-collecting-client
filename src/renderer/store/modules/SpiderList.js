import Vue from 'vue'

var state = {
  spiders: [],
  spiderToEdit: null,
  filelist: [],
  loglist: [],
  socket: null,
  messageIn: null // 监听该值处理socket传入的信息
}
const mutations = {
  clearFileList () {
    state.filelist.splice(0, state.filelist.length)
  },
  clearSpiderList () {
    state.spiders.splice(0, state.spiders.length)
  },
  clearLogList () {
    state.loglist.splice(0, state.loglist.length)
  },
  spiderListAdd (state, spider) {
    state.spiders.push(spider)
    function SortByName (x, y) {
      return ((x.EntryName === y.EntryName) ? 0 : ((x.EntryName > y.EntryName) ? 1 : -1))
    }
    state.spiders.sort(SortByName)
  },
  fileListAdd (state, spider) {
    state.filelist.push(spider.EntryName.toLowerCase())
  },
  logListAdd (state, log) {
    state.loglist.push(log)
  },
  spiderListRemove (state, spider) {
    state.spiders = state.spiders.filter(item => {
      return item.EntryName !== spider.EntryName
    })
  },
  fileListRemove (state, spider) {
    state.filelist.splice(state.filelist.indexOf(spider.EntryName), 1)
  },
  switchActive (state, msg) {
    let s = state.spiders.find(spider => {
      return spider.EntryName === msg.EntryName
    })
    s.active = !s.active
  },
  setSpiderToEdit (state, msg) {
    state.spiderToEdit = msg
  },
  setSocket (state, msg) {
    state.socket = msg
  },
  setMessageIn (state, msg) {
    state.messageIn = msg
  },
  toggleSelect (state, spidername) {
    let s = state.spiders.find(spider => {
      return spider.EntryName === spidername
    })
    if (s.hasOwnProperty('isSelected') === false) {
      // s = Object.assign(s, {isSelected: true})
      Vue.set(s, 'isSelected', true)
    } else if (s.isSelected === true) {
      s.isSelected = false
    } else if (s.isSelected === false) {
      s.isSelected = true
    }
  }
}

const actions = {
  clearLists (context) {
    context.commit('clearFileList')
    context.commit('clearSpiderList')
  },
  addSpider (context, spider) {
    context.commit('spiderListAdd', spider)
    context.commit('fileListAdd', spider)
  },
  removeSpider (context, spider) {
    context.commit('spiderListRemove', spider)
    context.commit('fileListRemove', spider)
  },
  initSocket (context) {
    if (context.state.socket !== null) {
      context.state.socket.close()
    }
    // configuation file
    let path = require('path')
    let fs = require('fs')
    let filepath = path.join(__static, 'configuration.json')
    let content = fs.readFileSync(filepath).toString()
    if (!content) {
      return
    }
    let configuration = JSON.parse(content)
    // context.commit('setSocket', new WebSocket('ws://localhost:7181'))
    context.commit('setSocket', new WebSocket('ws://' + configuration.server))
    context.state.socket.onerror = function (error) {
      console.log(error)
      if (context.state.socket.readyState === 3) {
        console.log('Can\'t connect to server.')
      }
    }
    context.state.socket.onmessage = function (event) {
      let data = event.data
      let obj
      try {
        obj = JSON.parse(data)
      } catch (error) {
        console.log(data)
        return
      }
      if (obj.Head === 'GetSpiderList') {
        context.dispatch('clearLists')
        let list = JSON.parse(obj.Body)
        for (let item of list) {
          context.dispatch('addSpider', item)
        }
      } else if (obj.Head === 'GetLogs') {
        context.commit('clearLogList')
        let list = JSON.parse(obj.Body)
        for (let item of list) {
          context.commit('logListAdd', item)
        }
      } else if (obj.Head === 'AddLog') {
        let log = JSON.parse(obj.Body)
        context.commit('logListAdd', log)
      } else {
        context.commit('setMessageIn', obj)
      }
    }
    context.state.socket.onopen = function () {
      let message = {Head: 'GetSpiderList', Body: []}
      context.state.socket.send(JSON.stringify(message))
      message = {Head: 'GetLogs', Body: []}
      context.state.socket.send(JSON.stringify(message))
    }
    context.state.socket.onclose = function () {
      context.commit('setSocket', null)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
