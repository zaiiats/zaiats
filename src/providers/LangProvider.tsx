import { useState, type ReactNode } from 'react';
import { LangContext } from '../contexts/LangContext';

export const LangProvider = ({children}:{children:ReactNode}) => {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang') as Language | null;
    if (stored) return stored;

    return 'uk';
  });

  const changeLang = (l: Language) => {
    if (lang === l) return;
    setLang(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
};
