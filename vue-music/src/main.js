// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 要在头部引入 babel-polify
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
// 懒加载包
import VueLazyload from 'vue-lazyload'
import 'common/stylus/index.styl'
// 使整个body 都没有 300毫秒延迟
fastclick.attach(document.body)
Vue.config.productionTip = false
// 在全局引入，然后后面的组件都可以用 把图片src 换成v-lazy
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
