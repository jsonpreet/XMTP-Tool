import { getToastOptions } from '@/utils/functions/getToastOptions'
import Header from './Header'
import { FC, ReactNode } from 'react'
import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { useXmtpStore } from '@/store/xmtp'

interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
    const isLoggedIn = useXmtpStore(state => state.isLoggedIn)

    return (
        <>
            <Head>
                <title>XMTP</title>
                <meta
                    name="theme-color"
                    content='#000000'
                />
            </Head>
            <Toaster
                position="bottom-right"
                toastOptions={getToastOptions()}
            />
            <div className='relative'>
                {isLoggedIn ? <Header /> : null}
                <div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout