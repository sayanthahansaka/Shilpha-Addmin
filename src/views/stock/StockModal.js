import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { toast } from 'react-toastify'

const StockModal = ({ isOpen, toggle, fetchStock }) => {

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Transfer Stock</ModalHeader>
      
    </Modal>
  )
}

export default StockModal
