import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Input } from 'reactstrap'
import ShopModal from './ShopModal'

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [shops, setShops] = useState([])
  const [filteredShops, setFilteredShops] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedShop, setSelectedShop] = useState(null)

  // Example fake data
  const initialShops = [
    {
      shopID: 's001',
      shopName: 'Nimal',
      address: "123 Main St",
      phoneNumber: "0752803235",
      articleNo: "ABC123,3455",
      colors: "Green,red",
      sizes: "28",
      price: "20500",
      date: "2024-08-08",
      done: false
    },
    {
      shopID: 's002',
      shopName: 'John Shop',
      address: "456 Elm St",
      phoneNumber: "1234567890",
      articleNo: "DEF456",
      colors: "Blue",
      sizes: "32",
      price: "3000",
      date: "2024-07-14",
      done: true
    }
  ]

  useEffect(() => {
    setShops(initialShops)
    setFilteredShops(initialShops)
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
              <tr key={shop.shopID}>
                <td>{shop.shopID}</td>
                <td>{shop.shopName}</td>
                <td>{shop.address}</td>
                <td>{shop.phoneNumber}</td>
                <td>{shop.articleNo}</td>
                <td>{shop.colors}</td>
                <td>{shop.sizes}</td>
                <td>{shop.price}</td>
                <td>{shop.date}</td>
                <td>
                  <Input
                    type="checkbox"
                    checked={shop.done}
                    onChange={(event) => handleShopDoneChange(shop.shopID, event)}
                  />
                </td>
                <td>
                  <Button color="info" size="sm" onClick={() => handleOpenEditModal(shop)}>Edit</Button>{' '}
                  <Button color="danger" size="sm" onClick={() => handleDeleteShop(shop.shopID)}>Delete</Button>
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
