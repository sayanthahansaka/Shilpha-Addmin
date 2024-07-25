import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { updateMaterial } from '../../servirces/materials/MaterialsAPI'
import { toast } from 'react-toastify'

const UpdateMaterialsModel = ({ isOpen, toggle, material }) => {
  const [formData, setFormData] = useState({
    qty: '',
    supplier: ''
  })

  useEffect(() => {
    if (material) {
      setFormData({
        qty: material.qty,
        supplier: material.supplier
      })
    }
  }, [material])

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
      await updateMaterial(material.id, formData.qty, formData.supplier)
      toast.success('Material updated successfully!')
      toggle()
    } catch (error) {
      console.error('Error updating material:', error)
      toast.error('Failed to update material.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Material</ModalHeader>
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
            <Label for="supplier">Supplier</Label>
            <Input
              type="text"
              name="supplier"
              id="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Update Material</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default UpdateMaterialsModel
