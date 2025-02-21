import './App.css'
import React from 'react'
import { useGetAllCarsQuery } from './store/carsApi'
import { Card } from 'antd'
import Meta from 'antd/es/card/Meta'

function App() {
  const { data = [], isLoading, error } = useGetAllCarsQuery()

  if (isLoading) {
    return <h1 className='font-bold text-center mt-10'>Loading ... </h1>
  }
  if (error) {
    return <h1 className='font-bold text-center mt-10'>Error page</h1>
  }

  console.log(data)

  return (
    <div className='mt-10'>
      <ul style={{ display: 'flex',justifyContent:`center`, flexWrap: 'wrap', gap: '20px', listStyle: 'none', padding: 0 }}>
        {data.map(item => (
          <li key={item.id}>
            <img  alt="" />
            <Card
              hoverable
              style={{ width: 240 }}
            >
              <Meta title={item.carName} description={`Price: ${item.carPrice}`} />
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
