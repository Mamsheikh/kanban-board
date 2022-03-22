import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineBell, AiOutlinePlus } from 'react-icons/ai'
import { HiMenuAlt2, HiOutlineViewList } from 'react-icons/hi'
import { CgViewList } from 'react-icons/cg'

interface Props {
  isOpen: boolean
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}
const Header = ({ isOpen, setIsOpen }: Props) => {
  return (
    <header className="">
      <div className="px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-200  py-3">
          <div className="flex flex-1">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 lg:hidden"
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>
            <div className="relative ml-3 lg:ml-0">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <AiOutlineSearch className="h-6 w-6 text-gray-500" />
              </span>
              <input
                className="w-full max-w-xs rounded-md border border-gray-400 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-600 focus:outline-none"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center">
            <button>
              <AiOutlineBell className="h-6 w-6 text-gray-600" />
            </button>
            <button className="ml-6">
              <img
                className="h-9 w-9 rounded-full object-cover"
                src="https://res.cloudinary.com/mamsheikh/image/upload/v1634847258/person-1_rfzshl_rk3fpl.jpg"
                alt="profile"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-6 py-2">
        <div className="sm:flex sm:items-center">
          <h2 className="text-2xl font-semibold leading-tight text-gray-900">
            All Issues
          </h2>
          <div className="mt-1 flex items-center sm:mt-0 sm:ml-6">
            <span className=" rounded-full border-2 border-white">
              <img
                className="h-6 w-6 rounded-full object-cover"
                src=" https://res.cloudinary.com/mamsheikh/image/upload/v1634847258/person-3_ipa0mj_ii5zhx.jpg"
                alt=""
              />
            </span>
            <span className="-ml-2 rounded-full border-2 border-white">
              <img
                className="h-6 w-6 rounded-full object-cover"
                src="https://res.cloudinary.com/mamsheikh/image/upload/v1634847258/person-1_rfzshl_rk3fpl.jpg"
                alt=""
              />
            </span>
            <span className="-ml-2 rounded-full border-2 border-white">
              <img
                className="h-6 w-6 rounded-full object-cover"
                src=" https://res.cloudinary.com/mamsheikh/image/upload/v1634847258/person-1_qb1hkr.jpg"
                alt=""
              />
            </span>
            <span className="-ml-2 rounded-full border-2 border-white">
              <img
                className="h-6 w-6 rounded-full object-cover"
                src=" https://res.cloudinary.com/mamsheikh/image/upload/v1634847258/person-3_ipa0mj_ii5zhx.jpg"
                alt=""
              />
            </span>
          </div>
        </div>
        <div className="flex">
          <span className="hidden rounded-md border bg-gray-200 p-[3px] sm:inline-flex">
            <button className="rounded px-2 py-1">
              <HiOutlineViewList className="h-6 w-6 text-gray-500" />
            </button>
            <button className="rounded bg-white px-2 py-1 shadow">
              <CgViewList className="h-6 w-6 text-gray-500" />
            </button>
          </span>
          <button className="ml-5 flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
            <AiOutlinePlus className="h-4 w-4" />
            <span className="ml-1">New Issue</span>
          </button>
        </div>
      </div>
      <div className="flex  border-t border-b bg-gray-200 p-[3px] px-4 sm:hidden">
        <button className="inline-flex w-1/2 items-center justify-center rounded px-2 py-1">
          <HiOutlineViewList className="h-6 w-6 text-gray-600" />
          <span className="ml-2 text-sm font-medium text-gray-600">List</span>
        </button>
        <button className="inline-flex w-1/2 justify-center rounded bg-white px-2 py-1 shadow">
          <CgViewList className="h-6 w-6 text-gray-600" />
          <span className="ml-2 text-sm font-medium text-gray-600">Board</span>
        </button>
      </div>
    </header>
  )
}

export default Header
