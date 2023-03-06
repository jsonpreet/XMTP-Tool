import { useXmtpStore } from '@/store/xmtp'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Login from '@/components/Common/Login'
import CSVReader from 'react-csv-reader'
import { IFileInfo } from 'react-csv-reader'
import useSendMessages from '@/utils/hooks/useSendMessages'
import useInitXmtpClient from '@/utils/hooks/useXmtpClient'
import { useAccount } from 'wagmi'

const Home: NextPage = () => {
    const { client } = useInitXmtpClient();
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
    const message = useXmtpStore((state) => state.message)
    const setMessage = useXmtpStore((state) => state.setMessage)

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

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header: string) =>
        header
            .toLowerCase()
            .replace(/\W/g, '_')
    }

    const handleForce = (data: Array<any>, fileInfo: IFileInfo, originalFile?: File) => {
        setIsUploaded(true)
        setData(data.filter(elem => elem != ""))
    }

    const handleDarkSideForce = (err: any) => {
        console.log(err)
    }

    const onStart = async() => {
        if (!isLoggedIn) {
            return
        }
        
        const response = await sendMessages(data)
        setResponse(response)

        console.log(sendingMessage)
        // if (!currentProfile) {
        // return;
        // }
        // const conversationId = buildConversationId(currentProfile.id, profile.id);
        // const conversationKey = buildConversationKey(profile.ownedBy, conversationId);
        // addProfileAndSelectTab(conversationKey, profile);
        // router.push(`/messages/${conversationKey}`);
    };


    return (
        <>
            <div className="flex flex-col py-20">
                <main className="flex flex-col space-y-5 items-center justify-center w-full flex-1 px-20 text-center">
                    {data && data.length > 0 ? (
                        <div className="flex flex-col space-y-5 items-center justify-center w-full flex-1 px-20 text-center">
                            <h2 className='text-xl font-bold mb-5 text-white'>Preview</h2>
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
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={onStart}
                            >
                                Start Sending Messages 
                            </button>
                            <span>Total <span className='text-blue-300 font-bold'>{data?.length}</span> Address found!</span>
                        </div>
                    ) : ( 
                        <>
                            <h2 className='text-xl font-bold mb-5 text-white'>Upload CSV File</h2>
                            <CSVReader
                                inputRef={inputRef}
                                cssClass="hidden opacity-0"
                                label="Select CSV"
                                onFileLoaded={handleForce}
                                onError={handleDarkSideForce}
                                // parserOptions={papaparseOptions}
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => inputRef.current?.click()}
                            >
                                Select CSV
                            </button>
                            {isUploaded && <span>Total <span className='text-blue-300 font-bold'>{data?.length}</span> Address found!</span>}
                        </>
                    )}
                    {sendingMessage && sendingMessage.length > 0 && (
                        <div className="flex flex-col space-y-5 items-center justify-center w-full flex-1 py-20 text-center">
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
                </main>
            </div>
        </>
    )
}

export default Home