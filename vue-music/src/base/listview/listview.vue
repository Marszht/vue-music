<template>
<scroll class="listview"
        :data="data"
        ref="listview"
        :listenScroll="listenScroll"
        @scroll="scroll"
        :probe-type="probeType">
  <ul>
  <li v-for="(group, index) in data" class="list-group" :key="index" ref="listGroup">
 <h2 class="list-group-title">{{group.title}}</h2>
 <ul>
   <li v-for="(item, index) in group.items" :key="index" class="list-group-item">
     <img v-lazy="item.avatar" class="avatar" alt="">
     <span class="name">{{item.name}}</span>
   </li>
 </ul>
  </li>
</ul>
<div class="list-shortcut" @touchstart.stop.prevent="onshortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
  <ul>
    <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :key="index" :class="{'current': currentIndex === index}">{{item}}</li>
  </ul>
</div>
<!-- 不要首页标题 -->
<!-- <div class="list-fixed" v-show="fixedTitle">
 绑定currentIndex -->
  <!-- <div class="fixed-title">{{fixedTitle}}</div>
</div> --> -->
<!-- 如果还没获取到数据就loading -->
<div class="loading-container" v-show="!data.length">
  <loading/>
</div>
</scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import Loading from 'base/loading/loading'

const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30

export default {
  data() {
    return {
      // 检测实时滚动位置
      scrollY: -1,
      currentIndex: 0,
      diff: -1,
      probeType: 3,
      listenScroll: true,
      listHeight: [],
      touch: {}
    }
  },
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  components: {
    'scroll': Scroll,
    'loading': Loading
  },
  created() {
    // 这里面定义的data 不放 data里面是因为vue data会实时更新
    // 然后模板会重新渲染 而这里的不需要
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    // 歌手页标题
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      // console.log(this.data[this.currentIndex])
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    onshortcutTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      // 点击会滑倒右侧歌手相应列表
      // 更好封装 作为一个函数
      this._scrollTo(anchorIndex)
    },
    // 按住可以滚动 到相应歌手位置
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      // console.log(anchorIndex)
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      // 实时获取y轴位置
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      // 右侧快速导航栏无内容时 就直接返回不会报错
      if (!index && index !== 0) {
        return
      }
      // 导航栏最上面一点点
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      // 第二个参数，是否由滚动动画 所以为0
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    }
  },
  scrollY(newY) {
    const listHeight = this.listHeight
    // 当滚动到顶部，newY>0
    if (newY > 0) {
      this.currentIndex = 0
      return
    }
    // 在中间部分滚动
    for (let i = 0; i < listHeight.length - 1; i++) {
      let height1 = listHeight[i]
      let height2 = listHeight[i + 1]
      if (-newY >= height1 && -newY < height2) {
        this.currentIndex = i
        this.diff = height2 + newY
        console.log(this.currentIndex)
        return
      }
    }
    // 当滚动到底部，且-newY大于最后一个元素的上限
    this.currentIndex = listHeight.length - 2
  },
  diff(newVal) {
    let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
    // diff 实时变化
    if (this.fixedTop === fixedTop) {
      return
    }
    this.fixedTop = fixedTop
    this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

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
