import { useState } from 'react';
import { useCallback } from 'react';
import { XMTP_ENV } from '../constants';
import { Client } from '@xmtp/xmtp-js';
import { buildLocalStorageKey } from '../functions/getKeys';
import { useXmtpStore } from '@/store/xmtp';

const useSendMessages = (client:any, user: string) => {
    const [failed, setFailed] = useState<any>([])
    const [success, setSuccess] = useState<any>([])
    const [sending, setSending] = useState(true)
    const setSendingMessage = useXmtpStore((state) => state.setSendingMessage)
    const addSendingMessage = useXmtpStore((state) => state.addSendingMessage)
    const message = useXmtpStore((state) => state.message)

    const sendMessages = useCallback(
        async (addresses: Array<any>) => {
            if (!client) {
                return;
            }
            setSending(true)
            console.log('Sending messages...')
            const output = addresses.map(async (address) => {
                console.log('Sending message to', address[0])
                const conversationKey = buildLocalStorageKey(address[0]);
                const selectedConversation = await createNewConversation(client, address[0], conversationKey);
                let success: Array<any> = [];
                try {
                    //setSuccess([...success, address[0]]);
                    success = [...success, address[0]];
                    //setSendingMessage([address[0], message])
                    //addSendingMessage([address[0], message])
                    const resp = await selectedConversation?.send(`${message} - ${address[0]}`);
                    if (resp) {
                        addSendingMessage(address[0])
                    }
                } catch (error) {
                    console.log('error', error);
                    setFailed([...failed, address[0]]);
                } finally {
                    setSending(false)
                }
                    return { success, failed };
            })
            return Promise.all(output);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user]
    );

    const createNewConversation = async (client: any, address: string, conversationKey: string) => {
        const canMessage = await Client.canMessage(address, { env: XMTP_ENV });
        if (!canMessage) {
            setFailed([...failed, address[0]]);
            return;
        }
        const conversation = await client.conversations.newConversation(address);
        return conversation;
    };


    return { sendMessages }
}

export default useSendMessages;