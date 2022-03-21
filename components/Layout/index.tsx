import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: any) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1 border-r bg-white">
        <div>
          <Header />
        </div>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}

export default Layout
