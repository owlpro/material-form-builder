import { createContext, ReactNode, useContext, useState } from "react";

type Lang = "en" | "fa";

interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  isRtl: boolean;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  setLang: () => {},
  isRtl: false,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang, isRtl: lang === "fa" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
