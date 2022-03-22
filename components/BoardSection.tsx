import React from 'react'
import Issue from './Issue'

const BoardSection = ({ title }) => {
  return (
    <>
      <div className="ml-3 flex w-80 flex-shrink-0 flex-col rounded-md bg-gray-100 xxl:w-[30rem] xxxl:w-[35rem] ">
        <h3 className="flex-shrink-0 px-3 pt-3 text-sm font-medium text-gray-700">
          {title}
        </h3>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ul className="px-3 pt-2 pb-3">
            <Issue />
            <Issue />
            <Issue />
            <Issue />
            <Issue />
            <Issue />
            <Issue />
            {/* <Issue /> */}
          </ul>
        </div>
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
