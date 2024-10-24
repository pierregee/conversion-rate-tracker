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
        <Image
          src="/puffer-fi.png" // Path to your image in the 'public' directory
          alt="Pufferfish"
          width={50} // Specify the width of the image in pixels
          height={50} // Specify the height of the image in pixels
        />
        <div className="flex justify-end">
          <NetworkDropdown />
        </div>
        <Rate />
      </QueryClientProvider>
    </Suspense>
  );
}
