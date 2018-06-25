<template>
  <el-dialog title="Edit" :visible.sync="visible" :before-close="handleClose">
    <el-form :model="editObject" label-position="left">
      <el-form-item v-for="(value,key) in editObject" :key="key" :label="key" :label-width="formLabelWidth">
        <el-input v-model="editObject[key]"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name:'EditableTableEdit',
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
