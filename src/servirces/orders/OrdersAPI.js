import apiService from '../apiService' // Adjust the path as needed

export async function getAllOrders(pageNo = 0, pageCount = 10, place = 'shop', isDone = false) {
  let allData = []
  let page = pageNo
  const pageSize = pageCount
  let moreData = true

  while (moreData) {
    const apiObject = {
      method: 'GET',
      authentication: true, // Assuming this adds the Bearer token
      endpoint: `orders/${page}/${pageSize}?place=${place}&isDone=${isDone}`,
      body: null
    }

    try {
      const response = await apiService.callApi(apiObject)
      console.log(`Full response for page ${page}:`, response)

      const orders = response.data // Adjust if the response format is different

      if (orders && Array.isArray(orders) && orders.length > 0) {
        allData = allData.concat(orders)
        page += 1
      } else {
        moreData = false
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      moreData = false
    }
  }

  console.log('All data:', allData)
  return allData
}

export async function getAllOnlineOrders(pageNo = 0, pageCount = 10, place = 'online', isDone = false) {
  let allData = []
  let page = pageNo
  const pageSize = pageCount
  let moreData = true

  while (moreData) {
    const apiObject = {
      method: 'GET',
      authentication: true, // Assuming this adds the Bearer token
      endpoint: `orders/${page}/${pageSize}?place=${place}&isDone=${isDone}`,
      body: null
    }

    try {
      const response = await apiService.callApi(apiObject)
      console.log(`Full response for page ${page}:`, response)

      const orders = response.data // Adjust if the response format is different

      if (orders && Array.isArray(orders) && orders.length > 0) {
        allData = allData.concat(orders)
        page += 1
      } else {
        moreData = false
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
      moreData = false
    }
  }

  console.log('All data:', allData)
  return allData
}
