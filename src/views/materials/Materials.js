import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { Archive } from 'react-feather'
import PlanModel from './planModel'
import AddMaterialsModel from './AddMaterialsModel'
import UpdateMaterialsModel from './UpdateMaterialsModel'
import { getAllmaterials } from '../../servirces/materials/MaterialsAPI'

const Materials = () => {
  const [stock, setStock] = useState([])
  const [planModalOpen, setPlanModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  useEffect(() => {
    const fetchMaterials = async () => {
      const materials = await getAllmaterials()
      console.log("get All materials Data", materials)
      setStock(materials)
    }
    fetchMaterials()
  }, [])

  const togglePlanModal = () => setPlanModalOpen(!planModalOpen)
  const toggleAddModal = () => setAddModalOpen(!addModalOpen)
  const toggleUpdateModal = (material) => {
    setSelectedMaterial(material)
    setUpdateModalOpen(true)
  }

  return (
    <div className="stock-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <Archive /> Materials Stock
          </CardTitle>
          <Button color="primary" onClick={togglePlanModal} style={{ float: 'right' }}>
            Create New Plan
          </Button>
          <Button color="success" onClick={toggleAddModal} style={{ float: 'right' }}>
            Add New Material
          </Button>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Article No</th>
                <th>Material Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Create Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.articleNo}</td>
                  <td>{item.materialName}</td>
                  <td>{item.qty}</td>
                  <td>{item.supplier}</td>
                  <td>{item.createDate}</td>
                  <td>
                    <Button onClick={() => toggleUpdateModal(item)} style={{ backgroundColor: 'yellow' }}>
                      Update Material
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <PlanModel isOpen={planModalOpen} toggle={togglePlanModal} />
      <AddMaterialsModel isOpen={addModalOpen} toggle={toggleAddModal} />
      {selectedMaterial && (
        <UpdateMaterialsModel 
          isOpen={updateModalOpen} 
          toggle={() => setUpdateModalOpen(false)} 
          material={selectedMaterial} 
        />
      )}
    </div>
  )
}

export default Materials
