"use client";

import routes from "../routes";
import React, { PropsWithChildren } from "react";
import Sidebar from "./sidebar";
import Actions from "./actions";

const Dashboard: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative h-full w-full">
      <p>Dashboard</p>
      <Actions />
    </div>
  );
};

export default Dashboard;
