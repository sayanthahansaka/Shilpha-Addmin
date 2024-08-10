import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { getAllProcessingPlans, getAllDonePlans, submitPlanAsDone } from '../../servirces/plan/PlanAPI'
import { toast } from 'react-toastify'

const Plan = () => {
  const [processingPlans, setProcessingPlans] = useState([])
  const [donePlans, setDonePlans] = useState([])

  const fetchPlans = async () => {
    try {
      // Fetch processing and done plans simultaneously
      const [processingData, doneData] = await Promise.all([
        getAllProcessingPlans(),
        getAllDonePlans()
      ])

      console.log("Fetched processing plan data:", processingData)
      console.log("Fetched done plan data:", doneData)

      if (Array.isArray(processingData)) {
        setProcessingPlans(processingData)
      } else {
        console.error("Unexpected processing data format:", processingData)
      }

      if (Array.isArray(doneData)) {
        setDonePlans(doneData)
      } else {
        console.error("Unexpected done data format:", doneData)
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const markAsDone = async (planId) => {
    try {
      await submitPlanAsDone(planId)
      toast.success('Plan marked as done!')
      fetchPlans()  // Refresh the plans data after marking as done
    } catch (error) {
      toast.error('Error marking plan as done. Please try again.')
      console.error('Error marking plan as done:', error)
    }
  }

  return (
    <div className="stock-container">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Processing Plans</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
               
                <th>Employee Name</th>
                <th>Start Date</th>
              
                <th>Material Details</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processingPlans.length > 0 ? processingPlans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.id || 'N/A'}</td>
                 
                  <td>{plan.employeeName || 'N/A'}</td>
                  <td>{plan.createDate || 'N/A'}</td>
                 
                  <td>
                    <ul>
                      {plan.planMaterialsStocks?.map((material, idx) => (
                        <li key={idx}>
                          {material.materialsStock?.materialName || 'N/A'}: {material.qty || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{plan.process || 'N/A'}</td>
                  <td>
                    <Button color="primary" onClick={() => markAsDone(plan.id)}>Mark as Done</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center">No processing plans</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Done Plans</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
              
                <th>Employee Name</th>
                <th>Start Date</th>
                
                <th>Material Details</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donePlans.length > 0 ? donePlans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.id || 'N/A'}</td>
                 
                  <td>{plan.employeeName || 'N/A'}</td>
                  <td>{plan.createDate || 'N/A'}</td>
                  
                  <td>
                    <ul>
                      {plan.planMaterialsStocks?.map((material, idx) => (
                        <li key={idx}>
                          {material.materialsStock?.materialName || 'N/A'}: {material.qty || 'N/A'}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{plan.process || 'N/A'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center">No done plans</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}

export default Plan
