"use client";
import React, { useEffect, useState } from "react";
import AdminDashboard from "./Dashboard";
// import AdminDashboard from "./Dashboard";
// import { Sidebar } from "../Layout/SideBarWrapper";

const page = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Evitar renderizar el Sidebar en el servidor
  }
  return <AdminDashboard />;
};

export default page;
