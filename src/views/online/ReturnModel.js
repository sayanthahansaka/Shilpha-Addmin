import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from 'reactstrap'
import { markOrderAsReturn } from '../../servirces/orders/OrdersAPI'
import { toast } from 'react-toastify'

const ReturnModel = ({ isOpen, toggle, orderId, fetchOrders }) => {
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState('')

  // Function to handle the description input change
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  // Function to handle the return order action
  const handleReturn = async () => {
    setLoading(true)
    try {
      await markOrderAsReturn(orderId, description) // Sending description to the API
      toast.success('Order marked as return')
      fetchOrders() // Fetch updated orders
      toggle() // Close the modal
    } catch (error) {
      toast.error('Error marking order as return')
      console.error('Error marking order as return:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Return Order</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="description">Return Description</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={description} // Set value from state
            onChange={handleDescriptionChange} // Handle input change
            required
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleReturn} disabled={loading || !description}>
          {loading ? 'Processing...' : 'Confirm'}
        </Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ReturnModel
