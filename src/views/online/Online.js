import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import { getAllOnlineOrders, getAllDoneOnlineOrders, markOrderAsDone, markOrderAsReturn, getAllReturnOnlineOrders } from '../../servirces/orders/OrdersAPI'
import OrderModal from './OrderModal'
import { toast } from 'react-toastify'

const Online = () => {
  const [processingOrders, setProcessingOrders] = useState([])
  const [doneOrders, setDoneOrders] = useState([])
  const [returnOrders, setReturnOrders] = useState([])
  const [addModalOpen, setAddModalOpen] = useState(false)

  const fetchOrders = async () => {
    try {
      const [processingData, doneData, returnData] = await Promise.all([
        getAllOnlineOrders(),
        getAllDoneOnlineOrders(),
        getAllReturnOnlineOrders() // Added to fetch return orders
      ])

      if (Array.isArray(processingData)) {
        setProcessingOrders(processingData)
      } else {
        toast.error("Unexpected processing data format:", processingData)
        console.error("Unexpected processing data format:", processingData)
      }

      if (Array.isArray(doneData)) {
        setDoneOrders(doneData)
      } else {
        toast.error("Unexpected done data format:", doneData)
        console.error("Unexpected done data format:", doneData)
      }

      if (Array.isArray(returnData)) {
        setReturnOrders(returnData) // Set return orders state
      } else {
        toast.error("Unexpected return data format:", returnData)
        console.error("Unexpected return data format:", returnData)
      }
      
    } catch (error) {
      toast.error('Error fetching orders:', error)
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
      toast.error('Error marking order as done:', error)
      console.error('Error marking order as done:', error)
    }
  }
  
  const handleMarkAsReturn = async (orderId) => {
    try {
      await markOrderAsReturn(orderId)
      fetchOrders()
    } catch (error) {
      toast.error('Error marking order as return:', error)
      console.error('Error marking order as return:', error)
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
                  <td>
                    <Button color="primary" onClick={() => handleMarkAsReturn(order.id)}>Mark as Return</Button>
                  </td>
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

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Return Orders</h3> {/* Corrected to "Return Orders" */}
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
              {returnOrders.length > 0 ? returnOrders.map((order, index) => (
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
                  <td>Return</td> {/* Marked as returned */}
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="text-center">No return orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <OrderModal isOpen={addModalOpen} toggle={toggleAddModal} onSave={addOrder} />
    </div>
  )
}

export default Online
