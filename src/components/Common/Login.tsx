import { useXmtpStore } from "@/store/xmtp";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { fetchEnsName } from '@wagmi/core'

const Login:FC = () => {
    const setIsLoggedIn = useXmtpStore(state => state.setIsLoggedIn)
    const isLoggedIn = useXmtpStore(state => state.isLoggedIn)
    const setUser = useXmtpStore(state => state.setUser)
    const { address, isConnected, isConnecting } = useAccount()
    
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })

    const { disconnect } = useDisconnect({
        onSuccess() {
            setIsLoggedIn(false)
            setUser('')
        },
        onError(error: any) {
            toast.error(error?.data?.message ?? error?.message)
        }
    })

    const initProfile = async () => {
        if (address) {
            const ensName = await fetchEnsName({ address })
            setIsLoggedIn(true)
            setUser(address)
            if (ensName) {
                console.log(ensName)
            }
        }
    }
    const init = async () => {
        initProfile()
    }


    useEffect(() => {
        if (isConnected) {
            init()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isConnected])

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <div className="flex items-center mb-10 border rounded-full px-5 theme-border py-3">
                    <h1 className="text-5xl font-black text-white ml-2">XMTP</h1>
                    <span className='mt-6 font-semibold text-gray-400 ml-2'>Broadcast tool</span>
                </div>
                <div>
                    <h3 className="text-3xl flex flex-col space-y-2 text-center items-center justify-center font-semibold mb-10">
                        <span>Send <span className="bg-gradient-to-r bg-clip-text  text-transparent  from-indigo-500 via-purple-500 to-indigo-500 animate-text">Message</span> to</span> 
                        <span className="flex space-x-2">
                            <span className="bg-gradient-to-r bg-clip-text  text-transparent  from-indigo-500 via-purple-500 to-indigo-500 animate-text">Bulk</span> 
                            <span>Recipients</span>
                        </span>
                    </h3>
                </div>
                <div>
                    {isLoggedIn ? 
                
                        <button
                            className="px-6 py-2 rounded-full bg-orange-600 text-white"
                            onClick={() => {
                                disconnect()
                            }}
                        >
                            Disconnect
                        </button>
                        : 
                        <button
                            
                            className="px-6 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700"
                            onClick={() => {
                                connect()
                            }}
                        >
                            {isConnecting ? `Connecting` : `Connect Wallet`}
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default Login