import request from './index.js'

export function getRecData(){
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    data: {
      type,
      page
    }
  })
}