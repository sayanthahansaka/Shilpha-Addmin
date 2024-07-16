import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import OrderModal from './OrderModal'

const Online = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [onlineOrders, setOnlineOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Example fake data (use an array of objects for multiple orders)
  const initialOnlineOrders = [
    {
      orderID: 'o001',
      customerName: 'Nimal',
      address: "123 Main St",
      phoneNumber: "0752803235",
      articleNo: "ABC123",
      color: "Green",
      size: "28",
      price: "2500",
      date: "2024-08-08",
      done: false
    },
    {
      orderID: 'o002',
      customerName: 'John Doe',
      address: "456 Elm St",
      phoneNumber: "1234567890",
      articleNo: "DEF456",
      color: "Blue",
      size: "32",
      price: "3000",
      date: "2024-07-14",
      done: true
    }
  ]

  useState(() => {
    setOnlineOrders(initialOnlineOrders)
    setFilteredOrders(initialOnlineOrders)
  }, [])

  const addOrder = (newOrder) => {
    setOnlineOrders([...onlineOrders, newOrder])
    setFilteredOrders([...filteredOrders, newOrder])
    setIsAddModalOpen(false) // Close modal after adding order
  }

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase()
    setSearchTerm(searchTerm)
    const filteredResults = onlineOrders.filter((order) => order.customerName.toLowerCase().includes(searchTerm))
    setFilteredOrders(filteredResults)
  }

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleOpenEditModal = (order) => {
    setSelectedOrder(order)
    setIsEditModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsAddModalOpen(false)
    setIsEditModalOpen(false)
    setSelectedOrder(null)
  }

  const handleUpdateOrder = (updatedOrder) => {
    const updatedOrders = onlineOrders.map(order => (
      order.orderID === updatedOrder.orderID ? updatedOrder : order
    ))
    setOnlineOrders(updatedOrders)
    setFilteredOrders(updatedOrders)
    setIsEditModalOpen(false)
  }
  

  const handleDeleteOrder = (orderID) => {
    const updatedOrders = onlineOrders.filter(order => order.orderID !== orderID)
    setOnlineOrders(updatedOrders)
    setFilteredOrders(updatedOrders)
  }

  return (
    <Card>
      <CardHeader>
        <h1 style={{ color: "black" }}>Online Orders Manage</h1>
        <CardTitle style={{ display: "flex", gap: 25, alignItems: "center", justifyContent: "center" }}>
          <Input
            type="text"
            placeholder="Search by Customer Name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="success" size="sm" disabled={isAddModalOpen} onClick={handleOpenAddModal}>Add Order</Button>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Table className="table-responsive" bordered style={{ marginTop: "20px" }}>
          <thead style={{ fontSize: "13px" }}>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Article No</th>
              <th>Color</th>
              <th>Size</th>
              <th>Price</th>
              <th>Date</th>
              <th>Order Done</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "13px" }}>
            {filteredOrders.map((order) => (
              <tr key={order.orderID}>
                <td>{order.orderID}</td>
                <td>{order.customerName}</td>
                <td>{order.address}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.articleNo}</td>
                <td>{order.color}</td>
                <td>{order.size}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
                <td>
                  <Input
                    type="radio"
                    name={`orderDone_${order.orderID}`}
                    checked={order.done}
                    onChange={(event) => handleOrderDoneChange(order.orderID, event)}
                  />
                </td>
                <td>
                  <Button color="info" size="sm" onClick={() => handleOpenEditModal(order)}>Edit</Button>{' '}
                  <Button color="danger" size="sm" onClick={() => handleDeleteOrder(order.orderID)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </CardBody>
      <OrderModal isOpen={isAddModalOpen || isEditModalOpen} toggle={handleCloseModal} addOrder={addOrder} updateOrder={handleUpdateOrder} order={selectedOrder} />
    </Card>
  )
}
export default Online
