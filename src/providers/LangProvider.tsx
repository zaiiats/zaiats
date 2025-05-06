import { useEffect, useState, type ReactNode } from 'react';
import { LangContext } from '../contexts/LangContext';
import { getBrowserLang } from '../scripts/language';
import i18n from '../i18n/i18n';

export const LangProvider = ({children}:{children:ReactNode}) => {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang') as Language | null;
    console.log(stored, getBrowserLang());
    
    return stored || getBrowserLang();
  });

  useEffect(() => {
    console.log(lang);
    
    i18n.changeLanguage(lang);
  }, [lang]);

  const changeLang = (l: Language) => {
    console.log(l);
    
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
