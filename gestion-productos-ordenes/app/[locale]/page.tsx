import initTranslations from "../i18n";
import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiStar } from "react-icons/fi";
import Image from "next/image";
import Logo from "../images/imgBg.webp";
import LoginComponent from "./login/LoginComponent";
import TranslationsProvider from "../components/TranslationsProvider";
import { useTranslation } from "react-i18next";
import { FormWrapper } from "./components/FormWrapper";
interface HomeProps {
  params: {
    locale: string;
  };
}

const i18nNamespaces = ["home", "common"];
export default async function Home({ params: { locale } }: HomeProps) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <FormWrapper />
    </TranslationsProvider>
  );
}

// const Form = () => {
//   const { t } = useTranslation();
//   return (
//     <motion.div
//       initial="initial"
//       whileInView="animate"
//       transition={{
//         staggerChildren: 0.05,
//       }}
//       viewport={{ once: true }}
//       className="flex items-center justify-center pb-4 pt-20 md:py-20"
//     >
//       <div className="mx-auto my-auto max-w-lg px-4 md:pr-0">
//         <motion.h1
//           variants={primaryVariants}
//           className="mb-6 text-center text-4xl font-semibold"
//         >
//           {t("headerlogin")}
//         </motion.h1>
//         <LoginComponent />
//       </div>
//     </motion.div>
//   );
// };

// const SupplementalContent = () => {
//   return (
//     <div className="group sticky top-4 m-4 h-80 overflow-hidden rounded-3xl rounded-tl-[4rem] bg-slate-950 md:h-[calc(100vh_-_2rem)]">
//       <Image
//         alt="An example image"
//         src={Logo}
//         className="h-full w-full bg-white object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
//         layout="fill"
//         objectFit="cover"
//       />

//       <div className="absolute right-2 top-4 z-10">
//         <FiArrowUpRight className="rotate-45 text-6xl text-indigo-200 opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100" />
//       </div>

//       <motion.div
//         initial="initial"
//         whileInView="animate"
//         transition={{
//           staggerChildren: 0.05,
//         }}
//         viewport={{ once: true }}
//         className="absolute inset-0 flex flex-col items-start justify-end bg-gradient-to-t from-slate-950/90 to-slate-950/0 p-8"
//       >
//         {/* <motion.h2
//           className="mb-2 text-3xl font-semibold leading-[1.25] text-white lg:text-4xl"
//           variants={primaryVariants}
//         >
//           Connecting Designers
//           <br />
//           with Opportunities
//         </motion.h2>
//         <motion.p
//           variants={primaryVariants}
//           className="mb-6 max-w-md text-sm text-slate-300"
//         >
//           Bloop is the home of makers, making amazing things, and getting paid.
//           Find your dream job with us.
//         </motion.p> */}
//       </motion.div>
//     </div>
//   );
// };

// const primaryVariants = {
//   initial: {
//     y: 25,
//     opacity: 0,
//   },
//   animate: {
//     y: 0,
//     opacity: 1,
//   },
// };
