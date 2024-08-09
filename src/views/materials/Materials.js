import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { Archive } from 'react-feather'
import PlanModel from './planModel'
import AddMaterialsModel from './AddMaterialsModel'
import MaterialsHistoryModel from './MaterialsHistoryModel'
import UpdateMaterialsModel from './UpdateMaterialsModel'
import { getAllmaterials } from '../../servirces/materials/MaterialsAPI'

const Materials = () => {
  const [stock, setStock] = useState([])
  const [planModalOpen, setPlanModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [historyModelOpen, sethistoryModelOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  const fetchMaterials = async () => {
    const materials = await getAllmaterials()
    console.log("get All materials Data", materials)
    setStock(materials)
  }

  useEffect(() => {
    fetchMaterials()
  }, [])

  const togglePlanModal = () => setPlanModalOpen(!planModalOpen)
  const toggleAddModal = () => setAddModalOpen(!addModalOpen)
  const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen)
  const toggleHistoryModel = () => sethistoryModelOpen(!historyModelOpen)

  const openUpdateModalWithMaterial = (material) => {
    setSelectedMaterial(material)
    toggleUpdateModal()
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
                <th>Material Name</th>
                <th>Quantity</th>
                <th>Color</th>
                <th>Create Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.materialName}</td>
                  <td>{item.qty}</td>
                  <td>{item.color}</td>
                  <td>{item.createDate}</td>
                  <td>
                    <Button
                      onClick={() => openUpdateModalWithMaterial(item)}
                     color="success"
                    >
                      Update Material
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedMaterial(item) // Set the selected material
                        toggleHistoryModel()      // Open the history modal
                      }}
                      color="secondary"
                    >
                      View
                  </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      
      <MaterialsHistoryModel isOpen={historyModelOpen} toggle={toggleHistoryModel}  materialId={selectedMaterial?.id} />
      {/* <MaterialsHistoryModel isOpen={historyModelOpen} toggle={toggleHistoryModel}></MaterialsHistoryModel> */}
      <PlanModel isOpen={planModalOpen} toggle={togglePlanModal} />
      <AddMaterialsModel isOpen={addModalOpen} toggle={toggleAddModal} fetchMaterials={fetchMaterials} />
      <UpdateMaterialsModel isOpen={updateModalOpen} toggle={toggleUpdateModal} material={selectedMaterial} fetchMaterials={fetchMaterials} />
    </div>
  )
}

export default Materials
