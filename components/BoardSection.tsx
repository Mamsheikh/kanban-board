import React from 'react'
import Issue from './Issue'

const BoardSection = ({ title }) => {
  return (
    <>
      <div className="ml-3 w-80 flex-shrink-0 rounded-md bg-gray-100 p-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <ul className="mt-2">
          <Issue />
          <Issue />
          <Issue />
          <Issue />
          <Issue />
          {/* <Issue /> */}
        </ul>
      </div>
      {/* <div className="w-80 rounded-md bg-gray-100 p-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <ul className="mt-2">
          <Issue />
          {/* <Issue /> */}
      {/* </ul>
      </div>
      <div className="w-80 rounded-md bg-gray-100 p-3">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <ul className="mt-2">
          <Issue />
          {/* <Issue /> */}
      {/* </ul>
      </div>   */}
    </>
  )
}

export default BoardSection
