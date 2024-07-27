import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { ShoppingCart } from 'react-feather'
import AddStockModal from './StockModal' // Update the path accordingly
import { getAllStock, getAllOnlineStock, getAllShopStock } from '../../servirces/stock/StockAPI' // Update the path accordingly

const Stock = () => {
  const [mainStock, setMainStock] = useState([])
  const [onlineOrderStock, setOnlineOrderStock] = useState([])
  const [shopStock, setShopStock] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [stockType, setStockType] = useState('')

  const fetchStock = async () => {
    try {
      const mainStockData = await getAllStock(0, 10, 'main')
      const onlineOrderStockData = await getAllOnlineStock(0, 10, 'online')
      const shopStockData = await getAllShopStock(0, 10, 'shop')

      setMainStock(mainStockData)
      setOnlineOrderStock(onlineOrderStockData)
      setShopStock(shopStockData)
    } catch (error) {
      console.error('Error fetching stock data:', error)
    }
  }

  useEffect(() => {
    fetchStock()
  }, [])

  const toggleModal = () => setModalOpen(!modalOpen)

  return (
    <div className="stock-container">
      {/* <AddStockModal isOpen={modalOpen} toggle={toggleModal} addStock={addStock} stockType={stockType} /> */}
      <AddStockModal isOpen={modalOpen} toggle={toggleModal} fetchStock={fetchStock} />

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Main Stock
           
          </CardTitle>
        </CardHeader>
        <Button color="primary" onClick={() => { setStockType('main'); toggleModal() }} style={{ float: 'right' }}>
              Add Stock
            </Button>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Stock Place</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              {mainStock.length > 0 ? mainStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.articleNo}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td>{item.qty}</td>
                  <td>{item.stockPlace}</td>
                  <td>{new Date(item.createDate).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No Main Stock Available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Online Order Stock
            {/* <Button color="primary" onClick={() => { setStockType('online'); toggleModal() }} style={{ float: 'right' }}>
              Add Stock
            </Button> */}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Stock Place</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              {onlineOrderStock.length > 0 ? onlineOrderStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.articleNo}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td>{item.qty}</td>
                  <td>{item.stockPlace}</td>
                  <td>{new Date(item.createDate).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No Online Order Stock Available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Shop Stock
            {/* <Button color="primary" onClick={() => { setStockType('shop'); toggleModal() }} style={{ float: 'right' }}>
              Add Stock
            </Button> */}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>ID</th>
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Stock Place</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              {shopStock.length > 0 ? shopStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.articleNo}</td>
                  <td>{item.color}</td>
                  <td>{item.size}</td>
                  <td>{item.qty}</td>
                  <td>{item.stockPlace}</td>
                  <td>{new Date(item.createDate).toLocaleDateString()}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center">No Shop Stock Available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}

export default Stock
