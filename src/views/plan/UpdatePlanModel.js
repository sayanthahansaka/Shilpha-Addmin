import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form } from 'reactstrap'
import { updatePlan } from '../../servirces/plan/PlanAPI'
import { toast } from 'react-toastify'

const UpdatePlanModel = ({ isOpen, toggle, plan }) => {
  const [formData, setFormData] = useState({
    employeeName: plan?.employeeName || '',
    planingStocks: plan?.planingStocks || [],
    materials: plan?.materials || []
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePlaningStockChange = (index, e) => {
    const { name, value } = e.target
    const newPlaningStocks = [...formData.planingStocks]
    newPlaningStocks[index] = { ...newPlaningStocks[index], [name]: value }
    setFormData({ ...formData, planingStocks: newPlaningStocks })
  }

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target
    const newMaterials = [...formData.materials]
    newMaterials[index] = { ...newMaterials[index], [name]: value }
    setFormData({ ...formData, materials: newMaterials })
  }

  const addPlaningStockField = () => {
    setFormData({
      ...formData,
      planingStocks: [...formData.planingStocks, { articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }]
    })
  }

  const addMaterialField = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, { id: '', qty: '' }]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const planData = {
      id: plan.id,
      employeeName: formData.employeeName,
      planingStocks: formData.planingStocks,
      materials: formData.materials
    }

    try {
      await updatePlan(planData)
      // toast.success('Plan updated successfully!')
      toggle()  // Close the modal on success
    } catch (error) {
      // toast.error('Error updating plan. Please try again.')
      console.error('Error updating plan:', error)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Update Plan</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employeeName">Employee Name</Label>
            <Input
              type="text"
              name="employeeName"
              id="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <h5>Planing Stocks</h5>
          {formData.planingStocks.map((stock, index) => (
            <div key={index}>
              <FormGroup>
                <Label for={`articleNo-${index}`}>Article No</Label>
                <Input
                  type="text"
                  name="articleNo"
                  id={`articleNo-${index}`}
                  value={stock.articleNo}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for={`color-${index}`}>Color</Label>
                <Input
                  type="text"
                  name="color"
                  id={`color-${index}`}
                  value={stock.color}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for={`size-${index}`}>Size</Label>
                <Input
                  type="text"
                  name="size"
                  id={`size-${index}`}
                  value={stock.size}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for={`insoleMaterialId-${index}`}>Insole Material ID</Label>
                <Input
                  type="text"
                  name="insoleMaterialId"
                  id={`insoleMaterialId-${index}`}
                  value={stock.insoleMaterialId}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for={`insoleQty-${index}`}>Insole Quantity</Label>
                <Input
                  type="number"
                  name="insoleQty"
                  id={`insoleQty-${index}`}
                  value={stock.insoleQty}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </FormGroup>
            </div>
          ))}
          <Button color="secondary" onClick={addPlaningStockField}>
            Add Another Planing Stock
          </Button>
          <h5>Materials</h5>
          {formData.materials.map((material, index) => (
            <div key={index}>
              <FormGroup>
                <Label for={`materialId-${index}`}>Material ID</Label>
                <Input
                  type="text"
                  name="id"
                  id={`materialId-${index}`}
                  value={material.id}
                  onChange={(e) => handleMaterialChange(index, e)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for={`materialQty-${index}`}>Quantity</Label>
                <Input
                  type="number"
                  name="qty"
                  id={`materialQty-${index}`}
                  value={material.qty}
                  onChange={(e) => handleMaterialChange(index, e)}
                  required
                />
              </FormGroup>
            </div>
          ))}
          <Button color="secondary" onClick={addMaterialField}>
            Add Another Material
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Update Plan</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default UpdatePlanModel
