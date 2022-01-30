import { useState, useEffect } from "react";
import {
  useWallet,
  useConnectedWallet,
  WalletStatus,
  SignBytesFailed,
  Timeout,
  UserDenied,
} from "@terra-money/wallet-provider";
import { useAuth } from "app/hooks";

export const getErrorMessage = (error) => {
  if (error instanceof UserDenied) {
    return "User Denied";
  } else if (error instanceof Timeout) {
    return "Timeout";
  } else if (error instanceof SignBytesFailed) {
    return "Sign Bytes Failed";
  } else {
    return (
      "Unknown Error: " +
      (error instanceof Error ? error.message : String(error))
    );
  }
};

export function useConnect() {
  const { status, availableConnections, connect, disconnect } = useWallet();
  const [, { setAccessToken }] = useAuth();
  const connectedWallet = useConnectedWallet();
  const { terraAddress = null } = connectedWallet || {};
  const [isConnected, setIsConnected] = useState(
    status === WalletStatus.WALLET_CONNECTED
  );

  const [isInitializing, setIsInitializing] = useState(
    status === WalletStatus.INITIALIZING
  );

  useEffect(() => {
    setIsConnected(status === WalletStatus.WALLET_CONNECTED);
    setIsInitializing(status === WalletStatus.INITIALIZING);
  }, [status]);
  console.log({ connectedWallet });

  const disconnectWallet = () => {
    setAccessToken("");
    disconnect();
  };

  return [
    {
      isConnected,
      isInitializing,
      availableConnections,
      connectedWallet,
      terraAddress,
    },
    {
      connect,
      disconnectWallet,
    },
  ];
}
