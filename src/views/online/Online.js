import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Input } from 'reactstrap'
import OrderModal from './OrderModal'
import { getAllOnlineOrders } from '../../servirces/orders/OrdersAPI'

const Online = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [onlineOrders, setOnlineOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const fetchOnlineOrders = async () => {
      try {
        const orders = await getAllOnlineOrders() // Fetch data from API
        setOnlineOrders(orders)
        setFilteredOrders(orders)
      } catch (error) {
        console.error('Error fetching online orders:', error)
      }
    }

    fetchOnlineOrders()
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

  const handleOrderDoneChange = (orderID, event) => {
    const updatedOrders = onlineOrders.map(order => (
      order.orderID === orderID ? { ...order, done: event.target.checked } : order
    ))
    setOnlineOrders(updatedOrders)
    setFilteredOrders(updatedOrders)
  }

  return (
    <Card>
      <CardHeader>
        <h1 style={{ color: "black" }}>Online Orders Management</h1>
        <CardTitle style={{ display: "flex", gap: 25, alignItems: "center", justifyContent: "center" }}>
          <Input
            type="text"
            placeholder="Search by Customer Name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Button color="success" size="sm" onClick={handleOpenAddModal}>Add Order</Button>
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
                 <td>{order.id}</td> {/* Assuming 'id' is the shop ID */}
                <td>{order.customerName}</td> {/* Adjust according to your API response */}
                <td>{order.address}</td>
                <td>{order.contacts.map(contact => contact.contact).join(', ')}</td>
                <td>{order.ordersDetail.map(detail => detail.articleNo).join(', ')}</td>
                <td>{order.ordersDetail.map(detail => detail.color).join(', ')}</td>
                <td>{order.ordersDetail.map(detail => detail.size).join(', ')}</td>
                <td>{order.packagePrice}</td> {/* Adjust according to your API response */}
                <td>{order.createDate}</td>
                <td>
                  <Input
                    type="checkbox"
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
