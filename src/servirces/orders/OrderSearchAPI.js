import apiService from '../apiService' 

export async function searchReturnOrders(place, isDone, text, start, limit) {
  const apiObject = {
    method: 'GET',
    authentication: true, 
    // /orders/0/10?place=return&isDone=true&text=0775660551
    endpoint: `orders/${start}/${limit}?place=return&isDone=true&text=${text}`, 
    headers: {
    //   'Authorization': `Bearer <token>` 
    },
    params: {
      place,
      isDone,
      text
    }
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log('Orders retrieved successfully:', response)
    return response
  } catch (error) {
    console.error('Error retrieving orders:', error)
    throw error
  }
}
