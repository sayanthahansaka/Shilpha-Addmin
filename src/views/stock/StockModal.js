import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { transferStock, getAllStock } from '../../servirces/stock/StockAPI'
import { toast } from 'react-toastify'

const StockModal = ({ isOpen, toggle, fetchStock }) => {
  const [formData, setFormData] = useState({
    id: '',
    qty: '',
    toStock: ''
  })

  const [availableStocks, setAvailableStocks] = useState([]) // Define availableStocks with useState

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stockData = await getAllStock()
        // console.log(stockData)
        setAvailableStocks(stockData) // Assuming stockData is an array of stock objects
      } catch (error) {
        console.error('Error fetching available stocks:', error)
        toast.error('Failed to load available stocks.')
      }
    }

    if (isOpen) {
      fetchStocks()
    }
  }, [isOpen])

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
      console.error('Error transferring stock:', error)
      toast.error('Error transferring stock. Please try again.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Transfer Stock</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="id">Available Stocks</Label>
            <Input
              type="select"
              name="id"
              id="id"
              value={formData.id}
              onChange={handleChange}
              required
            >
              <option value="">Select Stock</option>
              {availableStocks.map(stock => (
                <option key={stock.id} value={stock.id}>
                 {`${stock.articleNo} - ${stock.size} (${stock.qty})`}
                  
                </option>
              ))}
            </Input>
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
