import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { ShoppingCart } from 'react-feather'
import AddStockModal from './StockModal'
import { getAllStock, getAllOnlineStock, getAllShopStock } from '../../servirces/stock/StockAPI'
import UpdateModal from './UpdateModal'
import AddStockModel from './AddStockModel'

const Stock = () => {
  const [mainStock, setMainStock] = useState([])
  const [onlineOrderStock, setOnlineOrderStock] = useState([])
  const [shopStock, setShopStock] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [stockType, setStockType] = useState('')
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [addStockModalOpen, setAddStockModalOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)
  
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

  const toggleUpdateModal = () => setUpdateModalOpen(!updateModalOpen)
  const toggleAddStockModal = () => setAddStockModalOpen(!addStockModalOpen)

  const toggleModal = () => setModalOpen(!modalOpen)

  const openUpdateModalWithStock = (stock) => {
    setSelectedStock(stock)
    toggleUpdateModal()
  }

  return (
    <div className="stock-container">
      <AddStockModal isOpen={modalOpen} toggle={toggleModal} fetchStock={fetchStock} />

      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Main Stock
          </CardTitle>
          <Button color="primary" onClick={() => { setStockType('main'); toggleModal() }} style={{ float: 'right' }}>
            Transfer stock
          </Button>

          <Button color="success" onClick={() => toggleAddStockModal()} style={{ float: 'right' }}>
            Add stock
          </Button>
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
                <th></th>
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
                  <td>
                    <Button
                      onClick={() => openUpdateModalWithStock(item)}
                      color="success"
                    >
                      Update Stock
                    </Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center">No Main Stock Available</td>
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

      <UpdateModal 
        isOpen={updateModalOpen} 
        toggle={toggleUpdateModal} 
        stock={selectedStock} 
        fetchStocks={fetchStock} 
      />
       <AddStockModel 
        isOpen={addStockModalOpen} 
        toggle={toggleAddStockModal} 
        fetchStocks={fetchStock} 
      />
    </div>
  )
}

export default Stock
