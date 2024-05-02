'use client'

// components/ProxyForm.tsx
import { useState } from 'react'
import axios from 'axios'

const ProxyForm = () => {
  const [proxy, setProxy] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await axios.post('/api/proxy', { proxy })
      alert('Proxy saved successfully')
      setProxy('')
    } catch (error) {
      console.error('Error saving proxy:', error)
      alert('Failed to save proxy')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="p-3 bg-red-100 text-red-700 border border-red-700 rounded mb-4">
        Uyarı: Allahinizin amina goyaaaaammmmmm laaaaaan
      </h1>
    </form>
  )
}

export default ProxyForm
