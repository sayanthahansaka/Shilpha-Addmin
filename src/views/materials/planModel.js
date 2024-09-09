import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col, Table } from 'reactstrap'
import { AddPlan } from '../../servirces/plan/PlanAPI'
import { toast } from 'react-toastify'

const PlanModel = ({ isOpen, toggle, fetchMaterialsPlan }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    planingStocks: [],
    materials: []
  })
  console.log("yoo ", formData)

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

  const [currentPlaningStock, setCurrentPlaningStock] = useState({
    articleNo: '',
    color: '',
    sizes: '',
    insoleMaterialId: '',
    insoleQty: ''
  })

  const handlePlaningStockChange = (e) => {
    const { name, value } = e.target
    setCurrentPlaningStock({ ...currentPlaningStock, [name]: value })
  }

  const handleSizeChange = (size) => {
    const currentSizes = currentPlaningStock.sizes ? currentPlaningStock.sizes.split(',') : []
    const newSizes = currentSizes.includes(size.toString())  ? currentSizes.filter(s => s !== size.toString())  : [...currentSizes, size.toString()]
    console.log(newSizes)
    setCurrentPlaningStock({ ...currentPlaningStock, sizes: newSizes.join(',') })
  }

  const handleInsoleMaterialChange = (e) => {
    const selectedMaterialId = e.target.value
    setCurrentPlaningStock({ ...currentPlaningStock, insoleMaterialId: selectedMaterialId })
  }

  const addPlaningStockToTable = () => {
    const newSizes = currentPlaningStock.sizes.split(',').filter(size => size.trim() !== '')
  
    const newPlaningStocks = newSizes.map(size => ({
      articleNo: currentPlaningStock.articleNo,
      color: currentPlaningStock.color,
      size, // Assign each individual size to the size field
      insoleMaterialId: currentPlaningStock.insoleMaterialId,
      insoleQty: currentPlaningStock.insoleQty
    }))
  
    setFormData({
      ...formData,
      planingStocks: [...formData.planingStocks, ...newPlaningStocks]
    })
  
    setCurrentPlaningStock({
      articleNo: '',
      color: '',
      sizes: '',
      insoleMaterialId: '',
      insoleQty: ''
    })
  
    console.log("Updated Planing Stocks: ", newPlaningStocks)
  }
  

  const [currentMaterial, setCurrentMaterial] = useState({ id: '', qty: '' })

  const handleMaterialChange = (e) => {
    const { name, value } = e.target
    setCurrentMaterial({ ...currentMaterial, [name]: value })
  }

  const addMaterialToTable = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, currentMaterial]
    })
    setCurrentMaterial({ id: '', qty: '' })
  }

  const handleSubmit = async (e) => {
    console.log('Submitting form data:', formData)
    console.log('Submitting form data  e :', e)
    e.preventDefault()
    // console.log('Submitting form data:', formData)
    
    try {
      const response = await AddPlan(formData)
      console.log('Plan added successfully:', response)
      // toast.success('Plan added successfully!')
    } catch (error) {
      console.error('Error adding Plan:', error)
      // toast.error('Error adding Plan. Please try again.')
    }
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}
    style={{ maxWidth: '90vw', width: '800px', maxHeight: '90vh', height: 'auto' }}
    >
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
          <Row>
            <Col>
              <Label for="articleNo">Article No</Label>
              <Input
                type="text"
                name="articleNo"
                id="articleNo"
                value={currentPlaningStock.articleNo}
                onChange={handlePlaningStockChange}
                // required
              />
            </Col>
            <Col>
              <Label for="color">Color</Label>
              <Input
                type="text"
                name="color"
                id="color"
                value={currentPlaningStock.color}
                onChange={handlePlaningStockChange}
                // required
              />
            </Col>
            <Col>
              <Label for="insoleMaterialId">Insole Material</Label>
              <Input
                type="select"
                name="insoleMaterialId"
                id="insoleMaterialId"
                value={currentPlaningStock.insoleMaterialId}
                onChange={handleInsoleMaterialChange}
                // required
              >
                <option value="">Select Insole Material</option>
                {insoleMaterials.map(material => (
                  <option key={material.id} value={material.id}>
                    {material.materialName}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for="insoleQty">Insole Quantity</Label>
              <Input
                type="number"
                name="insoleQty"
                id="insoleQty"
                value={currentPlaningStock.insoleQty}
                onChange={handlePlaningStockChange}
                // required
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Label style={{ marginBottom: '-5px', marginLeft: '20px' }}>Select Sizes:</Label>
            <div className="size-buttons d-flex flex-wrap" style={{ gap: '15px', marginLeft: '30px' }}>
              {sizes.map(size => (
                <div key={size} className="size-checkbox" style={{ marginBottom: '-10px', marginLeft: '10px' }}>
                  <Input
                    type="checkbox"
                    id={`size-${size}`}
                    checked={currentPlaningStock.sizes.split(',').includes(size.toString())}
                    onChange={() => handleSizeChange(size)}
                  />
                  <Label for={`size-${size}`}>
                    {size}
                  </Label>
                </div>
              ))}
            </div>
          </Row>
          <Button color="secondary" onClick={addPlaningStockToTable}>Add to Table</Button>
          <Table bordered style={{ marginTop: '20px' }} >
            <thead>
              <tr>
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Insole ID</th>
                <th>Insole QTY</th>
              </tr>
            </thead>
            <tbody>
              {formData.planingStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.articleNo}</td>
                  <td>{stock.color}</td>
                  <td>{stock.size}</td>
                  <td>{stock.insoleMaterialId}</td>
                  <td>{stock.insoleQty}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 style={{ marginTop: '20px' }}>Materials</h5>
          <Row>
            <Col>
              <Label for="materialId">Material</Label>
              <Input
                type="select"
                name="id"
                id="materialId"
                value={currentMaterial.id}
                onChange={handleMaterialChange}
                // required
              >
                <option value="">Select Material</option>
                {nonInsoleMaterials.map(material => (
                  <option key={material.id} value={material.id}>
                    {material.materialName}
                  </option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for="materialQty">Quantity</Label>
              <Input
                type="number"
                name="qty"
                id="materialQty"
                value={currentMaterial.qty}
                onChange={handleMaterialChange}
                // required
              />
            </Col>
          </Row>
          <Button color="secondary" onClick={addMaterialToTable}>Add to Table</Button>
          <Table bordered style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>Material ID</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {formData.materials.map((material, index) => (
                <tr key={index}>
                  <td>{material.id}</td>
                  <td>{material.qty}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PlanModel
