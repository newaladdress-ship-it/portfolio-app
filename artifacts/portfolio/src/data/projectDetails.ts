export interface ProjectDetail {
  id: number;
  longDescription: string;
  features: string[];
  role: string;
  duration: string;
  challenges: string;
}

export const PROJECT_DETAILS: Record<number, ProjectDetail> = {
  1: {
    id: 1,
    role: "Full Stack Developer",
    duration: "4 weeks",
    longDescription:
      "This professional dental clinic website was built to help a local dental practice establish a strong online presence. The platform allows patients to learn about services, read about the dental team, and book appointments online without calling the clinic. The backend handles appointment scheduling with email notifications, while the admin panel lets clinic staff manage bookings and patient inquiries. The design follows medical industry standards — clean, trustworthy, and accessible.",
    features: [
      "Online appointment booking system with email confirmations",
      "Service showcase with detailed treatment descriptions",
      "Responsive design optimized for mobile patients",
      "Admin dashboard for managing bookings and inquiries",
      "Patient testimonials and before/after gallery",
      "Google Maps integration for clinic location",
    ],
    challenges:
      "Designing a system that was both easy for clinic staff to manage and simple enough for elderly patients to navigate required multiple rounds of UX testing and iteration.",
  },
  2: {
    id: 2,
    role: "Full Stack Developer",
    duration: "6 weeks",
    longDescription:
      "BlogTech is a modern, full-featured blogging platform designed for tech writers and developers. Users can sign up, publish articles, add cover images, and reach a growing reader community. The platform features a rich text editor, tag-based discovery, and a clean reading experience inspired by Medium. The backend is powered by Next.js API routes and PostgreSQL, with Prisma as the ORM ensuring type-safe database queries. Authentication is handled securely with session-based login.",
    features: [
      "Rich text editor with markdown and image upload support",
      "Tag-based content discovery and search",
      "User authentication with secure session management",
      "Author profiles with bio and social links",
      "Comment system with moderation controls",
      "SEO-optimized article pages with Open Graph metadata",
    ],
    challenges:
      "Building a performant rich text editor that worked consistently across browsers while also being optimized for SEO was the main technical challenge of this project.",
  },
  3: {
    id: 3,
    role: "Full Stack Developer",
    duration: "5 weeks",
    longDescription:
      "ToolSpark Store is a full e-commerce platform built specifically for selling digital tools and software products. Customers can browse a categorized catalog, add items to cart, and complete purchases via Stripe. The platform includes a fully functional admin dashboard where store owners can manage products, view orders, track revenue, and issue refunds. Firebase powers real-time inventory updates and order tracking, ensuring the store is always up to date.",
    features: [
      "Full shopping cart and checkout flow with Stripe payments",
      "Admin dashboard for product and order management",
      "Real-time inventory tracking via Firebase",
      "Product search, filtering, and category browsing",
      "Order history and receipt emails for customers",
      "Mobile-first responsive storefront design",
    ],
    challenges:
      "Integrating Stripe webhooks reliably while keeping the UI in sync with real-time Firebase updates required careful state management and event ordering logic.",
  },
  4: {
    id: 4,
    role: "Frontend Developer",
    duration: "3 weeks",
    longDescription:
      "Cidefine is a modern frontend web application built with Vue.js and TypeScript, showcasing advanced UI component architecture. The project demonstrates clean separation of concerns, reusable component design, and scalable state management patterns. It features a polished interface with smooth animations, dark/light mode support, and a fully responsive layout. Webpack was configured from scratch with custom optimization rules for optimal bundle performance.",
    features: [
      "Component-driven architecture with Vue 3 Composition API",
      "Full TypeScript integration for type-safe development",
      "Dark and light mode with smooth transitions",
      "Custom Sass design system with variables and mixins",
      "Webpack configuration optimized for production builds",
      "Animated UI transitions with CSS and Vue transitions",
    ],
    challenges:
      "Setting up a clean TypeScript and Vue 3 integration with Webpack from scratch without using the Vue CLI scaffold required deep configuration work and careful module resolution.",
  },
  5: {
    id: 5,
    role: "Frontend Developer",
    duration: "2 weeks",
    longDescription:
      "Karamed is a corporate website built for a professional services company needing a strong digital presence. The website showcases the company's services, team members, and contact information in a clean and professional layout. It was built with pure HTML5, CSS3, and vanilla JavaScript to ensure maximum compatibility, fast loading times, and easy maintainability. Bootstrap was used for responsive grid layout and pre-built components, allowing rapid delivery without sacrificing quality.",
    features: [
      "Responsive multi-page corporate website",
      "Services section with detailed descriptions and icons",
      "Team member profiles with role and contact info",
      "Working contact form with client-side validation",
      "Smooth scroll navigation and animated sections",
      "Cross-browser compatible and optimized for performance",
    ],
    challenges:
      "Achieving a pixel-perfect design that worked consistently across all major browsers and devices using only vanilla technologies required careful CSS testing and fallback handling.",
  },
  6: {
    id: 6,
    role: "Frontend Developer",
    duration: "2 weeks",
    longDescription:
      "This product landing page was designed and built to maximize conversions for a digital product. Every section — from the hero to the pricing table — was crafted with conversion rate optimization principles in mind. The page features smooth scroll-triggered animations using GSAP and Framer Motion, a clear value proposition section, social proof, and a strong call-to-action. It was built with React and Tailwind CSS for rapid development and pixel-perfect responsive design.",
    features: [
      "Hero section with animated headline and CTA buttons",
      "Scroll-triggered GSAP animations for engaging experience",
      "Feature highlights with icon cards and descriptions",
      "Pricing section with highlighted recommended plan",
      "Testimonials carousel with auto-play",
      "Fully responsive across all screen sizes",
    ],
    challenges:
      "Coordinating GSAP animations with Framer Motion's React-based animations without conflicts or jank required careful sequencing and performance profiling.",
  },
  7: {
    id: 7,
    role: "Full Stack Developer",
    duration: "5 weeks",
    longDescription:
      "Mart Manager is a comprehensive inventory management system built for small to medium retail businesses. It replaces manual spreadsheets with a real-time digital system that tracks stock levels, records sales, generates reports, and alerts staff when items run low. The system runs on a React frontend communicating with a Node.js/Express REST API backed by MySQL. Role-based access control allows owners and staff to have different levels of access to the system.",
    features: [
      "Real-time inventory tracking with low-stock alerts",
      "Sales recording with daily, weekly, and monthly reports",
      "Role-based access: admin, manager, and staff roles",
      "Product categorization and barcode search",
      "Export reports to CSV/PDF for accounting",
      "Supplier management with order history",
    ],
    challenges:
      "Designing a database schema flexible enough to handle various product types, unit measurements, and supplier relationships while remaining performant for large product catalogs was a key challenge.",
  },
  8: {
    id: 8,
    role: "Full Stack Developer",
    duration: "7 weeks",
    longDescription:
      "Listing Sites Generator is a SaaS tool that lets businesses create professional listing websites in minutes without coding. Users select a template, input their business data, and the system generates a fully functional, SEO-optimized listing website. The platform is powered by Next.js with server-side rendering for fast page loads, Prisma and PostgreSQL for data management, and TypeScript throughout for reliability. It currently powers the live site pakbizbranhces.online.",
    features: [
      "Template-based website generation in minutes",
      "SEO-optimized pages with meta tags and sitemaps",
      "Custom domain support for generated sites",
      "Content management dashboard for site owners",
      "Business directory with search and filter capabilities",
      "Mobile-responsive templates out of the box",
    ],
    challenges:
      "Generating dynamic, SEO-optimized pages for hundreds of businesses while keeping server response times low required careful use of Next.js ISR (Incremental Static Regeneration) and caching strategies.",
  },
  9: {
    id: 9,
    role: "Frontend Developer",
    duration: "2 weeks",
    longDescription:
      "Frontend Task Manager is a productivity application that helps individuals and small teams manage their tasks efficiently. It features a drag-and-drop kanban board, task filtering by priority and status, and a clean card-based UI. Built with React and the Context API for lightweight state management, it demonstrates strong fundamentals in component design, custom hooks, and accessible keyboard navigation. React DnD powers the intuitive drag-and-drop interactions.",
    features: [
      "Drag-and-drop kanban board with multiple columns",
      "Task creation with title, description, priority, and due date",
      "Filter tasks by status, priority, and assignee",
      "Keyboard-accessible drag-and-drop for accessibility",
      "Persistent state using localStorage",
      "Responsive layout for mobile task management",
    ],
    challenges:
      "Making the drag-and-drop experience accessible via keyboard while maintaining smooth visual feedback was technically demanding and required custom keyboard event handling alongside React DnD.",
  },
  10: {
    id: 10,
    role: "Frontend Developer",
    duration: "2 weeks",
    longDescription:
      "This professional bathroom remodeling service website was built for a contractor in Chandler, Arizona. The site showcases the company's remodeling services, past projects, and customer testimonials to help convert local visitors into leads. Built with semantic HTML, modern CSS, and vanilla JavaScript, the site is fast, accessible, and ranks well in local search results. A prominent contact form and click-to-call button make it easy for potential customers to get in touch.",
    features: [
      "Service showcase with detailed remodeling packages",
      "Photo gallery of completed bathroom projects",
      "Customer testimonials with star ratings",
      "Click-to-call button for mobile visitors",
      "Contact form with validation for lead generation",
      "Local SEO optimization for Chandler, AZ searches",
    ],
    challenges:
      "Optimizing the site for local SEO while keeping page load times under 2 seconds on mobile required careful image compression and structured data implementation.",
  },
  12: {
    id: 12,
    role: "Full Stack Developer",
    duration: "4 weeks",
    longDescription:
      "This personal portfolio website is a fully responsive, high-performance web application built to showcase Muhammad Imran's skills, projects, achievements, and professional experience. The site features a dark/light theme toggle, multi-language support (English, French, Japanese), a real-time chat room, an AI-powered SmartTalk assistant, a GitHub dashboard with live stats, a certificate viewer, and a feedback/review system. Every section is carefully crafted for performance, accessibility, and user experience — reflecting both technical depth and attention to design detail.",
    features: [
      "Multi-language support with instant switching (English, French, Japanese)",
      "Dark and light theme toggle with persistent preference",
      "Real-time chat room powered by Firebase",
      "AI-powered SmartTalk assistant for portfolio Q&A",
      "Live GitHub dashboard with repository and activity stats",
      "Certificate viewer with search and category filtering",
      "Feedback and review system with Google & GitHub sign-in",
      "Animated Skills & Tools marquee showcasing the full tech stack",
      "Fully responsive design optimized for mobile and desktop",
      "WhatsApp floating contact button for instant communication",
    ],
    challenges:
      "Integrating multiple real-time features — live chat, GitHub stats, and AI responses — while keeping the site fast and the codebase maintainable required careful separation of concerns, lazy loading, and thoughtful state management across the entire application.",
  },
  11: {
    id: 11,
    role: "Full Stack Developer",
    duration: "3 weeks",
    longDescription:
      "GeoTags Editor is a powerful, fully client-side GPS photo editing tool that lets users remove geotags, add precise GPS coordinates, and inspect complete EXIF metadata — all for free, with no login required. The tool processes JPEG images directly in the browser, meaning no photos are ever uploaded to a server, ensuring complete user privacy. An interactive OpenStreetMap integration allows users to simply click a location on the map to set latitude and longitude, making the workflow intuitive for non-technical users. Since launch, the platform has processed over 10 million photos and attracted more than 1 million users across 195+ countries.",
    features: [
      "Remove GPS geotag from photos with a single click — no account needed",
      "Add precise GPS coordinates manually or by clicking on an interactive map",
      "Full EXIF metadata viewer showing camera info, date, and location data",
      "Batch processing — edit up to 3 photos simultaneously",
      "100% client-side processing — photos never leave the user's device",
      "Mobile-friendly design that works on Android, iPhone, and desktop",
    ],
    challenges:
      "The biggest challenge was manipulating EXIF binary data reliably across different JPEG variants while preserving image quality and all non-GPS metadata. Ensuring cross-browser compatibility for file reading, EXIF parsing, and blob download required extensive testing across Chrome, Safari, and Firefox on both mobile and desktop.",
  },
};
