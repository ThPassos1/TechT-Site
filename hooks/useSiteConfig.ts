import { useMemo } from 'react';
import { useAppPreferences } from '../context/AppPreferencesContext';
import { getSiteConfig } from '../siteConfig';

export const useSiteConfig = () => {
  const { locale } = useAppPreferences();
  return useMemo(() => getSiteConfig(locale), [locale]);
};
