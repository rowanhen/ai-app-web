import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";

import { ModalProvider } from "@components-lib/page/ModalContext";
import { queryClient } from "@config/queryClient";

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
