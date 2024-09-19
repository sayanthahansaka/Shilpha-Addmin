import axios from "axios"
import apiConfig from "./apiConfig"
// import * as constant from "../configs/constant"
import Cookies from "js-cookie"
// import swal from "sweetalert"


let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })

  failedQueue = []
}

const instance = axios.create()

instance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const { config, response } = error
    const originalRequest = config
    
    if (response && response.status === 401) {
      if (originalRequest._retry) {
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      const URL = `${apiConfig.serverUrl}/${apiConfig.basePath}/auth/refresh-token`
      const config = {
        headers: {
          Authorization: `Bearer ${Cookies.get("ACCESS_TOKEN")}`,
          isRefreshToken: true
        }
      }

      return new Promise(function (resolve, reject) {
        axios
          .post(`${URL}`, {}, config)
          .then(({ data }) => {
            Cookies.set("ACCESS_TOKEN", data.result)
            instance.defaults.headers.common["Authorization"] = `Bearer ${data.result}`
            originalRequest.headers["Authorization"] = `Bearer ${data.result}`
            processQueue(null, data.result)
            resolve(axios(originalRequest))
          })
          .catch((err) => {
            processQueue(err, null)
             window.location.href = "/login"
            // swal({
            //   title: "Session expired. Please login again",
            //   closeOnClickOutside: false,
            //   buttons: {
            //     dangerMode: {
            //       text: "Okay",
            //       value: "action",
            //       className: "okay-btn"
            //     }
            //   }
            // }).then((value) => {
            //   if (value === "action") {
            //     Cookies.remove("ACCESS_TOKEN")
            //     localStorage.removeItem("LOCAL_STORAGE_KEY")
            //     // history.push('/login')
            //     window.location.href = "/login"
            //   }
            // })
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    return Promise.reject(error)
  }
)

export default instance
