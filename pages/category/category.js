import { getSlideData, getSubcategory, getCategoryDetail } from '../../network/category.js'

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideTitleList:[],
    currentIndex:0,
    subCateList:[],
    showSubCate:[],
    detailList:[],
    cateDetailList:[],
    showDetailList:[],
    miniKey:[],
    maitKey:[],
    curMiniWallkey: "10062603",

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getSlidetitle()  

  },
  slideClick(e) {
    /* console.log(e) */
    const clickIndex = e.currentTarget.dataset.index;
    const clickminiKey = e.currentTarget.dataset.item.miniWallkey;
    const clickmaitKey = e.currentTarget.dataset.item.maitKey;

    console.log(clickIndex, clickminiKey, clickmaitKey)
    this.setData({
      currentIndex: clickIndex,
      curMiniWallkey: clickminiKey
    })
    if (
      this.data.miniKey.includes(clickminiKey) &&
      this.data.maitKey.includes(clickmaitKey)
    ) {
/*       for (let i in this.data.subCateList[clickIndex]) {
        this.setData({
          ['showSubCate[' + (this.data.subCateList.length + i) + ']']: this.data.subCateList[clickIndex][i]
        })
      } */
      this.setData({
        showSubCate : this.data.subCateList[index]
      })
      /* for (let i in this.data.cateDetailList[clickIndex][clickIndex]) {
        this.setData({
          ['showDetailList[' + (this.data.showDetailList.length + i) + ']']: this.data.showDetailList[clickIndex][clickIndex][i]
        })
      } */
      this.setData({
        showDetailList: this.data.cateDetailList[clickIndex][clickIndex]
      })
    } else {
      const mini = `miniKey[${clickIndex}]`
      const mait = `maitKey[${clickIndex}]`
      this.setData({
        [mini]: clickminiKey,
        [mait]: clickmaitKey
      })
      this.getCateDetail(this.data.curMiniWallkey, "sell", clickIndex);
      this.getCateDetail(this.data.curMiniWallkey, "pop", clickIndex);
      this.getCateDetail(this.data.curMiniWallkey, "new", clickIndex);
      this.getSubcate(clickmaitKey, clickIndex);
    }
    /* console.log(this.data.miniKey,this.data.maitKey) */
  },
  getSlidetitle(){
    getSlideData().then(res=>{
      /* console.log(res) */
      const titleList = res.data.data.category.list
      /* console.log(titleList) */

      this.setData({
        slideTitleList : titleList
      })

      if (this.data.slideTitleList.length>0){
        this.getSubcate(this.data.slideTitleList[0].maitKey,0)
        this.getCateDetail(this.data.slideTitleList[0].miniWallkey, 'sell', 0)
        this.getCateDetail(this.data.slideTitleList[0].miniWallkey, 'pop', 0)
        this.getCateDetail(this.data.slideTitleList[0].miniWallkey, 'new', 0)
        this.data.miniKey.push(this.data.slideTitleList[0].miniWallkey);
        this.data.maitKey.push(this.data.slideTitleList[0].maitKey);
      }  

    })
  },
  getSubcate(key,index){
    getSubcategory(key).then(res=>{
      /* console.log(res) */
      const dList = `subCateList[${index}]`
      this.setData({
        [dList] : res.data.data.list
      })

      if (this.data.subCateList.length > 1) {
        this.setData({
          showSubCate : this.data.subCateList[index]
        })
      }else{ 
        this.setData({
          showSubCate: this.data.subCateList[0]
        })
      }

      
    })
  },
  getCateDetail(key, type, index){
    getCategoryDetail(key, type).then(res=>{
      /* console.log(res) */
      
      /* const ctDetailList = this.data.cateDetailList[index]; */
      const dIndex = `cateDetailList[${index}]`
      this.data.detailList.push(res.data)

      this.setData({
        [dIndex]: this.data.detailList
      })
      /* console.log(this.data.cateDetailList) */

      if (this.data.cateDetailList.length > 1) {
 
        this.setData({
          showDetailList: this.data.cateDetailList[index][index]
        })
        
      }else{
        this.setData({
          showDetailList: this.data.cateDetailList[0][0]
        })
      }
      /* console.log(this.data.cateDetaiList) */
    })
  },

  tabClick(e){
    /* console.log(e) */
    const index = e.detail.index;
    
/*     for (let i in this.data.cateDetailList[this.data.currentIndex][index]) {
      this.setData({
        ['showDetailList[' + (this.data.showDetailList.length + i) + ']']: this.data.showDetailList[this.data.currentIndex][index][i] */
      this.setData({
        showDetailList : this.data.cateDetailList[this.data.currentIndex][index]
      })
     }

  
})