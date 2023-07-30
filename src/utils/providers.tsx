"use client";

import React from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./api";

const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
