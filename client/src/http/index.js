import axios from 'axios'
import { Loading } from 'element-ui'
import { Message } from 'element-ui'
import router from '../router/index'

let loading 
function start() {
  loading=Loading.service({
    lock:true,
    text:"拼命加载中.......",
    background:'rgba(0,0,0,.7)'
  })
}

function end() {
  Loading.service({
    lock:true,
    text:"拼命加载中.......",
    background:'rgba(0,0,0,.7)'
  }).close()
}
// 请求拦截
axios.interceptors.request.use(config=>{
  start()
  if(localStorage.eleToken){
    config.headers.Authorization=localStorage.eleToken

  }
  return config
},error=>{
  return  Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response=>{
  end()
  return response
},error=>{
  end()
  Message.error(error.response.data)
  const { status } = error.response
  if(status==401){
    Message.error("token失效，请重新登录")
    localStorage.removeItem('eleToken')
    router.push('/login')
  }
  return  Promise.reject(error)
})

export default axios