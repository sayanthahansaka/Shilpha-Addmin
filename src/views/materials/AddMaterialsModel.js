import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const AddMaterialsModel = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    supplier: '',
    date: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle the form submission logic here
    console.log('New material added:', formData)
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Material</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="itemName">Item Name</Label>
            <Input type="text" name="itemName" id="itemName" value={formData.itemName} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="quantity">Quantity</Label>
            <Input type="text" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="supplier">Supplier</Label>
            <Input type="text" name="supplier" id="supplier" value={formData.supplier} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="date">Date</Label>
            <Input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required />
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
