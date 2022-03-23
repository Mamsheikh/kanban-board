import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRecoilState } from 'recoil'
import { DragDropContext } from 'react-beautiful-dnd'
import { showModalState } from '../atoms/modal'
import AddTaskModal from '../components/AddTaskModal'
import BoardSection from '../components/BoardSection'
import { Task, useTasksQuery } from '../generated/graphql'

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

interface Props {
  title: string
  tasks: Task
}
const Home: NextPage | React.FC<Props> = ({ title, tasks }: Props) => {
  const { data } = useTasksQuery()
  const sections: Array<string> = ['Backlog', 'In-Progress', 'Review', 'Done']
  const [showModal, setShowModal] = useRecoilState(showModalState)

  const closeModal = () => {
    setShowModal(!showModal)
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result
    console.log(result)
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
