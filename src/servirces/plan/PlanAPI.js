import Cookies from 'cookies-js'
import apiService from '../apiService'

export async function getAllPlans() {
    let allData = []
    let page = 0
    const pageSize = 10
    let moreData = true
  
    while (moreData) {
      const apiObject = {
        method: 'GET',
        authentication: true,
        endpoint: `plan/${page}/${pageSize}?status=processing`,
        body: null
      }
  
      try {
        const response = await apiService.callApi(apiObject)
        console.log(`Full response for page ${page}:`, response)
        const plan = response.data 
  
        if (plan && Array.isArray(plan) && plan.length > 0) {
          allData = allData.concat(plan)
          page += 1
        } else {
          moreData = false
        }
      } catch (error) {
        console.error('Error fetching plan:', error)
        moreData = false
      }
    }
  
    console.log('All data:', allData)
    return allData
  }
  export async function AddPlan(employeeName, color, size, outputQty, articleNo, materials) {
    // Construct the plan data object according to the API specification
    const planData = {
      employeeName,
      color,
      size,
      outputQty,
      articleNo,
      materials
    }
  
    const apiObject = {
      method: 'POST',
      authentication: true,
      endpoint: 'plan/',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planData)
    }
  
    try {
      const response = await apiService.callApi(apiObject)
      console.log('Plan added successfully:', response)
      return response
    } catch (error) {
      console.error('Error adding Plan:', error)
      throw error
    }
  }
  