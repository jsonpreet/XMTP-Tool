export const MESSAGE_LIMIT = 20;

export const APP = {
    Name: "My App",
}

export const ENVIRONMENT = {
  DEMO: "demo",
}

export const IS_MAINNET = process.env.NEXT_PUBLIC_XMTP_ENVIRONMENT === 'production'

// XMTP
export const XMTP_ENV = IS_MAINNET ? 'production' : 'dev'

// polygon
export const POLYGON_RPC_URL = IS_MAINNET
  ? 'https://rpc.ankr.com/polygon'
  : 'https://rpc.ankr.com/polygon_mumbai'

export const POLYGONSCAN_URL = IS_MAINNET
  ? 'https://polygonscan.com'
  : 'https://mumbai.polygonscan.com'
export const POLYGON_CHAIN_ID = IS_MAINNET ? 137 : 80001

export const DEFAULT_SEO = {
  title: "XMTP Broadcast Tool",
  description: "XMTP Broadcast Tool.",
  canonical: "https://xmtp-tool.vercel.app",
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://xmtp-tool.vercel.app',
    siteName: 'XMTP Broadcast Tool',
    title: "XMTP Broadcast Tool",
    description: "XMTP Broadcast Tool.",
    images: [
      {
        url: 'https://xmtp-tool.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'XMTP Broadcast Tool',
      },
    ],
  },
  twitter: {
    handle: '@JsonPreet',
    site: '@JsonPreet',
    cardType: 'summary_large_image',
    title: "XMTP Broadcast Tool",
    description: "XMTP Broadcast Tool.",
    images: [
      {
        url: 'https://xmtp-tool.vercel.app/meta.png',
        width: 1200,
        height: 630,
        alt: 'XMTP Broadcast Tool',
      },
    ],
  },
};