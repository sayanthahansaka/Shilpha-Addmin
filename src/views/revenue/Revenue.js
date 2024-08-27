import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Input } from 'reactstrap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getRevenueData } from '../../servirces/revenue/Revenue'

const RevenueDashboard = () => {
  const [revenueData, setRevenueData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRevenueData()
        setRevenueData(data)
      } catch (error) {
        console.error('Error fetching revenue data:', error)
      }
    }

    fetchData()
  }, [])

  if (!revenueData) {
    return <div>Loading...</div>
  }

  const {
    revenue,
    monthReturnOrderCount,
    todayShopOrderCount,
    yearOrderCount,
    monthOrderCount,
    monthOnlineOrderCount,
    todayOrderCount,
    yearIncome,
    todayOnlineOrderCount,
    todayIncome,
    monthlyIncome,
    monthShopOrderCount
  } = revenueData

  return (
    <div>
      <h2>Revenue Dashboard</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <CardComponent title="Today's Revenue" data={[
          { label: 'Today\'s Income', value: `LKR ${todayIncome}` },
          { label: 'Today\'s Orders', value: todayOrderCount },
          { label: 'Today\'s Online Orders', value: todayOnlineOrderCount },
          { label: 'Today\'s Shop Orders', value: todayShopOrderCount }
        ]} />
        <CardComponent title="Monthly Summary" data={[
          { label: 'Monthly Income', value: `LKR ${monthlyIncome}` },
          { label: 'Monthly Orders', value: monthOrderCount },
          { label: 'Monthly Online Orders', value: monthOnlineOrderCount },
          { label: 'Monthly Shop Orders', value: monthShopOrderCount }
        ]} />
        <CardComponent title="Yearly Summary" data={[
          { label: 'Yearly Income', value: `LKR ${yearIncome}` },
          { label: 'Yearly Orders', value: yearOrderCount },
          { label: 'Monthly Return Orders', value: monthReturnOrderCount }
        ]} />
      </div>

      <div>
        <h3>Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenue.map(([date, amount]) => ({ date: new Date(date).toLocaleDateString(), revenue: amount }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

const CardComponent = ({ title, data }) => (
  <Card style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '300px', margin: '20px auto', textAlign: 'center' }}>
    <h3 style={{ fontSize: '1.5rem', color: '#333' }}>{title}</h3>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      {data.map((item, index) => (
        <li key={index} style={{ marginBottom: '10px' }}>
          <strong>{item.label}:</strong> {item.value}
        </li>
      ))}
    </ul>
  </Card>
)

export default RevenueDashboard