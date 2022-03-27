import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'
import apollo from '../lib/apollo'
import Layout from '../components/Layout'
import { Router } from 'next/router'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ApolloProvider client={apollo}>
        <RecoilRoot>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </ApolloProvider>
    </SessionProvider>
  )
}

export default MyApp
