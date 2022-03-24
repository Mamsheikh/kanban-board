import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useUsersQuery,
} from '../generated/graphql'
import { useRecoilState } from 'recoil'
import { statuState } from '../atoms/status'

interface Props {
  isOpen: boolean
  //   setIsOpen: (value: boolean) => void
  closeModal: () => void
  boardCategory: string
  id: string
  title: string
  description: string
  userId: string
}

const UpdateTaskModal: React.FC<Props> = ({
  id,
  title,
  description,
  isOpen,
  closeModal,
  boardCategory,
  userId,
}) => {
  const [updateTask, { loading, error }] = useUpdateTaskMutation()
  const [deleteTask] = useDeleteTaskMutation()
  const { data: userData } = useUsersQuery()
  const [taskTitle, setTaskTitle] = useState(title)
  const [taskDescription, setTaskDescription] = useState(description)
  const [status, setStatus] = useRecoilState(statuState)
  const [assignTo, setAssignTo] = useState(userId ? userId : '')

  const onSubmit = (e: any) => {
    e.preventDefault()
    let userId = ''
    if (assignTo) {
      userId = assignTo
    } else if (userData) {
      userId = userData.users[0].id
    }
    updateTask({
      variables: {
        updateTaskId: id,
        title: taskTitle,
        description: taskDescription,
        status: boardCategory,
        userId,
      },
    })

    closeModal()
  }
  const handleDeleteTask = () => {
    deleteTask({
      variables: {
        deleteTaskId: id,
      },
      update: (cache) => {
        // const data : any = cache.readQuery({ query: AllTasksQuery });
        // const updatedTasks = data.tasks.filter(({id: itemId}) => itemId !== id);
        // cache.writeQuery({
        //   query: AllTasksQuery,
        //   data: {tasks: updatedTasks}
        // });
        cache.modify({
          fields: {
            tasks(existingTaskRefs, { readField }) {
              return existingTaskRefs.filter(
                (taskRef) => id !== readField('id', taskRef)
              )
            },
          },
        })
      },
    })
    closeModal()
  }
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-center text-lg font-medium leading-6 text-gray-900"
                >
                  Update Issue
                </Dialog.Title>
                <form onSubmit={onSubmit}>
                  <div className="space-y-4">
                    <div className="">
                      <label
                        htmlFor=""
                        className="text-lg font-medium text-gray-800"
                      >
                        Title
                      </label>
                      <input
                        className="w-full rounded border p-2 outline-none"
                        placeholder="Title"
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor=""
                        className="text-lg font-medium text-gray-800"
                      >
                        Description
                      </label>
                      <input
                        className="w-full rounded border p-2 outline-none"
                        placeholder="Description"
                        type="text"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <label
                        htmlFor=""
                        className="text-lg font-medium text-gray-800"
                      >
                        Assign to
                      </label>
                      <select
                        className="w-full rounded border p-2 outline-none"
                        name=""
                        id=""
                        value={assignTo}
                        onChange={(e) => setAssignTo(e.target.value)}
                      >
                        {userData &&
                          userData.users.map((user) => (
                            <option value={user.id}>{user.name}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDeleteTask}
                    >
                      Delete
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={closeModal}
                    >
                      Update Issue
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpdateTaskModal
