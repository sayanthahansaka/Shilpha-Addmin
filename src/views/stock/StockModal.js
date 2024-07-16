import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap'

const AddStockModal = ({ isOpen, toggle, addStock, stockType }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    price: '',
    supplier: '',
    date: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = () => {
    addStock(stockType, formData)
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Stock Item to {stockType}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="itemName">Item Name</Label>
          <Input type="text" name="itemName" id="itemName" value={formData.itemName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input type="number" name="quantity" id="quantity" value={formData.quantity} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="number" name="price" id="price" value={formData.price} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="supplier">Supplier</Label>
          <Input type="text" name="supplier" id="supplier" value={formData.supplier} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="date" name="date" id="date" value={formData.date} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Add Stock</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default AddStockModal
