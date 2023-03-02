import { useXmtpStore } from '@/store/xmtp'
import React from 'react'
import { toast } from 'react-hot-toast'
import { useAccount, useDisconnect } from 'wagmi'

function Header() {
    
    const setIsLoggedIn = useXmtpStore(state => state.setIsLoggedIn)
    const isLoggedIn = useXmtpStore(state => state.isLoggedIn)
    const setUser = useXmtpStore(state => state.setUser)
    const { address, isConnected } = useAccount()

    const { disconnect } = useDisconnect({
        onSuccess() {
            setIsLoggedIn(false)
            setUser('')
        },
        onError(error: any) {
            toast.error(error?.data?.message ?? error?.message)
        }
    })

    return (
        <>
            <div className="w-full relative py-4 px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-white ml-2">XMTP</h1>
                    </div>
                    {isLoggedIn ?
                        <button
                            className="px-6 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => {
                                disconnect()
                            }}
                        >
                            Disconnect
                        </button>
                    : null}
                </div>
            </div>
            
        </>
    )
}

export default Header