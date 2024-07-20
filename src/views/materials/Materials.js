import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { Archive } from 'react-feather'
import PlanModel from './planModel'
import AddMaterialsModel from './AddMaterialsModel'

const Materials = () => {
  const initialStock = [
    { itemName: 'Insole', quantity: 100, supplier: 'Supplier 1', date: '2024-07-01' },
    { itemName: 'Heel', quantity: 200, supplier: 'Supplier 2', date: '2024-07-02' },
    { itemName: 'Vamp', quantity: 50, supplier: 'Supplier 3', date: '2024-07-03' },
    { itemName: 'Sole', quantity: 75, supplier: 'Supplier 4', date: '2024-07-04' },
    { itemName: 'Counter', quantity: 30, supplier: 'Supplier 5', date: '2024-07-05' },
    { itemName: 'Glue', quantity: '60L', supplier: 'Supplier 6', date: '2024-07-05' }
  ]

  const [stock, setStock] = useState(initialStock)
  const [planModalOpen, setPlanModalOpen] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)

  const togglePlanModal = () => setPlanModalOpen(!planModalOpen)
  const toggleAddModal = () => setAddModalOpen(!addModalOpen)

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
          <Button color="success" onClick={togglePlanModal} style={{ float: 'right' }}>
            Add New Material
          </Button>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Add Material</th>
              </tr>
            </thead>
            <tbody>
              {stock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.supplier}</td>
                  <td>{item.date}</td>
                  <td>
                    <Button color="success" onClick={toggleAddModal}>
                      Add Material
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
    </div>
  )
}

export default Materials
