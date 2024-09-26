// import { SidebarWrapper } from "../Layout/SideBarWrapper";
import "./globals.css";
// import { Sidebar } from "./components/Sidebar"; // Asegúrate de la ruta correcta
import React from "react";
import { SidebarWrapper } from "./Layout/SideBarWrapper";

export const metadata = {
  title: "My App",
  description: "App con Sidebar en todas las vistas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex">
        <SidebarWrapper />
        <main className="flex-1 ">{children}</main>
      </body>
    </html>
  );
}
