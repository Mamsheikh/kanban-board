import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="border-b-2 border-gray-200">
          <Header />
        </div>
        <div className="flex-1 overflow-auto">
          <main className="inline-flex p-3">{children}</main>
        </div>
      </div>
    </div>
  )
}

export default Layout
