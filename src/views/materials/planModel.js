import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, Form, Row, Col} from 'reactstrap'
import { getAllmaterials } from '../../servirces/materials/MaterialsAPI'
import { AddPlan } from '../../servirces/plan/PlanAPI'
import { toast } from 'react-toastify'

const PlanModel = ({ isOpen, toggle }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    planingStocks: [
      {
        articleNo: '',
        color: '',
        size: '',
        insoleMaterialId: '',
        insoleQty: ''
      }
    ],
    materials: [{ id: '', qty: '' }]
  })

  const [insoleMaterials, setInsoleMaterials] = useState([])
  const [nonInsoleMaterials, setNonInsoleMaterials] = useState([])

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await getAllmaterials()
        console.log('API response:', response) // Log the full response
    
        // Adjust this line based on the actual structure of your response
        const data = response.data || response // Adjust according to your response structure
    
        if (Array.isArray(data)) {
          const insoleRegex = /insole|insol/i
          const filteredInsoleMaterials = data.filter(material => {
            const normalizedMaterialName = material.materialName.trim().toLowerCase()
            return insoleRegex.test(normalizedMaterialName)
          })
          setInsoleMaterials(filteredInsoleMaterials)

          const notInsoleRegex = /^(?!.*\binsole\b|.*\binsol\b)/i
          const filteredNonInsoleMaterials = data.filter(material => {
            const normalizedMaterialName = material.materialName.trim().toLowerCase()
            return notInsoleRegex.test(normalizedMaterialName)
          })
          setNonInsoleMaterials(filteredNonInsoleMaterials)

        } else {
          console.error('Unexpected data format:', data)
          setInsoleMaterials([]) // Set an empty array if the data is not in the expected format
        }
      } catch (error) {
        console.error('Error fetching materials:', error)
        setInsoleMaterials([]) // Set an empty array in case of error
      }
    }
    

    fetchMaterials()
  }, [])

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
        { articleNo: '', color: '', size: '', insoleMaterialId: '', insoleQty: '' }
      ]
    })
  }

  const addMaterialField = () => {
    setFormData({ ...formData, materials: [...formData.materials, { id: '', qty: '' }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

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
             
              <Row key={index}>
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
                  {insoleMaterials.map((material) => (
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
            </Row>
            
          ))}
         
        </FormGroup>

          <Button color="secondary" onClick={addPlaningStockField}>
            Add Another Planing Stock
          </Button>
          <h5>Materials</h5>
          <FormGroup>
  {formData.materials.map((material, index) => (
    <div key={index}>
      <Label for={`materialId-${index}`}>Material ID</Label>
      <Input
        type="select"
        name="id"
        id={`materialId-${index}`}
        value={material.id}
        onChange={(e) => handleMaterialChange(index, e)}
        required
      >
        <option value="">Select Material</option>
        {nonInsoleMaterials.map((nonInsoleMaterial) => (
          <option key={nonInsoleMaterial.id} value={nonInsoleMaterial.id}>
            {nonInsoleMaterial.materialName} - {nonInsoleMaterial.size}
          </option>
        ))}
      </Input>

      <Label for={`materialQty-${index}`}>Quantity</Label>
      <Input
        type="number"
        name="qty"
        id={`materialQty-${index}`}
        value={material.qty}
        onChange={(e) => handleMaterialChange(index, e)}
        required
      />
    </div>
  ))}
</FormGroup>

          <Button color="secondary" onClick={addMaterialField}>
            Add Another Material
          </Button>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Add Plan</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default PlanModel
