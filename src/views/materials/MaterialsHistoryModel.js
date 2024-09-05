import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Label, FormGroup, Input, Spinner } from 'reactstrap'
import { toast } from 'react-toastify'
import { getMaterialHistory } from '../../servirces/materials/MaterialsAPI'  // Import the API function

const MaterialsHistoryModel = ({ isOpen, toggle, materialId }) => {
  const [history, setHistory] = useState([])
  const [formData, setFormData] = useState({
    startDate: '2024-07-01',
    endDate: '2024-09-01'
  })
  const [loading, setLoading] = useState(false) // Add loading state

  const fetchMaterialHistory = async () => {
    setLoading(true) // Set loading to true when starting to fetch data
    try {
      const data = await getMaterialHistory(materialId, formData.startDate, formData.endDate)
      setHistory(data)
      console.log("Material history data:", data)
    } catch (error) {
      toast.error('Failed to fetch material history')
    } finally {
      setLoading(false) // Set loading to false when data fetching is complete
    }
  }

  useEffect(() => {
    if (materialId && isOpen) {
      fetchMaterialHistory()
    }
  }, [materialId, isOpen, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchMaterialHistory()
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Material History</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="startDate">Start Date</Label>
          <Input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">End Date</Label>
          <Input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} required />
        </FormGroup>
        <Button type="submit" color="primary" onClick={handleSubmit}>Show In Table</Button>
        <br /><br />
        {loading ? (
          <div className="text-center">
            <Spinner color="primary" /> Loading...
          </div>
        ) : (
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
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default MaterialsHistoryModel
