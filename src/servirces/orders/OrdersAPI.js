import apiService from '../apiService' 
import { toast } from 'react-toastify'

export async function getAllShopOrders(pageNo = 0, pageCount = 10, place = 'shop', isDone = false) {
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
export async function getAllDoneShopOrders(pageNo = 0, pageCount = 10, place = 'shop', isDone = true) {
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
      toast.error("Not Avillebale Stock")
      console.error('Error fetching orders:', error)
      moreData = false
    }
  }

  console.log('All data:', allData)
  toast.success("Order Done")
  return allData
}

export async function createShopOrder(orderData) {
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
   
    },
    body: null  // No body needed for this request
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log('Order marked as done successfully:', response)
    toast.success("Order Done")
    return response
  } catch (error) {
    console.error('Error marking order as done:', error)
    toast.error("Not Avillebale Stock")
    throw error
  }
}

export const searchReturnOrders = async (searchQuery) => {
  const params = {
    place: 'return',
    isDone: true,
    text: searchQuery // Add search text to params
  }
  
  const response = await apiService.callApi('/orders/search', 'POST', params)
  return response.data
}

export async function getAllReturnOnlineOrders(pageNo = 0, pageCount = 10, place = 'return', isDone = true) {
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


export async function markOrderAsReturn(orderId) {
  const apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `orders/return?orderId=${orderId}`,
    headers: {
      'Content-Type': 'application/json'
   
    },
    body: null  
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log('Order marked as Return successfully:', response)
    return response
  } catch (error) {
    console.error('Error marking order as Return:', error)
    throw error
  }
}
