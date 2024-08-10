import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { transferStock } from '../../servirces/stock/StockAPI'
import { toast } from 'react-toastify'

const StockModal = ({ isOpen, toggle, fetchStock }) => {
  const [formData, setFormData] = useState({
    id: '',
    qty: '',
    toStock: ''
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
      await transferStock(formData)
      toast.success('Stock transferred successfully!')
      fetchStock() // Refresh the table data
      toggle()
    } catch (error) {
      console.error('Error transferring Stock:', error)
      toast.error('Error transferring Stock. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Transfer Stock</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="id">ID</Label>
            <Input type="text" name="id" id="id" value={formData.id} onChange={handleChange} required />
          </FormGroup>

          <FormGroup>
            <Label for="toStock">Stock Place</Label>
            <Input
              type="select"
              name="toStock"
              id="toStock"
              value={formData.toStock}
              onChange={handleChange}
              required
            >
              <option value="">Select Place</option>
              <option value="online">Online</option>
              <option value="shop">Shop</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="qty">Quantity</Label>
            <Input type="number" name="qty" id="qty" value={formData.qty} onChange={handleChange} required />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Transfer Stock</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default StockModal