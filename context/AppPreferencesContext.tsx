import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'pt' | 'en';

type AppPreferencesContextValue = {
  locale: Locale;
  setLocale: (value: Locale) => void;
  toggleLocale: () => void;
};

const AppPreferencesContext = createContext<AppPreferencesContextValue | undefined>(undefined);

const LOCALE_KEY = 'techt_locale';

const getInitialLocale = (): Locale => {
  const stored = window.localStorage.getItem(LOCALE_KEY);
  return stored === 'en' ? 'en' : 'pt';
};

export const AppPreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(() => getInitialLocale());

  useEffect(() => {
    window.localStorage.setItem(LOCALE_KEY, locale);
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  const value = useMemo<AppPreferencesContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale((prev) => (prev === 'pt' ? 'en' : 'pt')),
    }),
    [locale]
  );

  return <AppPreferencesContext.Provider value={value}>{children}</AppPreferencesContext.Provider>;
};

export const useAppPreferences = (): AppPreferencesContextValue => {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error('useAppPreferences must be used inside AppPreferencesProvider');
  }
  return ctx;
};
