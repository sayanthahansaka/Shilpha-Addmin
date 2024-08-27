import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { addStock } from '../../servirces/stock/StockAPI' 
import { toast } from 'react-toastify'

const AddStockModel = ({ isOpen, toggle, fetchStocks }) => {
  const [formData, setFormData] = useState({
    articleNo: '',
    color: '',
    size: '',
    qty: '',
    stockPlace: 'main' 
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
      await addStock(formData.articleNo, formData.color, formData.size, formData.qty, formData.stockPlace)
      // toast.success('Stock added successfully!')
      fetchStocks()
      toggle()
    } catch (error) {
      console.error('Error adding stock:', error)
      // toast.error('Error adding stock. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Stock</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="articleNo">Article Number</Label>
            <Input type="text" name="articleNo" id="articleNo" value={formData.articleNo} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="color">Color</Label>
            <Input type="text" name="color" id="color" value={formData.color} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="size">Size</Label>
            <Input type="text" name="size" id="size" value={formData.size} onChange={handleChange} required />
          </FormGroup>
          <FormGroup>
            <Label for="qty">Quantity</Label>
            <Input type="number" name="qty" id="qty" value={formData.qty} onChange={handleChange} required />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Add Stock</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddStockModel
