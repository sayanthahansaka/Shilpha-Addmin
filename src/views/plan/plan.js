import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'
import { getAllPlans } from '../../servirces/plan/PlanAPI'  // Ensure the correct path to the API service

const Plan = () => {
  const [processingPlans, setProcessingPlans] = useState([])
  const [donePlans, setDonePlans] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
      const allPlans = await getAllPlans()
      console.log("Fetched plan data:", allPlans)
      
      // Ensure plans have a `status` field before filtering
      if (Array.isArray(allPlans)) {
        const processing = allPlans.filter(plan => plan.process === 'processing')
        const done = allPlans.filter(plan => plan.process === 'done')
        console.log("Fetched plan data procees:", processing)
        console.log("Fetched plan data done:", done)
        setProcessingPlans(processing)
        setDonePlans(done)
      } else {
        console.error("Unexpected data format:", allPlans)
      }
    }

    fetchPlans()
  }, [])

  return (
    <div className="stock-container">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Processing Plan</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>
                  Article No
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>
                  Color
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {processingPlans.length > 0 ? processingPlans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.itemName || 'N/A'}</td>
                  <td>{plan.quantity || 'N/A'}</td>
                  <td>{plan.employeeName || 'N/A'}</td>
                  <td>{plan.createDate || 'N/A'}</td>
                  <td>{plan.articleNo || 'N/A'}</td>
                  <td>{plan.color || 'N/A'}</td>
                  <td>{plan.status}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No processing plans</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Done Plan</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>
                  Article No
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>
                  Color
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donePlans.length > 0 ? donePlans.map((plan, index) => (
                <tr key={index}>
                  <td>{plan.itemName || 'N/A'}</td>
                  <td>{plan.quantity || 'N/A'}</td>
                  <td>{plan.employeeName || 'N/A'}</td>
                  <td>{plan.createDate || 'N/A'}</td>
                  <td>{plan.articleNo || 'N/A'}</td>
                  <td>{plan.color || 'N/A'}</td>
                  <td>{plan.status}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No done plans</td>
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
