import { useQuery } from "@tanstack/react-query";

interface IConversionRate {
  conversionRate: string;
}

export default function useConversionRate() {
  return useQuery<IConversionRate>({
    queryKey: ["conversionRate"],
    queryFn: async () => {
      const response = await fetch(
        "https://puffer-vault-rate-api.netlify.app/.netlify/functions/index"
      );
      return await response.json();
    },
  });
}
