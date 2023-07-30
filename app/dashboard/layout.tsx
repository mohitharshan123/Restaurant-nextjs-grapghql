"use client";

import React, { PropsWithChildren } from "react";

import ProtectedRoute from "../../components/ProtectedRoute";

import Sidebar from "./sidebar";
import routes from "../routes";

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <html>
    <body>
      <ProtectedRoute redirectLink={routes.authentication}>
        <div className="flex h-screen flex-row bg-[#eceff180]">
          <Sidebar />
          <div className="xl:ml-80 w-full h-full relative p-5">{children}</div>
        </div>
      </ProtectedRoute>
    </body>
  </html>
);

export default Layout;
