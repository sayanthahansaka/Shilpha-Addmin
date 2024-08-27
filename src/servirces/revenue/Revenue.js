import apiService from '../apiService'

export async function getRevenueData() {
  const apiObject = {
    method: 'GET',
    authentication: true,
    endpoint: 'revenue',
    body: null
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log(response)
    return response.data
  } catch (error) {
    console.error('Error fetching revenue data:', error)
    throw error
  }
}
