"use client";
import React, { useState, useEffect } from "react";
import { FiChevronsRight, FiDollarSign, FiFile } from "react-icons/fi";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import useTokenExpiration from "@/app/hooks/useTokenExpiration";
import { useAuthStore } from "@/app/lib/authStore";

export const SidebarWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  //Si la ruta es login, no renderizar el sidebar
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Evitar renderizar el Sidebar en el servidor
  }
  if (pathname === "/login") return null;

  return <Sidebar />;
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const { token, logout } = useAuthStore();
  useTokenExpiration(token);

  // Aseguramos que las animaciones solo se habiliten en el cliente
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Esto asegura que las animaciones se habiliten después de la carga del cliente
  }, []);

  return (
    <motion.nav
      layout={isClient} // Habilita la animación solo en el cliente
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: open ? "225px" : "fit-content",
      }}
    >
      <TitleSection open={open} />

      <div className="space-y-1">
        <Option
          Icon={FiFile}
          title="dashboardproducts"
          selected={selected}
          setSelected={setSelected}
          open={open}
          isClient={isClient} // Pasar esto a los subcomponentes
        />
        <Option
          Icon={FiDollarSign}
          title="dashboardorders"
          selected={selected}
          setSelected={setSelected}
          open={open}
          isClient={isClient} // Pasar esto a los subcomponentes
        />
        {/* Boton para logout */}
        <motion.button
          layout={isClient} // Habilita animaciones solo en el cliente
          onClick={() => {
            logout();
            window.location.href = "/login";
          }}
          className={`relative flex h-10 w-full items-center rounded-md transition-colors text-slate-500 hover:bg-slate-100`}
        >
          {open &&
            isClient && ( // Renderiza la animación solo si estamos en el cliente
              <motion.span
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="text-xs font-medium flex justify-center items-center w-full"
              >
                Logout
              </motion.span>
            )}
        </motion.button>
      </div>

      <ToggleClose open={open} setOpen={setOpen} isClient={isClient} />
    </motion.nav>
  );
};

const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  isClient,
}: any) => {
  const router = useRouter();
  return (
    <motion.button
      layout={isClient} // Habilita animaciones solo en el cliente
      onClick={() => {
        router.push(`/${title.toLowerCase()}`);
        setSelected(title);
      }}
      className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
        selected === title
          ? "bg-indigo-100 text-indigo-800"
          : "text-slate-500 hover:bg-slate-100"
      }`}
    >
      <motion.div
        layout={isClient} // Habilita animaciones solo en el cliente
        className="grid h-full w-10 place-content-center text-lg"
      >
        <Icon />
      </motion.div>
      {open &&
        isClient && ( // Renderiza la animación solo si estamos en el cliente
          <motion.span
            layout
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs font-medium"
          >
            {title}
          </motion.span>
        )}
    </motion.button>
  );
};

const TitleSection = ({ open, isClient }: any) => {
  return (
    <div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors hover:bg-slate-100">
        <div className="flex items-center gap-2">
          <Logo />
          {open && ( // Asegúrate de que esto se renderice solo en el cliente
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
            >
              <span className="block text-xs font-semibold !text-black">
                Orders App
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md bg-indigo-600"
    ></motion.div>
  );
};

const ToggleClose = ({ open, setOpen, isClient }: any) => {
  return (
    <motion.button
      layout={isClient} // Habilita animaciones solo en el cliente
      onClick={() => setOpen((pv: any) => !pv)}
      className="absolute bottom-0 left-0 right-0 border-t border-slate-300 transition-colors hover:bg-slate-100"
    >
      <div className="flex items-center p-2">
        <motion.div
          layout={isClient} // Habilita animaciones solo en el cliente
          className="grid size-10 place-content-center text-lg"
        >
          <FiChevronsRight
            className={`transition-transform ${open && "rotate-180"}`}
          />
        </motion.div>
        {open &&
          isClient && ( // Renderiza la animación solo si estamos en el cliente
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs font-medium"
            >
              Hide
            </motion.span>
          )}
      </div>
    </motion.button>
  );
};
