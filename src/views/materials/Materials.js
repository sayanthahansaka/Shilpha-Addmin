import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap'
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

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [loading, setLoading] = useState(false)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = stock.slice(indexOfFirstItem, indexOfLastItem)


  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const fetchMaterials = async () => {
    setLoading(true)
    try {
      const materials = await getAllmaterials()
      setStock(materials)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
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
            <Archive /> 
            Basic Parts Stock
          </CardTitle>
          <Button color="primary" onClick={togglePlanModal} style={{ float: 'right' }}>
            Create New Plan
          </Button>
          <Button color="success" onClick={toggleAddModal} style={{ float: 'right' }}>
            Add New Material
          </Button>
        </CardHeader>
        <CardBody>
        <div style={{ overflowX: 'auto' }}>
  {loading ? (
    <div className="text-center">
      <Spinner color="primary" /> Loading...
    </div>
  ) : (
    <Table bordered>
      <thead>
        <tr>
          <th>ID</th>
          <th>Material Name</th>
          <th>Quantity</th>
          <th>Color</th>
          <th>Size</th>
          <th>Create Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.materialName}</td>
              <td>{item.qty}</td>
              <td>{item.color}</td>
              <td>{item.size}</td>
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
                    setSelectedMaterial(item)
                    toggleHistoryModel()
                  }}
                  color="secondary"
                >
                  View
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">No found Data</td>
          </tr>
        )}
      </tbody>
    </Table>
  )}
</div>

          <Pagination>
            {[...Array(Math.ceil(stock.length / itemsPerPage)).keys()].map(number => (
              <PaginationItem key={number + 1} active={number + 1 === currentPage}>
                <PaginationLink onClick={() => paginate(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </CardBody>
      </Card>
      
      <MaterialsHistoryModel isOpen={historyModelOpen} toggle={toggleHistoryModel} materialId={selectedMaterial?.id} />
      <PlanModel isOpen={planModalOpen} toggle={togglePlanModal} />
      <AddMaterialsModel isOpen={addModalOpen} toggle={toggleAddModal} fetchMaterials={fetchMaterials} />
      <UpdateMaterialsModel isOpen={updateModalOpen} toggle={toggleUpdateModal} material={selectedMaterial} fetchMaterials={fetchMaterials} />
    </div>
  )
}

export default Materials
