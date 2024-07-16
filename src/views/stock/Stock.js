import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table } from 'reactstrap'
import { ShoppingCart } from 'react-feather' // Update this path accordingly

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

  return (
    <div className="stock-container">
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Main Stock
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {mainStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.supplier}</td>
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
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {onlineOrderStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.supplier}</td>
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
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {shopStock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.supplier}</td>
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
