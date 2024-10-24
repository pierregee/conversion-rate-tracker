import { useQuery } from "@tanstack/react-query";
import useNetwork from "./useNetwork";

interface IConversionRate {
  conversionRate: string;
}

export default function useConversionRate() {
  const { network } = useNetwork();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; // Access the env variable

  return useQuery<IConversionRate>({
    queryKey: [
      "conv router.push(`${pathname}?network=${networkOptions[option]}`);ersionRate",
      network,
    ],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}?network=${network}`);
      return await response.json();
    },
  });
}
