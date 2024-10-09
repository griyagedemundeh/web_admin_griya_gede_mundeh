"use client";

import type { ReactNode } from "react";
import React from "react";
import { Locale } from "./dictionaries";
import { QueryClient, QueryClientProvider } from "react-query";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCentralStore } from "@/store";

const Main = ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale; className: string; t: any };
}>): ReactNode => {
  const queryClient = new QueryClient();

  const { isLoading } = useCentralStore();

  return (
    <QueryClientProvider client={queryClient}>
      <html
        lang={params.lang}
        className={`scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-white ${
          isLoading ? "overflow-hidden" : ""
        }`}
      >
        <body className={params.className}>
          <div className="relative">
            {children}
            {isLoading && (
              <div className="absolute z-50 bg-slate-300 opacity-40 top-0 bottom-0 left-0 right-0 items-center flex flex-row justify-center">
                <svg
                  className="animate-spin h-20 w-20 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            )}
          </div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </body>
      </html>
    </QueryClientProvider>
  );
};

export default Main;
