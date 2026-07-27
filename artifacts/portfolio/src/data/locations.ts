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

export const LOCATIONS: Location[] = [
  {
    slug: "multan",
    city: "Multan",
    province: "Punjab",
    metaTitle: "Expert Web Developer in Multan | Custom Sites & SEO",
    metaDescription:
      "Imran Digitals is a web developer in Multan building fast business websites, React applications, and technical SEO foundations for local and remote clients.",
    h1: "Web Developer in Multan for Websites, Web Apps and SEO",
    intro:
      "Based in Multan, I help businesses and growing teams launch fast, accessible websites and custom web applications with clear communication from discovery to launch.",
    highlights: [
      { label: "Based in", value: "Multan, Punjab" },
      { label: "Work style", value: "Local and remote" },
      { label: "Typical reply", value: "Within 24 hours" },
      { label: "Core stack", value: "React and Node.js" },
    ],
    about:
      "Imran Digitals works directly with businesses in Multan that need more than a template site. Based near Pracha Street and Chowk B.C.G., I serve clients across Gulzaib Colony, Bosan Road, and the wider Multan area. Every project starts with the business goal, then pairs a responsive interface with dependable engineering, technical SEO, and a practical launch plan. Remote collaboration is also available across Pakistan and internationally.",
    services: [
      "Business website development and redesigns in Multan",
      "Custom React, Next.js, and MERN stack applications",
      "Technical SEO and website speed optimization",
      "Local SEO Expert services for Multan businesses",
      "Dashboard, API, and third-party integration work",
      "Website maintenance and ongoing improvements",
    ],
    faqs: [
      {
        q: "Do you work with businesses in Multan?",
        a: "Yes. I am based in Multan and work directly with local businesses as well as remote clients across Pakistan and worldwide.",
      },
      {
        q: "What kinds of websites do you build?",
        a: "I build business websites, landing pages, custom web applications, dashboards, and SEO-focused rebuilds using a modern React and Node.js stack.",
      },
      {
        q: "Can you improve an existing website?",
        a: "Yes. I can audit slow or outdated websites, improve performance and accessibility, resolve technical SEO issues, and add the features your business needs.",
      },
    ],
    ctaHeading: "Need a web developer in Multan?",
    ctaBody:
      "Share your goal, current website, and timeline. I will respond with practical next steps and a clear scope for your project.",
  },
];

export function getLocationBySlug(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function getLocationsByProvince(province?: string): Location[] {
  if (!province) return LOCATIONS;
  return LOCATIONS.filter((l) => l.province.toLowerCase() === province.toLowerCase());
}
