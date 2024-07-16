import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap"

const StockModal = ({ isOpen, toggle, addStock, updateStock, stock }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '',
    price: '',
    supplier: '',
    date: ''
  })

  useEffect(() => {
    if (stock) {
      setFormData(stock)
    } else {
      setFormData({
        itemName: '',
        quantity: '',
        price: '',
        supplier: '',
        date: ''
      })
    }
  }, [stock])

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {
    if (stock) {
      updateStock({ ...formData, stockID: stock.stockID })
    } else {
      const newStock = {
        stockID: `stk${Math.floor(Math.random() * 1000)}`, // Generate a unique stock ID
        ...formData
      }
      addStock(newStock) // Call parent function to add new stock
    }
    toggle() // Close modal after submission
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{stock ? "Edit Stock" : "Add Stock"}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="itemName">Item Name</Label>
          <Input type="text" id="itemName" value={formData.itemName} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input type="number" id="quantity" value={formData.quantity} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input type="number" id="price" value={formData.price} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="supplier">Supplier</Label>
          <Input type="text" id="supplier" value={formData.supplier} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="date" id="date" value={formData.date} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          {stock ? "Update" : "Submit"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default StockModal
