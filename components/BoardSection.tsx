import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRecoilState } from 'recoil'
import { showModalState } from '../atoms/modal'
import { statuState } from '../atoms/status'
import { Task } from '../generated/graphql'
import AddTaskModal from './AddTaskModal'
import Issue from './Issue'

interface BoardSectionProps {
  title: string
  tasks: Array<Task>
  showModal: boolean
  setShowModal: (value: boolean) => void
}

const BoardSection: React.FC<BoardSectionProps> = ({ title, tasks }) => {
  const [showModal, setShowModal] = useRecoilState(showModalState)
  const [status, setStatus] = useRecoilState(statuState)

  const onClick = () => {
    setStatus(title)
    setShowModal(!showModal)
  }
  return (
    <>
      <div className="ml-3 flex w-80 flex-shrink-0 flex-col rounded-md bg-gray-100 xxl:w-[30rem] xxxl:w-[35rem] ">
        <h3 className="flex-shrink-0 px-3 pt-3 text-sm font-medium text-gray-700">
          {title}
        </h3>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <ul className="px-3 pt-2 pb-3">
            {tasks &&
              tasks.map((task: Task, index: number) => (
                <Issue
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  status={title}
                  id={task.id}
                />
              ))}
            {tasks.length > 0 && (
              <button
                onClick={onClick}
                className="mt-2 flex w-full items-center justify-center text-center"
              >
                <span>
                  <AiOutlinePlus className="h-4 w-4" />
                </span>
                <span>Add Issue</span>
              </button>
            )}
            {tasks.length === 0 && (
              <button
                onClick={onClick}
                className="mt-2 flex w-full items-center justify-center text-center"
              >
                <span>
                  <AiOutlinePlus className="h-4 w-4" />
                </span>
                <span>Add Issue</span>
              </button>
            )}
          </ul>
        </div>
      </div>
      {/* <AddTaskModal
        closeModal={closeModal}
        isOpen={showModal}
        boardCategory={title}
      /> */}
    </>
  )
}

export default BoardSection
