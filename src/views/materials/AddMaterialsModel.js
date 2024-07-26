import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { AddMaterial } from '../../servirces/materials/MaterialsAPI'
import { toast } from 'react-toastify'

const AddMaterialsModel = ({ isOpen, toggle, fetchMaterials }) => {
  const [formData, setFormData] = useState({
    materialName: '',
    qty: '',
    supplier: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await AddMaterial(formData.materialName, formData.qty, formData.supplier)
      toast.success('Material added successfully!')
      fetchMaterials() // Refresh the table data
      toggle()
    } catch (error) {
      console.error('Error adding material:', error)
      toast.error('Error adding material. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Material</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="materialName">Material Name</Label>
            <Input type="text" name="materialName" id="materialName" value={formData.materialName} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="qty">Quantity</Label>
            <Input type="number" name="qty" id="qty" value={formData.qty} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="supplier">Supplier</Label>
            <Input type="text" name="supplier" id="supplier" value={formData.supplier} onChange={handleChange} required />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Add Material</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddMaterialsModel
