import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export const Option = ({
  Icon,
  title,
  selected,
  setSelected,
  open,
  isClient,
  titleBtn,
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
            {titleBtn}
          </motion.span>
        )}
    </motion.button>
  );
};
