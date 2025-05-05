import { createContext } from 'react';

interface LangContextType {
  lang: Language;
  changeLang: (l: Language) => void;
}

export const LangContext = createContext<LangContextType | null>(null);
