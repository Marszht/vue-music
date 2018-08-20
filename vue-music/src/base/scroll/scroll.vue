<template>
  <div ref="wrapper">
    <slot/>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    // 动态数据
    data: {
      type: Array,
      default: null
    },
    // 是否让scroll监听滚动事件
    // 推荐列表的滚动就不需要listenScroll
    listenScroll: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 确保能够滑动 初始化
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll() {
      // 如果这个ref不存在， 则返回
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 外部的参数
        probeType: this.probeType,
        click: this.click
      })
      // 如果没scroll监听了
      if (!this.listenScroll) {
        // this 指向当前vue 实例
        let me = this
        // pos 位置对象有 x y 属性 而下面this 指向scroll实例
        this.scroll.on('scroll', (pos) => {
          me.$emit('scroll', pos)
        })
      }
    },
    // 启动better-scroll
    enable() {
      this.scroll && this.scroll.enable()
    },
    // 禁用better-scroll
    disable() {
      this.scroll && this.scroll.disable()
    },
    // 当DOM 发生改变时 重新刷新，否则不发生滑动
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    // 会接受一些参数使其滑倒相应位置
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: {
    // 监听数据变化 ，如果变化，则重新refresh
    data() {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style>

</style>
