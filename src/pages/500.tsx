import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Custom500() {
    return (
        <>
            <Head>
                <title>500 - Server Error</title>
            </Head>
            <div className="flex flex-col items-center justify-start h-full mt-10 md:mt-20">
                <div className="py-10 text-center">
                    <h1 className="mb-4 text-3xl font-bold">
                        Looks like something went wrong!
                    </h1>
                    <div className="max-w-lg mb-6">
                        We track these errors automatically, but if the problem persists
                        feel free to contact us. In the meantime, try refreshing.
                    </div>
                </div>
            </div>
        </>
    )
}