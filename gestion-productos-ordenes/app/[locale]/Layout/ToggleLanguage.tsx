import { useState } from "react";
import { motion } from "framer-motion";
import { BsFillCloudyFill, BsStarFill } from "react-icons/bs";

const ToggleWrapper = () => {
  const [mode, setMode] = useState("es");
  return <DarkModeToggle mode={mode} setMode={setMode} />;
};

const DarkModeToggle = ({ mode, setMode }: any) => {
  return (
    <button
      onClick={() => setMode(mode === "es" ? "en" : "es")}
      className={`p-2 w-28 rounded-full flex shadow-lg relative bg-gradient-to-b 
         ${
           mode === "en" ? "justify-end bg-sky-300" : "justify-start bg-sky-800"
         }`}
    >
      <Thumb mode={mode} />
    </button>
  );
};

const Thumb = ({ mode }: any) => {
  return (
    <motion.div
      layout
      transition={{
        duration: 0.75,
        type: "spring",
      }}
      className="h-8 w-8 rounded-full overflow-hidden shadow-lg relative "
    >
      <div
        className={`absolute inset-0 flex justify-center items-center text-white font-light text-sm ${
          mode === "dark" ? "bg-slate-100" : " bg-indigo-400  rounded-full"
        }`}
      >
        {mode === "es" ? "en" : "es"}
      </div>
    </motion.div>
  );
};

const SunCenter = () => (
  <div className="absolute inset-1.5 rounded-full bg-amber-300" />
);

const MoonSpots = () => (
  <>
    {/* <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="w-3 h-3 rounded-full bg-slate-300 absolute right-2.5 bottom-1"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="w-3 h-3 rounded-full bg-slate-300 absolute left-1 bottom-4"
    />
    <motion.div
      initial={{ x: -4, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="w-2 h-2 rounded-full bg-slate-300 absolute right-2 top-2"
    /> */}
  </>
);

export default ToggleWrapper;
