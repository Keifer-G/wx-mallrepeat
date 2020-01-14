// pages/home/home.js
const app = getApp()
import { getRecData, getHomeGoods } from '../../network/home.js'
import { getDetail } from '../../network/detail.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [],
    recommendData: [],
    goods: {
      sell: { page:0,list:[] },
      pop: { page:0,list: [] },
      new: { page:0,list: [] }
    },
    currentType:'sell',
    currentIndex:0,
    iid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播和推荐数据
    getRecData().then(res => {
      /* console.log(res) */
      const banners = res.data.data.banner.list
      const recommends = res.data.data.recommend.list
      /* console.log(banners,recommends) */
      this.setData({
        swiperData: banners,
        recommendData: recommends
      })
    })
    
    // 获取goods商品数据
    this.getHomeGoodsData('sell') 
    this.getHomeGoodsData('pop')
    this.getHomeGoodsData('new') 
  },
  getHomeGoodsData(type) {
    const page = this.data.goods[type].page + 1;
    getHomeGoods(type,page).then(res=>{
    /*   console.log(page) */
      const list = this.data.goods[type].list
      list.push(...res.data.data.list)

      // 
      const listKey = `goods.${type}.list`
      const pageKey = `goods.${type}.page`
      this.setData({
        // 要识别外部变量需要加上中括号
        [listKey] : list,
        [pageKey] : page
      })

      
    })
  },
  tabClick(e){
    const cIndex = e.detail.index;
    /* console.log(cIndex) */
    this.setData({
      currentIndex : cIndex
    })

    if (cIndex === 0){
      this.setData({
        currentType:'sell'
      })
    }
    if (cIndex === 1) {
      this.setData({
        currentType: 'pop'
      })
    }
    if (cIndex === 2) {
      this.setData({
        currentType: 'new'
      })
    } 
  },
  loadMore(){
    this.getHomeGoodsData(this.data.currentType)
  }
})