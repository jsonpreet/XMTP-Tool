/* eslint-disable no-unused-vars */
import { address } from "@/utils/functions/getAddress";
import { Client } from "@xmtp/xmtp-js";
import { create } from "zustand";

interface XmtpState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: string;
  setUser: (user: string) => void;
  client: Client | undefined | null;
  setClient: (client: Client | undefined | null) => void;
  recipientWalletAddress: string | address;
  setRecipientWalletAddress: (address: string) => void;
  conversationId?: string;
  setConversationId: (conversationId?: string) => void;
  userSigner?: any;
  setUserSigner: (userSigner?: any) => void;
  resetXmtpState: () => void;
  sendingMessage:  Array<any>;
  setSendingMessage: (sendingMessage: Array<any>) => void;
  addSendingMessage: (address: String) => void;
}

export const useXmtpStore = create<XmtpState>((set) => ({
  isLoggedIn: false,
  sendingMessage: [],
  setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
  setSendingMessage: (message: Array<any>) => set((state) => ({ sendingMessage: [...state.sendingMessage, ...message] })),
  addSendingMessage: (address: String) => set((state) => ({ sendingMessage: [...state.sendingMessage, address] })),
  user: "",
  userSigner: null,
  setUserSigner: (userSigner) => set(() => ({ userSigner })),
  setUser: (user: string) => set(() => ({ user })),
  client: undefined,
  setClient: (client: Client | undefined | null) => set(() => ({ client })),
  recipientWalletAddress: "",
  setRecipientWalletAddress: (address) =>
    set(() => ({ recipientWalletAddress: address })),
  conversationId: "",
  setConversationId: (conversationId) => set(() => ({ conversationId })),
  resetXmtpState: () =>
    set(() => {
      return {
        client: undefined,
        recipientWalletAddress: "",
        conversationId: undefined,
      };
    }),
}));
