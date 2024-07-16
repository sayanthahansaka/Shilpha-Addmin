import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap"

const OrderModal = ({ isOpen, toggle, addOrder }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phoneNumber: '',
    articleNo: '',
    color: '',
    size: '',
    price: '',
    date: ''
  })

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {
    const newOrder = {
      orderID: `o${Math.floor(Math.random() * 1000)}`, // Generate a unique order ID
      ...formData,
      done: false // Assuming the order is initially not done
    }
    addOrder(newOrder) // Call parent function to add new order
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Add Request</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="customerName">Customer Name</Label>
          <Input type="text" id="customerName" value={formData.customerName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" id="address" value={formData.address} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input type="text" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="articleNo">Article Number</Label>
          <Input type="text" id="articleNo" value={formData.articleNo} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="color">Color</Label>
          <Input type="text" id="color" value={formData.color} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="size">Size</Label>
          <Input type="text" id="size" value={formData.size} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="text" id="price" value={formData.price} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="date" id="date" value={formData.date} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          Submit
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default OrderModal
