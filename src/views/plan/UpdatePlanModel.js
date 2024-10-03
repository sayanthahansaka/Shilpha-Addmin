import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col } from 'reactstrap'
import { updatePlan } from '../../servirces/plan/PlanAPI'
import { getAllmaterials } from '../../servirces/materials/MaterialsAPI'
// import { toast } from 'react-toastify'

const UpdatePlanModel = ({ isOpen, toggle, plan, fetchPlans }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    planingStocks: [{ articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }],
    materials: [{ id: '', qty: '' }]
  })

  const [insoleMaterials, setInsoleMaterials] = useState([])
  const [nonInsoleMaterials, setNonInsoleMaterials] = useState([])
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
      planingStocks: [...formData.planingStocks, { articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }]
    })
  }

  const addMaterialField = () => {
    setFormData({ ...formData, materials: [...formData.materials, { id: '', qty: '' }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const planData = {
      id: plan.id,
      employeeName: formData.employeeName,
      planingStocks: formData.planingStocks,
      materials: formData.materials
    }

    try {
      await updatePlan(planData)
      fetchPlans()
      toggle()
    } catch (error) {
      console.error('Error updating plan:', error)
    }
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

          <h5>Planing Stocks</h5>
          {formData.planingStocks.map((stock, index) => (
            <Row key={index}>
              <Col>
                <Label for={`articleNo-${index}`}>Article No</Label>
                <Input
                  type="select"
                  name="articleNo"
                  id={`articleNo-${index}`}
                  value={stock.articleNo}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  // required
                ><option value="">Select Article No</option>
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
                <Label for={`color-${index}`}>Color</Label>
                <Input
                  type="select"
                  name="color"
                  id={`color-${index}`}
                  value={stock.color}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  style={{ backgroundColor: stock.color }} 
                  // required
                >
                  <option value="">{stock.color}</option>
                  {colors.map((color, idx) => (
                    <option key={idx} value={color}>
                      {color}
                    </option>
                  ))}
                </Input>
              </Col>

              <Col>
                <Label for={`size-${index}`}>Size</Label>
                <Input
                  type="text"
                  name="size"
                  id={`size-${index}`}
                  value={stock.size}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                />
              </Col>
              <Col>
                <Label for={`insoleMaterialId-${index}`}>Insole Material</Label>
                <Input
                  type="select"
                  name="insoleMaterialId"
                  id={`insoleMaterialId-${index}`}
                  value={stock.insoleMaterialId}
                  onChange={(e) => handlePlaningStockChange(index, e)}
                  required
                >
                  <option value="">Select Insole Material</option>
                  {insoleMaterials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.materialName} -  {material.color} -  {material.qty} - {material.size}
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
          <Button color="secondary" onClick={addPlaningStockField}>
            Add Another Planing Stock
          </Button>

          <h5>Materials</h5>
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
                  {nonInsoleMaterials.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.materialName}
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
          <Button color="secondary" onClick={addMaterialField}>
            Add Another Material
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit">Update Plan</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default UpdatePlanModel
