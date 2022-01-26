import { useState, useEffect } from "react";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

const ConnectTypes = {
  EXTENSION: "EXTENSION",
};

export function useConnect() {
  const {
    status,
    network,
    wallets,
    // availableConnectTypes,
    // availableConnections,
    // supportFeatures,
    connect,
    disconnect,
  } = useWallet();

  const [isConnected, setIsConnected] = useState(
    status === WalletStatus.WALLET_CONNECTED
  );
  const [wallet] = wallets || [];
  const { terraAddress } = wallet || {};
  console.log({ isConnected, network, wallets });

  useEffect(() => {
    setIsConnected(status === WalletStatus.WALLET_CONNECTED);
  }, [status]);

  const connectWalletExtension = () => {
    connect(ConnectTypes.EXTENSION);
  };
  const disconnectWalletExtension = () => {
    disconnect(ConnectTypes.EXTENSION);
  };

  return [
    { isConnected, terraAddress },
    {
      connectWalletExtension,
      disconnectWalletExtension,
    },
  ];
}
