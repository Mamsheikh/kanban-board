import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import HeroSection from '../components/HeroSection'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  if (!session) {
    return <HeroSection />
  }
  useEffect(() => {
    if (session) {
      router.push('/projects')
    }
  }, [session])

  return (
    <>
      <Head>
        <title>JTrello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <HeroSection /> */}
    </>
  )
}

export default Home
