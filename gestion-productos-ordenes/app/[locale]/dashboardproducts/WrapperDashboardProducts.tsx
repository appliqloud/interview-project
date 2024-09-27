"use client";

import React, { useEffect, useState } from "react";
import LanguageChanger from "../components/LanguageChanger";
import AdminDashboard from "./Dashboard";

const WrapperDashboardProducts = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
};

export default WrapperDashboardProducts;
