import Layout from '@/components/Common/Layout'
import Providers from '@/components/Common/Providers'
import '@/styles/globals.css'
import { DEFAULT_SEO } from '@/utils/constants'
import { DefaultSeo } from 'next-seo'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Providers>
        <DefaultSeo {...DEFAULT_SEO}/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
  )
}
