import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form } from 'reactstrap'
import { AddPlan } from '../../servirces/plan/PlanAPI'
import { toast } from 'react-toastify'

const PlanModel = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    color: '',
    size: '',
    outputQty: '',
    articleNo: '',
    materials: [{ id: '', qty: '' }]
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
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

  const addMaterialField = () => {
    setFormData({ ...formData, materials: [...formData.materials, { id: '', qty: '' }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      
      const response = await AddPlan(
        formData.employeeName,
        formData.color,
        formData.size,
        formData.outputQty,
        formData.articleNo,
        formData.materials
      )
      console.log('Plan added successfully:', response)
      toast.success('Plan added successfully!')
      
    } catch (error) {
      console.error('Error adding Plan:', error)
      toast.error('Error adding Plan. Please try again.')
     
    }

    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Create New Plan</ModalHeader>
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
          <FormGroup>
            <Label for="color">Color</Label>
            <Input
              type="text"
              name="color"
              id="color"
              value={formData.color}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="size">Size</Label>
            <Input
              type="text"
              name="size"
              id="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="outputQty">Output Quantity</Label>
            <Input
              type="number"
              name="outputQty"
              id="outputQty"
              value={formData.outputQty}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="articleNo">Article No</Label>
            <Input
              type="text"
              name="articleNo"
              id="articleNo"
              value={formData.articleNo}
              onChange={handleChange}
              required
            />
          </FormGroup>
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
          <Button type="submit" color="primary">Add Plan</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PlanModel
