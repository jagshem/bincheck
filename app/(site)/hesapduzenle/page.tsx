'use client'

import { useState } from 'react'

const Home = () => {
  const [emails, setEmails] = useState('')
  const [passwords, setPasswords] = useState('')
  const [proxies, setProxies] = useState('')
  const [emailPasswordCombo, setEmailPasswordCombo] = useState('')
  const [formattedData, setFormattedData] = useState('')
  const [error, setError] = useState('')

  const handleMatch = () => {
    setError('')
    const emailList = emails
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '')
    const proxyList = proxies
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '')
    let passwordList = passwords
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item !== '')

    if (
      emailList.length === 0 ||
      passwordList.length === 0 ||
      proxyList.length === 0
    ) {
      setError('Email, şifre ve proxy alanları boş bırakılamaz.')
      return
    }

    if (passwordList.length === 1 && emailList.length > 1) {
      passwordList = Array(emailList.length).fill(passwordList[0])
    }

    if (
      emailList.length !== proxyList.length ||
      emailList.length !== passwordList.length
    ) {
      setError('Email, şifre ve proxy listeleri eşit uzunlukta olmalıdır.')
      return
    }

    const combinedData = emailList
      .map(
        (email, index) => `${email}:${passwordList[index]}:${proxyList[index]}`
      )
      .join('\n')
    setFormattedData(combinedData)
  }

  const handleEmailPasswordFormat = () => {
    setError('')
    if (proxies.split('\n').length === 0) {
      setError('Proxy listesi boş olamaz.')
      return
    }

    const comboList = emailPasswordCombo
      .split('\n')
      .map((line) => {
        const parts = line.split(/\s+/)
        if (parts.length < 2) {
          setError(
            'Email ve şifre yan yana yazılmalı ve aralarında boşluk olmalı.'
          )
          return null
        }
        const [email, password] = parts
        return `${email.trim()}:${password.trim()}`
      })
      .filter(Boolean)

    if (comboList.length === 0) {
      setError('Yan yana email ve şifre kombinasyonları hatalı veya eksik.')
      return
    }

    const formattedCombo = comboList
      .map((combo, index) => `${combo}:${proxies.split('\n')[index].trim()}`)
      .join('\n')
    setFormattedData(formattedCombo)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="max-w-5xl w-full mx-auto p-5 bg-white shadow-lg rounded-lg">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 border border-red-700 rounded mb-4">
            {error}
          </div>
        )}
        <h1 className="p-3 bg-green-100 text-green-700 border border-green-700 rounded mb-4">
          Uyarı: Bu alanı uygun datalarla doldurduğunuzda eşleştirme
          yapabilirsiniz. Eşleştirme yaparken email, şifre ve proxy alanlarının
          her satırda bir olmasına dikkat edin.
        </h1>
        <textarea
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className="border border-gray-300 p-4 rounded-md mb-4 w-full"
          placeholder="Emails (Her satıra bir email)"
          rows={5}
        />
        <textarea
          value={passwords}
          onChange={(e) => setPasswords(e.target.value)}
          className="border border-gray-300 p-4 rounded-md mb-4 w-full"
          placeholder="Passwords (Her satıra bir şifre veya tek bir şifre)"
          rows={5}
        />
        <textarea
          value={proxies}
          onChange={(e) => setProxies(e.target.value)}
          className="border border-gray-300 p-4 rounded-md mb-4 w-full"
          placeholder="Proxies (Her satıra bir proxy)"
          rows={5}
        />
        <div className="border-t border-gray-300 my-4"></div>
        <h1 className="p-3 bg-red-100 text-red-700 border border-red-700 rounded mb-4">
          Uyarı: Eğer yan yana olan email ve password eşleştirecekseniz bu alanı
          kullanın yoksa hata alırsınız
        </h1>
        <textarea
          value={emailPasswordCombo}
          onChange={(e) => setEmailPasswordCombo(e.target.value)}
          className="border border-gray-300 p-4 rounded-md mb-4 w-full"
          placeholder="Yan yana olan email ve şifreleri buraya yaz (örn: envergozcu2@gmail.com 616161ts)"
          rows={5}
        />
        <div className="flex space-x-2 w-full">
          <button
            onClick={handleMatch}
            className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 w-1/2"
          >
            Eşleştir
          </button>
          <button
            onClick={handleEmailPasswordFormat}
            className="bg-red-500 text-white p-4 rounded-md hover:bg-red-600 w-1/2"
          >
            Yan Yana Email ve Şifreleri Eşleştir
          </button>
        </div>
        {formattedData && (
          <div className="mt-4 w-full">
            <h2 className="text-lg font-bold">Eşleştirilmiş Veri:</h2>
            <textarea
              readOnly
              className="border border-gray-300 p-4 rounded-md mt-2 w-full"
              value={formattedData}
              rows={10}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
