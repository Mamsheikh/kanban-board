import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRecoilState } from 'recoil'
import { loadingState } from '../atoms/loading'
import { useCreateProjectMutation } from '../generated/graphql'

const New = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [loaderState, setLoadingState] = useRecoilState(loadingState)
  const [createProject, { loading, error }] = useCreateProjectMutation({
    onCompleted: (data) => {
      router.push(`/projects/${data.createProject.id}`)
    },
  })
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [sourceCode, setSourceCode] = useState('')
  const [website, setWebsite] = useState('')
  const [nameErr, setNameErr] = useState('')
  const [descErr, setDescErr] = useState('')
  useEffect(() => {
    setLoadingState(true)
  }, [loaderState])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      setNameErr('Enter a project name')
    }
    if (!description) {
      setDescErr('Enter a good description')
    }

    if (!name && !description) return

    if (session) {
      toast.promise(
        createProject({
          variables: {
            name,
            email: session?.user?.email,
            description,
            sourceCode,
            website,
          },
        }),
        {
          loading: 'Creating a new project...',
          error: 'Oops, something went wrong😓',
          success: 'Project created 🎉',
        }
      )
    }
  }
  return (
    <>
      <Head>
        <title>create project</title>
      </Head>

      <div className="mx-auto max-w-md p-5">
        <h3 className=" mb-4 text-2xl text-gray-700">Create a new project</h3>
        <hr className="mb-6" />
        <form onSubmit={onSubmit} className="flex flex-col space-y-2">
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="mb-2 text-xl font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              className={`${
                nameErr ? 'border border-red-500' : 'border'
              } w-full rounded p-2 outline-none`}
              type="text"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small className="text-red-500">{nameErr}</small>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="mb-2 text-xl font-semibold text-gray-700"
            >
              source code
            </label>
            <input
              className="w-full rounded border p-2 outline-none"
              type="text"
              placeholder="https://github.com/Mamsheikh/kanba-board"
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="mb-2 text-xl font-semibold text-gray-700"
            >
              Website
            </label>
            <input
              className="w-full rounded border p-2 outline-none"
              type="text"
              placeholder="https:/kanban-board.vercel.app"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor=""
              className="mb-2 text-xl font-semibold text-gray-700"
            >
              Description
            </label>
            <textarea
              name=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${
                descErr ? 'border border-red-500' : 'border'
              } w-full rounded p-2 outline-none`}
            ></textarea>
            <small className="text-red-500">{descErr}</small>
          </div>
          <div className="w-full">
            <button
              disabled={!name && !description}
              type="submit"
              className="w-full rounded bg-indigo-500 p-3 text-white hover:bg-indigo-400"
            >
              {loading ? <span>creating...</span> : <span>Create project</span>}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default New
