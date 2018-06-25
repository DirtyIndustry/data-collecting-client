<template>
  <el-form :model="spiderToEdit" :rules="spiderValidRule" ref="editformRef" status-icon label-position="left" label-width="100px">
    <el-form-item label="Type" prop="type">
      <el-select placeholder="请选择" v-model="spiderToEdit.type">
        <el-option v-for="item in spiderToEdit.typeEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="HttpRequest" prop="httpRequest">
      <el-select placeholder="请选择" v-model="spiderToEdit.httpRequest">
        <el-option v-for="item in spiderToEdit.httpRequestEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataHttp" prop="dataHttp">
      <el-select placeholder="请选择" v-model="spiderToEdit.dataHttp">
        <el-option v-for="item in spiderToEdit.dataHttpEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataType" prop="dataType">
      <el-select placeholder="请选择" v-model="spiderToEdit.dataType">
        <el-option v-for="item in spiderToEdit.dataTypeEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataAddress" prop="dataAddress">
      <el-select placeholder="请选择" v-model="spiderToEdit.dataAddress">
        <el-option v-for="item in spiderToEdit.dataAddressEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="DataBase" prop="dataBase">
      <el-select placeholder="请选择" v-model="spiderToEdit.dataBase">
        <el-option v-for="item in spiderToEdit.dataBaseEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Repeat" prop="repeat">
      <el-select placeholder="请选择" v-model="spiderToEdit.repeat">
        <el-option v-for="item in spiderToEdit.repeatEnum" :key="item" :value="item"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="EntryName" prop="entryName">
      <el-input v-model="spiderToEdit.entryName"></el-input>
    </el-form-item>
    <el-form-item label="LoginUrl" prop="loginUrl">
      <el-input v-model="spiderToEdit.loginUrl"></el-input>
    </el-form-item>
    <el-form-item label="UserName" prop="userName">
      <el-input v-model="spiderToEdit.userName"></el-input>
    </el-form-item>
    <el-form-item label="UserNameKey" prop="userNameKey">
      <el-input v-model="spiderToEdit.userNameKey"></el-input>
    </el-form-item>
    <el-form-item label="Pwd" prop="pwd">
      <el-input v-model="spiderToEdit.pwd"></el-input>
    </el-form-item>
    <el-form-item label="PwdKey" prop="pwdKey">
      <el-input v-model="spiderToEdit.pwdKey"></el-input>
    </el-form-item>
    <el-form-item label="Identify" prop="identify">
      <el-input v-model="spiderToEdit.identify"></el-input>
    </el-form-item>
    <el-form-item label="IdentifyKey" prop="identifyKey">
      <el-input v-model="spiderToEdit.identifyKey"></el-input>
    </el-form-item>
    <el-form-item label="ParameterSubmit" prop="parameterSubmit">
      <el-input v-model="spiderToEdit.parameterSubmit"></el-input>
    </el-form-item>
    <el-form-item label="SessionAging" prop="sessionAging">
      <el-input v-model="spiderToEdit.sessionAging"></el-input>
    </el-form-item>
    <el-form-item label="FirstUrl" prop="firstUrl">
      <el-input v-model="spiderToEdit.firstUrl"></el-input>
    </el-form-item>
    <el-form-item label="FirstUrlParameters" prop="firstUrlParameters">
      <EditableTable :tableData="spiderToEdit.firstUrlParameters" :rowModel="urlParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="SecondUrl" prop="secondUrl">
      <el-input v-model="spiderToEdit.secondUrl"></el-input>
    </el-form-item>
    <el-form-item label="SecondUrlParameters" prop="secondUrlParameters">
      <EditableTable :tableData="spiderToEdit.secondUrlParameters" :rowModel="urlParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="HtmlDataRequests" prop="htmlDataRequests">
      <EditableTable :tableData="spiderToEdit.htmlDataRequests" :rowModel="htmlDataRequest"></EditableTable>
    </el-form-item>
    <el-form-item label="JsonUrl" prop="jsonUrl">
      <el-input v-model="spiderToEdit.jsonUrl"></el-input>
    </el-form-item>
    <el-form-item label="JsonParameters" prop="jsonParameters">
      <EditableTable :tableData="spiderToEdit.jsonParameters" :rowModel="jsonParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="JsonDownLoad" prop="jsonDownLoad">
      <el-input v-model="spiderToEdit.jsonDownLoad"></el-input>
    </el-form-item>
    <el-form-item label="JsonObject" prop="jsonObject">
      <el-input v-model="spiderToEdit.jsonObject"></el-input>
    </el-form-item>
    <el-form-item label="JsonField" prop="jsonField">
      <el-input v-model="spiderToEdit.jsonField"></el-input>
    </el-form-item>
    <el-form-item label="JsonSign" prop="jsonSign">
      <el-input v-model="spiderToEdit.jsonSign"></el-input>
    </el-form-item>
    <el-form-item label="EntryType" prop="entryType">
      <el-input v-model="spiderToEdit.entryType"></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model="spiderToEdit.address"></el-input>
    </el-form-item>
    <el-form-item label="AddressParameters" prop="addressParameters">
      <EditableTable :tableData="spiderToEdit.addressParameters" :rowModel="addressParameter"></EditableTable>
    </el-form-item>
    <el-form-item label="DataRepeat" prop="dataRepeat">
      <el-input v-model="spiderToEdit.dataRepeat"></el-input>
    </el-form-item>
    <el-form-item label="InsertSQL" prop="insertSQL">
      <el-input v-model="spiderToEdit.insertSQL"></el-input>
    </el-form-item>
    <el-form-item label="ErgodicData" prop="ergodicData">
      <el-switch v-model="spiderToEdit.ergodicData"></el-switch>
    </el-form-item>
    <el-form-item label="RepeatData" prop="repeatData">
      <el-switch v-model="spiderToEdit.repeatData"></el-switch>
    </el-form-item>
    <el-form-item label="IsLocal" prop="isLocal">
      <el-switch v-model="spiderToEdit.isLocal"></el-switch>
    </el-form-item>
    <el-form-item label="IsFtp" prop="isFtp">
      <el-switch v-model="spiderToEdit.isFtp"></el-switch>
    </el-form-item>
    <el-form-item label="IsDB" prop="isDB">
      <el-switch v-model="spiderToEdit.isDB"></el-switch>
    </el-form-item>
    <el-form-item label="LocalStr" prop="localStr">
      <el-input v-model="spiderToEdit.localStr"></el-input>
    </el-form-item>
    <el-form-item label="FtpStr" prop="ftpStr">
      <el-input v-model="spiderToEdit.ftpStr"></el-input>
    </el-form-item>
    <el-form-item label="DBStr" prop="dBStr">
      <el-input v-model="spiderToEdit.dBStr"></el-input>
    </el-form-item>
    <el-form-item label="Active" prop="active">
      <el-switch v-model="spiderToEdit.active"></el-switch>
    </el-form-item>
    <el-form-item label="Time" prop="time">
      <el-date-picker type="datetime" v-model="spiderToEdit.time" placeholder="选择日期时间" value-format="yyyy-MM-ddTHH:mm"></el-date-picker>
    </el-form-item>
  </el-form>
