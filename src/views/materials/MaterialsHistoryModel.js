import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap'
import { toast } from 'react-toastify'
import { getMaterialHistory } from '../../servirces/materials/MaterialsAPI'  // Import the API function

const MaterialsHistoryModel = ({ isOpen, toggle, materialId }) => {
  const [history, setHistory] = useState([])

  const fetchMaterialHistory = async () => {
    try {
      const data = await getMaterialHistory(materialId)
      setHistory(data)
    } catch (error) {
      toast.error('Failed to fetch material history')
    }
  }
  useEffect(() => {
    if (materialId && isOpen) {
      fetchMaterialHistory()
    }
  }, [materialId, isOpen])


  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Material History</ModalHeader>
      <ModalBody>
        <Table bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Create Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>{item.createDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No history found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default MaterialsHistoryModel
