import fs from 'fs'

export function readXml (filepath) {
  let xml = fs.readFileSync(filepath)
  let result = Xml2Obj(xml)
  return result
}

function Xml2Obj (xml) {
  let result = {}
  let xmlDoc = xml.toString()
  if (xmlDoc.startsWith('<')) {
    console.log('head')
  }
  if (xmlDoc.startsWith('<?')) {
    xmlDoc = xmlDoc.split('?>')
    xmlDoc = xmlDoc[xmlDoc.length - 1]
    xmlDoc = trimString(xmlDoc)
  }
  let endindex = xmlDoc.indexOf('>')
  let rootname = xmlDoc.substring(1, endindex)
  let startindex = ('<' + rootname + '>').length
  endindex = xmlDoc.indexOf('</' + rootname + '>')
  let root = xmlDoc.substring(startindex, endindex)
  root = trimString(root)
  let childnodes = GetChildNodes(root)
  for (let childnode of childnodes) {
    if (childnode.childnodes.length > 0) { // is Array
      result[childnode.nodename] = []
      for (let grandchild of childnode.childnodes) {
        let obj = {}
        for (let propnode of grandchild.childnodes) {
          obj[propnode.nodename] = parseValue(propnode.nodebody)
        }
        result[childnode.nodename].push(obj)
      }
    } else if (childnode.nodeprops.length > 0) { // is Object
      result[childnode.nodename] = Prop2Obj(childnode)
    } else { // is Property
      result[childnode.nodename] = parseValue(childnode.nodebody)
    }
  }
  return result
}

function GetChildNodes (node) {
  let childnodelist = []
  let restNodeDoc = node
  for (; restNodeDoc !== '';) {
    let nodename = ''
    let nodebody = ''
    let props = []
    let childnodes = []

    let endindex = restNodeDoc.indexOf('>')
    let nodehead = restNodeDoc.substring(1, endindex)
    if (nodehead.includes(' ')) { // has props
      nodehead.trim()
      let nodeheadarray = nodehead.split(' ')
      nodename = nodeheadarray[0]
      for (let i = 1; i < nodeheadarray.length; i++) {
        let proparray = nodeheadarray[i].split('=')
        let prop = {propname: proparray[0], propvalue: proparray[1].substring(1, proparray[1].length - 1)}
        props.push(prop)
      }
    } else { // dosen't have prop
      nodename = nodehead
    }
    let startindex = endindex + 1
    endindex = restNodeDoc.indexOf('</' + nodename + '>')
    if (endindex === -1) { // not a valid node
      break
    }
    nodebody = restNodeDoc.substring(startindex, endindex)
    nodebody = trimString(nodebody)
    childnodes = GetChildNodes(nodebody)
    restNodeDoc = restNodeDoc.substring(endindex + nodename.length + 3)
    restNodeDoc = trimString(restNodeDoc)
    let nodeobj = { nodename: nodename, nodebody: nodebody, nodeprops: props, childnodes: childnodes }
    childnodelist.push(nodeobj)
  }
  return childnodelist
}

function Prop2Obj (node) {
  let result = {}
  for (let prop of node.nodeprops) {
    result[prop.propname] = parseValue(prop.propvalue)
  }
  return result
}

function trimString (arg) {
  for (; arg.startsWith('\n');) {
    arg = arg.substring(1)
  }
  for (; arg.endsWith('\n');) {
    arg = arg.substring(0, arg.length - 1)
  }
  return arg.trim()
}

function parseValue (value) {
  let result = value
  if (result.toLowerCase() === 'true') {
    result = true
  } else if (result.toLowerCase() === 'false') {
    result = false
  } else if (!isNaN(result)) {
    result = parseInt(result)
  }
  return result
}
