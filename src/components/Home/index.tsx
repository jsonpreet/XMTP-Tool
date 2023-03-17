import { useXmtpStore } from '@/store/xmtp'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import Login from '@/components/Common/Login'
import CSVReader from 'react-csv-reader'
import { IFileInfo } from 'react-csv-reader'
import useSendMessages from '@/utils/hooks/useSendMessages'
import useInitXmtpClient from '@/utils/hooks/useXmtpClient'
import { toast } from 'react-hot-toast'
import { isValidRecipientAddressFormat } from '@/utils/functions'

const Home: NextPage = () => {
    const { client } = useInitXmtpClient();
    const [message, setMessage] = useState<string>('')
    const isLoggedIn = useXmtpStore(state => state.isLoggedIn)
    const user = useXmtpStore(state => state.user)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [data, setData] = React.useState<Array<any>>([])
    const [isUploaded, setIsUploaded] = React.useState<boolean>(false)
    const { sendMessages } = useSendMessages(client, user)
    const setUser = useXmtpStore(state => state.setUser)
    const setIsLoggedIn = useXmtpStore(state => state.setIsLoggedIn)
    const sendingMessage = useXmtpStore(state => state.sendingMessage)
    const [response, setResponse] = React.useState<any>(null)
    const sending = useXmtpStore((state) => state.sending)

    useEffect(() => {
        if (isLoggedIn && !client) {
            setUser('')
            setIsLoggedIn(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, client])

    if (!isLoggedIn) {
        return <Login/>
    }

    const handleForce = (data: Array<any>, fileInfo: IFileInfo, originalFile?: File) => {
        setIsUploaded(true)
        setData(data.filter(elem => elem != "" && elem != null && isValidRecipientAddressFormat(elem[0])))
    }

    const handleDarkSideForce = (err: any) => {
        console.log(err)
    }

    const onStart = async() => {
        if (!isLoggedIn) {
            return
        }
        
        const response = await sendMessages(data, message)
        if (!response) {
            toast.error('Something went wrong')
        }
        setResponse(response)
    };


    return (
        <>
            <CSVReader
                inputRef={inputRef}
                cssClass="hidden opacity-0"
                label="Select CSV"
                onFileLoaded={handleForce}
                onError={handleDarkSideForce}
                // parserOptions={papaparseOptions}
            />
            <div className="flex flex-col py-20">
                <div className="flex space-x-5 items-start justify-start w-full flex-1 px-20 text-center">
                    {data && data.length > 0 ? (
                        <div className="flex flex-col space-y-5 items-center justify-center w-full flex-1 px-20 text-center">
                            <div className='mx-auto w-full max-w-3xl'>
                                <div className="flex flex-col space-y-5 items-center justify-center w-full flex-1 px-20 text-center">
                                    <label>Enter Message</label>
                                    <textarea
                                        className='w-full text-black h-40 p-2 rounded'
                                        placeholder='Enter Message'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='flex space-x-5'>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={onStart}
                                >
                                    {sending ? <span className='text-white font-bold'>Sending...</span> : <span className='text-white font-bold'>Send Message</span>}
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    Select CSV
                                </button>
                            </div>
                            <span>Total <span className='text-blue-300 font-bold'>{data?.length}</span> Address found!</span>
                        </div>
                    ) : ( 
                        <div className='flex justify-center mx-auto flex-col'>
                            <h2 className='text-xl font-bold mb-5 text-white'>Upload CSV File</h2>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => inputRef.current?.click()}
                            >
                                Select CSV
                            </button>
                            {isUploaded && <span>Total <span className='text-blue-300 font-bold'>{data?.length}</span> Address found!</span>}
                        </div>
                    )}
                    {sendingMessage && sendingMessage.length > 0 && (
                        <div className="flex flex-col space-y-5 items-center justify-center w-full flex-1 text-center">
                            <h2 className='text-xl font-bold text-white'>Status</h2>
                            {/* <span>Total <span className='text-blue-300 font-bold'>{sendingMessage?.length}</span> Address found!</span> */}
                            <div className="flex flex-col space-y-5 items-center justify-center w-full flex-1 px-20 text-center">
                                {sendingMessage.map((elem: any, index: number) => (
                                    <div key={index} className="flex space-x-5 items-center justify-center w-full flex-1 px-20 text-center">
                                        <span className='text-white font-bold'>{elem}</span>
                                        <span className='text-green-300 font-bold'>Sent</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )} 
                </div>
            </div>
        </>
    )
}

export default Home