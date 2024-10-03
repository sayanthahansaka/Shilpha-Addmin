import React, { useState } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Row, Col } from "reactstrap"
import { createShopOrder } from '../../servirces/orders/OrdersAPI'
import { toast } from 'react-toastify'

const ShopModal = ({ isOpen, toggle, addShop, fetchOrders }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: 'noo need this',
    contacts: [{ contact: '000' }],
    ordersDetail: [{ articleNo: '', color: '', size: '', qty: '' }],
    packagePrice: '',
    stockPlaceStatus: 'shop',
    date: ''
  })
  const colors = [
    "Black", "Chanel Black", "Brown", "Chanel Brown", "Tan", "Chanel Tan", "White", "Chanel White",
    "Ash", "Chanel Ash", "Purple", "Maroon", "Beige", "Chanel Beige", "Sea Green", "Navy Blue",
    "Light Blue", "Royal Blue", "Light Pink", "Salmon Pink", "Red", "Wine Red", "Yellow", "Chanel Gold",
    "Dust Gold", "Rose Gold", "Dust Silver", "Gold"
  ]
  const handleChange = (event) => {
    const { id, value } = event.target
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleContactChange = (index, event) => {
    const newContacts = formData.contacts.map((contact, i) => {
      return i === index ? { ...contact, contact: event.target.value } : contact
    })
    setFormData(prevState => ({
      ...prevState,
      contacts: newContacts
    }))
  }

  const handleOrderDetailChange = (index, field, value) => {
    const newOrdersDetail = formData.ordersDetail.map((detail, i) => {
      return i === index ? { ...detail, [field]: value } : detail
    })
    setFormData(prevState => ({
      ...prevState,
      ordersDetail: newOrdersDetail
    }))
  }

  const addContactField = () => {
    setFormData(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, { contact: '' }]
    }))
  }

  const addOrderDetailField = () => {
    setFormData(prevState => ({
      ...prevState,
      ordersDetail: [...prevState.ordersDetail, { articleNo: '', color: '', size: '', qty: '' }]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() 
    try {
      const newOrder = await createShopOrder(formData)
      fetchOrders()
      addShop(newOrder) 
      // toast.success("Order created successfully!")
      toggle() 
    } catch (error) {
      // toast.error("Failed to create order.")
      console.error('Error creating order:', error)
    }
  }
  
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add Order</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="customerName">Shop Name</Label>
          <Input type="text" id="customerName" value={formData.customerName} onChange={handleChange} />
        </FormGroup>
        {/* <FormGroup>
          <Label for="address">Address</Label>
          <Input type="text" id="address" value={formData.address} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Contacts</Label>
          {formData.contacts.map((contact, index) => (
            <Input
              key={index}
              type="text"
              value={contact.contact}
              onChange={(e) => handleContactChange(index, e)}
              placeholder="Contact Number"
              style={{ marginBottom: "10px" }}
            />
          ))}
          <Button color="secondary" size="sm" onClick={addContactField}>Add Contact</Button>
        </FormGroup> */}
        <FormGroup>
          <Label>Order Details</Label>
          {formData.ordersDetail.map((detail, index) => (
            <Row key={index}>
              <Col>
                <Input
                  type="select"
                  placeholder="Article Number"
                  value={detail.articleNo}
                  onChange={(e) => handleOrderDetailChange(index, 'articleNo', e.target.value)}
                  ><option value="">Select Article No</option>
                  <option value="H015">H-015</option>
                <option value="H016">H-016</option>
                <option value="H018">H-018</option>
                <option value="H023">H-023</option>
                <option value="H025">H-025</option> 
                <option value="H026">H-026</option>
                <option value="H029">H-029</option>
                <option value="H034">H-034</option>
                <option value="H035">H-035</option>
                <option value="H037">H-037</option>
                <option value="H039">H-039</option>
                <option value="H058">H-058</option>
                <option value="H069">H-069</option>
                <option value="H070">H-070</option>
                <option value="H083">H-083</option>
                <option value="H084">H-084</option>
                <option value="H088">H-088</option>
                <option value="H091">H-091</option>
                <option value="H093">H-093</option>
                <option value="H096">H-096</option>
                <option value="H097">H-097</option>
                <option value="H098">H-098</option>
                <option value="H100">H-100</option>
                <option value="H101">H-101</option>
                <option value="H102">H-102</option>
                <option value="H104">H-104</option>
                <option value="H105">H-105</option>
                <hr></hr>
                <option value="F004">F-004</option>
                <option value="F009">F-009</option>
                <option value="F016">F-016</option>
                <option value="F027">F-027</option>
                <option value="F032">F-032</option>
                <option value="F042">F-042</option>
                <option value="F052">F-052</option>
                <option value="F057">F-057</option>
                <option value="F061">F-061</option>
                <option value="F063">F-063</option>
                <option value="F070">F-070</option>
                <option value="F071">F-071</option>
                <option value="F073">F-073</option>
                <option value="F074">F-074</option>
                <option value="F075">F-075</option>
                <option value="F076">F-076</option>
                <option value="F077">F-077</option>
                <option value="F080">F-080</option>  
                <option value="F082">F-082</option>
                <option value="F086">F-086</option>
                <option value="F087">F-087</option>
                <option value="F089">F-089</option>
                <option value="F090">F-090</option>
                <option value="F094">F-094</option>   
                <hr></hr>
                <option value="HN023">HN-023</option>
                <option value="HN026">HN-026</option>
                <hr></hr>
                <option value="HM029">HM-029</option>
                <hr></hr>
                <option value="HC015">HC-015</option>
                <option value="HC035">HC-035</option>
                <hr></hr>
                <option value="CW024">CW-024</option>
                <hr></hr>
                <option value="FN011">FN-011</option>
                <option value="FN064">FN-064</option>
                <option value="FN065">FN-065</option>
                <hr></hr>
                <option value="FCN065">FCN-065</option>
                <hr></hr>
                <option value="W003">W-003</option>
                <option value="W005">W-005</option>
                <option value="W006">W-006</option>
                <option value="W058">W-058</option>
                <option value="CH008">CH-008</option>  
                <option value="CH024">CH024</option>
                <option value="CH029">CH-029</option>
                <hr></hr>
                <option value="C008">C-008</option>
                <hr></hr>
                <option value="G001">G-001</option>
                <option value="G002">G-002</option>
                <option value="G003">G-003</option>
                <hr></hr>
                <option value="FC30">FC-30</option>
                <option value="FC035">FC-035</option>
                  </Input>
              </Col>
              <Col>
                <Input
                  type="select"
                  placeholder="Color"
                  value={detail.color}
                  onChange={(e) => handleOrderDetailChange(index, 'color', e.target.value)}
                  style={{ backgroundColor: detail.color }} 
                  // required
                >
                  <option value="">Select Color</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </Input>
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="Size"
                  value={detail.size}
                  onChange={(e) => handleOrderDetailChange(index, 'size', e.target.value)}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="Quantity"
                  value={detail.qty}
                  onChange={(e) => handleOrderDetailChange(index, 'qty', e.target.value)}
                />
              </Col>
            </Row>
          ))}
          <Button color="secondary" size="sm" onClick={addOrderDetailField} style={{ marginTop: "10px" }}>
            Add Order Detail
          </Button>
        </FormGroup>
        <FormGroup>
          <Label for="packagePrice">Package Price</Label>
          <Input type="text" id="packagePrice" value={formData.packagePrice} onChange={handleChange} />
        </FormGroup>
        {/* <FormGroup>
          <Label for="deliveryFree">Delivery Fee</Label>
          <Input type="text" id="deliveryFree" value={formData.deliveryFree} onChange={handleChange} />
        </FormGroup> */}
        <FormGroup>
          <Label for="stockPlaceStatus">Stock Place Status</Label>
          <Input type="text" id="stockPlaceStatus" value={formData.stockPlaceStatus} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="date" id="date" value={formData.date} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>Submit</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ShopModal
