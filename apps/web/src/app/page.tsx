"use client";
import React, { Suspense } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Rate from "@/components/Rate";
import NetworkDropdown from "@/components/NetworkDropdown";
import Image from "next/image";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Suspense fallback={<div />}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <div className="flex justify-between items-center">
          <Image
            src="/puffer-fi.png"
            alt="Pufferfish"
            width={150}
            height={250}
          />
          <NetworkDropdown />
        </div>
        <Rate />
      </QueryClientProvider>
    </Suspense>
  );
}
