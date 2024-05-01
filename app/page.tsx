'use client'

import { useState } from 'react'
import data from './data.json'

const Home: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
  }

  const handleCheck = () => {
    if (!cardNumber || cardNumber.length < 6) {
      setError('Lütfen geçerli bir kredi kartı numarası girin.')
      setResult(null)
      return
    }

    const bin = cardNumber.substring(0, 6)
    const cardInfo = data.find((item: any) => item.PrefixNo === bin)

    if (cardInfo) {
      setResult(cardInfo)
      setError('')
    } else {
      setResult(null)
      setError('Belirtilen BIN kodu için kayıt bulunamadı.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <input
        type="text"
        value={cardNumber}
        onChange={handleInputChange}
        className="border border-gray-300 px-4 py-2 rounded-md mb-4 focus:outline-none focus:border-blue-500"
        placeholder="Kredi kartı numarasını girin"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
      >
        Kontrol Et
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {result && (
        <div className="mt-4">
          <p>
            BIN Kodu: <strong>{result.PrefixNo}</strong>
          </p>
          <p>
            Banka Adı: <strong>{result.MemberName}</strong>
          </p>
          <p>
            Kart Türü: <strong>{result.CardType}</strong>
          </p>
          <p>
            Business Kart: <strong>{result.BusinessCard}</strong>
          </p>
          <p>
            Banka Numarası: <strong>{result.MemberNo}</strong>
          </p>
        </div>
      )}
    </div>
  )
}

export default Home
