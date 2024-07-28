import apiService from '../apiService' 
import { toast } from 'react-toastify'

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

export async function getAllDoneOnlineOrders(pageNo = 0, pageCount = 10, place = 'online', isDone = true) {
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

export async function createOrder(orderData) {
  const apiObject = {
    method: 'POST',
    authentication: true, // Assuming your ApiService handles token inclusion
    endpoint: 'orders/', // Adjust the endpoint path as necessary
    headers: {
      // 'Authorization': `Bearer ${token}`, // Include the authorization token
      'Content-Type': 'application/json' // Setting content type for JSON payload
    },
    body: JSON.stringify(orderData) // Convert the object to a JSON string
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log('Order created successfully:', response)
    return response
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}


export async function markOrderAsDone(orderId, place) {
  const apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `orders/?orderId=${orderId}&place=${place}`,
    headers: {
      'Content-Type': 'application/json'
      // 'Authorization': `Bearer ${YOUR_TOKEN_HERE}`, // Replace YOUR_TOKEN_HERE with your actual token
    },
    body: null  // No body needed for this request
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log('Order marked as done successfully:', response)
    toast.success(response.result)
    return response
  } catch (error) {
    console.error('Error marking order as done:', error)
    toast.error('response.result')
    throw error
  }
}
