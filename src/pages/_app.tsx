import Layout from '@/components/Common/Layout'
import Providers from '@/components/Common/Providers'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Providers>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
  )
}
