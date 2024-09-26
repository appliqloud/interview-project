import initTranslations from "../i18n";

interface HomeProps {
  params: {
    locale: string;
  };
}

export default async function Home({ params: { locale } }: HomeProps) {
  const { t } = await initTranslations(locale, ["home", "common"]);
  // console.log(t("header"));

  return <></>;
}
