<template>
  <div>
    <div class="singer">
     <scroll class="listview"  ref="listview">
  <ul>
  <li v-for="(group, index) in singers" class="list-group" :key="index">
 <h2 class="list-group-title">{{group.title}}</h2>
 <ul>
   <li v-for="(item, index) in group.item" :key="index" class="list-group-item">
     <img :src="item.avatar" class="avatar" alt="">
     <span class="name">{{item.name}}</span>
   </li>
 </ul>
  </li>
</ul>
</scroll>
    </div>
  </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import ListView from 'base/listview/listview'
// 获取数据方法
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
const HOTE_NAME = '热门'
const HOT_SINGER_LEN = 10
export default {
  components: {
    'list-view': ListView,
    'scroll': Scroll
  },
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSingerList()
    // console.log()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        // console.log(ERR_OK)
        if (ERR_OK === res.code) {
          this.singers = res.data.list
          // 需要什么数据就用什么数据
          console.log(this._normalizeSinger(this.singers))
        }
      })
    },
    // 对需要的数据进行处理
    _normalizeSinger(list) {
      // 一个对象
      let map = {
        // 热门标签
        hot: {
          title: HOTE_NAME,
          items: []
        }
      }
      // 找到我们需要的参数 在list里面 遍历 forEach
      list.forEach((item, index) => {
        // 把前十条数据作为热门
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        // 如果没有 key 这个对象 就跟hot 一样
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 没有经过处理的对象
      console.log(map)
      // 为了得到有序表我们需要处理map
      let hot = [] // 放热门数据
      let res = [] // a-z中的数据
      for (let key in map) {
        let val = map[key]
        if (val.title === HOTE_NAME) {
          hot.push(val)
          // match()在正则里面检索
        } else if (val.title.match(/[a-zA-Z]/)) {
          res.push(val)
        }
      }
      // res里面的还是不是有序的，还得排序一i下
      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      // 经过处理的
      return hot.concat(res)
      // console.log(hot)
    }
  }
}
</script>

<style scoped lang="stylus">
 @import "~common/stylus/variable"
 .singer
  position fixed
  top 88px
  bottom 0
  width 100%
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
