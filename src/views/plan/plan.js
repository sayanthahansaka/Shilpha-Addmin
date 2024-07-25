import React, { useState } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button } from 'reactstrap'


const Plan = () => {
 

  return (
    <div className="stock-container">
      <Card>
      <CardHeader>
          <CardTitle>
           <h3>Processing Plan</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>
                  Article No
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>
                  Color
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>Done Or Proccessing</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>

      <Card>
      <CardHeader>
          <CardTitle>
           <h3>Done Plan</h3>
          </CardTitle>
        </CardHeader>
        <CardBody>
        <Table bordered>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Emplyee Name</th>
                <th>Start Date</th>
                <th>
                  Article No
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>
                  Color
                  <br />
                  <span style={{ fontSize: '0.8em' }}>(Desired output)</span>
                </th>
                <th>Done Or Proceessing</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}

export default Plan
