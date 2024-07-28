// src/views/online/Online.js

import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { getAllOnlineOrders, getAllDoneOnlineOrders, markOrderAsDone } from '../../servirces/orders/OrdersAPI'
import OrderModal from './OrderModal'
import { toast } from 'react-toastify'

const Online = () => {
  const [processingOrders, setProcessingOrders] = useState([])
  const [doneOrders, setDoneOrders] = useState([])
  const [addModalOpen, setAddModalOpen] = useState(false)

  const fetchOrders = async () => {
    try {
      const [processingData, doneData] = await Promise.all([
        getAllOnlineOrders(),
        getAllDoneOnlineOrders()
      ])

      if (Array.isArray(processingData)) {
        setProcessingOrders(processingData)
      } else {
        console.error("Unexpected processing data format:", processingData)
      }

      if (Array.isArray(doneData)) {
        setDoneOrders(doneData)
      } else {
        console.error("Unexpected done data format:", doneData)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleMarkAsDone = async (orderId) => {
    try {
      await markOrderAsDone(orderId, 'online')
      fetchOrders()
    } catch (error) {
      console.error('Error marking order as done:', error)
    }
  }

  const toggleAddModal = () => setAddModalOpen(!addModalOpen)

  const addOrder = (newOrder) => {
    setProcessingOrders(prevOrders => [...prevOrders, newOrder])
  }

  return (
    <div className="orders-container">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Processing Orders</h3>
          </CardTitle>
        </CardHeader>
        <Button color="success" onClick={toggleAddModal} style={{ float: 'right' }}>
          Add New Order
        </Button>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Article No</th>
                <th>Color</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processingOrders.length > 0 ? processingOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id || 'N/A'}</td>
                  <td>{order.customerName || 'N/A'}</td>
                  <td>{order.address || 'N/A'}</td>
                  <td>{order.contacts ? order.contacts.map(contact => contact.contact).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.articleNo).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.color).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.size).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.qty).join(', ') : 'N/A'}</td>
                  <td>{order.packagePrice || 'N/A'}</td>
                  <td>{order.createDate || 'N/A'}</td>
                  <td>
                    <Button color="primary" onClick={() => handleMarkAsDone(order.id)}>Mark as Done</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="11" className="text-center">No processing orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Done Orders</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
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
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {doneOrders.length > 0 ? doneOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id || 'N/A'}</td>
                  <td>{order.customerName || 'N/A'}</td>
                  <td>{order.address || 'N/A'}</td>
                  <td>{order.contacts ? order.contacts.map(contact => contact.contact).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.articleNo).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.color).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.size).join(', ') : 'N/A'}</td>
                  <td>{order.packagePrice || 'N/A'}</td>
                  <td>{order.createDate || 'N/A'}</td>
                  <td>Done</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="text-center">No done orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <OrderModal isOpen={addModalOpen} toggle={toggleAddModal} addOrder={addOrder} />
    </div>
  )
}

export default Online
