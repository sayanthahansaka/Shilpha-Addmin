import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col } from 'reactstrap'
import { updatePlan } from '../../servirces/plan/PlanAPI'
// import { toast } from 'react-toastify'

const UpdatePlanModel = ({ isOpen, toggle, plan }) => {
  const [formData, setFormData] = useState({
    id: '',
    employeeName: '',
    planingStocks: [{ articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }],
    materials: [{ id: '', qty: '' }]
  })
  console.log(formData)
 
  useEffect(() => {
    if (plan) {
      console.log("Response object: ", plan.planingStocks)
      setFormData({
        id: plan.id,
        employeeName: plan.employeeName || '',
        planingStocks: plan.planingStocks.map(stock => ({
          articleNo: stock.stockItem.articleNo || '',  // Access articleNo from planingStocks
          color: stock.stockItem.color || '',          // Assuming color is also in stockItem
          size: stock.stockItem.size || '',
          insoleMaterialId: stock.insoleMaterialId || '',
          insoleQty: stock.insoleQty || ''
        })),
        materials: plan.planMaterialsStocks.map(material => ({
          id: material.materialsStock.id || '',
          qty: material.qty || ''
        }))
      })
    }
  }, [plan])  

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePlaningStockChange = (index, e) => {
    const { name, value } = e.target
    const newPlaningStocks = formData.planingStocks.map((stock, idx) => {
      if (index === idx) {
        return { ...stock, [name]: value }
      }
      return stock
    })
    setFormData({ ...formData, planingStocks: newPlaningStocks })
  }

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target
    const newMaterials = formData.materials.map((material, idx) => {
      if (index === idx) {
        return { ...material, [name]: value }
      }
      return material
    })
    setFormData({ ...formData, materials: newMaterials })
  }

  const addPlaningStockField = () => {
    setFormData({
      ...formData,
      planingStocks: [...formData.planingStocks, { articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }]
    })
  }

  const addMaterialField = () => {
    setFormData({ ...formData, materials: [...formData.materials, { id: '', qty: '' }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const planData = {
      id: formData.id,
      employeeName: formData.employeeName,
      planingStocks: formData.planingStocks,
      materials: formData.materials
    }

    try {
      await updatePlan(planData)
      // toast.success('Plan updated successfully!')
      toggle()
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
            <Row key={index}>
              <Col>
                <Label for={`articleNo-${index}`}>Article No</Label>
                <Input
                  type="text"
                  name="articleNo"
                  id={`articleNo-${index}`}
                  value={stock.articleNo}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </Col>
              <Col>
                <Label for={`color-${index}`}>Color</Label>
                <Input
                  type="text"
                  name="color"
                  id={`color-${index}`}
                  value={stock.color}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </Col>
              <Col>
                <Label for={`size-${index}`}>Size</Label>
                <Input
                  type="text"
                  name="size"
                  id={`size-${index}`}
                  value={stock.size}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </Col>
              <Col>
                <Label for={`insoleMaterialId-${index}`}>Insole Material ID</Label>
                <Input
                  type="text"
                  name="insoleMaterialId"
                  id={`insoleMaterialId-${index}`}
                  value={stock.insoleMaterialId}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
                 {/* {console.log("stock.insoleMaterialId ;", stock.insoleMaterialId)} */}
              </Col>
              <Col>
                <Label for={`insoleQty-${index}`}>Insole Quantity</Label>
                <Input
                  type="number"
                  name="insoleQty"
                  id={`insoleQty-${index}`}
                  value={stock.insoleQty}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </Col>
            </Row>
          ))}
          <Button color="secondary" onClick={addPlaningStockField}>
            Add Another Planing Stock
          </Button>

          <h5>Materials</h5>
          {formData.materials.map((material, index) => (
            <Row key={index}>
              <Col>
                <Label for={`materialId-${index}`}>Material ID</Label>
                <Input
                  type="text"
                  name="id"
                  id={`materialId-${index}`}
                  value={material.id}
                  onChange={(e) => handleMaterialChange(index, e)}
                  required
                />
              </Col>
              <Col>
                <Label for={`materialQty-${index}`}>Quantity</Label>
                <Input
                  type="number"
                  name="qty"
                  id={`materialQty-${index}`}
                  value={material.qty}
                  onChange={(e) => handleMaterialChange(index, e)}
                  required
                />
              </Col>
            </Row>
          ))}
          <Button color="secondary" onClick={addMaterialField}>
            Add Another Material
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Update Plan</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default UpdatePlanModel
