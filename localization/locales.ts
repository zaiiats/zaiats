import { headers } from "next/headers";
import { DEFAULT_LANGUAGE } from "@/constants";

const dictionaries = {
  en: () => import("./locales/en.json").then((module) => module.default),
  uk: () => import("./locales/uk.json").then((module) => module.default),
};

export const getServerLanguage = async () => {
  const headersList = await headers(); 
  return headersList.get("x-language") || DEFAULT_LANGUAGE;
};

export const getDictionary = async () => {
  const lang = await getServerLanguage();
  return (
    dictionaries[lang as keyof typeof dictionaries]?.() ?? dictionaries[DEFAULT_LANGUAGE]()
  );
};