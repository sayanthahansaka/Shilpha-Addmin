import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'
import ShopModal from './ShopModal'
import { getAllShopOrders, markOrderAsDone, getAllDoneShopOrders } from '../../servirces/orders/OrdersAPI'

const Shop = () => {
  const [processingShops, setProcessingShops] = useState([])
  const [doneShops, setDoneShops] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchOrders = async () => {
    try {
      const [processingData, doneData] = await Promise.all([
        getAllShopOrders(),
        getAllDoneShopOrders()
      ])

      setProcessingShops(processingData)
      setDoneShops(doneData)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const handleMarkAsDone = async (shopID) => {
    try {
      await markOrderAsDone(shopID, 'shop')
      fetchOrders() // Refresh the data
    } catch (error) {
      console.error('Error marking shop as done:', error)
    }
  }

  const toggleAddModal = () => setIsModalOpen(!isModalOpen)

  const addShop = (newShop) => {
    setProcessingShops(prevShops => [...prevShops, newShop])
  }

  return (
    <div className="shops-container">
      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Processing Shop Orders</h3>
          </CardTitle>
          <Button color="success" onClick={toggleAddModal} style={{ float: 'right' }}>
            Add New Shop
          </Button>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Shop Order ID</th>
                <th>Shop Name</th>
                {/* <th>Address</th>
                <th>Phone Number</th> */}
                <th>Article No</th>
                <th>Colors</th>
                <th>Sizes</th>
                <th>Price</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {processingShops.length > 0 ? processingShops.map((shop) => (
                <tr key={shop.id}>
                  <td>{shop.id}</td>
                  <td>{shop.customerName}</td>
                  {/* <td>{shop.address}</td>
                  <td>{shop.contacts && shop.contacts.map(contact => contact.contact)}</td> */}
                  <td>{shop.ordersDetail && shop.ordersDetail.map(detail => detail.articleNo)}</td>
                  <td>{shop.ordersDetail && shop.ordersDetail.map(detail => detail.color)}</td>
                  <td>{shop.ordersDetail && shop.ordersDetail.map(detail => detail.size)}</td>
                  <td>{shop.packagePrice}</td>
                  <td>{shop.createDate}</td>
                  <td>
                    <Button color="primary" onClick={() => handleMarkAsDone(shop.id)}>Mark as Done</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="text-center">No processing orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h3>Done Shop Orders</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
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
              </tr>
            </thead>
            <tbody>
              {doneShops.length > 0 ? doneShops.map((shop) => (
                <tr key={shop.id}>
                  <td>{shop.id}</td>
                  <td>{shop.customerName}</td>
                  <td>{shop.address}</td>
                  <td>{shop.contacts && shop.contacts.map(contact => contact.contact).join(', ')}</td>
                  <td>{shop.ordersDetail && shop.ordersDetail.map(detail => detail.articleNo).join(', ')}</td>
                  <td>{shop.ordersDetail && shop.ordersDetail.map(detail => detail.color).join(', ')}</td>
                  <td>{shop.ordersDetail && shop.ordersDetail.map(detail => detail.size).join(', ')}</td>
                  <td>{shop.packagePrice}</td>
                  <td>{shop.createDate}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="9" className="text-center">No done orders</td>
                </tr>
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <ShopModal isOpen={isModalOpen} toggle={toggleAddModal} addShop={addShop}  fetchOrders={fetchOrders} />
    </div>
  )
}

export default Shop
