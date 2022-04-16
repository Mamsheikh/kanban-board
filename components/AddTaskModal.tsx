import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { toast } from 'react-hot-toast'
import {
  ProjectDocument,
  TasksDocument,
  useCreateTaskMutation,
  useUsersQuery,
} from '../generated/graphql'
import { useRecoilState } from 'recoil'
import { statuState } from '../atoms/status'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

interface Props {
  isOpen: boolean
  //   setIsOpen: (value: boolean) => void
  closeModal: () => void
  boardCategory: string
  projectId: string
}

const AddTaskModal: React.FC<Props> = ({
  isOpen,
  closeModal,
  boardCategory,
  projectId,
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const [createTask, { loading, error }] = useCreateTaskMutation({})
  const { data: userData } = useUsersQuery()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useRecoilState(statuState)
  const [assignTo, setAssignTo] = useState('')

  const onSubmit = (e: any) => {
    // let userId = ''
    // if (assignTo) {
    //   userId = assignTo
    // } else if (userData) {
    //   userId = userData.users[0].id
    // }
    e.preventDefault()
    if (session) {
      toast.promise(
        createTask({
          variables: {
            title,
            email: session?.user?.email,
            description,
            status,
            projectId,
          },
          refetchQueries: () => [
            {
              query: ProjectDocument,
              variables: { projectId: projectId as string },
            },
          ],
        }),
        {
          success: 'Task created 🎉',
          error: 'Oops! something went wrong😓',
          loading: 'Creating task...',
        }
      )
    }

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
                  Add Issue
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
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    {/* <div className="">
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
                    </div> */}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      // onClick={closeModal}
                    >
                      Add Issue
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

export default AddTaskModal
