import { languageList } from "../constants/language";

export const getBrowserLang = (): Language => {
  const lang = (navigator.language || navigator.languages[0] || 'uk').slice(0,2);
  if (languageList.includes(lang as Language)) {
    return lang as Language;
  }

  return 'uk';
};
