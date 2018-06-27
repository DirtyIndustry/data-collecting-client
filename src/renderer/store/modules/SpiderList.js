var state = {
  spiders: [],
  spiderToEdit: null,
  filelist: [],
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
    context.commit('setSocket', new WebSocket('ws://localhost:7181'))
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
      } else {
        context.commit('setMessageIn', obj)
      }
    }
    context.state.socket.onopen = function () {
      let message = {Head: 'GetSpiderList', Body: []}
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
