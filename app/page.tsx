'use client'

import { useState, useEffect } from 'react'
import data from './data.json'

const Home: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>('')
  const [history, setHistory] = useState<any[]>([])

  useEffect(() => {
    // Yerel depolamadan geçmişi yükle
    const savedHistory = localStorage.getItem('binHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    // Geçmişi yerel depolamaya kaydet
    localStorage.setItem('binHistory', JSON.stringify(history))
  }, [history])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCheck()
    }
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
      // Sorgulanan BIN'i geçmişe ekle veya güncelle
      const existingIndex = history.findIndex((item) => item.PrefixNo === bin)
      if (existingIndex !== -1) {
        setHistory((prev) =>
          prev.map((item, idx) =>
            idx === existingIndex ? { ...item, count: item.count + 1 } : item
          )
        )
      } else {
        setHistory((prev) => [...prev, { ...cardInfo, count: 1 }])
      }
    } else {
      setResult(null)
      setError('Belirtilen BIN kodu için kayıt bulunamadı.')
    }
  }

  return (
    <div className="flex justify-center min-h-screen py-2">
      {history.length > 0 && (
        <div className="absolute left-0 w-1/4 p-4 bg-gray-200 h-screen overflow-y-auto">
          <h3 className="font-bold text-xl text-center mb-2">Son Sorgular</h3>
          <ul className="flex flex-col items-center">
            {history.map((item, index) => (
              <li
                key={index}
                className="bg-white mb-2 p-2 rounded-lg shadow text-center w-3/4"
              >
                {item.count > 1 ? `${item.count}. ` : ''}
                {item.PrefixNo} - {item.MemberName}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full max-w-4xl">
        <div className="flex w-full">
          <input
            type="text"
            value={cardNumber}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="border border-gray-300 shadow px-4 py-2 rounded-md focus:outline-none focus:border-blue-500 focus:shadow-outline flex-grow"
            placeholder="Kredi kartı numarasını girin"
          />
          <button
            onClick={handleCheck}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out shadow"
          >
            Kontrol Et
          </button>
        </div>
        {error && <p className="text-red-600 mt-2 font-semibold">{error}</p>}
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow w-full text-center">
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
    </div>
  )
}

export default Home
