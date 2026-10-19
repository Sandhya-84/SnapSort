
import { useEffect, useState } from 'react'
import API from './api'

function BackendTest() {
  const [status, setStatus] = useState('Checking backend...')
  const [error, setError] = useState(false)

  useEffect(() => {
    API.get('/api/health')
      .then((response) => {
        setStatus(response.data.message)
        setError(false)
      })
      .catch(() => {
        setStatus('Could not connect to backend. Check whether it is running.')
        setError(true)
      })
  }, [])

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>SnapSort Backend Connection</h2>
      <p style={{ color: error ? 'red' : 'green' }}>{status}</p>
    </div>
  )
}

export default BackendTest
