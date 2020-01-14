const app  = getApp()
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastList:0,
    totalPrice: '￥0.00',
    productList:[],
    allcheck:false,
    checkList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      productList: app.globalData.cartGoods
    })


    // 为数据添加ischeck属性
    this.data.productList.forEach((item,index)=>{
      this.setData({
        [`productList[${index}].ischeck`]: app.globalData.cartGoods[index].ischeck,
        [`productList[${index}].index`] : index
      })

    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log(app.globalData.cartGoods)
  },
  checkClick(e){
    /* console.log(e) */
    const itemIndex = e.currentTarget.dataset.itemInfo.index
    app.globalData.cartGoods[itemIndex].ischeck = !app.globalData.cartGoods[itemIndex].ischeck
    this.setData({
      [`productList[${itemIndex}].ischeck`]: app.globalData.cartGoods[itemIndex].ischeck
    })

    // 监听全选事件
    this.setData({
      checkList : app.globalData.cartGoods.filter(item => {
        return item.ischeck
      })
    })

    if (this.data.checkList.length === this.data.productList.length){
      this.setData({
        allcheck : true
      })
    }else{
      this.setData({
        allcheck : false
      })
    }



    // 计算价格 和 数目
    function total(ob) {
      return '￥' + ob.reduce((prevValue, curValue) => {
        return prevValue + curValue.price * curValue.count
      }, 0).toFixed(2)
    }
    function last(ob) {
      return ob.reduce((prevValue, curValue) => {
        return prevValue + curValue.count
      }, 0) 
    }
    this.setData({
      totalPrice: total(this.data.checkList),
      lastList: last(this.data.checkList)
    })

  }, 
  allClick(){
    if(this.data.allcheck){
      this.setData({
        allcheck : false
      })
      app.globalData.cartGoods.forEach((item, index) => {
        item.ischeck = false
        this.setData({
          [`productList[${index}].ischeck`] : item.ischeck
        })
      })
      //点击计算价格 和 计算数目
      this.setData({
        totalPrice: '￥' + 0.00,
        lastList: 0
      })

    }else{
      this.setData({
        allcheck: true
      })
      app.globalData.cartGoods.forEach((item, index) => {
        item.ischeck = true
        this.setData({
          [`productList[${index}].ischeck`]: item.ischeck
        })
      })
      // 点击计算价格
      function total(ob) {
        return '￥' + ob.reduce((prevValue, curValue) => {
          return prevValue + curValue.price * curValue.count
        }, 0).toFixed(2)
      }
      function last(ob){
        return ob.reduce((prevValue, curValue) => {
          return prevValue + curValue.count
        }, 0)
      }
      this.setData({
        totalPrice: total(app.globalData.cartGoods),
        lastList: last(app.globalData.cartGoods)
      })    
    }
  }
})