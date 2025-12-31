import { Project } from "../types";
import { SITE_CONFIG } from "../siteConfig";

export const fetchProjects = async (): Promise<Project[]> => {
  // Simula chamada real (UX de loading)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SITE_CONFIG.portfolio as Project[]);
    }, 500);
  });
};
