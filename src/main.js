import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'assets/styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import { imageIsExist, generatorAvator } from './utils/tool'

//条件引入模拟服务器 MockJS优先级高于域名代理 会导致远程API无法访问
//小心,Boolean('false')等于true 'false'不等于false
eval(process.env.VUE_APP_MOCK) && require('@/mock')

const app = createApp(App)

// 添加全局图片前缀
app.provide('imgBaseUrl', 'http://baidu.com')

//全局注册自定义指令，用于判断当前图片是否能够加载成功，可以加载成功则赋值为img的src属性，否则使用默认图片
app.directive('real-img', async (el, binding, row) => {
  //指令名称为：real-img
  let imgURL = binding.value //获取图片地址
  // 如果是 png 需要替换后缀
  if (imgURL.includes('.png')) {
    const [prefix] = imgURL.split('.png')
    imgURL = prefix + '.png?x-oss-process=style/t04'
  }

  if (imgURL) {
    let exist = await imageIsExist(imgURL)
    if (exist) {
      el.setAttribute('src', imgURL)
    } else {
      const {
        props: { nameAlias, size },
      } = row
      /* 
        图片加载失败，替换默认图片
        「注意：在这里设置默认图片，页面会先显示加载失败，再替换为默认图片。
        如果你感觉体验不好，可以直接在 <img/> 中添加 :src="require('imgs/default.jpeg') "」
      */
      el.setAttribute('src', require('imgs/default.jpeg'))
      // 图片加载失败，替换成文字
      //   el.setAttribute('src', generatorAvator({ username: nameAlias, size }))
    }
  }
})
// 自定义指令 点击其它位置隐藏
app.directive('click-outside', {
  // 绑定元素的父组件被挂载时调用
  mounted(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false
      }

      // 判断指令中是否绑定了函数
      if (binding.value) {
        // 如果绑定了函数 则调用那个函数，此处 binding.value 就是 handleClose 方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  // 卸载绑定元素的父组件时调用
  unmounted(el) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  },
})

app.config.globalProperties.$ELEMENT = { size: 'small' }

app.use(store).use(router).use(ElementPlus).mount('#app')
