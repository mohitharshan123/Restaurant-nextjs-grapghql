"use client";

import React, { PropsWithChildren } from "react";

import ProtectedRoute from "../../components/protected-route";

import Sidebar from "./sidebar";
import routes from "../routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <html>
    <body>
      <ProtectedRoute redirectLink={routes.authentication}>
        <div className="flex h-screen flex-row bg-[#eceff180] overflow-auto">
          <Sidebar />
          <div className="xl:ml-80 w-full h-full relative p-5">{children}<ToastContainer /></div>
        </div>
      </ProtectedRoute>
    </body>
  </html>
);

export default Layout;
