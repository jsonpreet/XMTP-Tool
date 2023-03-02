
import useWalletAddress from "@/utils/hooks/useWalletAddress";
import clsx from "clsx";
import { shortAddress } from "../functions";

export type address = `0x${string}`;

type AddressProps = {
  address: address;
  className?: string;
};

const Address = ({ address, className }: AddressProps): JSX.Element => {
  const { ensName, isLoading } = useWalletAddress(address);

  return (
    <span
      className={clsx(
        className || "",
        "font-mono",
        isLoading ? "animate-pulse" : "",
      )}
      title={address}
      data-testid="connected-footer-secondary-text">
      {ensName || shortAddress(address)}
    </span>
  );
};

export default Address;
