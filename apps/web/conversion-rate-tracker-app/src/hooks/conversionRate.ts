import { useQuery } from "@tanstack/react-query";

interface IConversionRate {
  conversionRate: string;
}

// TODO(pierregee): create dev/prod env
export default function useConversionRate() {
  return useQuery<IConversionRate>({
    queryKey: ["conversionRate"],
    queryFn: async () => {
      const response = await fetch(
        "https://regal-pudding-4cdd6f.netlify.app/.netlify/functions/index"
      );
      return await response.json();
    },
  });
}