</template>

<script>
  import EditableTable from './EditForm/EditableTable.vue'
  export default {
    components: {
      EditableTable
    },
    data() {
      var validateName = (rule, value, callback) => {
        let reg = new RegExp(/'|#|&|\\|\/|:|\?|"|<|>|\*|\|/g)
        if (!value) {
          return callback(new Error('名称不能为空'))
        } else if (value.startsWith(' ') | value.endsWith(' ')) {
          return callback(new Error('名称不能以空格开始或结束'))
        } else if (reg.test(value) === true) {
          return callback(new Error('名称不能包含\'#&\\\/:?"<>*|'))
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
          typeEnum: ['直接采集', '间接采集'],
          type: '',
          httpRequestEnum: ['POST', 'GET'],
          httpRequest: '',
          dataHttpEnum: ['HTML', 'JSON'],
          dataHttp: '',
          dataTypeEnum: ['字符串', '图片', '文档'],
          dataType: '',
          dataAddressEnum: ['本地磁盘', 'FTP', '数据库'],
          dataAddress: '',
          dataBaseEnum: ['ORACLE', 'SQLServer'],
          dataBase: '',
          repeatEnum: ['Yearly', 'Monthly', 'Weekly', 'Daily', 'Hourly', 'Never'],
          repeat: '',
          entryName: '',
          loginUrl: '',
          userName: '',
          userNameKey: '',
          pwd: '',
          pwdKey: '',
          identify: '',
          identifyKey: '',
          parameterSubmit: '',
          sessionAging: '',
          firstUrl: '',
          firstUrlParameters: [],
          secondUrl: '',
          secondUrlParameters: [],
          htmlDataRequests: [],
          jsonUrl: '',
          jsonParameters: [],
          jsonDownLoad: '',
          jsonObject: '',
          jsonField: '',
          jsonSign: '',
          entryType: '',
          address: '',
          addressParameters: [],
          dataRepeat: '',
          insertSQL: '',
          ergodicData: true,
          repeatData: true,
          isLocal: true,
          isFtp: true,
          isDB: true,
          localStr: '',
          ftpStr: '',
          dBStr: '',
          active: true,
          time: '',
        },
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
          EntryName:[
            {validator:validateName, trigger:'blur'},
            {validator:validateName2, trigger:'blur'}
          ],
          Time:[
            {validator:validateStartTime, trigger:'blur'}
          ]
        },
        addingNew: true,
        formLabelWidth: '100px'
      }
    },
    computed: {
      isEqual () {
        if (this.$store.state.SpiderList.spiderToEdit === null) {
          return this.spiderToEdit.entryName === ''
        } else {
          return this.spiderToEdit.entryName === this.$store.state.SpiderList.spiderToEdit.entryName
        }
      },
      isContain () {
        return this.$store.state.SpiderList.filelist.includes(this.spiderToEdit.entryName.toLowerCase())
      }
    },
    methods: {
      // TODO:...
    }
  }
</script>