'use client'

import { useState } from 'react'

const CreateCard = () => {
  const [cards, setCards] = useState<string[]>([])
  const [text, setText] = useState<string>('')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleExtractCardDetails = () => {
    const regex = /(\d{16})\s+(\d{2}\/\d{2})\s+(\d{3})/g
    const matches = text.matchAll(regex)
    const formattedCards = []
    for (const match of matches as any) {
      formattedCards.push(`${match[1]}|${match[2]}|${match[3]}`)
    }
    setCards(formattedCards)
  }

  const handleCopyToClipboard = () => {
    const cardDetails = cards.join('\n')
    navigator.clipboard.writeText(cardDetails)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-5 bg-white rounded-lg shadow-lg">
        <h1 className="p-3 bg-green-100 text-green-700 border border-green-700 rounded mb-4">
          Uyarı: Bu araç sadece metin içerisindeki kart numaralarını, son
          kullanma tarihlerini ve CVV numaralarını ayıklar. Kart bilgilerini
          kullanmadan önce lütfen gerekli izinleri alın.
        </h1>
        <textarea
          value={text}
          onChange={handleInputChange}
          placeholder="Buraya metni yapıştırın"
          className="w-full h-48 border-2 border-blue-300 px-4 py-3 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 whitespace-pre-wrap"
        />
        <button
          onClick={handleExtractCardDetails}
          className="mt-4 w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Kart Bilgilerini Ayıkla
        </button>
        {cards.length > 0 && (
          <div className="mt-6 w-full p-6 bg-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Ayıklanan Kart Bilgileri:
            </h3>
            <ul className="flex flex-wrap justify-center gap-4">
              {cards.map((card, index) => (
                <li key={index} className="mt-2 text-gray-600">
                  {card}
                </li>
              ))}
            </ul>
            <button
              onClick={handleCopyToClipboard}
              className="mt-4 w-full bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Kopyala
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CreateCard
