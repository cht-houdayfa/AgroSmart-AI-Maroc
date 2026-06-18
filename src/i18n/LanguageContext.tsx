import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { translations, darijaVariations, type LanguageCode, type Translations, type DarijaDialect } from './translations';

interface LanguageContextType {
  language: LanguageCode;
  dialect: DarijaDialect | null;
  setLanguage: (lang: LanguageCode) => void;
  setDialect: (dialect: DarijaDialect | null) => void;
  t: Translations;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'darija',
  dialect: null,
  setLanguage: () => {},
  setDialect: () => {},
  t: translations.darija,
  isRTL: true,
  dir: 'rtl',
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('darija');
  const [dialect, setDialectState] = useState<DarijaDialect | null>(null);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    if (lang !== 'darija') {
      setDialectState(null);
    }
  }, []);

  const setDialect = useCallback((d: DarijaDialect | null) => {
    setDialectState(d);
  }, []);

  const isRTL = language === 'darija' || language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const getTranslations = useCallback((): Translations => {
    const baseTranslations = translations[language];

    if (language === 'darija' && dialect && darijaVariations[dialect]) {
      const variation = darijaVariations[dialect];
      return {
        common: { ...baseTranslations.common, ...variation.common },
        auth: { ...baseTranslations.auth, ...variation.auth },
        farmer: { ...baseTranslations.farmer, ...variation.farmer },
        technician: { ...baseTranslations.technician, ...variation.technician },
        admin: { ...baseTranslations.admin, ...variation.admin },
        languages: { ...baseTranslations.languages, ...variation.languages },
      };
    }

    return baseTranslations;
  }, [language, dialect]);

  return (
    <LanguageContext.Provider value={{
      language,
      dialect,
      setLanguage,
      setDialect,
      t: getTranslations(),
      isRTL,
      dir,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export const languageFlags: Record<LanguageCode, string> = {
  darija: '🇲🇦',
  ar: '🇸🇦',
  fr: '🇫🇷',
  en: '🇬🇧',
};

export const languageNames: Record<LanguageCode, string> = {
  darija: 'الدارجة',
  ar: 'العربية',
  fr: 'Français',
  en: 'English',
};

export const dialectNames: Record<DarijaDialect, string> = {
  sous: 'دارجة سوس',
  Atlas: 'دارجة الأطلس',
  chaouia: 'دارجة الشاوية',
  doukkala: 'دارجة دكالة',
  rifi: 'دارجة الريف',
  haouz: 'دارجة الحوز',
};
