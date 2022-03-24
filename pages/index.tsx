import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { DragDropContext } from 'react-beautiful-dnd'
import { showModalState } from '../atoms/modal'
import AddTaskModal from '../components/AddTaskModal'
import BoardSection from '../components/BoardSection'
import {
  Task,
  TasksDocument,
  useTasksQuery,
  useUpdateTaskMutation,
} from '../generated/graphql'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import HeroSection from '../components/HeroSection'
import { BallTriangle } from 'react-loader-spinner'
import { loadingState } from '../atoms/loading'

const Home: NextPage = () => {
  const { data: session } = useSession()
  if (!session) {
    return <HeroSection />
  }
  const [tasks, setTasks] = useState([])
  const { data, loading } = useTasksQuery({
    onCompleted: (data) => {
      setTasks(data.tasks)
    },
  })
  const [updateTask] = useUpdateTaskMutation()
  const sections: Array<string> = ['Backlog', 'In-Progress', 'Review', 'Done']
  const [showModal, setShowModal] = useRecoilState(showModalState)
  const [loaderState, setLoadingState] = useRecoilState(loadingState)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId) return

    updateTask({
      variables: {
        updateTaskId: draggableId,
        status: destination.droppableId,
      },
      update: (cache, { data }) => {
        const existingTasks: any = cache.readQuery({
          query: TasksDocument,
        })
        const updatedTasks = existingTasks!.tasks.map((t: any) => {
          if (t.id === draggableId) {
            return {
              ...t,
              ...data!.updateTask!,
            }
          } else {
            return t
          }
        })
        cache.writeQuery({
          query: TasksDocument,
          data: { tasks: updatedTasks },
        })
        const dataInCache = cache.readQuery({ query: TasksDocument })
        // console.log('cache', dataInCache)
      },
    })

    const updateTasksList =
      tasks &&
      tasks.map((t: any) => {
        if (t.id === draggableId) {
          return {
            ...t,
            status: destination.droppableId,
          }
        } else {
          return t
        }
      })

    setTasks(updateTasksList)
  }

  if (loading) {
    setLoadingState(true)
    return (
      <div className="mx-auto ml-12 flex h-screen items-center justify-center">
        <BallTriangle
          // heigth="100"
          width="100"
          color="grey"
          ariaLabel="loading-indicator"
        />
      </div>
    )
  } else {
    setLoadingState(false)
  }

  return (
    <>
      <Head>
        <title>JTrello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="w-80 rounded-md bg-gray-100 p-3"> */}
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((section, index) => {
          let filteredData: Array<Task> = data
            ? data.tasks.filter((task: Task) => {
                return task?.status === section
              })
            : []
          return (
            <>
              <BoardSection
                key={index}
                title={section}
                tasks={filteredData}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              {/* <BoardSection /> */}
            </>
          )
        })}
      </DragDropContext>
      <AddTaskModal
        closeModal={closeModal}
        isOpen={showModal}
        boardCategory={'Backlog'}
      />

      {/* </div> */}
    </>
  )
}

export default Home
