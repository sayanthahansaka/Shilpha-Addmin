import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Table, Row } from 'reactstrap'
import { transferStock, getAllStock, getStockSizesById } from '../../servirces/stock/StockAPI'
import { toast } from 'react-toastify'

const StockModal = ({ isOpen, toggle, fetchStock }) => {
  const [formData, setFormData] = useState({
    id: '',
    qty: '',
    toStock: '',
    selectedSizes: []
  })
  const [availableStocks, setAvailableStocks] = useState([]) 
  const [sizes, setSizes] = useState([]) 
  const [selectedStocks, setSelectedStocks] = useState([])

  const [currentStock, setCurrentStock] = useState({
    id: '',
    qty: '',
    toStock: '',
    selectedSizes: []
  })

  useEffect(() => {
    if (isOpen) {
      const fetchStocks = async () => {
        try {
          const stockData = await getAllStock()
          setAvailableStocks(stockData)
        } catch (error) {
          toast.error('Failed to load available stocks.')
        }
      }
      fetchStocks()
    }
  }, [isOpen])

  useEffect(() => {
    if (currentStock.id) {
      console.log('Fetching sizes for stock ID:', currentStock.id)
      const fetchSizes = async () => {
        try {
          const sizesData = await getStockSizesById(currentStock.id)
          console.log('Fetched sizes:', sizesData)
          console.log('Fetched sizes:', sizesData.qty)
          setSizes(sizesData)
        } catch (error) {
          toast.error('Failed to load sizes.')
        }
      }
      fetchSizes()
    } else {
      setSizes([])
    }
  }, [currentStock.id])  


  const handleChange = (e) => {
    const { name, value } = e.target
    setCurrentStock({ ...currentStock, [name]: value })
  }

  const handleSizeChange = (size) => {
    const updatedSizes = currentStock.selectedSizes.includes(size) ? currentStock.selectedSizes.filter(s => s !== size) : [...currentStock.selectedSizes, size]
      
    setCurrentStock({ ...currentStock, selectedSizes: updatedSizes })
  }

  const addStockToTable = () => {
    const stockToAdd = currentStock.selectedSizes.map(size => {
      const matchingSize = sizes.find(s => s.size === size)
      
      return {
        id: matchingSize ? matchingSize.id : currentStock.id,  // Set ID based on the size
        qty: currentStock.qty,
        toStock: currentStock.toStock,
        size
      }
    })
  
    setSelectedStocks([...selectedStocks, ...stockToAdd])
    setCurrentStock({ id: '', qty: '', toStock: '', selectedSizes: [] })
  }
  
  
  const handleQtyChange = (index, value) => {
    const updatedStocks = [...selectedStocks]
    updatedStocks[index].qty = value
    setSelectedStocks(updatedStocks)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      for (const stock of selectedStocks) {
        await transferStock({ id: stock.id, qty: stock.qty, toStock: stock.toStock })
      }
      fetchStock()
      setSelectedStocks([])
      toggle()
    } catch (error) {
      toast.error('Error transferring stock.')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}  style={{ maxWidth: '90vw', width: '800px', maxHeight: '90vh', height: 'auto' }}>
      <ModalHeader toggle={toggle}>Transfer Stock</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="id">Available Stocks</Label>
            <Input type="select" 
            name="id" 
            id="id" 
            value={currentStock.id} 
            onChange={handleChange}>
              <option value="">Select Stock</option>
              {availableStocks.map(stock => (
                <option key={stock.id} value={stock.id}>
                  {`${stock.articleNo} - ${stock.color}`}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Row>
              <Label>Select Sizes:</Label>
              <div className="size-buttons d-flex flex-wrap" style={{ gap: '15px', marginLeft: '15px' }}>
                {sizes.length > 0 ? (
                  sizes.map((size) => (
                    <div key={size.id} className="form-check" style={{ marginRight: '15px' }}>
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id={`size-${size.id}`}
                        checked={currentStock.selectedSizes.includes(size.size.toString())}

                        onChange={() => handleSizeChange(size.size)}
                      />
                      <Label className="form-check-label" for={`size-${size.id}`}>
                        {size.size}
                      </Label>
                    </div>
                  ))
                ) : (
                  <p>No sizes available</p>
                )}
              </div>
            </Row>
          </FormGroup>


          <FormGroup>
            <Label for="toStock">Stock Place</Label>
            <Input type="select" name="toStock" id="toStock" value={currentStock.toStock} onChange={handleChange}>
              <option value="">Select Place</option>
              <option value="online">Online</option>
              <option value="shop">Shop</option>
            </Input>
          </FormGroup>

          <Button color="secondary" type="button" onClick={addStockToTable}>Add to Table</Button>

          {selectedStocks.length > 0 && (
            <Table bordered style={{ marginTop: '20px' }}>
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>To Stock</th>
                  <th>Sizes</th>
                  <th>Quantity</th>
                  <th>Available Qty</th>
                </tr>
              </thead>
              <tbody>
                {selectedStocks.map((stock, index) => {
                  const selectedStock = availableStocks.find(s => s.id === Number(stock.id))
                  console.log("selectedStocks ", selectedStocks)
                  console.log("d", selectedStock)

                  return (
                    <tr key={index}>
                      <td>{selectedStock ? selectedStock.articleNo : 'Unknown Stock'}</td>
                      <td>{stock.toStock}</td>
                      <td>{stock.size}</td>
                      <td>
                        <Input
                          type="number"
                          value={stock.qty}
                          onChange={(e) => handleQtyChange(index, e.target.value)}
                        />
                      </td>
                      <td style={{
                                    backgroundColor: selectedStock && selectedStock.qty < 2 ? '#ff7979' : '#badc58',
                                    color: 'white'
                                  }}>
                          {selectedStock ? selectedStock.qty : 'Unknown'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          )}

        </ModalBody>
        <ModalFooter>
          <Button type="submit" color="primary">Transfer Stock</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  )
}

export default StockModal
