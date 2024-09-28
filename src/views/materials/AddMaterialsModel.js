import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Table } from 'reactstrap'
import { AddMaterial } from '../../servirces/materials/MaterialsAPI'

const AddMaterialsModel = ({ isOpen, toggle, fetchMaterials }) => {
  const [formData, setFormData] = useState({
    materialName: '',
    color: '',
    sizes: '',
    qty: ''
  })
  const [materials, setMaterials] = useState([]) // Track materials to be added to the table
  const sizes = Array.from({ length: 20 }, (_, i) => 26 + i) // Sizes from 26 to 45

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSizeChange = (size) => {
    const currentSizes = formData.sizes ? formData.sizes.split(',') : []
    const newSizes = currentSizes.includes(size.toString()) ? currentSizes.filter(s => s !== size.toString()) : [...currentSizes, size.toString()]
    setFormData({ ...formData, sizes: newSizes.join(',') })
  }
  const handleQtyChange = (index, value) => {
    const updatedMaterials = [...materials]
    updatedMaterials[index].qty = value
    setMaterials(updatedMaterials)
  }
  const handleAddToTable = () => {
    const selectedSizes = formData.sizes.split(',').filter(size => size.trim() !== '') // Filter out empty sizes
  
    const newMaterials = selectedSizes.map(size => ({
      materialName: formData.materialName,
      color: formData.color,
      size, // Each size gets its own entry
      qty: formData.qty
    }))
    // console.log(newMaterials)
    setMaterials([...materials, ...newMaterials]) // Add all new materials to the list
    setFormData({
      materialName: '',
      color: '',
      sizes: '',
      qty: ''
    }) // Reset the form
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Submit all materials in one request
      // console.log(materials)
      await AddMaterial(materials)
      fetchMaterials() // Refresh the table data
      toggle() // Close the modal
    } catch (error) {
      console.error('Error adding materials:', error)
    }
  }  

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Material</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="materialName">Material Name</Label>
            <Input
              type="text"
              name="materialName"
              id="materialName"
              value={formData.materialName}
              onChange={handleChange}
              // required
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
              // required
            />
          </FormGroup>
          {/* <FormGroup>
            <Label for="qty">Quantity</Label>
            <Input
              type="number"
              name="qty"
              id="qty"
              value={formData.qty}
              onChange={handleChange}
              // required
            />
          </FormGroup> */}

          <FormGroup>
            <Label>Select Sizes:</Label>
            <div className="size-buttons d-flex flex-wrap" style={{ gap: '25px' }}>
              {sizes.map(size => (
                <div key={size} className="size-checkbox">
                  <Input
                    type="checkbox"
                    id={`size-${size}`}
                    checked={formData.sizes.split(',').includes(size.toString())}
                    onChange={() => handleSizeChange(size)}
                  />
                  <Label for={`size-${size}`}>{size}</Label>
                </div> 
              ))}
            </div>
          </FormGroup>

          <Button color="secondary" onClick={handleAddToTable}>Add to Table</Button>

          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <Table bordered style={{ width: '100%', minWidth: '600px' }}>
        <thead>
              <tr>
                <th>Material Name</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index}>
                  <td>{material.materialName}</td>
                  <td>{material.color}</td>
                  <td>{material.size}</td>
                  <td> 
                  <Input
                      type="number"
                      value={material.qty}
                      onChange={(e) => handleQtyChange(index, e.target.value)}
                      required
                    />
                    {/* {material.qty} */}
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default AddMaterialsModel
