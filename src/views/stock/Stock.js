import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { ShoppingCart } from 'react-feather'
import AddStockModal from './StockModal' // Update the path accordingly

const Stock = () => {
  const initialMainStock = [
    { itemName: 'Item A', quantity: 100, price: 10, supplier: 'Supplier 1', date: '2024-07-01' },
    { itemName: 'Item B', quantity: 200, price: 20, supplier: 'Supplier 2', date: '2024-07-02' }
  ]

  const initialOnlineOrderStock = [{ itemName: 'Item C', quantity: 50, price: 15, supplier: 'Supplier 3', date: '2024-07-03' }]

  const initialShopStock = [{ itemName: 'Item D', quantity: 75, price: 25, supplier: 'Supplier 4', date: '2024-07-04' }]

  const [mainStock, setMainStock] = useState(initialMainStock)
  const [onlineOrderStock, setOnlineOrderStock] = useState(initialOnlineOrderStock)
  const [shopStock, setShopStock] = useState(initialShopStock)
  const [modalOpen, setModalOpen] = useState(false)
  const [stockType, setStockType] = useState('')

  const toggleModal = () => setModalOpen(!modalOpen)

  const addStock = (type, newStockItem) => {
    switch (type) {
      case 'Main Stock':
        setMainStock([...mainStock, newStockItem])
        break
      case 'Online Order Stock':
        setOnlineOrderStock([...onlineOrderStock, newStockItem])
        break
      case 'Shop Stock':
        setShopStock([...shopStock, newStockItem])
        break
      default:
        break
    }
  }

  return (
    <div className="stock-container">
      <AddStockModal isOpen={modalOpen} toggle={toggleModal} addStock={addStock} stockType={stockType} />

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Main Stock
            {/* <Button color="primary" onClick={() => { setStockType('Main Stock'); toggleModal() }} style={{ float: 'right' }}>
              Add Stock
            </Button> */}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {mainStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Online Order Stock
            <Button color="primary" onClick={() => { setStockType('Online Order Stock'); toggleModal() }} style={{ float: 'right' }}>
              Add Stock
            </Button>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {onlineOrderStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Shop Stock
            <Button color="primary" onClick={() => { setStockType('Shop Stock'); toggleModal() }} style={{ float: 'right' }}>
              Add Stock
            </Button>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {shopStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}

export default Stock
