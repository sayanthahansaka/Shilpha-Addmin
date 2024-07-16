import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button,  FormGroup, Label, Input } from 'reactstrap'

const PlanModel = ({ isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Plan</ModalHeader>

      <ModalBody>
       
        <FormGroup>
          <Label for="itemName">Item Name</Label>
          <Input type="text" name="itemName" id="itemName" />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Quantity</Label>
          <Input type="number" name="quantity" id="quantity" />
        </FormGroup>
        <FormGroup>
          <Label for="emplyeeName">Emplyee Name</Label>
          <Input type="text" name="emplyeeName" id="emplyeeName" />
        </FormGroup>
        <FormGroup>
          <Label for="date">Date</Label>
          <Input type="date" name="date" id="date" />
        </FormGroup>
        <h4>Desired Output</h4>
         <FormGroup>
          <Label for="articleNo">Article No</Label>
          <Input type="text" name="articleNo" id="articleNo" />
        </FormGroup>
        <FormGroup>
          <Label for="color">Color</Label>
          <Input type="text" name="color" id="color" />
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button color="primary" onClick={toggle}>
          Add Plan
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default PlanModel
