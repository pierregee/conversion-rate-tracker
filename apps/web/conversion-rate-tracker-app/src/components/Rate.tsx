import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function Rate() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "https://regal-pudding-4cdd6f.netlify.app/.netlify/functions/index"
      );
      return await response.json();
    },
  });
  console.log({ isPending, error, data, isFetching });

  return <div>Rate.tsx</div>;
}
