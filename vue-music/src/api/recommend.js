import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

// 获取数据里面的方法
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  // 拼接数据 Object.assign
  const data = Object.assign({}, commonParams, {
    // 来自于 h5 平台
    platform: 'h5',
    uni: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
// 自己造数据
export function getDiscList() {
  const url = 'https://www.easy-mock.com/mock/5b6fccca0606f64bdf0bb5ad/albumLists/'
  return axios.get(url).then((res) => {
    return Promise.resolve(res)
  })
}