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
            <div className="w-full relative py-4 px-8 border-b theme-border">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <h1 className="text-3xl font-black text-white ml-2">XMTP</h1>
                        <span className='mt-2.5 font-semibold text-gray-400 ml-2'>Broadcast tool</span>
                    </div>
                    {isLoggedIn ?
                        <button
                            className="px-6 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700"
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