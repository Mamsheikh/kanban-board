import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { loadingState } from '../../atoms/loading'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }: any) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [loaderState, setLoadingState] = useRecoilState(loadingState)

  if (!session) {
    return <div>{children}</div>
  }
  return (
    <div className="flex h-screen">
      <div
        className={`${
          isOpen ? 'block ' : 'hidden'
        } fixed inset-0 bg-black opacity-50 transition-opacity lg:hidden `}
      ></div>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex min-w-0 flex-1 flex-col bg-white">
        <div className="border-b border-gray-200">
          <Header isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className="flex-1 overflow-auto  scrollbar scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          <main
            className={` ${
              loaderState ? '' : 'inline-flex overflow-hidden'
            } h-full  p-3`}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
