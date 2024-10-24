"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const networkOptions = {
  mainnet: "mainnet",
  holesky: "holesky",
} as const;

export type NetworkOption = keyof typeof networkOptions;

export default function useNetwork() {
  const searchParams = useSearchParams();
  const [network, setNetwork] = useState<NetworkOption>(networkOptions.mainnet);

  useEffect(() => {
    const newNetwork = searchParams.get("network")?.toLowerCase();
    if (newNetwork && newNetwork in networkOptions) {
      // Use the 'in' operator for conciseness
      setNetwork(newNetwork as NetworkOption);
    }
  }, [searchParams]);

  return { network, setNetwork };
}
