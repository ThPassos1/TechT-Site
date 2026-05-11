import { Project } from "../types";
import { getSiteConfig } from "../siteConfig";
import type { Locale } from "../context/AppPreferencesContext";

export const fetchProjects = async (locale: Locale): Promise<Project[]> => {
  // Simula chamada real (UX de loading)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getSiteConfig(locale).portfolio as Project[]);
    }, 500);
  });
};
