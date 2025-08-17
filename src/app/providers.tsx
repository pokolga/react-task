"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import LanguageProvider from "./lanquage-provider";
import ThemeProvider from "./theme-provider";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <ThemeProvider>
        <LanguageProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
