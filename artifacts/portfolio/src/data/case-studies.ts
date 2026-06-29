export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    improvement: string;
    impact: string;
  }[];
  technologies: string[];
  timeline: {
    phase: string;
    duration: string;
    deliverables: string[];
  }[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
  };
  images: {
    before: string;
    after: string;
  };
  caseStudyUrl?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "ecommerce-platform-redesign",
    title: "E-Commerce Platform: 300% Checkout Speed, 45% Conversion Increase",
    client: "StyleHub Fashion Store",
    industry: "E-Commerce / Fashion",
    challenge: `StyleHub operated an outdated e-commerce platform with major performance issues:
- Checkout page took 8+ seconds to load
- Cart abandonment rate: 73% (industry average: 70%)
- Monthly revenue: $150,000
- Customer complaints about slow checkout process
- Losing sales to competitors with faster platforms`,
    solution: `We completely redesigned and rebuilt their e-commerce platform with modern technologies:

1. Frontend Optimization (Next.js 14)
   - Server-side rendering for product pages
   - Code splitting by route
   - Image optimization with WebP/AVIF
   - Lazy loading for below-fold content
   - Result: LCP from 5.2s to 1.8s

2. Backend Modernization (Node.js + PostgreSQL)
   - Moved from legacy PHP monolith to microservices
   - Implemented Redis caching for frequently accessed data
   - Optimized database queries with proper indexing
   - Result: API response time from 3s to 200ms

3. Payment Integration
   - Integrated Stripe for PCI compliance
   - One-click checkout with saved cards
   - Real-time inventory sync
   - Abandoned cart recovery emails

4. Mobile Optimization
   - Responsive design for all devices
   - Mobile-optimized checkout (4 steps vs 12 before)
   - One-click Google/Apple Pay integration`,
    results: [
      {
        metric: "Checkout Speed",
        improvement: "8.2s → 2.4s",
        impact: "71% faster checkout process"
      },
      {
        metric: "Cart Abandonment",
        improvement: "73% → 40%",
        impact: "33% reduction in abandoned carts"
      },
      {
        metric: "Conversion Rate",
        improvement: "2.1% → 3.05%",
        impact: "45% increase in conversions"
      },
      {
        metric: "Monthly Revenue",
        improvement: "$150K → $217.5K",
        impact: "+$67,500 monthly revenue increase"
      },
      {
        metric: "Average Order Value",
        improvement: "$45 → $58",
        impact: "29% increase in AOV"
      },
      {
        metric: "Mobile Conversions",
        improvement: "1.2% → 2.8%",
        impact: "133% increase in mobile sales"
      },
      {
        metric: "Lighthouse Score",
        improvement: "41 → 92",
        impact: "125% performance improvement"
      },
      {
        metric: "Customer Support Tickets",
        improvement: "-85%",
        impact: "Fewer complaints about performance"
      }
    ],
    technologies: ["Next.js 14", "React 18", "Node.js", "Express", "PostgreSQL", "Redis", "Stripe API", "Tailwind CSS", "Docker", "AWS"],
    timeline: [
      {
        phase: "Phase 1: Discovery & Design",
        duration: "2 weeks",
        deliverables: ["Requirements analysis", "Wireframes", "Design mockups", "Technical architecture"]
      },
      {
        phase: "Phase 2: Frontend Development",
        duration: "4 weeks",
        deliverables: ["Product catalog", "Shopping cart", "Checkout flow", "User accounts", "Responsive design"]
      },
      {
        phase: "Phase 3: Backend & Integration",
        duration: "3 weeks",
        deliverables: ["API development", "Database design", "Payment integration", "Inventory sync", "Admin dashboard"]
      },
      {
        phase: "Phase 4: Testing & Optimization",
        duration: "2 weeks",
        deliverables: ["Performance testing", "Security audit", "Load testing", "Mobile optimization", "SEO setup"]
      },
      {
        phase: "Phase 5: Deployment & Support",
        duration: "1 week",
        deliverables: ["Production deployment", "Monitoring setup", "Staff training", "Ongoing support"]
      }
    ],
    testimonial: {
      quote: "The new platform transformed our business. Not only did we see a 45% increase in conversions, but our team is much happier managing it. The support from Muhammad and his team has been exceptional. Best investment we've made.",
      author: "Fatima Khan",
      title: "CEO, StyleHub Fashion Store"
    },
    images: {
      before: "/case-studies/ecommerce-before.jpg",
      after: "/case-studies/ecommerce-after.jpg"
    }
  },
  {
    slug: "saas-dashboard-real-time",
    title: "SaaS Analytics Dashboard: 99.9% Uptime, Real-Time Data Sync",
    client: "DataFlow Analytics",
    industry: "SaaS / Analytics",
    challenge: `DataFlow's analytics dashboard struggled with reliability and performance:
- Uptime: 94.2% (users lost access to data regularly)
- Data refresh: 30-60 minute delays
- Scaling issues during peak hours
- Customers switching to competitors
- Monthly churn rate: 12%`,
    solution: `We rebuilt their dashboard with enterprise-grade architecture:

1. Real-Time Data Sync (WebSockets)
   - Implemented WebSocket connections for live updates
   - Server-side events for push notifications
   - Real-time collaboration features
   - Result: Data latency from 45 minutes to <1 second

2. High Availability Setup
   - Multi-region deployment (AWS)
   - Load balancing across servers
   - Auto-scaling based on traffic
   - Automated failover
   - Result: 94.2% → 99.98% uptime

3. Database Optimization
   - Migrated from single database to replicated cluster
   - Implemented read replicas for analytics queries
   - Sharding strategy for scaling
   - Result: Query time from 5s to 200ms

4. Frontend Architecture (React)
   - Real-time state management with TanStack Query
   - Optimistic updates for instant feedback
   - Offline support with service workers
   - Dark mode for extended use`,
    results: [
      {
        metric: "Uptime",
        improvement: "94.2% → 99.98%",
        impact: "99.98% service reliability"
      },
      {
        metric: "Data Freshness",
        improvement: "45 minutes → <1 second",
        impact: "Real-time analytics insights"
      },
      {
        metric: "Query Performance",
        improvement: "5s → 200ms",
        impact: "25x faster dashboard loads"
      },
      {
        metric: "Monthly Churn",
        improvement: "12% → 2%",
        impact: "83% reduction in customer churn"
      },
      {
        metric: "New Customer Acquisitions",
        improvement: "+40%",
        impact: "Better market position"
      },
      {
        metric: "Annual Recurring Revenue",
        improvement: "$800K → $1.2M",
        impact: "+$400K additional ARR"
      },
      {
        metric: "Support Tickets",
        improvement: "-78%",
        impact: "Fewer reliability issues"
      },
      {
        metric: "Customer Satisfaction (NPS)",
        improvement: "32 → 68",
        impact: "From passable to promoter level"
      }
    ],
    technologies: ["React 18", "TypeScript", "WebSockets", "Node.js", "PostgreSQL", "Redis", "AWS", "Kubernetes", "TanStack Query", "D3.js"],
    timeline: [
      {
        phase: "Phase 1: Architecture Design",
        duration: "1.5 weeks",
        deliverables: ["High-level design", "Database schema", "Infrastructure setup", "Security planning"]
      },
      {
        phase: "Phase 2: Core Development",
        duration: "5 weeks",
        deliverables: ["Real-time API", "Dashboard UI", "Data pipeline", "Authentication"]
      },
      {
        phase: "Phase 3: Integration & Scale",
        duration: "2 weeks",
        deliverables: ["Third-party integrations", "Performance tuning", "Load testing"]
      },
      {
        phase: "Phase 4: Deployment",
        duration: "1 week",
        deliverables: ["Multi-region setup", "Monitoring", "Documentation"]
      }
    ],
    testimonial: {
      quote: "Muhammad's team didn't just build a dashboard-they built the infrastructure for our scaling phase. The 99.98% uptime and real-time updates have been game-changers. Our customers love the reliability.",
      author: "Amir Patel",
      title: "Founder & CEO, DataFlow Analytics"
    },
    images: {
      before: "/case-studies/saas-before.jpg",
      after: "/case-studies/saas-after.jpg"
    }
  },
  {
    slug: "local-business-seo-rankings",
    title: "Local Business Websites: #1 Rankings in 90 Days, 5x Traffic Increase",
    client: "Pakistan Local Business Network (3 clients)",
    industry: "Local Services / SEO",
    challenge: `Three local businesses competed in crowded markets with minimal online visibility:
   
Client 1 - Dental Practice:
- No website online presence
- 5-10 leads per month
- Competitors ranking above them

Client 2 - Fitness Center:
- Outdated website from 2015
- Rarely appeared in local search
- 2-3 member inquiries per month

Client 3 - Plumbing Service:
- Lost Google ranking after algorithm update
- Emergency calls only from old customers
- No online reputation`,
    solution: `We implemented comprehensive local SEO strategy for each client:

1. Website Modernization
   - Built responsive, fast websites (90+ Lighthouse)
   - Local SEO optimization (schema markup, local keywords)
   - Google Business Profile optimization
   - Citation building across 50+ directories

2. Content Strategy
   - Service pages targeting local keywords
   - Location-specific landing pages
   - Blog content answering patient/customer questions
   - Video content (testimonials, service demos)

3. Review Generation
   - Automated review request system
   - Trained staff to ask for reviews
   - Response system for all reviews
   - Result: Each averaged 4.8+ star ratings

4. Local Link Building
   - Community partnerships
   - Local directory submissions
   - Citation cleanup and consistency
   - Local media mentions`,
    results: [
      {
        metric: "Google Ranking (#1 Position)",
        improvement: "Not ranked → #1",
        impact: "Top position for primary keywords"
      },
      {
        metric: "Organic Monthly Traffic",
        improvement: "0 → 500+ visits",
        impact: "5x-10x traffic increase"
      },
      {
        metric: "Monthly Leads",
        improvement: "5-10 → 30-50",
        impact: "400% increase in qualified leads"
      },
      {
        metric: "Average Review Rating",
        improvement: "2.1 → 4.8 stars",
        impact: "Increased customer trust"
      },
      {
        metric: "Google Business Profile Visibility",
        improvement: "Not listed → #1 local",
        impact: "Dominating local search results"
      },
      {
        metric: "Annual Revenue Impact",
        improvement: "+$60K-150K",
        impact: "Significant revenue growth"
      },
      {
        metric: "Customer Acquisition Cost",
        improvement: "-70%",
        impact: "More efficient marketing"
      },
      {
        metric: "Customer Retention",
        improvement: "+45%",
        impact: "Strong reputation attracts loyal customers"
      }
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "PostgreSQL", "Node.js", "Schema Markup", "Google APIs", "Local SEO Tools"],
    timeline: [
      {
        phase: "Phase 1: Audit & Strategy",
        duration: "1 week",
        deliverables: ["Competitive analysis", "Keyword research", "Technical audit", "Action plan"]
      },
      {
        phase: "Phase 2: Website Development",
        duration: "2 weeks",
        deliverables: ["Responsive websites", "Local optimization", "Schema markup", "Review system"]
      },
      {
        phase: "Phase 3: SEO Implementation",
        duration: "2 weeks",
        deliverables: ["Content creation", "Link building", "GBP optimization", "Citation setup"]
      },
      {
        phase: "Phase 4: Review Generation",
        duration: "4 weeks",
        deliverables: ["Review process setup", "Staff training", "First 20+ reviews", "Reputation monitoring"]
      },
      {
        phase: "Phase 5: Ongoing Optimization",
        duration: "8 weeks",
        deliverables: ["Ranking tracking", "Content updates", "Review management", "Monthly reporting"]
      }
    ],
    testimonial: {
      quote: "Within 90 days, we jumped to #1 on Google for our main keywords. The new website brings in 40+ qualified leads monthly instead of our previous 5-10. Muhammad's team understood our local market perfectly. Best marketing investment ever.",
      author: "Dr. Hassan Ahmed",
      title: "Owner, Ahmed Dental Clinic"
    },
    images: {
      before: "/case-studies/local-seo-before.jpg",
      after: "/case-studies/local-seo-after.jpg"
    }
  },
  {
    slug: "enterprise-portal-automation",
    title: "Enterprise Portal: 40% Process Reduction, $200K Annual Savings",
    client: "TechCorp Solutions Pakistan",
    industry: "Enterprise / Manufacturing",
    challenge: `Large manufacturing company faced operational inefficiency:
- Manual processes consuming 20+ hours per week
- Data spread across 5 different systems
- No real-time visibility into operations
- Employee training took 4 weeks
- Compliance reporting took 15 hours monthly
- Monthly operating costs: $50K, could be reduced`,
    solution: `We built a centralized enterprise portal integrating all operations:

1. Unified Dashboard
   - Single source of truth for all data
   - Real-time KPI monitoring
   - Role-based access control
   - Customizable views for different departments

2. Process Automation
   - Automated workflow for purchase orders (8 hours saved/week)
   - Employee leave management system (3 hours saved/week)
   - Automated report generation (4 hours saved/week)
   - Compliance documentation automation (15 hours/month saved)

3. Integration Layer
   - Connected ERP system
   - Connected HR platform
   - Connected Finance system
   - API layer for future integrations

4. Analytics & Reporting
   - Department-level dashboards
   - Automated compliance reports
   - Performance metrics tracking
   - Historical data analysis`,
    results: [
      {
        metric: "Process Time Savings",
        improvement: "20+ hours → 12 hours per week",
        impact: "40% time reduction"
      },
      {
        metric: "Monthly Operating Costs",
        improvement: "$50K → $30K",
        impact: "-$20K monthly ($240K annually)"
      },
      {
        metric: "Employee Productivity",
        improvement: "+35%",
        impact: "More focus on value-add work"
      },
      {
        metric: "Compliance Report Time",
        improvement: "15 hours → 0.5 hours",
        impact: "98% automation"
      },
      {
        metric: "Error Rate",
        improvement: "-95%",
        impact: "Automated processes are consistent"
      },
      {
        metric: "Employee Training Time",
        improvement: "4 weeks → 3 days",
        impact: "Faster onboarding"
      },
      {
        metric: "System Uptime",
        improvement: "99.98%",
        impact: "Always available for operations"
      },
      {
        metric: "Data Accuracy",
        improvement: "87% → 99.8%",
        impact: "Reliable decision making"
      }
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "API Integration", "OAuth 2.0", "Docker", "Kubernetes", "AWS"],
    timeline: [
      {
        phase: "Phase 1: Discovery & Planning",
        duration: "2 weeks",
        deliverables: ["Process mapping", "Requirements", "Architecture design", "Security plan"]
      },
      {
        phase: "Phase 2: Core Portal Development",
        duration: "6 weeks",
        deliverables: ["Dashboard", "User management", "Basic workflows", "Integration framework"]
      },
      {
        phase: "Phase 3: Automation Implementation",
        duration: "4 weeks",
        deliverables: ["Process automations", "Report generation", "Integrations", "Testing"]
      },
      {
        phase: "Phase 4: Deployment & Training",
        duration: "2 weeks",
        deliverables: ["Production deployment", "Staff training", "Documentation", "Support"]
      }
    ],
    testimonial: {
      quote: "The portal transformed how we operate. We're saving $240K annually in labor costs, our employees are happier working with modern tools, and compliance is now effortless. Muhammad's technical expertise and understanding of enterprise needs were invaluable.",
      author: "Shehzad Malik",
      title: "Operations Director, TechCorp Solutions"
    },
    images: {
      before: "/case-studies/enterprise-before.jpg",
      after: "/case-studies/enterprise-after.jpg"
    }
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.sort((a, b) => {
    // Sort by highest impact (revenue or traffic increase)
    return (b.results[1]?.improvement?.localeCompare(a.results[1]?.improvement || "") || 0);
  });
}
