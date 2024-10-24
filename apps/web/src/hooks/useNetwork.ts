import { useState } from "react";
import { useSearchParams } from "next/navigation";

export const networkOptions = {
  Mainnet: "Mainnet",
  Holesky: "Holesky",
} as const;

export type NetworkOption = keyof typeof networkOptions;

export default function useNetwork() {
  const searchParams = useSearchParams();
  const [network, setNetwork] = useState<NetworkOption>(
    (searchParams.get("network") as NetworkOption) || networkOptions.Mainnet
  );

  return { network, setNetwork };
}
