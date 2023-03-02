import { useXmtpStore } from "@/store/xmtp";
import useInitXmtpClient from "@/utils/hooks/useXmtpClient";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { InjectedConnector } from 'wagmi/connectors/injected'
import { fetchEnsName } from '@wagmi/core'

const Login:FC = () => {
    const setIsLoggedIn = useXmtpStore(state => state.setIsLoggedIn)
    const isLoggedIn = useXmtpStore(state => state.isLoggedIn)
    const setUser = useXmtpStore(state => state.setUser)
    const { address, isConnected } = useAccount()
    
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
                <div>
                    {isLoggedIn ? 
                
                        <button
                            className="px-10 py-3 rounded-full bg-purple-600 text-white"
                            onClick={() => {
                                disconnect()
                            }}
                        >
                            Disconnect
                        </button>
                        : 
                        <button
                            
                            className="px-10 py-3 rounded-full bg-purple-600 text-white hover:bg-purple-700"
                            onClick={() => {
                                connect()
                            }}
                        >
                            Connect Wallet
                        </button>
                    }
                </div>
            </div>
        </>
    )
}

export default Login