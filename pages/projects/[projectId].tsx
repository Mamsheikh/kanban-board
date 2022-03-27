import { Task } from '@prisma/client'
import Head from 'next/head'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { useRecoilState } from 'recoil'
import { toast } from 'react-hot-toast'
import { showModalState } from '../../atoms/modal'
import AddTaskModal from '../../components/AddTaskModal'
import BoardSection from '../../components/BoardSection'
import {
  ProjectDocument,
  TasksDocument,
  useProjectQuery,
  useTasksQuery,
  useUpdateTaskMutation,
} from '../../generated/graphql'
import prisma from '../../lib/prisma'
import { useRouter } from 'next/router'
import { BallTriangle } from 'react-loader-spinner'
import { loadingState } from '../../atoms/loading'

const Project = () => {
  // console.log({ post })
  const router = useRouter()
  const { projectId } = router.query
  const [tasks, setTasks] = useState([])
  const [loaderState, setLoadingState] = useRecoilState(loadingState)
  const { data, loading } = useProjectQuery({
    variables: {
      projectId: projectId as string,
    },
    onCompleted: (data) => {
      setTasks(data.project.tasks)
    },
  })

  const [updateTask] = useUpdateTaskMutation()
  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result

    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId) return

    // toast.promise(
    updateTask({
      variables: {
        updateTaskId: draggableId,
        status: destination.droppableId,
      },
      // update: (cache, { data }) => {
      //   const existingTasks: any = cache.readQuery({
      //     query: ProjectDocument,
      //   })
      //   const updatedTasks = existingTasks!.tasks.map((t: any) => {
      //     if (t.id === draggableId) {
      //       return {
      //         ...t,
      //         ...data!.updateTask!,
      //       }
      //     } else {
      //       return t
      //     }
      //   })
      //   cache.writeQuery({
      //     query: ProjectDocument,
      //     data: { tasks: updatedTasks },
      //   })
      //   const dataInCache = cache.readQuery({ query: TasksDocument })
      //   // console.log('cache', dataInCache)
      // },
    })
    //   {
    //     loading: 'Dragging...',
    //     error: 'Dragged',
    //     success: 'Dragged',
    //   }
    // )

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
  const sections: Array<string> = ['Backlog', 'In-Progress', 'Review', 'Done']
  const [showModal, setShowModal] = useRecoilState(showModalState)
  const closeModal = () => {
    setShowModal(!showModal)
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
        <title>
          Trelloish - {data.project.user.name}/{data.project.name}
        </title>
        <meta name="description" content={data.project.description} />
      </Head>
      <DragDropContext onDragEnd={onDragEnd}>
        {sections.map((section, index) => {
          let filteredData: Array<Task> = data
            ? tasks.filter((task: Task) => {
                return task?.status === section
              })
            : []
          return (
            <BoardSection
              key={index}
              title={section}
              tasks={filteredData}
              projectId={projectId}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )
        })}
      </DragDropContext>
      <AddTaskModal
        closeModal={closeModal}
        isOpen={showModal}
        boardCategory={'Backlog'}
        projectId={data?.project?.id}
      />
    </>
  )
}

export default Project

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

// export const getStaticPaths: GetStaticPaths = async (ctx) => {
//   const posts = await prisma.project.findMany({
//     select: {
//       id: true,
//     },
//   })

//   const paths = posts.map((post) => ({ params: { projectId: post.id } }))

//   return {
//     paths,
//     fallback: 'blocking',
//   }
// }

// // You should use getStaticProps when:
// //- The data required to render the page is available at build time ahead of a user’s request.
// //- The data comes from a headless CMS.
// //- The data can be publicly cached (not user-specific).
// //- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const data = await prisma.project.findUnique({
//     where: { id: params.projectId as string },
//     include: { user: true, tasks: { include: { user: true } } },
//   }) // your fetch function here

//   const post = JSON.parse(JSON.stringify(data))
//   if (!post) {
//     return {
//       notFound: true,
//     }
//   }
//   return {
//     props: {
//       post,
//     },
//     revalidate: 60,
//   }
// }
