import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { updateStock } from '../../servirces/stock/StockAPI'
import { toast } from 'react-toastify'

const UpdateModal = ({ isOpen, toggle, stock, fetchStocks }) => {
  console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm : ", stock)
  const [formData, setFormData] = useState({
    id: '',
    qty: '',
    color: '',
    stockPlace: 'main'
  })
 

  useEffect(() => {
    if (stock) {
      setFormData({
        id: stock.id || '',
        qty: stock.qty || '',
        color: stock.color || '',
        stockPlace: stock.stockPlace || 'main' // default to 'main'
      })
    }
  }, [stock])

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
      await updateStock(formData.id, formData.qty, formData.color, formData.stockPlace)
      toast.success('Stock updated successfully!')
      fetchStocks()
      toggle()
    } catch (error) {
      console.error('Error updating stock:', error)
      toast.error('Failed to update stock.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Stock</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="qty">Quantity</Label>
            <Input
              type="number"
              name="qty"
              id="qty"
              value={formData.qty}
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
            <Label for="stockPlace">Stock Place</Label>
            <Input
              type="text"
              name="stockPlace"
              id="stockPlace"
              value={formData.stockPlace}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Update Stock</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default UpdateModal
