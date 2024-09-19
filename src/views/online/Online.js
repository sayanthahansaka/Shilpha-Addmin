import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, FormGroup, Input, Spinner } from 'reactstrap'
import { getAllOnlineOrders, getAllDoneOnlineOrders, markOrderAsDone, markOrderAsReturn, getAllReturnOnlineOrders } from '../../servirces/orders/OrdersAPI'
import {searchReturnOrders} from '../../servirces/orders/OrderSearchAPI'
import OrderModal from './OrderModal'
import ReturnModal from './ReturnModel'
import { toast } from 'react-toastify'

const Online = () => {
  const [processingOrders, setProcessingOrders] = useState([])
  const [doneOrders, setDoneOrders] = useState([])
  const [returnOrders, setReturnOrders] = useState([])
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [returnModalOpen, setReturnModalOpen] = useState(false) // State for the return modal
  const [selectedOrderId, setSelectedOrderId] = useState(null) // State for the selected order ID

  const [loading, setLoading] = useState(false)
console.log(returnOrders)
  const fetchOrders = async () => {
    setLoading(true)
    try {
      const [processingData, doneData, returnData] = await Promise.all([
        getAllOnlineOrders(),
        getAllDoneOnlineOrders(),
        getAllReturnOnlineOrders()
      ])

      if (Array.isArray(processingData)) {
        setProcessingOrders(processingData)
      } else {
        // toast.error("Unexpected processing data format:", processingData)
        console.error("Unexpected processing data format:", processingData)
      }

      if (Array.isArray(doneData)) {
        setDoneOrders(doneData)
      } else {
        // toast.error("Unexpected done data format:", doneData)
        console.error("Unexpected done data format:", doneData)
      }

      if (Array.isArray(returnData)) {
        setReturnOrders(returnData)
      } else {
        // toast.error("Unexpected return data format:", returnData)
        console.error("Unexpected return data format:", returnData)
      }
      
    } catch (error) {
      // toast.error('Error fetching orders:', error)
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
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
  const toggleReturnModal = (orderId) => {
    setSelectedOrderId(orderId) // Set the selected order ID
    setReturnModalOpen(!returnModalOpen) // Open the return modal
  }

  const addOrder = (newOrder) => {
    setProcessingOrders(prevOrders => [...prevOrders, newOrder])
  }

  const handleSearch = async () => {
    try {
      const start = 0 
      const limit = 10 
      const place = '' 
      const isDone = false 
  
      const searchResults = await searchReturnOrders(place, isDone, searchQuery, start, limit)
      if (searchResults.success) {
        setReturnOrders(searchResults.data)
      } else {
        toast.error(searchResults.result || 'Error searching return orders')
        console.error('Error:', searchResults.result)
      }
    } catch (error) {
      toast.error('Error searching return orders:', error)
      console.error('Error searching return orders:', error)
    }
  }
  

  return (
    <div className="orders-container">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Processing Orders</h3>
          </CardTitle>
        </CardHeader>
        <FormGroup>
          {/* <Input 
            type="text" 
            placeholder="Search return orders" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          /> */}
          {/* <Button color="primary" onClick={handleSearch}>Search</Button> */}
        </FormGroup>
        <Button color="success" onClick={toggleAddModal} style={{ float: 'right' }}>
          Add New Order
        </Button>
        <CardBody>
        {loading ? (
  <div className="text-center">
    <Spinner color="primary" /> Loading...
  </div>
) : (
  <Table bordered>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Order Code</th>
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
      {processingOrders.length > 0 ? (
        processingOrders.map((order, index) => (
          <tr key={index}>
            <td>{order.id || 'N/A'}</td>
            <td>{order.customerName || 'N/A'}</td>
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
        ))
      ) : (
        <tr>
          <td colSpan="10" className="text-center">No processing orders</td>
        </tr>
      )}
    </tbody>
  </Table>
)}

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
                <th>Order Code</th>
               
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
                 
                  <td>{order.contacts ? order.contacts.map(contact => contact.contact).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.articleNo).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.color).join(', ') : 'N/A'}</td>
                  <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.size).join(', ') : 'N/A'}</td>
                  <td>{order.packagePrice || 'N/A'}</td>
                  <td>{order.createDate || 'N/A'}</td>
                  <td>
                  <Button color="warning" onClick={() => toggleReturnModal(order.id)}>
                      Return Order
                    </Button>
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
      <h3>Return Orders</h3>
    </CardTitle>
    <FormGroup className="d-flex">
      <Input 
        type="text" 
        placeholder="Search return orders" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
      />
      <Button color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
        Search
      </Button>
    </FormGroup>
  </CardHeader>
  <CardBody>
    <Table bordered>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Order Code</th>
          <th>Phone Number</th>
          <th>Article No</th>
          <th>Color</th>
          <th>Size</th>
          <th>Price</th>
          <th>Date</th>
          <th>Description</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {returnOrders.length > 0 ? (
          returnOrders.map((order, index) => (
          
            <tr key={index}>
              <td>{order.id || 'N/A'}</td>
              <td>{order.customerName || 'N/A'}</td>
             
              <td>{order.contacts ? order.contacts.map(contact => contact.contact).join(', ') : 'N/A'}</td>
              <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.articleNo).join(', ') : 'N/A'}</td>
              <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.color).join(', ') : 'N/A'}</td>
              <td>{order.ordersDetail ? order.ordersDetail.map(detail => detail.size).join(', ') : 'N/A'}</td>
              <td>{order.packagePrice || 'N/A'}</td>
              <td>{order.createDate || 'N/A'}</td>
              <td>{order.description}</td>
              <td>Return</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10" className="text-center">No return orders</td>
          </tr>
        )}
      </tbody>
    </Table>
  </CardBody>
</Card>

<ReturnModal
        isOpen={returnModalOpen}
        toggle={() => toggleReturnModal(null)} // Close the modal
        orderId={selectedOrderId} // Pass the selected order ID to the modal
        fetchOrders={fetchOrders}
      />
      <OrderModal isOpen={addModalOpen} toggle={toggleAddModal} onSave={addOrder} fetchOrders={fetchOrders} />
    </div>
  )
}

export default Online
