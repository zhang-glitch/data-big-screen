
import request from './request.js'

function getScreenDate() {
  return request({
    url: '/screen/data',
    method: 'get'
  })
}


function getScreenMap() {
  return request({
    url: '/screen/map',
    method: 'get'
  })
}

export default {
  getScreenDate,
  getScreenMap
}
