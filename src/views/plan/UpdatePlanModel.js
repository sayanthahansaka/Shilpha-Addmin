import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col, Table } from 'reactstrap'
import { updatePlan } from '../../servirces/plan/PlanAPI'
import { getMaterialSizesById, getAllmaterials } from '../../servirces/materials/MaterialsAPI'
import { toast } from 'react-toastify'

const UpdatePlanModel = ({ isOpen, toggle, plan, fetchPlans }) => {

  const [formData, setFormData] = useState({
    employeeName: '',
    planingStocks: [{ articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }],
    materials: [{ id: '', qty: '' }]
  })


  const [insoleMaterials, setInsoleMaterials] = useState([])
  const [nonInsoleMaterials, setNonInsoleMaterials] = useState([])
  const [sizes, setSizes] = useState([])

  const colors = [
    "Black", "Chanel Black", "Brown", "Chanel Brown", "Tan", "Chanel Tan", "White", "Chanel White",
    "Ash", "Chanel Ash", "Purple", "Maroon", "Beige", "Chanel Beige", "Sea Green", "Navy Blue",
    "Light Blue", "Royal Blue", "Light Pink", "Salmon Pink", "Red", "Wine Red", "Yellow", "Chanel Gold",
    "Dust Gold", "Rose Gold", "Dust Silver", "Gold"
  ]

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await getAllmaterials()
      const insoleRegex = /insole|insol/i
      const filteredInsoleMaterials = data.filter(material => insoleRegex.test(material.materialName.trim().toLowerCase()))
      setInsoleMaterials(filteredInsoleMaterials)

      const notInsoleRegex = /^(?!.*\binsole\b|.*\binsol\b)/i
      const filteredNonInsoleMaterials = data.filter(material => notInsoleRegex.test(material.materialName.trim().toLowerCase()))
      setNonInsoleMaterials(filteredNonInsoleMaterials)
    }

    fetchMaterials()
  }, [])

  useEffect(() => {
    if (plan) {
      setFormData({
        id: plan.id,
        employeeName: plan.employeeName || '',
        planingStocks: plan.planingStocks.map(stock => ({
          articleNo: stock.stockItem.articleNo || '',
          color: stock.stockItem.color || '',
          size: stock.stockItem.size || '',
          insoleMaterialId: stock.insoleMaterialId || '',
          insoleQty: stock.insoleQty || ''
        })),
        materials: plan.planMaterialsStocks.map(material => ({
          id: material.materialsStock.id || '',
          qty: material.qty || ''
        }))
      })
    }
  }, [plan])

  const fetchMaterialSizes = async (materialId) => {
    try {
      const response = await getMaterialSizesById(materialId)
      if (Array.isArray(response)) {
        setSizes(response)
      } else {
        console.error('Unexpected response structure:', response)
        setSizes([])
      }
    } catch (error) {
      console.error('Error fetching material sizes:', error)
      setSizes([])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleInsoleQtyChange = (e, index) => {
    const { value } = e.target
    const updatedPlaningStocks = formData.planingStocks.map((stock, i) => (i === index ? { ...stock, insoleQty: value } : stock))
    setFormData({ ...formData, planingStocks: updatedPlaningStocks })
  }

  const [currentPlaningStock, setCurrentPlaningStock] = useState({
    articleNo: '',
    color: '',
    selectedSizes: [],
    insoleMaterialId: '',
    insoleQty: ''
  })

  const handlePlaningStockChange = (e) => {
    const { name, value } = e.target
    setCurrentPlaningStock({ ...currentPlaningStock, [name]: value })
  }

  const handleSizeChange = (size) => {
    setCurrentPlaningStock(prevState => {
      const updatedSizes = prevState.selectedSizes.includes(size) ? prevState.selectedSizes.filter(s => s !== size) : [...prevState.selectedSizes, size]
      return { ...prevState, selectedSizes: updatedSizes }
    })
  }

  const handleInsoleMaterialChange = (e) => {
    const selectedMaterialId = e.target.value
    setCurrentPlaningStock({ ...currentPlaningStock, insoleMaterialId: selectedMaterialId })

    if (selectedMaterialId) {
      fetchMaterialSizes(selectedMaterialId)
    } else {
      setSizes([])
    }
  }

  const addPlaningStockToTable = () => {
    const newPlaningStocks = currentPlaningStock.selectedSizes.map(size => ({
      articleNo: currentPlaningStock.articleNo,
      color: currentPlaningStock.color,
      size,
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
      selectedSizes: [],
      insoleMaterialId: '',
      insoleQty: ''
    })
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
    e.preventDefault()
    const payload = {
      id: plan.id,
      employeeName: formData.employeeName,
      planingStocks: formData.planingStocks.map(stock => ({
          articleNo: stock.articleNo,
          color: stock.color,
          size: stock.size,
          insoleMaterialId: stock.insoleMaterialId,
          insoleQty: stock.insoleQty
      })),
      materials: formData.materials.map(material => ({
          id: material.id,
          qty: material.qty
      }))
  }

    try {
      const response = await updatePlan(formData)
      fetchPlans()
      console.log('Plan updated successfully:', response)
      toast.success('Plan updated successfully!')
    } catch (error) {
      console.error('Error updating plan:', error)
      toast.error('Error updating plan. Please try again.')
    }
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: '90vw', width: '800px', maxHeight: '90vh', height: 'auto' }}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Update Plan</ModalHeader>
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
          <h5>Planning Stocks</h5>
          <Row>
            <Col>
              <Label for="articleNo">Article No</Label>
              <Input
                type="select"
                name="articleNo"
                id="articleNo"
                value={currentPlaningStock.articleNo}
                onChange={handlePlaningStockChange}
              >
                <option value="">Select Article No</option>
                <option value="H015">H-015</option>
                <option value="H016">H-016</option>
                <option value="H018">H-018</option>
                <option value="H023">H-023</option>
                <option value="H025">H-025</option>
              </Input>
            </Col>
            <Col>
              <Label for="color">Color</Label>
              <Input
                type="select"
                name="color"
                id="color"
                value={currentPlaningStock.color}
                onChange={handlePlaningStockChange}
              >
                <option value="">Select Color</option>
                {colors.map((color, index) => (
                  <option key={index} value={color}>{color}</option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for="insoleMaterialId">Insole Material</Label>
              <Input
                type="select"
                name="insoleMaterialId"
                id="insoleMaterialId"
                value={currentPlaningStock.insoleMaterialId}
                onChange={handleInsoleMaterialChange}
              >
                <option value="">Select Insole Material</option>
                {insoleMaterials.map(material => (
                  <option key={material.id} value={material.id}>{material.materialName}  - {material.color} - {material.qty}</option>
                ))}
              </Input>
            </Col>
            {/* <Col>
              <Label for="insoleQty">Insole Quantity</Label>
              <Input
                type="number"
                name="insoleQty"
                id="insoleQty"
                value={currentPlaningStock.insoleQty}
                onChange={(e) => handleInsoleQtyChange(e, currentPlaningStock.index)}
              />
            </Col> */}
          </Row>
          <h5>Sizes</h5>
          {sizes.map(size => (
            <FormGroup check key={size}>
              <Label check>
                <Input
                  type="checkbox"
                  checked={currentPlaningStock.selectedSizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </Label>
            </FormGroup>
          ))}
          <Button color="primary" onClick={addPlaningStockToTable}>Add Planing Stock</Button>
          <Table striped className="mt-3">
            <thead>
              <tr>
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Insole Material</th>
                <th>Insole Qty</th>
              </tr>
            </thead>
            <tbody>
              {formData.planingStocks.map((stock, index) => (
                <tr key={index}>
                  <td>{stock.articleNo}</td>
                  <td>{stock.color}</td>
                  <td>{stock.size}</td>
                  <td>{stock.insoleMaterialId}</td>
                  {/* <td>{stock.insoleQty}</td> */}
                  <td>
                    <Input
                      type="number"
                      name="insoleQty"
                      id={`insoleQty-${index}`}
                      value={stock.insoleQty} // Ensure stock.insoleQty exists in your data
                      onChange={(e) => handleInsoleQtyChange(e, index)} // Pass index to correctly identify the stock
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h5>Materials</h5>
          <Row>
            <Col>
              <Label for="materialId">Material</Label>
              <Input
                type="select"
                name="id"
                id="materialId"
                value={currentMaterial.id}
                onChange={handleMaterialChange}
              >
                <option value="">Select Material</option>
                {nonInsoleMaterials.map(material => (
                  <option key={material.id} value={material.id}>{material.materialName}</option>
                ))}
              </Input>
            </Col>
            <Col>
              <Label for="qty">Quantity</Label>
              <Input
                type="number"
                name="qty"
                id="qty"
                value={currentMaterial.qty}
                onChange={handleMaterialChange}
              />
            </Col>
          </Row>
          <Button color="primary" onClick={addMaterialToTable}>Add Material</Button>
          <Table striped className="mt-3">
            <thead>
              <tr>
                <th>Material</th>
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
          <Button type="submit" color="primary">Update Plan</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default UpdatePlanModel
