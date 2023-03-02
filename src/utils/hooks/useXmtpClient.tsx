import { useXmtpStore } from "@/store/xmtp";
import { Client } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { loadKeys, storeKeys } from "../functions/getKeys";
import { getEnv } from "../functions/getEnv";
import { getAppVersion } from "../functions/getAppVersion";

const useInitXmtpClient = () => {
  const { data: signer, isLoading } = useSigner();
  const client = useXmtpStore((state) => state.client);
  const setClient = useXmtpStore((state) => state.setClient);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const isLoggedIn = useXmtpStore((state) => state.isLoggedIn);

  useEffect(() => {
    const initClient = async () => {
      if (!isRequestPending && signer && !client && isLoggedIn) {
          const address = await signer.getAddress();
          setIsRequestPending(true);
          let keys = loadKeys(address);
          if (!keys) {
            keys = await Client.getKeys(signer, {
              env: getEnv(),
              appVersion: getAppVersion(),
            });
            storeKeys(address, keys);
          }
          const xmtp = await Client.create(null, {
            env: getEnv(),
            appVersion: getAppVersion(),
            privateKeyOverride: keys,
          });
          console.log('Client created')
          setClient(xmtp);
          setIsRequestPending(false);
      }
    };
    initClient();
    if (!signer || !isLoggedIn) {
      setClient(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, isLoggedIn]);

  return {
    client: client,
    isLoading,
  };
};

export default useInitXmtpClient;