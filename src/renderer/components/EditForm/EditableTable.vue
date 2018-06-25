<template>
  <div>
    <EditableTableEdit></EditableTableEdit>
    <el-table :data="tableData" border style="width: 100%" stripe max-height="280">
      <el-table-column v-for="(value,key) in tableObject" :key="key" :prop="key" :label="key"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="editClick(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="deleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button size="mini" border style="width: 100%" @click="addClick">添加</el-button>
  </div>
</template>

<script>
import EditableTableEdit from './EditableTableEdit.vue'
export default {
  components: {
    EditableTableEdit
  },
  data () {
    return {
      tableObject: {},
      editObject: {},
      editVisible: false
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    rowModel: {
      type: Object
    }
  },
  methods: {
    editClick (row) {
      this.editObject = row
      this.editVisible = true
    },
    deleteClick (row) {
      let index = this.tableData.indexOf(row)
      if (index > -1) {
        this.tableData.splice(index, 1)
      }
    },
    addClick () {
      let newObj = {}
      Object.keys(this.tableObject).forEach(function(key){
        newObj[key] = ''
      })
      this.tableData.push(newObj)
    },
    setEditVisible(){
      this.editVisible = false
    }
  },
  created () {
    if (this.tableData === undefined) {
      this.tableObject = {}
    } else if (this.rowModel === undefined) {
      if (this.tableData.length === 0) {
        this.tableObject = {}
      } else {
        let that = this
        Object.keys(this.tableData[0]).forEach(function(key){
          that.tableObject[key] = ''
        })
      }
    } else {
      this.tableObject = this.rowModel
    }
  }
}
</script>
