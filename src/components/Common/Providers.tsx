import { ReactNode, useEffect, useState } from 'react'
import React from 'react'
import { RainbowKitProvider, getDefaultWallets, darkTheme, lightTheme, connectorsForWallets, } from "@rainbow-me/rainbowkit";
import type { ThemeOptions } from '@rainbow-me/rainbowkit/dist/themes/baseTheme'
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, goerli } from 'wagmi/chains' 

import ErrorBoundary from './ErrorBoundary'
import { APP, IS_MAINNET } from '@/utils/constants';

const { chains, provider, webSocketProvider  } = configureChains(
    [IS_MAINNET ? mainnet : goerli],
    [
      publicProvider()
    ],
    { targetQuorum: 1 }
)

// Enables usage of theme in RainbowKitProvider
const RainbowKitProviderWrapper = ({ children }: { children: ReactNode }) => {
    const themeOptions: ThemeOptions = {
        fontStack: 'system',
        overlayBlur: 'small',
        accentColor: '#ec1e25'
    }
    return (
        <RainbowKitProvider
            modalSize="compact"
            chains={chains}
            theme={
                darkTheme(themeOptions)
            }
        >
            {children}
        </RainbowKitProvider>
    )
}


const Providers = ({ children }: { children: ReactNode }) => {
    const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            injectedWallet({ chains, shimDisconnect: true }),
            metaMaskWallet({ chains, shimDisconnect: true }),
            rainbowWallet({ chains }),
            coinbaseWallet({ appName: APP.Name, chains }),
            walletConnectWallet({ chains })
        ]
    }
])

    const wagmiClient = createClient({
        autoConnect: true,
        connectors: connectors,
        provider,
        webSocketProvider,
    });
    
    return (
        <ErrorBoundary>
            <WagmiConfig client={wagmiClient}>
                <RainbowKitProviderWrapper>
                    {children}
                </RainbowKitProviderWrapper>
            </WagmiConfig>  
        </ErrorBoundary>
    )
}

export default Providers