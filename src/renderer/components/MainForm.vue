<template>
  <div>
    <div>
      <el-button icon="el-icon-plus">Add</el-button>
      <el-button icon="el-icon-refresh" @click="refresh">Refresh</el-button>
    </div>
    <div>
      <ul v-if="spiders.length">
        <MainListItem v-for="item in spiders" :key="item.name" :spider="item">
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
    spiders () {
      return this.$store.state.SpiderList.spiders
    }
  },
  methods: {
    refresh () {
      this.$store.dispatch('initSocket')
    }
  }
}
</script>
