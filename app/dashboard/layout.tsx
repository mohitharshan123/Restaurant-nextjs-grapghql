import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";

import { Home, DogBowl } from "tabler-icons-react";
import { QueryClientProvider } from "react-query";

import { Metadata } from "next";
export const metadata: Metadata = { title: "Restaurant" };

export default function Layout({ children, ...pageProps }) {
  return (
    <html>
      <body>
        <div className="flex h-screen flex-row bg-[#eceff180]">
          <div className="flex flex-col">{children}</div>
        </div>
      </body>
    </html>
  );
}
