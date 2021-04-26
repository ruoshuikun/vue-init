/**
 * @desc: 项目公用工具类，非公用不能写入该文件
 * @author: zhang lin
 * @update: 2021-03-25
 */
import moment from 'moment'
/**
 * 深拷贝
 * @param obj
 */
const copyDeep = (obj) => {
  if (obj) return JSON.parse(JSON.stringify(obj))
}

/**
 * 检测图片是否存在
 * @param url
 */
const imageIsExist = (url) => {
  return new Promise((resolve) => {
    var img = new Image()
    img.onload = function () {
      if (this.complete == true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      resolve(false)
      img = null
    }
    img.src = url
  })
}

/**
 * 数据反序列化
 * @param obj
 */
const parseJSON = (obj) => {
  if (obj && typeof obj === 'string') return JSON.parse(obj)
}

/**
 * 小数转百分比
 * @param point
 */
const toPercent = (point) => {
  if (typeof point === 'string' && point.includes('%')) {
    return point
  }
  if (point == 0) return 0
  let str = Number(point * 100).toFixed()
  str += '%'
  return str
}

/**
 * 验证是不是时间戳
 * @param val
 */
const isTimeStamp = (val) => {
  const reg = /^\d{13}$/
  if (val && reg.test(val)) {
    return moment(parseInt(val)).format('YYYY-MM-DD HH:MM:SS')
  } else {
    return val
  }
}

/**
 * usernmae : 用户名 默认为无
 * size ：头像大小 默认为 30
 * color ：字体颜色
 * canvasId ：canvas容器的id
 * */
const generatorAvator = ({ username, size, bgcolor, canvasId = 'avator' }) => {
  //设置头像昵称，如果为null或者为空时，设置为无
  var nickname = username == null ? '无' : username == '' ? '无' : username

  //设置头像大小
  var avatarSize = size == null ? 60 : size

  //设置头像内部文字大小
  var fontSize = size == null ? 12 : avatarSize / 4

  //设置头像内部字体
  var fontWeight = 'normal'

  //设置头像背景颜色
  var colors = [
    '#31bc9f',
    '#33cc70',
    '#4a94db',
    '#9b5fb6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1cb1e',
    '#e6761b',
    '#e7363b',
    '#00bcd4',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d',
  ]
  var avatarColor =
    bgcolor == null
      ? colors[Math.floor(Math.random() * colors.length)]
      : bgcolor == ''
      ? bgcolor
      : colors[Math.floor(Math.random() * colors.length)]

  /*根据id获取canvas
   * 如果为空，则创建新的canvas
   * */
  var canvas = document.getElementById(canvasId)
  if (canvas) {
    canvas.remove()
  } else {
    // var newcanvas =
    //   "<canvas id='" + canvasId + "' style='display:none'></canvas>"
    // console.info('???', document.getElementsByName('body'))

    // document.getElementsByName('body').appendChild(newcanvas)

    var frameDiv = document.createElement('canvas') //创建一个标签
    frameDiv.setAttribute('id', canvasId)
    frameDiv.style.display = 'none'
    var bodyFa = document.body //通过id号获取frameDiv 的父类（也就是上一级的节点）
    bodyFa.appendChild(frameDiv) //把创建的节点frameDiv 添加到父类body 中；

    canvas = document.getElementById(canvasId)
  }

  //初始化canvas设置
  canvas.width = avatarSize
  canvas.height = avatarSize
  var context = canvas.getContext('2d')

  //头像背景颜色设置
  context.fillStyle = avatarColor
  context.fillRect(0, 0, canvas.width, canvas.height)

  //头像字体颜色设置
  context.fillStyle = '#FFFFFF'
  context.font = fontWeight + ' ' + fontSize + 'px sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  if (nickname.length === 4) {
    context.fillText(nickname.charAt(0), avatarSize / 4, avatarSize / 4)
    context.fillText(
      nickname.charAt(1),
      avatarSize - avatarSize / 4,
      avatarSize / 4
    )
    context.fillText(
      nickname.charAt(2),
      avatarSize / 4,
      avatarSize - avatarSize / 4
    )
    context.fillText(
      nickname.charAt(3),
      avatarSize - avatarSize / 4,
      avatarSize - avatarSize / 4
    )
  } else {
    context.fillText(nickname, avatarSize / 2, avatarSize / 2)
  }

  // document.getElementById(avatarContainerId).src = canvas.toDataURL('image/png')
  return canvas.toDataURL('image/png')
}

export {
  copyDeep,
  imageIsExist,
  parseJSON,
  toPercent,
  isTimeStamp,
  generatorAvator,
}
