"use client";
import React, { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Rate from "@/components/Rate";
import NetworkDropdown from "@/components/NetworkDropdown";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <NetworkDropdown />
        <Rate />
      </QueryClientProvider>
    </Suspense>
  );
}
