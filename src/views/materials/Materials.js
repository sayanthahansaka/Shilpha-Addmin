import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { Archive } from 'react-feather'
import PlanModel from './planModel'

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
  const [modalOpen, setModalOpen] = useState(false)

  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className="stock-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <Archive /> Materials Stock
          </CardTitle>
          <Button color="primary" onClick={toggleModal} style={{ float: 'right' }}>
            Create New Plan
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
              </tr>
            </thead>
            <tbody>
              {stock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.supplier}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <PlanModel isOpen={modalOpen} toggle={toggleModal} />
    </div>
  )
}

export default Materials
