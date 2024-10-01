"use client";

import type { ReactNode } from "react";
import React from "react";
import { Locale } from "./dictionaries";
import { QueryClient, QueryClientProvider } from "react-query";

const Main = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale; className: string; t: any };
}>): ReactNode => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <html
        lang={params.lang}
        className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white"
      >
        <body className={params.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
};

export default Main;
