import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col, Table } from 'reactstrap'
import { AddPlan } from '../../servirces/plan/PlanAPI'
import { getMaterialSizesById } from '../../servirces/materials/MaterialsAPI'
import { toast } from 'react-toastify'

const PlanModel = ({ isOpen, toggle, fetchMaterialsPlan }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    planingStocks: [],
    materials: []
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

  const fetchMaterialSizes = async (materialId) => {
    try {
      const response = await getMaterialSizesById(materialId)
      console.log(response)
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
    const newSizes = currentSizes.includes(size.toString()) ? currentSizes.filter(s => s !== size.toString()) : [...currentSizes, size.toString()]
    setCurrentPlaningStock({ ...currentPlaningStock, sizes: newSizes.join(',') })
  }

  const handleInsoleMaterialChange = (e) => {
    const selectedMaterialId = e.target.value
    setCurrentPlaningStock({ ...currentPlaningStock, insoleMaterialId: selectedMaterialId })
  
    if (selectedMaterialId) {
      fetchMaterialSizes(selectedMaterialId) // Fetch sizes when a material is selected
    } else {
      setSizes([]) // Clear sizes if no material is selected
    }
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
    e.preventDefault()
    
    try {
      const response = await AddPlan(formData)
      console.log('Plan added successfully:', response)
      // toast.success('Plan added successfully!')
    } catch (error) {
      console.error('Error adding Plan:', error)
      toast.error('Error adding Plan. Please try again.')
    }
    toggle()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle} style={{ maxWidth: '90vw', width: '800px', maxHeight: '90vh', height: 'auto' }}>
      <Form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>Create New Plan</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="employeeName">Plan Number</Label>
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
<option value="H026">H-026</option>
<option value="H029">H-029</option>
<option value="H034">H-034</option>
<option value="H035">H-035</option>
<option value="H037">H-037</option>
<option value="H039">H-039</option>
<option value="H058">H-058</option>
<option value="H069">H-069</option>
<option value="H070">H-070</option>
<option value="H083">H-083</option>
<option value="H084">H-084</option>
<option value="H088">H-088</option>
<option value="H091">H-091</option>
<option value="H093">H-093</option>
<option value="H096">H-096</option>
<option value="H097">H-097</option>
<option value="H098">H-098</option>
<option value="H100">H-100</option>
<option value="H101">H-101</option>
<option value="H102">H-102</option>
<option value="H104">H-104</option>
<option value="H105">H-105</option>
<hr></hr>
<option value="F004">F-004</option>
<option value="F009">F-009</option>
<option value="F016">F-016</option>
<option value="F027">F-027</option>
<option value="F032">F-032</option>
<option value="F042">F-042</option>
<option value="F052">F-052</option>
<option value="F057">F-057</option>
<option value="F061">F-061</option>
<option value="F063">F-063</option>
<option value="F070">F-070</option>
<option value="F071">F-071</option>
<option value="F073">F-073</option>
<option value="F074">F-074</option>
<option value="F075">F-075</option>
<option value="F076">F-076</option>
<option value="F077">F-077</option>
<option value="F080">F-080</option>  
<option value="F082">F-082</option>
<option value="F086">F-086</option>
<option value="F087">F-087</option>
<option value="F089">F-089</option>
<option value="F090">F-090</option>
<option value="F094">F-094</option>   
<hr></hr>
<option value="HN023">HN-023</option>
<option value="HN026">HN-026</option>
<hr></hr>
<option value="HM029">HM-029</option>
<hr></hr>
<option value="HC015">HC-015</option>
<option value="HC035">HC-035</option>
<hr></hr>
<option value="CW024">CW-024</option>
<hr></hr>
<option value="FN011">FN-011</option>
<option value="FN064">FN-064</option>
<option value="FN065">FN-065</option>
<hr></hr>
<option value="FCN065">FCN-065</option>
<hr></hr>
<option value="W003">W-003</option>
<option value="W005">W-005</option>
<option value="W006">W-006</option>
<option value="W058">W-058</option>
<option value="CH008">CH-008</option>  
<option value="CH024">CH024</option>
<option value="CH029">CH-029</option>
<hr></hr>
<option value="C008">C-008</option>
<hr></hr>
<option value="G001">G-001</option>
<option value="G002">G-002</option>
<option value="G003">G-003</option>
<hr></hr>
<option value="FC30">FC-30</option>
<option value="FC035">FC-035</option>
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
                style={{ backgroundColor: currentPlaningStock.color }} // This sets the background color based on the selected color
                // required
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
                  <option key={material.id} value={material.id}>
                    {material.materialName} - {material.color} - {material.qty}
                  </option>
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
                onChange={handlePlaningStockChange}
              />
            </Col> */}
          </Row>
          <Row style={{ marginBottom: '20px' }}>

            <Label style={{ marginBottom: '-5px', marginLeft: '20px' }}>Select Sizes:</Label>
            <div className="size-buttons d-flex flex-wrap" style={{ gap: '15px', marginLeft: '50px' }}>
            {sizes && sizes.length > 0 ? sizes.map(size => (
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
              )) : <p>No sizes available</p>}
            </div>
          </Row>

          <Button color="secondary" onClick={addPlaningStockToTable}>Add to Table</Button>
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <Table bordered style={{ width: '100%', minWidth: '600px' }}>
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
                  <td><Input
                        type="number"
                        name="insoleQty"
                        id={`insoleQty-${index}`}
                        value={stock.insoleQty || ''}
                        onChange={(e) => handleInsoleQtyChange(e, index)}
                      /></td>
                </tr>
              ))}
            </tbody>
          </Table>
</div>
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
                    {material.materialName} -  {material.size} -  {material.color} - {material.qty}
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
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <Table bordered style={{ width: '100%', minWidth: '600px' }}>
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

export default PlanModel
