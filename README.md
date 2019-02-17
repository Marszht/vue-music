# vue-music
vue-music-program
 ### 项目简介：
 >  一款基于 vue的 移动端webApp, 所有数据都是从线上获取。 有： 推荐 ，热门， 歌手， 搜索 四个模块。实现歌手歌曲的播放，歌单的处理等  

 **项目演示**  
 ![music](./imgs/vueMusic.gif)

 ### 技术栈
  - [vue-cli](https://cli.vuejs.org/zh/guide/) @2.0 脚手架的搭建
  - [vue-router](https://router.vuejs.org/zh/) 顶部 tab切换
  - [vuex](https://vuex.vuejs.org/zh/) 歌曲播放状态的处理
  - [axios](https://github.com/axios/axios) 数据的获取
  - [jsonp](https://github.com/webmodules/jsonp) qq音乐接口的会有同源策略的限制，需要jsonp 跨域
  - [better-scroll](https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/#better-scroll%20%E6%98%AF%E4%BB%80%E4%B9%88) 一款移动端支持各种滚动场景的插件  
  -[webpack](https://webpack.docschina.org/) 打包编译
  -[stylus](https://stylus.bootcss.com/) css 预处理工具
  **...**

  #### 下载
  > git clone https://github.com/Marszht/vue-music.git
  #### 安装依赖
  >  cd vue-music   
  >  npm install

  #### 运行
  > npm run dev 
  
  #### 打包
  > npm run build
