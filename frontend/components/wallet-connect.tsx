"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  connected: boolean;
  setConnected: (connected: boolean) => void;
}

export function WalletConnect({ connected, setConnected }: WalletConnectProps) {
  return (
    <Button
      onClick={() => setConnected(!connected)}
      variant={connected ? "outline" : "default"}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {connected ? "0x1234...5678" : "Connect Wallet"}
    </Button>
  );
}