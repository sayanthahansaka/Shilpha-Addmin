import apiService from '../apiService' 
import { toast } from 'react-toastify'

export async function getAllStock() {
    let allData = []
    let page = 0
    const pageSize = 10
    let moreData = true
  
    while (moreData) {
      const apiObject = {
        method: 'GET',
        authentication: true,
        endpoint: `stock/${page}/${pageSize}?place=main`,
        
        body: null
      }
  
      try {
        const response = await apiService.callApi(apiObject)
        // console.log(`Full response for page `, response)
  
        const materials = response.data 
        // console.log(`Full response for page `, materials)
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
  
    // console.log('All data:', allData)
    return allData
  }
  
  export async function getAllOnlineStock() {
    let allData = []
    let page = 0
    const pageSize = 10
    let moreData = true
  
    while (moreData) {
      const apiObject = {
        method: 'GET',
        authentication: true,
        endpoint: `stock/${page}/${pageSize}?place=online`,
        
        body: null
      }
  
      try {
        const response = await apiService.callApi(apiObject)
        // console.log(`Full response for page ${page}:`, response)
  
        const materials = response.data 
  
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
  
    // console.log('All data:', allData)
    return allData
  }

  export async function getAllShopStock() {
    let allData = []
    let page = 0
    const pageSize = 10
    let moreData = true
  
    while (moreData) {
      const apiObject = {
        method: 'GET',
        authentication: true,
        endpoint: `stock/${page}/${pageSize}?place=Shop`,
        
        body: null
      }
  
      try {
        const response = await apiService.callApi(apiObject)
        // console.log(`Full response for page ${page}:`, response)
  
        const materials = response.data 
  
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
  
    // console.log('All data:', allData)
    return allData
  }

  // export async function transferStock({ id, qty, toStock }) {
  //   const apiObject = {
  //     method: 'POST',
  //     authentication: true,
  //     endpoint: `stock/transfer`,
  //     body: JSON.stringify({ id, qty, toStock }) 
  //   }
  
  //   try {
  //     const response = await apiService.callApi(apiObject)
  //     if (response && response.status === 'SUCCESS') {
  //       toast.success("Success transferring stock")
  //       return response // Assume response is { status: 'SUCCESS', ... }
  //     } else {
  //       // console.error('Unexpected response format:', response)
  //       toast.error("Some Error transferring stock")
  //       throw new Error('Unexpected response format')
  //     }
  //   } catch (error) {
  //     toast.error('Error transferring stock')
  //     console.error('Error transferring stock:', error)
  //     throw error
  //   }
  // }
  export async function transferStock(list) {
    console.log("yummmmmmmmmmmmmmmmmmm", list)
    // Prepare the request body
    const apiObject = {
      method: 'POST',
      authentication: true,  // Assuming authentication is required
      endpoint: 'stock/transfer',  // Update if needed
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ list })  // Passing the list of stocks
    }
  
    try {
      // Make the API call
      const response = await apiService.callApi(apiObject)
  
      // Handle the response
      if (response && response.status === 'SUCCESS') {
        toast.success('Successfully transferred stock')
      } else {
        toast.error('Error occurred while transferring stock')
      }
    } catch (error) {
      console.error('Error during stock transfer:', error)
      toast.error('Failed to transfer stock due to server error')
    }
  }
  

export const updateStock = async (id, qty, color, stockPlace) => {
  console.log("ID :", id)
  const data = {
    id, 
    qty, 
    color, 
    stockPlace
  }
  const apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `stock`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  // console.log(JSON.stringify(data))

  try {
    const response = await apiService.callApi(apiObject)
    toast.success("Error updating stock")
    return response.data
  } catch (error) {
    toast.error('Error updating stock')
    console.error('Error updating stock:', error)
    throw error
  }
}

export async function addStock(articleNo, color, size, qty, stockPlace = 'main') {
  const stockData = {
    articleNo,
    color,
    size,
    qty,
    stockPlace
  }

  const apiObject = {
    method: 'POST',
    authentication: true, 
    endpoint: 'stock', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(stockData) 
  }

  try {
    const response = await apiService.callApi(apiObject)
    // console.log('Stock added successfully:', response)
    toast.success("Stock added successfully")
    return response
  } catch (error) {
    toast.error("Error adding stock")
    console.error('Error adding stock:', error)
    throw error
  }
}

export async function getStockSizesById(id) {
  const apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: `stock/size/get/${id}`,
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
