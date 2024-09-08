import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col } from 'reactstrap'
import { getAllmaterials } from '../../servirces/materials/MaterialsAPI'
import { AddPlan } from '../../servirces/plan/PlanAPI'
import { toast } from 'react-toastify'

const PlanModel = ({ isOpen, toggle, fetchMaterialsPlan }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    planingStocks: [],
    materials: [{ id: '', qty: '' }]
  })
  const [insoleMaterials, setInsoleMaterials] = useState([])
  const [nonInsoleMaterials, setNonInsoleMaterials] = useState([])
  const sizes = Array.from({ length: 31 }, (_, i) => 20 + i)

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await fetchMaterialsPlan()
      const insoleRegex = /insole|insol/i
      const filteredInsoleMaterials = data.filter(material => insoleRegex.test(material.materialName.trim().toLowerCase()))
      setInsoleMaterials(filteredInsoleMaterials)

      const notInsoleRegex = /^(?!.*\binsole\b|.*\binsol\b)/i
      const filteredNonInsoleMaterials = data.filter(material => notInsoleRegex.test(material.materialName.trim().toLowerCase()))
      setNonInsoleMaterials(filteredNonInsoleMaterials)
    }

    fetchMaterials()
  }, [fetchMaterialsPlan])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handlePlaningStockChange = (index, e) => {
    const { name, value } = e.target
    const newPlaningStocks = formData.planingStocks.map((stock, idx) => {
      if (index === idx) {
        return { ...stock, [name]: value }
      }
      return stock
    })
    setFormData({ ...formData, planingStocks: newPlaningStocks })
  }

  const handleSizeChange = (index, size) => {
    const updatedPlaningStocks = formData.planingStocks.map((stock, idx) => {
      if (index === idx) {
        const currentSizes = stock.sizes ? stock.sizes.split(',') : []
        const newSizes = currentSizes.includes(size.toString())  ? currentSizes.filter(s => s !== size.toString())  : [...currentSizes, size.toString()]
        return { ...stock, sizes: newSizes.join(',') }
      }
      return stock
    })
    setFormData({ ...formData, planingStocks: updatedPlaningStocks })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Submitting form data:', formData)
    
    try {
      const response = await AddPlan(formData)
      console.log('Plan added successfully:', response)
      toast.success('Plan added successfully!')
    } catch (error) {
      console.error('Error adding Plan:', error)
      toast.error('Error adding Plan. Please try again.')
    }
    toggle()
  }

  const handleInsoleMaterialChange = (index, e) => {
    const selectedMaterialId = e.target.value
    const newPlaningStocks = formData.planingStocks.map((stock, idx) => {
      if (index === idx) {
        return { ...stock, insoleMaterialId: selectedMaterialId }
      }
      return stock
    })
    setFormData({ ...formData, planingStocks: newPlaningStocks })
  }

  const handleMaterialChange = (index, e) => {
    const { name, value } = e.target
    const newMaterials = formData.materials.map((material, idx) => {
      if (index === idx) {
        return { ...material, [name]: value }
      }
      return material
    })
    setFormData({ ...formData, materials: newMaterials })
  }

  const addPlaningStockField = () => {
    setFormData({
      ...formData,
      planingStocks: [
        ...formData.planingStocks,
        { articleNo: '', color: '', sizes: '', insoleMaterialId: '', insoleQty: '' }
      ]
    })
  }

  const addMaterialField = () => {
    setFormData({ ...formData, materials: [...formData.materials, { id: '', qty: '' }] })
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Create New Plan</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employeeName">Employee Name</Label>
            <Input
              type="text"
              name="employeeName"
              id="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <h5>Planing Stocks</h5>
          <FormGroup>
            {formData.planingStocks.map((stock, index) => (
              <Row key={index}>
                <Col>
                  <Label for={`articleNo-${index}`}>Article No</Label>
                  <Input
                    type="text"
                    name="articleNo"
                    id={`articleNo-${index}`}
                    value={stock.articleNo}
                    onChange={(e) => handlePlaningStockChange(index, e)}
                    required
                  />
                </Col>
                <Col>
                  <Label for={`color-${index}`}>Color</Label>
                  <Input
                    type="text"
                    name="color"
                    id={`color-${index}`}
                    value={stock.color}
                    onChange={(e) => handlePlaningStockChange(index, e)}
                    required
                  />
                </Col>
                <Row style={{ marginBottom: '20px' }}>
                  <br />
                  <Label style={{ marginBottom: '-5px', marginLeft: '20px' }}>Select Sizes:</Label>
                  <div className="size-buttons d-flex flex-wrap" style={{ gap: '15px', marginLeft: '30px' }}>
                    {sizes.map(size => (
                      <div key={size} className="size-checkbox" style={{ marginBottom: '-10px', marginLeft: '10px' }}>
                        <Input
                          type="checkbox"
                          id={`size-${index}-${size}`}
                          checked={stock.sizes.split(',').includes(size.toString())}
                          onChange={() => handleSizeChange(index, size)}
                        />
                        <Label for={`size-${index}-${size}`}>
                          {size}
                        </Label>
                      </div>
                    ))}
                  </div>
                </Row>
                <Col>
                  <Label for={`insoleMaterialId-${index}`}>Insole Material</Label>
                  <Input
                    type="select"
                    name="insoleMaterialId"
                    id={`insoleMaterialId-${index}`}
                    value={stock.insoleMaterialId}
                    onChange={(e) => handleInsoleMaterialChange(index, e)}
                    required
                  >
                    <option value="">Select Insole Material</option>
                    {insoleMaterials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.materialName} - {material.size}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Label for={`insoleQty-${index}`}>Insole Quantity</Label>
                  <Input
                    type="number"
                    name="insoleQty"
                    id={`insoleQty-${index}`}
                    value={stock.insoleQty}
                    onChange={(e) => handlePlaningStockChange(index, e)}
                    required
                  />
                </Col>
              </Row>
            ))}
          </FormGroup>

          <Button color="secondary" onClick={addPlaningStockField}>Add Planing Stock</Button>

          <h5 style={{ marginTop: '20px' }}>Materials</h5>
          <FormGroup>
            {formData.materials.map((material, index) => (
              <Row key={index}>
                <Col>
                  <Label for={`materialId-${index}`}>Material</Label>
                  <Input
                    type="select"
                    name="id"
                    id={`materialId-${index}`}
                    value={material.id}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                  >
                    <option value="">Select Material</option>
                    {nonInsoleMaterials.map(nonInsoleMaterial => (
                      <option key={nonInsoleMaterial.id} value={nonInsoleMaterial.id}>
                        {nonInsoleMaterial.materialName}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Label for={`materialQty-${index}`}>Quantity</Label>
                  <Input
                    type="number"
                    name="qty"
                    id={`materialQty-${index}`}
                    value={material.qty}
                    onChange={(e) => handleMaterialChange(index, e)}
                    required
                  />
                </Col>
              </Row>
            ))}
          </FormGroup>

          <Button color="secondary" onClick={addMaterialField}>Add Material</Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PlanModel
