import axios from '../libs/axios.min.js';
import qs from '../libs/qs.js';

// 服务器基础地址
const BASE_URL = 'https://service.huhuiyu.top/teach_project_service';
// token相关
const TOKEN_KEY = 'teach_project_token';
// 保存token信息到本地
function saveToken(data) {
  if (data && data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
}
// 读取本地保存的token
function loadToken() {
  let token = localStorage.getItem(TOKEN_KEY);
  return token ? token : '';
}

let ajax = {
  // 1：请求的地址，2：请求的参数（json格式）
  // 3：应答结果的处理（回调）函数，4：请求方式，可选,默认为POST
  send: (url, params, callback, method = 'POST') => {
    // 参数和地址处理
    let rdata = qs.stringify(params, { allowDots: true });
    // get请求是处理url
    let rurl = BASE_URL + url;
    if ('get' == method.toLowerCase()) {
      rurl = rurl + '?' + rdata;
      rdata = '';
    }
    // axios的ajax请求
    let promise = axios({
      url: rurl,
      data: rdata,
      method: method,
      headers: {
        token: loadToken(),
      },
    });
    // 请求的结果处理
    promise
      .then((resp) => {
        console.log('应答结果', resp);
        // 正常请求结果
        saveToken(resp.data);
        callback(resp.data);
      })
      .catch((err) => {
        console.error('请求错误', err);
        callback({ success: false, message: '请求异常' });
      });
  },
};

let info = {};

export default ajax;
// 多个对象导出
export { ajax as ajax, info as info };
