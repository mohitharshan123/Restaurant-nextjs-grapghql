"use client";
import { dehydrate, useQuery } from "react-query";
import Head from "next/head";
import Link from "next/link";

import { queryClient, getRestaurants } from "utils/api";
import { redirect } from "next/navigation";
import { useCurrentUser } from "../hooks/api/useUserApi";
import useAuthenticate from "../hooks/useAuthenticate";
import routes from "../routes";
import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Sidebar from "./sidebar";

const Dashboard = () => {
  return (
    <ProtectedRoute redirectLink={routes.authentication}>
      <Sidebar />
    </ProtectedRoute>
  );
};

export default Dashboard;
