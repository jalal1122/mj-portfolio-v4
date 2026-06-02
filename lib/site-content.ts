import siteContent from "./site-content.json";

export type SiteContent = typeof siteContent;

export const content = siteContent as SiteContent;

export const site = content.site;
export const about = content.about;
export const stack = content.stack;
export const projects = content.projects;
export const caseStudies = content.caseStudies;
export const clients = content.clients;

export const techItems = content.techItems;

export function getProjectBySlug(slug: string) {
  return caseStudies.projects.find((project) => project.slug === slug);
}

export function getAllProjectSlugs() {
  return caseStudies.projects.map((project) => project.slug);
}
