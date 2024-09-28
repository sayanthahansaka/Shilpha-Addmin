import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Pagination, PaginationItem, PaginationLink, Spinner } from 'reactstrap'
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
  const userRole = localStorage.getItem('userRole')

  
  const [loading, setLoading] = useState(false)

  // Pagination states for each table
  const [mainStockPage, setMainStockPage] = useState(1)
  const [onlineStockPage, setOnlineStockPage] = useState(1)
  const [shopStockPage, setShopStockPage] = useState(1)
  const [itemsPerPage] = useState(10) // Set the number of items per page for all tables

  // Calculate current items for each stock
  const indexOfLastMainStock = mainStockPage * itemsPerPage
  const indexOfFirstMainStock = indexOfLastMainStock - itemsPerPage
  const currentMainStock = mainStock.slice(indexOfFirstMainStock, indexOfLastMainStock)

  const indexOfLastOnlineStock = onlineStockPage * itemsPerPage
  const indexOfFirstOnlineStock = indexOfLastOnlineStock - itemsPerPage
  const currentOnlineStock = onlineOrderStock.slice(indexOfFirstOnlineStock, indexOfLastOnlineStock)

  const indexOfLastShopStock = shopStockPage * itemsPerPage
  const indexOfFirstShopStock = indexOfLastShopStock - itemsPerPage
  const currentShopStock = shopStock.slice(indexOfFirstShopStock, indexOfLastShopStock)

  // Handle page changes for each stock
  const paginateMainStock = (pageNumber) => setMainStockPage(pageNumber)
  const paginateOnlineStock = (pageNumber) => setOnlineStockPage(pageNumber)
  const paginateShopStock = (pageNumber) => setShopStockPage(pageNumber)

  const fetchStock = async () => {
    setLoading(true)
    try {
      const mainStockData = await getAllStock(0, 10, 'main')
      const onlineOrderStockData = await getAllOnlineStock(0, 10, 'online')
      const shopStockData = await getAllShopStock(0, 10, 'shop')

      setMainStock(mainStockData)
      setOnlineOrderStock(onlineOrderStockData)
      setShopStock(shopStockData)
    } catch (error) {
      console.error('Error fetching stock data:', error)
    } finally {
      setLoading(false)
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

      {/* Main Stock Table */}
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            <ShoppingCart /> Main Stock
          </CardTitle>
          <Button color="primary" onClick={() => { setStockType('main'); toggleModal() }} style={{ float: 'right' }}>
            Transfer stock
          </Button>

         {/* Conditionally render the "Add stock" button */}
         {userRole === '"ROLE_SUPER_ADMIN"' && (
            <Button color="success" onClick={toggleAddStockModal} style={{ float: 'right' }}>
              Add stock
            </Button>
          )}
        </CardHeader>
        <CardBody>
        {loading ? (
  <div className="text-center">
    <Spinner color="primary" /> Loading...
  </div>
) : (
  <Table bordered>
    <thead>
      <tr>
        {/* <th>ID</th> */}
        <th>Article No</th>
        <th>Color</th>
        <th>Size</th>
        <th>Quantity</th>
        <th>Stock Place</th>
        <th>Create Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {currentMainStock.length > 0 ? (
        currentMainStock.map((item) => (
          <tr key={item.id}>
            {/* <td>{item.id}</td> */}
            <td>{item.articleNo}</td>
            <td>{item.color}</td>
            <td>{item.size}</td>
            <td style={{
                                    backgroundColor: item && item.qty < 5 ? '#ff7979' : '#dff9fb',
                                    color: 'black'
                                  }}>{item.qty}</td>
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
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center">No Main Stock Available</td>
        </tr>
      )}
    </tbody>
  </Table>
)}

          <Pagination>
            {[...Array(Math.ceil(mainStock.length / itemsPerPage)).keys()].map(number => (
              <PaginationItem key={number + 1} active={number + 1 === mainStockPage}>
                <PaginationLink onClick={() => paginateMainStock(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </CardBody>
      </Card>

      {/* Online Order Stock Table */}
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
                {/* <th>ID</th> */}
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Stock Place</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
            {currentOnlineStock.length > 0 ? currentOnlineStock.map((item) => (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
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
          <Pagination>
            {[...Array(Math.ceil(onlineOrderStock.length / itemsPerPage)).keys()].map(number => (
              <PaginationItem key={number + 1} active={number + 1 === onlineStockPage}>
                <PaginationLink onClick={() => paginateOnlineStock(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </CardBody>
      </Card>

      {/* Shop Stock Table */}
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
                {/* <th>ID</th> */}
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Stock Place</th>
                <th>Create Date</th>
              </tr>
            </thead>
            <tbody>
              {currentShopStock.length > 0 ? currentShopStock.map((item) => (
                <tr key={item.id}>
                  {/* <td>{item.id}</td> */}
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
          <Pagination>
            {[...Array(Math.ceil(shopStock.length / itemsPerPage)).keys()].map(number => (
              <PaginationItem key={number + 1} active={number + 1 === shopStockPage}>
                <PaginationLink onClick={() => paginateShopStock(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        </CardBody>
      </Card>
    
      <UpdateModal
        isOpen={updateModalOpen}
        toggle={toggleUpdateModal}
        fetchStock={fetchStock}
        selectedStock={selectedStock} 
      />
      <AddStockModel
        isOpen={addStockModalOpen}
        toggle={toggleAddStockModal}
        fetchStock={fetchStock}
      />
    </div>
  )
}

export default Stock
