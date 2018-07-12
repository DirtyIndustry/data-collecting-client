<template>
<el-dialog title="Edit" :visible.sync="visible" :before-close="handleClose">
  <el-form :model="editObject" label-position="left">
    <el-form-item label="FieldName" prop="FieldName">
      <el-input v-model="editObject.FieldName"></el-input>
    </el-form-item>
    <el-form-item label="FieldRemark" prop="FieldRemark">
      <el-input v-model="editObject.FieldRemark"></el-input>
    </el-form-item>
    <el-form-item label="ListIndex" prop="ListIndex">
      <el-input v-model="editObject.ListIndex"></el-input>
    </el-form-item>
    <el-form-item label="DictKeyName" prop="DictKeyName">
      <el-input v-model="editObject.DictKeyName"></el-input>
    </el-form-item>
    <el-form-item label="NewName" prop="NewName">
      <el-input v-model="editObject.NewName"></el-input>
    </el-form-item>
  </el-form>
</el-dialog>
</template>

<script>
export default {
  name: 'DictRelationDBTableEdit',
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
  methods: {
    handleClose () {
      this.$emit('editclosing')
    }
  }
}
</script>
