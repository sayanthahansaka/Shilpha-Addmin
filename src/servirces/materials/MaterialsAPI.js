
import Cookies from 'cookies-js'
import apiService from '../apiService'

export async function getAllmaterials() {
  let allData = []
  let page = 0
  const pageSize = 10
  let moreData = true

  while (moreData) {
    const apiObject = {
      method: 'GET',
      authentication: true,
      endpoint: `materials/${page}/${pageSize}`,
      body: null
    }

    try {
      const response = await apiService.callApi(apiObject)
      console.log(`Full response for page ${page}:`, response)

      // Adjust the path to data if needed
      const materials = response.data // or response.result.data, adjust as necessary

      if (materials && Array.isArray(materials) && materials.length > 0) {
        allData = allData.concat(materials)
        page += 1
      } else {
        moreData = false
      }
    } catch (error) {
      console.error('Error fetching materials:', error)
      moreData = false
    }
  }

  console.log('All data:', allData) // Log the aggregated data
  return allData
}
// export async function AddMaterial(shopId, status) {
//     const apiObject = {}
//     apiObject.method = 'POST'
//     apiObject.authentication = true
//     apiObject.endpoint = 'materials/'
//     // apiObject.isBasicAuth = false
//     apiObject.urlencoded = false
//     apiObject.body = addMaterial
//     // apiObject.type = "AUTH"
//     return await ApiService.callApi(apiObject)
// }
// export async function AddMaterial(articleNo, materialName, qty, supplier) {
//     const formData = new FormData()
//     formData.append('articleNo', articleNo)
//     formData.append('materialName', materialName)
//     formData.append('qty', qty)
//     formData.append('supplier', supplier)
    
//     const apiObject = {
//       method: 'POST',
//       authentication: true, // Ensure this is correctly handled by your ApiService
//       endpoint: 'materials/',
//       body: formData
//     }
    
  
//     try {
//       const response = await apiService.callApi(apiObject)
//       console.log('Material added successfully:', response)
//       return response
//     } catch (error) {
//       console.error('Error adding material:', error)
//       throw error
//     }
//   }

export async function AddMaterial(articleNo, materialName, qty, supplier) {
  const materialData = {
    articleNo,
    materialName,
    qty,
    supplier
  }

  const apiObject = {
    method: 'POST',
    authentication: true, // Ensure this is handled by your ApiService
    endpoint: 'materials/',
    headers: {
      'Content-Type': 'application/json' // Setting content type for JSON payload
    },
    body: JSON.stringify(materialData) // Convert the object to a JSON string
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log('Material added successfully:', response)
    return response
  } catch (error) {
    console.error('Error adding material:', error)
    throw error
  }
}

export async function updateMaterial(id, qty, supplier) {
    // Create a FormData object
    const formData = new FormData()
    formData.append('id', id)
    formData.append('qty', qty)
    formData.append('supplier', supplier)
  
    const apiObject = {
      method: 'PUT',
      authentication: true, // Ensure this is handled by your ApiService
      endpoint: 'https://shilpha.133707331.xyz/api/v1/materials/', // Endpoint without ID in the URL
      headers: {
        // 'Authorization': `Bearer <your-token-here>` // Replace with your actual token
        'Content-Type': 'multipart/form-data' // Not required; FormData sets this automatically
      },
      body: formData
    }
  
    try {
      const response = await apiService.callApi(apiObject)
      console.log('Material updated successfully:', response)
      return response
    } catch (error) {
      console.error('Error updating material:', error)
      throw error
    }
  }  

// export async function getVerifiedShop(pageNo, pageCount, isVerify) {
//   const apiObject = {}
//   apiObject.method = 'GET'
//   apiObject.authentication = true
//   apiObject.endpoint = `shop/getAllAdminVerifiedShopAndVerificationPendingShop/${pageNo}/${pageCount}/${isVerify}`
//   apiObject.type = 'SHOP_VERIFICATION'
//   apiObject.body = null
//   return await ApiService.callApi(apiObject)

// }

// export async function ShopVerificationUpdate(shopId, status) {
//   const formData = new FormData()
//   formData.append('shopId', shopId)
//   formData.append('status', status)

//   const apiObject = {
//     method: 'POST',
//     authentication: true,
//     endpoint: 'shop/adminShopVerificationUpdate',
//     type: 'SHOP_VERIFICATION_UPDATE',
//     body: formData,
//     multipart: true // Specify that the request is multipart/form-data
//   }

//   return await ApiService.callApi(apiObject)
// }