<template>
  <el-form :model="spiderToEdit" :rules="spiderValidRule" ref="editformRef" status-icon label-position="left" label-width="130px" size="mini">
    <el-form-item label="Type" prop="Type">
      <el-select placeholder="请选择" v-model="spiderToEdit.Type">
        <el-option v-for="item in typeEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="HttpRequest" prop="HttpRequest">
      <el-select placeholder="请选择" v-model="spiderToEdit.HttpRequest">
        <el-option v-for="item in httpRequestEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataHttp" prop="DataHttp">
      <el-select placeholder="请选择" v-model="spiderToEdit.DataHttp">
        <el-option v-for="item in dataHttpEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataType" prop="DataType">
      <el-select placeholder="请选择" v-model="spiderToEdit.DataType">
        <el-option v-for="item in dataTypeEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataAddress" prop="DataAddress">
      <el-select placeholder="请选择" v-model="spiderToEdit.DataAddress">
        <el-option v-for="item in dataAddressEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataBase" prop="DataBase">
      <el-select placeholder="请选择" v-model="spiderToEdit.DataBase">
        <el-option v-for="item in dataBaseEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Repeat" prop="Repeat">
      <el-select placeholder="请选择" v-model="spiderToEdit.Repeat">
        <el-option v-for="item in repeatEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="EntryName" prop="EntryName">
      <el-input v-model="spiderToEdit.EntryName"></el-input>
    </el-form-item>
    <el-form-item label="LoginUrl" prop="LoginUrl">
      <el-input v-model="spiderToEdit.LoginUrl"></el-input>
    </el-form-item>
    <el-form-item label="UserName" prop="UserName">
      <el-input v-model="spiderToEdit.UserName"></el-input>
    </el-form-item>
    <el-form-item label="UserNameKey" prop="UserNameKey">
      <el-input v-model="spiderToEdit.UserNameKey"></el-input>
    </el-form-item>
    <el-form-item label="Pwd" prop="Pwd">
      <el-input v-model="spiderToEdit.Pwd"></el-input>
    </el-form-item>
    <el-form-item label="PwdKey" prop="PwdKey">
      <el-input v-model="spiderToEdit.PwdKey"></el-input>
    </el-form-item>
    <el-form-item label="Identify" prop="Identify">
      <el-input v-model="spiderToEdit.Identify"></el-input>
    </el-form-item>
    <el-form-item label="IdentifyKey" prop="IdentifyKey">
      <el-input v-model="spiderToEdit.IdentifyKey"></el-input>
    </el-form-item>
    <el-form-item label="ParameterSubmit" prop="ParameterSubmit">
      <el-input v-model="spiderToEdit.ParameterSubmit"></el-input>
    </el-form-item>
    <el-form-item label="SessionAging" prop="SessionAging">
      <el-input v-model="spiderToEdit.SessionAging"></el-input>
    </el-form-item>
    <el-form-item label="FirstUrl" prop="FirstUrl">
      <el-input v-model="spiderToEdit.FirstUrl"></el-input>
    </el-form-item>
    <el-form-item label="FirstUrlParameters" prop="FirstUrlParameters">
      <EditableTable :tableData="spiderToEdit.FirstUrlParameters" :rowModel="urlParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="SecondUrl" prop="SecondUrl">
      <el-input v-model="spiderToEdit.SecondUrl"></el-input>
    </el-form-item>
    <el-form-item label="SecondUrlParameters" prop="SecondUrlParameters">
      <EditableTable :tableData="spiderToEdit.SecondUrlParameters" :rowModel="urlParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="HtmlDataRequests" prop="HtmlDataRequests">
      <EditableTable :tableData="spiderToEdit.HtmlDataRequests" :rowModel="htmlDataRequest"></EditableTable>
    </el-form-item>
    <el-form-item label="JsonUrl" prop="JsonUrl">
      <el-input v-model="spiderToEdit.JsonUrl"></el-input>
    </el-form-item>
    <el-form-item label="JsonParameters" prop="JsonParameters">
      <EditableTable :tableData="spiderToEdit.JsonParameters" :rowModel="jsonParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="JsonDownLoad" prop="JsonDownLoad">
      <el-input v-model="spiderToEdit.JsonDownLoad"></el-input>
    </el-form-item>
    <el-form-item label="JsonObject" prop="JsonObject">
      <el-input v-model="spiderToEdit.JsonObject"></el-input>
    </el-form-item>
    <el-form-item label="JsonField" prop="JsonField">
      <el-input v-model="spiderToEdit.JsonField"></el-input>
    </el-form-item>
    <el-form-item label="JsonSign" prop="JsonSign">
      <el-input v-model="spiderToEdit.JsonSign"></el-input>
    </el-form-item>
    <el-form-item label="EntryType" prop="EntryType">
      <el-input v-model="spiderToEdit.EntryType"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="Address">
      <el-input v-model="spiderToEdit.Address"></el-input>
    </el-form-item>
    <el-form-item label="AddressParameters" prop="AddressParameters">
      <EditableTable :tableData="spiderToEdit.AddressParameters" :rowModel="addressParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="DataRepeat" prop="DataRepeat">
      <el-input v-model="spiderToEdit.DataRepeat"></el-input>
    </el-form-item>
    <el-form-item label="InsertSQL" prop="InsertSQL">
      <el-input v-model="spiderToEdit.InsertSQL"></el-input>
    </el-form-item>
    <el-form-item label="ErgodicData" prop="ErgodicData">
      <el-switch v-model="spiderToEdit.ErgodicData"></el-switch>
    </el-form-item>
    <el-form-item label="RepeatData" prop="RepeatData">
      <el-switch v-model="spiderToEdit.RepeatData"></el-switch>
    </el-form-item>
    <el-form-item label="IsLocal" prop="IsLocal">
      <el-switch v-model="spiderToEdit.IsLocal"></el-switch>
    </el-form-item>
    <el-form-item label="IsFtp" prop="IsFtp">
      <el-switch v-model="spiderToEdit.IsFtp"></el-switch>
    </el-form-item>
    <el-form-item label="IsDB" prop="IsDB">
      <el-switch v-model="spiderToEdit.IsDB"></el-switch>
    </el-form-item>
    <el-form-item label="LocalStr" prop="LocalStr">
      <el-input v-model="spiderToEdit.LocalStr"></el-input>
    </el-form-item>
    <el-form-item label="FtpStr" prop="FtpStr">
      <el-input v-model="spiderToEdit.FtpStr"></el-input>
    </el-form-item>
    <el-form-item label="DBStr" prop="DBStr">
      <el-input v-model="spiderToEdit.DBStr"></el-input>
    </el-form-item>
    <el-form-item label="Active" prop="Active">
      <el-switch v-model="spiderToEdit.Active"></el-switch>
    </el-form-item>
    <el-form-item label="Time" prop="Time">
      <el-date-picker type="datetime" v-model="spiderToEdit.Time" placeholder="选择日期时间" value-format="yyyy-MM-ddTHH:mm"></el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button @click="submitForm('editformRef')" type="primary">确认</el-button>
      <el-button @click="cancelEdit">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import EditableTable from './EditForm/EditableTable.vue'
  export default {
    components: {
      EditableTable
    },
    data () {
      var validateName = (rule, value, callback) => {
        let reg = new RegExp(/'|#|&|\\|\/|:|\?|"|<|>|\*|\|/g)
        if (!value) {
          return callback(new Error('名称不能为空'))
        } else if (value.startsWith(' ') | value.endsWith(' ')) {
          return callback(new Error('名称不能以空格开始或结束'))
        } else if (reg.test(value) === true) {
          return callback(new Error('名称不能包含\'#&\\/:?"<>*|'))
        } else {
          return callback()
        }
      }
      var validateName2 = (rule, value, callback) => {
        if (this.isContain !== this.isEqual) {
          return callback(new Error('该名称已被占用'))
        } else {
          return callback()
        }
      }
      var validateStartTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('开始时间不能为空'))
        }
        let date = new Date(value)
        if (date.getSeconds() > 0 | date.getMilliseconds() > 0) {
          date.setSeconds(0)
          date.setMilliseconds(0)
          return callback()
        } else {
          return callback()
        }
      }
      return {
        spiderToEdit: {
          Type: '',
          HttpRequest: '',
          DataHttp: '',
          DataType: '',
          DataAddress: '',
          DataBase: '',
          Repeat: '',
          EntryName: '',
          LoginUrl: '',
          UserName: '',
          UserNameKey: '',
          Pwd: '',
          PwdKey: '',
          Identify: '',
          IdentifyKey: '',
          ParameterSubmit: '',
          SessionAging: '',
          FirstUrl: '',
          FirstUrlParameters: [],
          SecondUrl: '',
          SecondUrlParameters: [],
          HtmlDataRequests: [],
          JsonUrl: '',
          JsonParameters: [],
          JsonDownLoad: '',
          JsonObject: '',
          JsonField: '',
          JsonSign: '',
          EntryType: '',
          Address: '',
          AddressParameters: [],
          DataRepeat: '',
          InsertSQL: '',
          ErgodicData: true,
          RepeatData: true,
          IsLocal: true,
          IsFtp: true,
          IsDB: true,
          LocalStr: '',
          FtpStr: '',
          DBStr: '',
          Active: true,
          Time: ''
        },
        typeEnum: ['直接采集', '间接采集'],
        httpRequestEnum: ['POST', 'GET'],
        dataHttpEnum: ['HTML', 'JSON'],
        dataTypeEnum: ['字符串', '图片', '文档'],
        dataAddressEnum: ['本地磁盘', 'FTP', '数据库'],
        dataBaseEnum: ['ORACLE', 'SQLServer'],
        repeatEnum: ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly', 'Never'],
        addressParameter: {
          parameter: ''
        },
        jsonParameter: {
          jsonName: '',
          jsonValue: ''
        },
        htmlDataRequest: {
          startChar: '',
          endChar: '',
          dataType: '',
          row: '',
          column: '',
          arrayNum: '',
          spliter: '',
          dBKey: ''
        },
        urlParameter: {
          parameterChange: '',
          urlName: '',
          urlValue: ''
        },
        spiderValidRule: {
          EntryName: [
            { validator: validateName, trigger: 'blur' },
            { validator: validateName2, trigger: 'blur' }
          ],
          Time: [
            { validator: validateStartTime, trigger: 'blur' }
          ]
        },
        addingNew: true,
        formLabelWidth: '100px'
      }
    },
    computed: {
      isEqual () {
        if (this.$store.state.SpiderList.spiderToEdit === null) {
          return this.spiderToEdit.EntryName === ''
        } else {
          return this.spiderToEdit.EntryName === this.$store.state.SpiderList.spiderToEdit.EntryName
        }
      },
      isContain () {
        return this.$store.state.SpiderList.filelist.includes(this.spiderToEdit.EntryName.toLowerCase())
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let socket = this.$store.state.SpiderList.socket
            if (!this.addingNew) {
              let removemessage = { Head: 'RemoveSpider', Body: [JSON.stringify(this.$store.state.SpiderList.spiderToEdit)] }
              socket.send(JSON.stringify(removemessage))
            }
            let addmessage = { Head: 'AddSpider', Body: [JSON.stringify(this.spiderToEdit)] }
            socket.send(JSON.stringify(addmessage))
            let getmessage = { Head: 'GetSpiderList', Body: [] }
            socket.send(JSON.stringify(getmessage))
            this.$router.push({ path: '/' })
          } else {
            return false
          }
        })
      },
      cancelEdit () {
        this.$router.push({ path: '/' })
      }
    },
    created () {
      if (this.$store.state.SpiderList.spiderToEdit !== null) {
        this.spiderToEdit = JSON.parse(
          JSON.stringify(this.$store.state.SpiderList.spiderToEdit)
        )
        this.addingNew = false
      } else {
        this.addingNew = true
      }
    },
    beforeDestroy () {
      this.$store.commit('setSpiderToEdit', null)
    }
  }
</script>