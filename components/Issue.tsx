import React from 'react'

const Issue = ({ title, description, status }) => {
  return (
    <>
      <li className="mt-3 rounded-md bg-white p-5 shadow">
        <div className="flex justify-between">
          <p className="text-sm font-medium leading-snug text-gray-900">
            Add discount code to checkout page
          </p>
          <span>
            <img
              className="h-6 w-6 rounded-full object-cover"
              src="https://res.cloudinary.com/mamsheikh/image/upload/v1634847258/person-1_rfzshl_rk3fpl.jpg"
              alt=""
            />
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-xs text-gray-400">Sep 14</p>
          <div className="mt-2">
            <span className="inline-flex items-center rounded bg-teal-100 px-2">
              <svg
                className="h-2 w-2 text-teal-500"
                viewBox="0 0 8 8"
                fill="currentColor"
              >
                <circle cx="4" cy="4" r="3" />
              </svg>
              <span className="ml-2 py-1 text-sm font-medium leading-tight text-teal-900">
                Feature request
              </span>
            </span>
          </div>
        </div>
      </li>
    </>
  )
}

export default Issue
