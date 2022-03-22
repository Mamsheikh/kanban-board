import { gql, useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
  const sections: Array<String> = ['Backlog', 'In-Progress,', 'Review', 'Done']
  console.log(data)
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
            <BoardSection title={section} />
            {/* <BoardSection /> */}
          </>
        )
      })}
      {/* </div> */}
    </>
  )
}

export default Home
