"use client";

import React, { PropsWithChildren } from "react";
import ProtectedRoute from "../../components/protected-route";
import Sidebar from "./sidebar";
import routes from "../routes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./header";

const Layout: React.FC<PropsWithChildren> = ({ children }) =>
  <html>
    <body className="bg-[#eceff180] overflow-y-hidden">
      <ProtectedRoute redirectLink={routes.authentication}>
        <div className="flex flex-col">
          <Header />
          <div className="flex h-screen flex-row overflow-auto mt-24">
            <Sidebar />
            <div className="xl:ml-80 w-full h-full relative">{children}<ToastContainer /></div>
          </div>
        </div>
      </ProtectedRoute>
    </body>
  </html>


export default Layout;
