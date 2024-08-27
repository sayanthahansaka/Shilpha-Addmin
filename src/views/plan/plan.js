import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { getAllProcessingPlans, getAllDonePlans, submitPlanAsDone } from '../../servirces/plan/PlanAPI'
import UpdatePlanModel from './UpdatePlanModel'
import { toast } from 'react-toastify'

const Plan = () => {
  const [processingPlans, setProcessingPlans] = useState([])
  const [donePlans, setDonePlans] = useState([])

  // Pagination states for each table
  const [processingPage, setProcessingPage] = useState(1)
  const [donePage, setDonePage] = useState(1)
  const [itemsPerPage] = useState(10)

  // State for controlling the UpdatePlanModel modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)

  // Calculate current items for each plan
  const indexOfLastProcessingPlan = processingPage * itemsPerPage
  const indexOfFirstProcessingPlan = indexOfLastProcessingPlan - itemsPerPage
  const currentProcessingPlans = processingPlans.slice(indexOfFirstProcessingPlan, indexOfLastProcessingPlan)

  const indexOfLastDonePlan = donePage * itemsPerPage
  const indexOfFirstDonePlan = indexOfLastDonePlan - itemsPerPage
  const currentDonePlans = donePlans.slice(indexOfFirstDonePlan, indexOfLastDonePlan)

  // Handle page changes for each plan
  const paginateProcessingPlans = (pageNumber) => setProcessingPage(pageNumber)
  const paginateDonePlans = (pageNumber) => setDonePage(pageNumber)

  const fetchPlans = async () => {
    try {
      // Fetch processing and done plans simultaneously
      const [processingData, doneData] = await Promise.all([
        getAllProcessingPlans(),
        getAllDonePlans()
      ])

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
      // toast.success('Plan marked as done!')
      fetchPlans()  // Refresh the plans data after marking as done
    } catch (error) {
      // toast.error('Error marking plan as done. Please try again.')
      console.error('Error marking plan as done:', error)
    }
  }

  const toggleUpdateModal = (plan, material) => {
    setSelectedPlan(plan, material)
    setIsUpdateModalOpen(!isUpdateModalOpen)
  }

  return (
    <div className="plan-container">
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
                <th>Article No</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProcessingPlans.length > 0 ? currentProcessingPlans.map((plan, index) => (
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
                  <td>{plan.planingStocks?.map((planStocks, no) => (
                    <li key={no}>
                      {planStocks.stockItem?.articleNo}
                    </li>
                  ))}</td>
                  <td>{plan.process || 'N/A'}</td>
                  <td>
                    <Button color="primary" onClick={() => markAsDone(plan.id)}>Mark as Done</Button>
                    <Button color="success" onClick={() => toggleUpdateModal(plan)}>Update plan</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center">No processing plans</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination>
            {[...Array(Math.ceil(processingPlans.length / itemsPerPage)).keys()].map(number => (
              <PaginationItem key={number + 1} active={number + 1 === processingPage}>
                <PaginationLink onClick={() => paginateProcessingPlans(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
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
                <th>Article No</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentDonePlans.length > 0 ? currentDonePlans.map((plan, index) => (
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
                  <td>{plan.planingStocks?.map((planStocks, no) => (
                    <li key={no}>
                      {planStocks.stockItem?.articleNo}
                    </li>
                  ))}</td>
                  <td>{plan.process || 'N/A'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center">No done plans</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Pagination>
            {[...Array(Math.ceil(donePlans.length / itemsPerPage)).keys()].map(number => (
              <PaginationItem key={number + 1} active={number + 1 === donePage}>
                <PaginationLink onClick={() => paginateDonePlans(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </CardBody>
      </Card>

      {/* Update Plan Modal */}
      {selectedPlan && (
        <UpdatePlanModel
          isOpen={isUpdateModalOpen}
          toggle={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
          plan={selectedPlan}  // Pass the selected plan to the modal
        />
      )}
    </div>
  )
}

export default Plan