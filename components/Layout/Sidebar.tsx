import Link from 'next/link'
import React from 'react'
import { SiJirasoftware } from 'react-icons/si'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { IoMdClose } from 'react-icons/io'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const Sidebar = ({ isOpen, setIsOpen }: Props) => {
  return (
    <div
      className={`${
        isOpen
          ? 'translate-x-0 transition-all ease-out'
          : '-translate-x-full transition-all ease-in'
      } fixed inset-y-0 left-0 z-30 w-64 overflow-auto border-r bg-gray-100 px-8 py-4 lg:static lg:inset-auto lg:translate-x-0`}
    >
      <div className="-mx-3 mr-1 flex items-center justify-between pl-3">
        <span>
          <Link href={'/projects'}>
            <a>
              <SiJirasoftware className="h-12 w-12 text-indigo-500" size={32} />
            </a>
          </Link>
        </span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 lg:hidden"
        >
          <IoMdClose className="h-7 w-7" />
        </button>
      </div>
      <nav className="mt-8">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          Issues
        </h2>
        <div className="-mx-3 mt-2">
          <Link href="/projects">
            <a className=" flex items-center justify-between rounded-lg bg-gray-200 px-3 py-2">
              <span className=" text-sm font-medium text-gray-900">All</span>
              <span className="text-xs font-semibold text-gray-700">36</span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">
                Assigned to me
              </span>
              <span className="text-xs font-semibold text-gray-600">2</span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">
                Created by me
              </span>
              <span className="text-xs font-semibold text-gray-600">1</span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">
                Archived
              </span>
              <span className="text-xs font-semibold text-gray-600"></span>
            </a>
          </Link>
        </div>
        <h2 className="mt-8 text-xs font-semibold uppercase tracking-wide text-gray-600">
          Tags
        </h2>
        <div className="-mx-3 mt-2">
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">All</span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">Bug</span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">
                Feature request
              </span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">
                Marketing
              </span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">v2.0</span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">
                Enhancement
              </span>
            </a>
          </Link>
          <Link href="#">
            <a className=" flex items-center justify-between rounded-lg  px-3 py-2">
              <span className=" text-sm font-medium text-gray-600">Design</span>
            </a>
          </Link>
        </div>
        <button className="-ml-1 mt-2 flex items-center text-sm font-medium text-gray-500">
          <AiOutlinePlus className="h-4 w-4 text-gray-400" />
          <span className="ml-1">New Project</span>
        </button>
      </nav>
    </div>
  )
}

export default Sidebar
