import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import UpdateTaskModal from './UpdateTaskModal'

interface TaskProps {
  title: string
  description: string
  image: string
  status: string
  projectId: string
  id: string
  index: number
  userId: string
}

const Issue: React.FC<TaskProps> = ({
  title,
  description,
  status,
  image,
  id,
  index,
  userId,
  projectId,
}) => {
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <li
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={() => setShowModal(!showModal)}
            className="mt-3 cursor-pointer rounded-md bg-white p-5 shadow"
          >
            <div className="flex justify-between">
              <p className="text-sm font-medium leading-snug text-gray-900">
                {description}
              </p>
              <span>
                <img
                  className="h-6 w-6 rounded-full object-cover"
                  src={image}
                  alt="profile"
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
                    {title}
                  </span>
                </span>
              </div>
            </div>
          </li>
        )}
      </Draggable>
      <UpdateTaskModal
        title={title}
        description={description}
        boardCategory={status}
        id={id}
        isOpen={showModal}
        closeModal={closeModal}
        userId={userId}
        projectId={projectId}
      />
    </>
  )
}

export default Issue
