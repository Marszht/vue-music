<template>
  <div class="recommend">
       <scroll  class="recommend-content" ref="scroll">
   <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="(item,index) in recommends" :key="index">
            <a :href="item.linkUrl">
            <img :src="item.picUrl" alt="" class="needclick">
            </a>
          </div>
        </slider>
      </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌曲推荐</h1>
      <ul>
        <li class="item" v-for="(item, index) in musicData" :key="index" >
          <div class="icon">
            <img :src="item.musicImgSrc" width="60" height="60" alt="">
          </div>
          <div class="text">
            <h2 class="name">{{item.name}}</h2>
            <p class="desc">{{item.desc}}</p>
          </div>
        </li>
      </ul>
      </div>
     <div class="tips">没有更多歌曲了~</div>
     </scroll>
      </div>
       </template>

<script>
import { getRecommend, getDiscList } from 'api/recommend.js'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
export default {
  data() {
    return {
      // 获取的轮播图数据存在里面
      recommends: [],
      musicData: []
    }
  },
  components: {
    'slider': Slider,
    'scroll': Scroll
  },
  created() {
    this.setTimeout(() => {
      this._getRecommend()
    }, 20)
    this.$refs.scroll.refresh()
    this.$nextTick(() => {
      this._getDiscList()
    })
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
          // console.log(res.data.slider)
        }
      })
    },
    // 专辑列表
    _getDiscList() {
      getDiscList().then((res) => {
        // 对数据进行解构
        this.musicData = (res.data.musicData)
        console.log(res.data.musicData)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.recommend
  position: fixed;
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display flex
          box-sizing border-box
          align-items center
          padding 0 20px 20px 20px
          .icon
           flex 0 0 60px
           width 60px
           padding-right 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
  .tips
    text-align: center;
    margin: 12px auto;
    widows: 200px;
    font-size: 80%;
    color: gray;
</style>
