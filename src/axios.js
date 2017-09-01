/**
 * Created by zjy on 2017/7/31.
 */
import axios from 'axios'
export default{
  install(vue){;
  var iAxios = axios.create({
    baseURL:"https://cnodejs.org/api/v1",
    headers: {'X-Custom-Header':'foobar'}
  });
    vue.prototype.$http = iAxios;
  }
}
