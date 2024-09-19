import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from "reactstrap"
import { createShopOrder } from '../../servirces/orders/OrdersAPI'
import { toast } from 'react-toastify'

const ShopModal = ({ isOpen, toggle, addShop, fetchOrders }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: 'noo need this',
    contacts: [{ contact: '000' }],
    ordersDetail: [{ articleNo: '', color: '', size: '', qty: '' }],
    packagePrice: '',
    stockPlaceStatus: 'shop',
    date: ''
  })

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleContactChange = (index, event) => {
    const newContacts = formData.contacts.map((contact, i) => {
      return i === index ? { ...contact, contact: event.target.value } : contact
    })
    setFormData(prevState => ({
      ...prevState,
      contacts: newContacts
    }))
  }

  const handleOrderDetailChange = (index, field, value) => {
    const newOrdersDetail = formData.ordersDetail.map((detail, i) => {
      return i === index ? { ...detail, [field]: value } : detail
    })
    setFormData(prevState => ({
      ...prevState,
      ordersDetail: newOrdersDetail
    }))
  }

  const addContactField = () => {
    setFormData(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, { contact: '' }]
    }))
  }

  const addOrderDetailField = () => {
    setFormData(prevState => ({
      ...prevState,
      ordersDetail: [...prevState.ordersDetail, { articleNo: '', color: '', size: '', qty: '' }]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() 
    try {
      const newOrder = await createShopOrder(formData)
      fetchOrders()
      addShop(newOrder) 
      // toast.success("Order created successfully!")
      toggle() 
    } catch (error) {
      // toast.error("Failed to create order.")
      console.error('Error creating order:', error)
    }
  }
  
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Order</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="customerName">Shop Name</Label>
          <Input type="text" id="customerName" value={formData.customerName} onChange={handleChange} />
        </FormGroup>
        {/* <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" id="address" value={formData.address} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Contacts</Label>
          {formData.contacts.map((contact, index) => (
            <Input
              key={index}
              type="text"
              value={contact.contact}
              onChange={(e) => handleContactChange(index, e)}
              placeholder="Contact Number"
              style={{ marginBottom: "10px" }}
            />
          ))}
          <Button color="secondary" size="sm" onClick={addContactField}>Add Contact</Button>
        </FormGroup> */}
        <FormGroup>
          <Label>Order Details</Label>
          {formData.ordersDetail.map((detail, index) => (
            <Row key={index}>
              <Col>
                <Input
                  type="text"
                  placeholder="Article Number"
                  value={detail.articleNo}
                  onChange={(e) => handleOrderDetailChange(index, 'articleNo', e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="Color"
                  value={detail.color}
                  onChange={(e) => handleOrderDetailChange(index, 'color', e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="Size"
                  value={detail.size}
                  onChange={(e) => handleOrderDetailChange(index, 'size', e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="Quantity"
                  value={detail.qty}
                  onChange={(e) => handleOrderDetailChange(index, 'qty', e.target.value)}
                />
              </Col>
            </Row>
          ))}
          <Button color="secondary" size="sm" onClick={addOrderDetailField} style={{ marginTop: "10px" }}>
            Add Order Detail
          </Button>
        </FormGroup>
        <FormGroup>
          <Label for="packagePrice">Package Price</Label>
          <Input type="text" id="packagePrice" value={formData.packagePrice} onChange={handleChange} />
        </FormGroup>
        {/* <FormGroup>
          <Label for="deliveryFree">Delivery Fee</Label>
          <Input type="text" id="deliveryFree" value={formData.deliveryFree} onChange={handleChange} />
        </FormGroup> */}
        <FormGroup>
          <Label for="stockPlaceStatus">Stock Place Status</Label>
          <Input type="text" id="stockPlaceStatus" value={formData.stockPlaceStatus} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="date" id="date" value={formData.date} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ShopModal
