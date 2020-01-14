import request from './index.js'

export function getSlideData(){
  return request({
    url:'/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: "/subcategory",
    data: {
      maitKey
    }
  });
}

export function getCategoryDetail(miniWallkey, type) {
  return request({
    url: "/subcategory/detail",
    data: {
      miniWallkey,
      type
    }
  });
}