import Cookies from 'cookies-js'
import apiService from '../apiService'
import { toast } from 'react-toastify'

export async function getAllProcessingPlans() {
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
        // console.log(`Full response for page ${page}:`, response)
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
  
    // console.log('All data:', allData)
    return allData
  }

  export async function getAllDonePlans() {
    let allData = []
    let page = 0
    const pageSize = 10
    let moreData = true
  
    while (moreData) {
      const apiObject = {
        method: 'GET',
        authentication: true,
        endpoint: `plan/${page}/${pageSize}`,
        body: null
      }
  
      try {
        const response = await apiService.callApi(apiObject)
        // console.log(`Full response for page ${page}:`, response)
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
  
    // console.log('All data:', allData)
    return allData
  }
  export async function AddPlan(formData) {
    // Construct the plan data object according to the API specification
    console.log("..............", formData)
    const planData = {
      employeeName: formData.employeeName,
      planingStocks: formData.planingStocks.map(stock => ({
        articleNo: stock.articleNo,
        color: stock.color,
        size: stock.size,
        insoleMaterialId: stock.insoleMaterialId,
        insoleQty: stock.insoleQty
      })),
      materials: formData.materials.map(material => ({
        id: material.id,
        qty: material.qty
      }))
    }
  console.log("planData", planData)
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
      toast.success('Plan added successfully')
      return response
    } catch (error) {
      toast.error("Error adding Plan")
      console.error('Error adding Plan:', error)
      throw error
    }
  }
  
  // export async function AddPlan(employeeName, color, size, outputQty, articleNo, materials) {
  //   // Construct the plan data object according to the API specification
  //   const planData = {
  //     employeeName,
  //     planingStocks: [
  //       {
  //         articleNo, // Assuming a single planing stock for now, adjust if needed
  //         color,
  //         size,
  //         insoleMaterialId: '', // Add default or fetched value
  //         insoleQty: outputQty // Adjust if needed
  //       }
  //     ],
  //     materials // Directly use the materials array provided
  //   }
  
  //   const apiObject = {
  //     method: 'POST',
  //     authentication: true,
  //     endpoint: 'plan/', // Ensure this is the correct endpoint for your API
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(planData)
  //   }
  
  //   try {
  //     const response = await apiService.callApi(apiObject)
  //     console.log('Plan added successfully:', response)
  //     return response
  //   } catch (error) {
  //     console.error('Error adding Plan:', error)
  //     throw error
  //   }
  // }
  
  export async function submitPlanAsDone(planId) {
    const apiObject = {
      method: 'PUT',
      authentication: true,
      endpoint: `plan/?id=${planId}&status=done`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: null  
    }
  
    try {
      const response = await apiService.callApi(apiObject)
      // console.log('Plan updated successfully:', response)
      toast.success('Plan updated successfully')
      return response
    } catch (error) {
      toast.error('Error updating plan status')
      console.error('Error updating plan status:', error)
      throw error
    }
  }

 export const updatePlan = async (formData) => {
  console.log(formData)
  const apiObject = {
    method: 'PUT',
    authentication: true,
    endpoint: `plan/update`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  try {
    const response = await apiService.callApi(apiObject)
    console.log("response", response)
    if (response.status === 200 || response.status === 201) {
      // Success case
      toast.success('Plan updated successfully!')
    } else {
      // Handle unexpected status codes
      toast.warn(`${response.description}`)
    }
    return response.data
  } catch (error) {
    toast.error('Error updating plan')
    throw error
  }
}

