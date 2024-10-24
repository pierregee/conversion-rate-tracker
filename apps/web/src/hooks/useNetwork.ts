import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const networkOptions = {
  mainnet: "mainnet",
  holesky: "holesky",
} as const;

export type NetworkOption = keyof typeof networkOptions;

export default function useNetwork() {
  const searchParams = useSearchParams();

  const [network, setNetwork] = useState<NetworkOption>(
    (searchParams.get("network") as NetworkOption) || "mainnet"
  );

  useEffect(() => {
    const newNetwork = searchParams.get("network") as NetworkOption;
    if (newNetwork) {
      setNetwork(newNetwork);
    }
  }, [searchParams]);

  return { network, setNetwork };
}
