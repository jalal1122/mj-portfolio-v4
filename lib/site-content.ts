import siteContent from "./site-content.json";

export type SiteContent = typeof siteContent;

export const content = siteContent as SiteContent;

export const site = content.site;
export const about = content.about;
export const stack = content.stack;
export const caseStudies = content.caseStudies;
export const clients = content.clients;
export const techItems = content.techItems;

// Single source of truth: all project data comes from caseStudies
export const projectCards = caseStudies.projects;

export function getProjectBySlug(slug: string) {
  return caseStudies.projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return caseStudies.projects.map((project) => project.slug);
}
