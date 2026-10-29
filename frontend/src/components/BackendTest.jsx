
import { useEffect, useState } from 'react'
import API from './api'

function BackendTest() {
  const [status, setStatus] = useState('Checking backend connection...')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    API.get('/api/health')
      .then((response) => {
        setStatus(response.data.message)
        setError(false)
      })
      .catch(() => {
        setStatus('Unable to connect. Check your backend server.')
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <section className="mb-8 border border-[#D8C8B5] bg-[#F8F1E6] p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B64D32]">
            System notes
          </p>

          <h2 className="mt-2 font-serif text-2xl text-[#30251F]">
            Behind the archive
          </h2>

          <p className="mt-1 text-sm text-[#746257]">
            SnapSort server connection status
          </p>
        </div>

        <div
          className={`flex items-center gap-3 border px-4 py-3 ${
            loading
              ? 'border-[#D8C8B5] bg-[#F3EBDD]'
              : error
                ? 'border-red-300 bg-red-50'
                : 'border-[#B8C3A8] bg-[#EDF0E6]'
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              loading
                ? 'animate-pulse bg-[#A9472E]'
                : error
                  ? 'bg-red-600'
                  : 'bg-[#60784E]'
            }`}
          />

          <span
            className={`text-sm font-medium ${
              error ? 'text-red-800' : 'text-[#40543A]'
            }`}
          >
            {loading ? 'Checking...' : error ? 'Disconnected' : 'Connected'}
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-[#D8C8B5] pt-4">
        <p
          role="status"
          className={`text-sm leading-6 ${
            error ? 'text-red-800' : 'text-[#746257]'
          }`}
        >
          {status}
        </p>
      </div>
    </section>
  )
}

export default BackendTest
