'use client'

import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-200 shadow-md w-64 min-h-screen p-5 fixed right-0 top-0">
      <style jsx global>{`
        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
        }
      `}</style>
      <ul className="space-y-2">
        <li>
          <Link
            href="/"
            className="text-blue-500 hover:text-blue-700 font-semibold block py-2.5 px-4 rounded transition duration-200"
          >
            Bincheck
          </Link>
        </li>
        <li>
          <Link
            href="/kartolustur"
            className="text-blue-500 hover:text-blue-700 font-semibold block py-2.5 px-4 rounded transition duration-200"
          >
            Kart Oluşturucu
          </Link>
        </li>
        <li>
          <Link
            href="/hesapduzenle"
            className="text-blue-500 hover:text-blue-700 font-semibold block py-2.5 px-4 rounded transition duration-200"
          >
            Mail & Proxy Düzenleme
          </Link>
        </li>
        <li>
          <Link
            href="/hesapolustur"
            className="text-blue-500 hover:text-blue-700 font-semibold block py-2.5 px-4 rounded transition duration-200"
          >
            Proxy & Email (BAKIMDA)
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
