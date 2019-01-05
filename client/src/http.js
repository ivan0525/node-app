import axios from 'axios'
import { Message, Loading } from 'element-ui';

let loading;
// 加载动画方法
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, .7)'
  });
}
// 关闭加载动画方法
function endLoading() {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  startLoading()
  return config
}, error => {
  return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response => {
  // 结束加载动画
  endLoading()
  return response
}, error => {
  // 错误提醒
  endLoading()
  Message.error(error.response.date)
  return Promise.reject(error)
})
export default axios
