import React from "react";
import TranslationsProvider from "@/app/components/TranslationsProvider";
import initTranslations from "@/app/i18n";
import WrapperDashboardProducts from "./WrapperDashboardProducts";
// import { Sidebar } from "../Layout/SideBarWrapper";
interface HomeProps {
  params: {
    locale: string;
  };
}

const i18nNamespaces = ["home", "common"];
const page = async ({ params: { locale } }: HomeProps) => {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      locale={locale}
      resources={resources}
      namespaces={i18nNamespaces}
    >
      <WrapperDashboardProducts />
    </TranslationsProvider>
  );
};

export default page;
