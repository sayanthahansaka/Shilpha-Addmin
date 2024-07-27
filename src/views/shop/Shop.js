import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Input } from 'reactstrap'
import ShopModal from './ShopModal'
import { getAllOrders } from '../../servirces/orders/OrdersAPI'

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [shops, setShops] = useState([])
  const [filteredShops, setFilteredShops] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState(null)

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const orders = await getAllOrders() // Fetch data from API
        setShops(orders)
        setFilteredShops(orders)
      } catch (error) {
        console.error('Error fetching shops:', error)
      }
    }

    fetchShops()
  }, [])

  const addShop = (newShop) => {
    setShops([...shops, newShop])
    setFilteredShops([...filteredShops, newShop])
    setIsModalOpen(false)
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setSearchTerm(searchTerm)
    const filteredResults = shops.filter((shop) => shop.shopName.toLowerCase().includes(searchTerm))
    setFilteredShops(filteredResults)
  }

  const handleOpenAddModal = () => {
    setSelectedShop(null)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (shop) => {
    setSelectedShop(shop)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedShop(null)
  }

  const handleUpdateShop = (updatedShop) => {
    const updatedShops = shops.map(shop => (
      shop.shopID === updatedShop.shopID ? updatedShop : shop
    ))
    setShops(updatedShops)
    setFilteredShops(updatedShops)
    setIsModalOpen(false)
  }

  const handleDeleteShop = (shopID) => {
    const updatedShops = shops.filter(shop => shop.shopID !== shopID)
    setShops(updatedShops)
    setFilteredShops(updatedShops)
  }

  const handleShopDoneChange = (shopID, event) => {
    const updatedShops = shops.map(shop => (
      shop.shopID === shopID ? { ...shop, done: event.target.checked } : shop
    ))
    setShops(updatedShops)
    setFilteredShops(updatedShops)
  }

  return (
    <Card>
      <CardHeader>
        <h1 style={{ color: "black" }}>Shop Management</h1>
        <CardTitle style={{ display: "flex", gap: 25, alignItems: "center", justifyContent: "center" }}>
          <Input
            type="text"
            placeholder="Search by Shop Name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="success" size="sm" onClick={handleOpenAddModal}>Add Shop</Button>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table className="table-responsive" bordered style={{ marginTop: "20px" }}>
          <thead style={{ fontSize: "13px" }}>
            <tr>
              <th>Shop Order ID</th>
              <th>Shop Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Article No</th>
              <th>Colors</th>
              <th>Sizes</th>
              <th>Price</th>
              <th>Date</th>
              <th>Done</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "13px" }}>
            {filteredShops.map((shop) => (
              <tr key={shop.id}> {/* Assuming 'id' is a unique identifier */}
                <td>{shop.id}</td> {/* Assuming 'id' is the shop ID */}
                <td>{shop.customerName}</td> {/* Adjust according to your API response */}
                <td>{shop.address}</td>
                <td>{shop.contacts.map(contact => contact.contact).join(', ')}</td>
                <td>{shop.ordersDetail.map(detail => detail.articleNo).join(', ')}</td>
                <td>{shop.ordersDetail.map(detail => detail.color).join(', ')}</td>
                <td>{shop.ordersDetail.map(detail => detail.size).join(', ')}</td>
                <td>{shop.packagePrice}</td> {/* Adjust according to your API response */}
                <td>{shop.createDate}</td>
                <td>
                  <Input type="checkbox" checked={shop.done} onChange={(event) => handleShopDoneChange(shop.id, event)}
                  />
                </td>
                <td>
                  <Button color="info" size="sm" onClick={() => handleOpenEditModal(shop)}>Edit</Button>{' '}
                  <Button color="danger" size="sm" onClick={() => handleDeleteShop(shop.id)}>Delete</Button> {/* Adjust according to your API response */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
      <ShopModal isOpen={isModalOpen} toggle={handleCloseModal} addShop={addShop} updateShop={handleUpdateShop} shop={selectedShop} />
    </Card>
  )
}

export default Shop
