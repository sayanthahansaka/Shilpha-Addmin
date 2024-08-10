import apiService from '../apiService' 

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
        console.log(`Full response for page ${page}:`, response)
  
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
  
    console.log('All data:', allData)
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
        console.log(`Full response for page ${page}:`, response)
  
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
  
    console.log('All data:', allData)
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
        console.log(`Full response for page ${page}:`, response)
  
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
  
    console.log('All data:', allData)
    return allData
  }

  export async function transferStock({ id, qty, toStock }) {
    const apiObject = {
      method: 'POST',
      authentication: true,
      endpoint: `stock/transfer`,
      body: JSON.stringify({ id, qty, toStock }) // Convert body to JSON string
    }
  
    try {
      const response = await apiService.callApi(apiObject)
      if (response && response.status === 'SUCCESS') {
        return response // Assume response is { status: 'SUCCESS', ... }
      } else {
        console.error('Unexpected response format:', response)
        throw new Error('Unexpected response format')
      }
    } catch (error) {
      console.error('Error transferring stock:', error)
      throw error
    }
  }
  