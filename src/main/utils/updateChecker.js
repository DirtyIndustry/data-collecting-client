import {dialog, shell} from 'electron'
import axios from 'axios'
import pkg from '../../../package.json'
const version = pkg.version
const release = 'https://api.github.com/repos/DirtyIndustry/data-collecting-client/releases/latest'
const downloadUrl = 'https://github.com/DirtyIndustry/data-collecting-client/releases/latest'

const checkVersion = async () => {
  let path = require('path')
  let fs = require('fs')
  let filepath = path.join(__static, 'configuration.json')
  let content = fs.readFileSync(filepath).toString()
  let configuration = JSON.parse(content)
  if (configuration.update === true) {
    const res = await axios.get(release)
    if (res.status === 200) {
      const latest = res.data.name
      const result = compareVersion2Update(version, latest)
      if (result) {
        dialog.showMessageBox({
          type: 'info',
          title: '发现新版本',
          buttons: ['Yes', 'No'],
          message: '发现新版本，是否下载最新的版本？',
          checkboxLabel: '以后不再提醒',
          checkboxChecked: false
        }, (res, checkboxChecked) => {
          if (res === 0) {
            shell.openExternal(downloadUrl)
          }
          fs.writeFile(filepath, JSON.stringify(configuration), err => {
            if (err) {
              return console.log(err)
            }
          })
        })
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

const compareVersion2Update = (current, latest) => {
  const currentVersion = current.split('.').map(item => parseInt(item))
  const latestVersion = latest.split('.').map(item => parseInt(item))
  let flag = false
  for (let i = 0; i < 3; i++) {
    if (currentVersion[i] < latestVersion[i]) {
      flag = true
    }
  }
  return flag
}

export default checkVersion
