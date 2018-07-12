<template>
<el-dialog title="Edit" :visible.sync="visible" :before-close="handleClose">
  <el-form :model="editObject" label-position="left">
    <el-form-item label="DatabaseType" prop="DatabaseType">
      <el-input v-model="editObject.DatabaseType"></el-input>
    </el-form-item>
    <el-form-item label="ConnString" prop="ConnString">
      <el-input v-model="editObject.ConnString"></el-input>
    </el-form-item>
    <el-form-item label="TableName" prop="TableName">
      <el-button @click="getTables">Get Tables</el-button>
      <el-input v-model="editObject.TableName"></el-input>
    </el-form-item>
    <el-form-item label="DictRelationDBList" prop="DictRelationDBList">
      <DictRelationDBTable :tableData="editObject.DictRelationDBList" :rowModel="dictRelationDB"></DictRelationDBTable>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
import DictRelationDBTable from './DictRelationDBTable.vue'
export default {
  name: 'DBTableEdit',
  components: {
    DictRelationDBTable
  },
  props: {
    editObject: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    formLabelWidth: {
      type: String
    }
  },
  data () {
    return {
      dictRelationDB: {
        FieldName: '',
        FieldRemark: '',
        ListIndex: '',
        DictKeyName: '',
        NewName: ''
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('editclosing')
    },
    getTables () {
      let messageOut = {Head: 'GetDBTables', Body: [this.editObject.DatabaseType, this.editObject.ConnString]}
      this.$store.state.SpiderList.socket.send(JSON.stringify(messageOut))
    }
  }
}
</script>