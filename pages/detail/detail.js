import { getDetail, getRecommend, Goods, Shop, GoodsParams} from '../../network/detail.js'
// pages/detail/detail.js
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [],
    detailGoods: {},
    detailShop: {},
    detailInfo: {},
    detailParam: {},
    commentInfo: {},
    detailInfoImage:[],
    recommend:[],
    selectColor:false,
    overflow:true,
    backtop:false,
    scrolltop:0,
    iid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const iid = options.iid
    this.getDetailData(iid)
  },
  getDetailData(iid){
    getDetail(iid).then(res=>{
      /* console.log(res) */
      const data = res.data.result;

      this.setData({
        iid : iid
      })

      const swiperdata = data.itemInfo.topImages
      for(let i=0;i<swiperdata.length;i++){
        this.setData({
          [`swiperImg[${i}]`]: swiperdata[i]
        })
      }
      this.setData({
        detailGoods : new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      })
      // 创建店铺信息的对象
      this.setData({
        detailShop : new Shop(data.shopInfo)
      })
      // 保存商品的详情数据
      this.setData({
        detailInfo : data.detailInfo
      })
      // 获取参数信息
      this.setData({
        detailParam : new GoodsParams(data.itemParams.info, data.itemParams.rule)
      })
      // 获取评论信息
      // 判断是否有评论
      if (data.rate.cRate !== 0) {
        this.setData({
          commentInfo : data.rate.list[0]
        })
      }
      // 分解大量详情图片
      for (let i of this.data.detailInfo.detailImage){
        let list = i.list;
        for(let item of list){
          /* console.log(item) */
          this.setData({
            [`detailInfoImage[${this.data.detailInfoImage.length}]`] : item
          })
        }
      }

      // 获取推荐数据
      getRecommend().then(res => {
        for (var i = 0; i < res.data.data.list.length;i++){
          let item = res.data.data.list[i]
          this.setData({
            [`recommend[${this.data.recommend.length}]`] : item
          })
        }
      })
      /* console.log(this.data.recommend) */
    })
  },
  selectClick(){
    this.setData({
      selectColor: !this.data.selectColor
    })
  },
  addToCart(){
    const product = {}
    product.title = this.data.detailGoods.title
    product.image = this.data.swiperImg[0]
    product.desc = this.data.detailGoods.desc
    product.price = this.data.detailGoods.nowPrice
    product.iid = this.data.iid
    product.ischeck = false

    // 2.将信息传入globalData
    product.count = 1
    let oldCartList = app.globalData.cartGoods.find(item => { return item.iid === product.iid })
    if(oldCartList){
      app.globalData.cartGoods.find(item => item.iid === product.iid).count++
    }else{
    app.globalData.cartGoods.push(product)
    }



  },
  overnaviClick(){
    this.setData({
      overflow: !this.data.overflow
    })
  },
  scrollTo(e){
    /* console.log(e); */
    const scrollTop = e.detail.scrollTop;
/*     this.setData({
      scrollTop : scrollTop
    }) */

    if (scrollTop >= 1500) {
      this.setData({
        backtop: true
      })
    } else {
      this.setData({
        backtop: false
      })
    }
  },
  scrollToTop(e){
    wx.pageScrollTo({
      scrollTop: 0
    })
  }
})