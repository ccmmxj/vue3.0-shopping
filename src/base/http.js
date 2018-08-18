import axios from 'axios'
import qs from 'qs'
import addr from './addr'

const http = {
  ajax (method, url, data, success, error) {
    axios({
      method: method,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      url: addr.host + url,
      withCredentials:true,
      data: qs.stringify(data)
    }).then((res) => {
      success(res.data)
    }).catch((err) => {
      error(err)
    })
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$http = http
    Vue.prototype.$qs = qs
  }
}
