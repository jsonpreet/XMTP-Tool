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