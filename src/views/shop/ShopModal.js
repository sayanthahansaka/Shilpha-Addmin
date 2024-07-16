import React, { useState, useEffect } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from "reactstrap"

const ShopModal = ({ isOpen, toggle, addShop, updateShop, shop }) => {
  const [formData, setFormData] = useState({
    shopName: '',
    address: '',
    phoneNumber: '',
    articleNo: '',
    colors: '',
    sizes: '',
    price: '',
    date: ''
  })

  useEffect(() => {
    if (shop) {
      setFormData(shop)
    } else {
      setFormData({
        shopName: '',
        address: '',
        phoneNumber: '',
        articleNo: '',
        colors: '',
        sizes: '',
        price: '',
        date: ''
      })
    }
  }, [shop])

  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData({ ...formData, [id]: value })
  }

  const handleSubmit = () => {
    if (shop) {
      updateShop({ ...formData, shopID: shop.shopID })
    } else {
      const newShop = {
        shopID: `s${Math.floor(Math.random() * 1000)}`, // Generate a unique shop ID
        ...formData,
        done: false // Assuming the shop is initially not done
      }
      addShop(newShop) // Call parent function to add new shop
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>{shop ? "Edit Shop" : "Add Shop"}</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="shopName">Shop Name</Label>
          <Input type="text" id="shopName" value={formData.shopName} onChange={handleChange} />
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
          <Label for="colors">Colors</Label>
          <Input type="text" id="colors" value={formData.colors} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="sizes">Sizes</Label>
          <Input type="text" id="sizes" value={formData.sizes} onChange={handleChange} />
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
          {shop ? "Update" : "Submit"}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ShopModal