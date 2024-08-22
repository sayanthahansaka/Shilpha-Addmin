
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


export async function AddMaterial(materialName, qty, color, size) {
  const materialData = {
    materialName,
    color,
    size,
    qty
  }

  const apiObject = {
    method: 'POST',
    authentication: true, // This should trigger inclusion of the Bearer token in apiService
    endpoint: 'materials',
    headers: {
      // 'Authorization': `Bearer ${token}`, // Include the authorization token
      'Content-Type': 'application/json' // Setting content type for JSON payload
    },
    body: JSON.stringify(materialData)
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


export async function updateMaterial(id, materialName, qty) {
  const data = {
    id,
    materialName,
    qty
  }

  const apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `materials`, 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
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
export const getMaterialHistory = async (materialId, start, end) => {
  let allHistory = []
  let page = 0
  const pageSize = 10
  let moreData = true

  const materialDataHistory = {
    id: materialId,
    start,
    end
  }

  while (moreData) {
    const apiObject = {
      method: 'POST', // Change to POST
      authentication: true,
      endpoint: `materials/history/${page}/${pageSize}`,
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer <token>` // Include your token here
      },
      body: JSON.stringify(materialDataHistory) // Include body in the request
    }

    try {
      const response = await apiService.callApi(apiObject)
      console.log(`Full response for page ${page}:`, response)

      const history = response.data // Use optional chaining to handle cases where response.data might be null

      if (history && Array.isArray(history) && history.length > 0) {
        allHistory = allHistory.concat(history)
        page += 1
      } else {
        moreData = false
      }
    } catch (error) {
      console.error('Error fetching material history:', error)
      moreData = false
    }
  }

  console.log('All history:', allHistory) // Log the aggregated data
  return allHistory
}
