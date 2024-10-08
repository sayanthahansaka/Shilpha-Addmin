
import Cookies from 'cookies-js'
import apiService from '../apiService'
import { toast } from 'react-toastify'

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


export async function AddMaterial(materialsList) {
  const materialData = {
    list: materialsList.map(material => ({
      materialName: material.materialName,
      color: material.color,
      size: material.size, // assuming 'sizes' is a string or single size value
      qty: material.qty
    }))
  }
  console.log(materialData)

  const apiObject = {
    method: 'POST',
    authentication: true, 
    endpoint: 'materials',
    headers: {
      // 'Authorization': `Bearer <token>`, // Replace <token> with the actual token
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(materialData)
  }
  

  try {
    const response = await apiService.callApi(apiObject)
    if (response && response.status === 'SUCCESS') {
      toast.success("Materials added successfully")
    } else {
      toast.error("Some Error adding materials")
    }
    // console.log(response)
    // toast.success('Materials added successfully')
    return response
  } catch (error) {
    toast.error('Error adding materials')
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
    // console.log('Material updated successfully:', response)
    if (response.status === 'SUCCESS') {
      toast.success('Material updated successfully')
  } else {
    const errorMessage = response.data?.message || 'Something went wrong.'
    toast.error(errorMessage)
  }
    // toast.success('Material updated successfully')
    return response
  } catch (error) {
    toast.error('Error updating material')
    // console.error('Error updating material:', error)
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
      method: 'POST', 
      authentication: true,
      endpoint: `materials/history/${page}/${pageSize}`,
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Bearer <token>` 
      },
      body: JSON.stringify(materialDataHistory) 
    }

    try {
      const response = await apiService.callApi(apiObject)
      // console.log(`Full response for page ${page}:`, response)

      const history = response.data 

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

  // console.log('All history:', 
  return allHistory
}
export async function getMaterialSizesById(id) {
  const apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `materials/size/get/${id}`,
    body: null
  }

  try {
    const response = await apiService.callApi(apiObject)
    const sizes = response.data
    console.log(sizes)

    if (sizes && Array.isArray(sizes)) {
      return sizes
    } else {
      console.error('Unexpected response format:', response)
      return []
    }
  } catch (error) {
    console.error('Error fetching material sizes:', error)
    return []
  }
}