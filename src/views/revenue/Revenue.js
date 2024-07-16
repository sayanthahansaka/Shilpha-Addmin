import React, { useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, CardTitle, Table, Button, Input } from 'reactstrap'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const generateRandomRevenue = length => {
  return Array.from({ length }, () => ({
    name: `Day ${Math.floor(Math.random() * 30) + 1}`,
    revenue: Math.floor(Math.random() * 10000) + 1000
  }))
}

const RevenueChart = ({ title, data }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

const Revenue = () => {
  const [dailyRevenue, setDailyRevenue] = useState(generateRandomRevenue(30))
  const [monthlyRevenue, setMonthlyRevenue] = useState(generateRandomRevenue(12))
  const [yearlyRevenue, setYearlyRevenue] = useState(generateRandomRevenue(1))

  useEffect(() => {
    setDailyRevenue(generateRandomRevenue(30))
    setMonthlyRevenue(generateRandomRevenue(12))
    setYearlyRevenue(generateRandomRevenue(1))
  }, [])

  const Card = ({ title, data }) => (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '300px',
      margin: '20px auto',
      textAlign: 'center'
    }}>
      <h3 style={{ fontSize: '1.5rem', color: '#333' }}>{title}</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {data.map((item, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  )
  const todayRevenue = [
    { label: 'Cost', value: '$10,000' },
    { label: 'Income', value: '$15,000' },
    { label: 'Profit', value: '$5,000' }
  ]

  const monthlyProfit = [
    { label: 'Estimated', value: '$20,000' },
    { label: 'Actual', value: '$18,000' },
    { label: 'Difference', value: '-$2,000' }
  ]

  const yearlyProfit = [
    { label: 'Estimated', value: '$250,000' },
    { label: 'Actual', value: '$240,000' },
    { label: 'Difference', value: '-$10,000' }
  ]


  return (
    <div>
    
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <Card title="Today Revenue" data={todayRevenue} />
      <Card title="Monthly Profit" data={monthlyProfit} />
      <Card title="Yearly Profit" data={yearlyProfit} />
    </div>

      <h2>Company Revenue Charts</h2>
      <RevenueChart title="Daily Revenue" data={dailyRevenue} />
      <RevenueChart title="Monthly Revenue" data={monthlyRevenue} />
      <RevenueChart title="Yearly Revenue" data={yearlyRevenue} />
    </div>
  )
}

export default Revenue
