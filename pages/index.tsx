import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { showModalState } from '../atoms/modal'
import AddTaskModal from '../components/AddTaskModal'
import BoardSection from '../components/BoardSection'
import Issue from '../components/Issue'

const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      description
      status
    }
  }
`
const Home: NextPage = () => {
  const { data } = useQuery(AllTasksQuery)
  const sections: Array<String> = ['Backlog', 'In-Progress', 'Review', 'Done']
  const [showModal, setShowModal] = useRecoilState(showModalState)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      <Head>
        <title>JTrello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <div className="w-80 rounded-md bg-gray-100 p-3"> */}
      {sections.map((section, index) => {
        let filteredData: Array<Task> = data
          ? data.tasks.filter((task: Task) => {
              return task.status === section
            })
          : []
        return (
          <>
            <BoardSection key={index} title={section} tasks={filteredData} />
            {/* <BoardSection /> */}
          </>
        )
      })}
      <AddTaskModal closeModal={closeModal} isOpen={showModal} />
      {/* </div> */}
    </>
  )
}

export default Home
