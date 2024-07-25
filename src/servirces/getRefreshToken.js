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
