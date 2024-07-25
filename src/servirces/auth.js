import ApiService from './apiService'

export async function loginUser(userCredentials) {
    const apiObject = {}
    apiObject.method = "POST"
    apiObject.authentication = false
    apiObject.endpoint = "auth/signin"
    apiObject.body = userCredentials
    apiObject.type = "AUTH"
    return await ApiService.callApi(apiObject)
}

// export async function renewToken(token) {
//     const apiObject = {}
//     apiObject.method = 'POST'
//     apiObject.authentication = false
//     apiObject.endpoint = 'auth/refreshToken'
//     apiObject.body = { refreshToken: token }
//     apiObject.type = "REFRESH_TOKEN"
//     return await ApiService.callApi(apiObject) 
// }
// import axios from "axios"
// import Cookies from 'cookies-js'

// export default async function getRT() {
//     const token = Cookies.get('ACCESS_TOKEN')
//     const config = {
//         Authorization: `Bearer ${token}`,
//         isRefreshToken: true
//     }

//     const result = await axios.post('http://103.125.216.56:8096/api/v1/auth/refreshToken', {}, { headers: config })
//     console.log('refresh token : ', result.data.result)
//     const refreshToken = result.data.result
//     return refreshToken

// }

