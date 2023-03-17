import { useState } from 'react';
import { useCallback } from 'react';
import { XMTP_ENV } from '../constants';
import { Client } from '@xmtp/xmtp-js';
import { buildLocalStorageKey } from '../functions/getKeys';
import { useXmtpStore } from '@/store/xmtp';
import { toast } from 'react-hot-toast';

const useSendMessages = (client:any, user: string) => {
    const addSendingMessage = useXmtpStore((state) => state.addSendingMessage)
    const setSending = useXmtpStore((state) => state.setSending)
    //const message = useXmtpStore((state) => state.message)

    const sendMessages = useCallback(
        async (addresses: Array<any>, message: string) => {
            if (!client) {
                return;
            }
            if (!message) {
                toast.error('Please enter a message to send')
                return;
            }
            setSending(true)
            console.log('Sending messages...')
            const output = addresses.map(async (address) => {
                console.log('Sending message to', address[0])
                const conversationKey = buildLocalStorageKey(address[0]);
                const selectedConversation = await createNewConversation(client, address[0], conversationKey);
                let success: Array<any> = [];
                let failed: Array<any> = [];
                try {
                    success = [...success, address[0]];
                    const resp = await selectedConversation?.send(message);
                    if (resp) {
                        addSendingMessage(address[0])
                    }
                } catch (error) {
                    console.log('error', error);
                    failed = [...failed, address[0]];
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
            return;
        }
        const conversation = await client.conversations.newConversation(address);
        return conversation;
    };


    return { sendMessages }
}

export default useSendMessages;