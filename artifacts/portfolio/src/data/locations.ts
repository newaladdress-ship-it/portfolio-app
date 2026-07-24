export type Location = {
  slug: string;
  city: string;
  province: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  highlights: { label: string; value: string }[];
  about: string;
  services: string[];
  faqs: { q: string; a: string }[];
  ctaHeading: string;
  ctaBody: string;
};

export const LOCATIONS: Location[] = [];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationsByProvince(province?: string): Location[] {
  if (!province) return LOCATIONS;
  return LOCATIONS.filter((l) => l.province.toLowerCase() === province.toLowerCase());
}
