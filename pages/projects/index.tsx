import React from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { FaKeyboard } from 'react-icons/fa'
import { Task, User } from '../../generated/graphql'
import prisma from '../../lib/prisma'
import Head from 'next/head'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

interface Project {
  description: string
  id: string
  name: string
  sourceCode: string
  tasks: Task[]
  user: User
  userId: string
  website: string
}

const Projects = ({ projects }) => {
  const { data: session } = useSession()
  if (!session) {
    Router.push('/')
  }
  return (
    <>
      <Head>
        <title>Trelloish - projects</title>
        <meta name="description" content="Collab projects" />
      </Head>

      <div className="grid cursor-pointer grid-cols-1 gap-5 p-3  md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project: Project) => (
          <div
            key={project.id}
            className="mb-5 h-[320px] rounded-md border  p-8 shadow-md hover:bg-gray-100"
          >
            <Link href={`/projects/${project.id}`}>
              <a>
                <h1 className="mb-5 w-max cursor-pointer border-b pb-3  text-3xl font-bold text-gray-700 hover:underline">
                  {project.name}
                </h1>

                <div className="mb-5 flex items-center space-x-2">
                  <img
                    src={project.user.image}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <h3 className="font-semibold">{project.user.name}</h3>
                </div>
                <small className="text-gray-400">
                  {/* last updated <strong>{dayjs(p.updatedAt).fromNow()}</strong> */}
                </small>
                <p className="mt-3 text-gray-500">{project.description}</p>
                <div className="mt-4 flex w-36 items-center overflow-hidden rounded-md border ">
                  <div className="flex items-center space-x-2  p-2 text-gray-600 shadow-inner">
                    <FaKeyboard />
                    <p>Issues</p>
                  </div>
                  <div className="flex-1 border-l  p-2 text-right">
                    <p className="font-semibold">{project.tasks?.length}</p>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await prisma.project.findMany({
    include: { user: true, tasks: true },
  })
  const projects = JSON.parse(JSON.stringify(data))

  return {
    props: {
      projects,
    },
  }
}

export default Projects
