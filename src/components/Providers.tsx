"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

import { queryClient } from "~/app/config/queryClient";
import { ModalProvider } from "~/component-lib/components/page/ModalContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
};

export default Providers;
