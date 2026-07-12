export type BlogCategory = "react" | "nodejs" | "nextjs" | "fullstack" | "database" | "tips" | "case-study" | "seo" | "career" | "tools";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // YYYY-MM-DD
  readTime: number; // minutes
  author: string;
  metaTitle: string;
  metaDescription: string;
  content: string;
  keywords: string[];
};

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  react: { label: "React", description: "React development tips, patterns, and best practices" },
  nodejs: { label: "Node.js", description: "Backend development with Node.js and Express" },
  nextjs: { label: "Next.js", description: "Building fast, SEO-optimized apps with Next.js" },
  fullstack: { label: "Full-Stack", description: "End-to-end web application development" },
  database: { label: "Database", description: "Database design, optimization, and scaling" },
  tips: { label: "Tips & Tricks", description: "Quick wins and productivity tips for developers" },
  "case-study": { label: "Case Studies", description: "Real-world project breakdowns and lessons learned" },
  seo: { label: "SEO", description: "Web development and SEO best practices" },
  career: { label: "Career", description: "Developer career guidance and growth" },
  tools: { label: "Tools", description: "Development tools, libraries, and frameworks" },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "react-performance-optimization-guide",
    title: "React Performance Optimization: Complete Guide 2024",
    excerpt:
      "Master React performance optimization techniques including code splitting, memoization, lazy loading, and Core Web Vitals optimization for production-ready applications.",
    category: "react",
    date: "2024-01-15",
    readTime: 12,
    author: "Muhammad Imran",
    metaTitle: "React Performance Optimization Guide - Imran Coding Blog",
    metaDescription: "Complete guide to React performance optimization. Learn code splitting, memoization, lazy loading, and achieve 90+ Lighthouse scores.",
    keywords: ["react performance", "optimization", "code splitting", "memoization"],
    content: `# React Performance Optimization: Complete Guide 2024

## 1. Executive Summary & Core Context

In the modern, fast-paced arena of digital engineering, mastering React stands as a critical prerequisite for building robust, scalable, and high-performance software systems. In an era where user retention is directly tied to load speeds and visual response times, developers must move past surface-level tutorials and implement production-grade architectures.

This article provides a comprehensive examination of React Performance Optimization techniques, exploring theoretical concepts, implementation workflows, testing strategies, and optimization metrics. By adopting these industry-standard techniques, you can ensure that your application remains scalable, secure, and ready to meet the demands of enterprise-scale users.

## 2. Key Performance Metrics to Monitor

Understanding performance metrics is essential for optimization:

- **First Contentful Paint (FCP)**: Time until first content appears (target: < 1.8s)
- **Largest Contentful Paint (LCP)**: Time to render largest visible element (target: < 2.5s)
- **Cumulative Layout Shift (CLS)**: Unexpected layout movement (target: < 0.1)
- **First Input Delay (FID)**: Response time to first user input (target: < 100ms)
- **Time to Interactive (TTI)**: When page becomes fully interactive (target: < 3.8s)

## 3. Code Splitting & Dynamic Imports

Code splitting reduces initial bundle size by loading code only when needed:

- Use React.lazy() for route-based code splitting
- Implement Suspense boundaries for loading states
- Preload critical routes on hover or focus
- Use dynamic imports for heavy libraries

## 4. Memoization & Rendering Optimization

Prevent unnecessary re-renders using memoization:

- React.memo() for functional components
- useMemo() hook for expensive computations
- useCallback() for function stability
- Component composition to isolate re-renders

## 5. Advanced Optimization Techniques

Production-grade optimization strategies:

- Image optimization: WebP format, lazy loading, responsive sizes
- Bundle analysis: Use webpack-bundle-analyzer to identify large dependencies
- Server-side rendering (SSR) for faster initial page load
- Service Workers for offline functionality and caching
- Content Delivery Network (CDN) for global content distribution

## 6. Performance Monitoring & Analytics

Measure real-world performance:

- Use Web Vitals library to track performance metrics
- Implement error tracking with services like Sentry
- Monitor with Google Analytics 4 and Core Web Vitals report
- Set performance budgets to prevent regressions

## 7. Best Practices for Enterprise Applications

Building scalable React applications:

- Structure code with clear separation of concerns
- Use TypeScript for type safety and self-documenting code
- Implement proper error handling and logging
- Set up CI/CD pipelines with automated testing
- Regular performance audits and refactoring

## 8. Real-World Example: Optimizing a Dashboard

A practical approach to optimization:

1. Identify performance bottlenecks using React DevTools Profiler
2. Implement code splitting for different dashboard sections
3. Add memoization to prevent re-renders of chart components
4. Optimize images and use lazy loading
5. Monitor metrics with Web Vitals and analytics tools

## 9. Deployment & CDN Strategy

Optimize your production deployment:

- Deploy static assets to a CDN
- Enable Gzip and Brotli compression
- Set appropriate cache headers for resources
- Use HTTP/2 Server Push for critical resources
- Monitor deployment performance with Real User Monitoring (RUM)

## Conclusion

React performance optimization is an ongoing process. By understanding Core Web Vitals, implementing strategic code splitting, using memoization effectively, and monitoring real-world performance, you can create applications that provide excellent user experiences at scale. Remember that performance improvements should be data-driven and measured using real user metrics rather than synthetic tests alone.

Start with performance audits using Lighthouse, identify your largest bottlenecks, and address them systematically. The investment in performance optimization pays dividends through improved user retention and better SEO rankings.`,
  },
  {
    slug: "nextjs-seo-guide",
    title: "Next.js SEO Guide: Rank Higher on Google",
    excerpt: "Learn how to implement SEO best practices in Next.js for better search rankings and organic traffic.",
    category: "nextjs",
    date: "2024-02-10",
    readTime: 10,
    author: "Muhammad Imran",
    metaTitle: "Next.js SEO Guide - Complete Implementation",
    metaDescription: "Master SEO in Next.js with this comprehensive guide covering meta tags, structured data, sitemaps, and more.",
    keywords: ["nextjs", "seo", "search optimization", "meta tags"],
    content: `# Next.js SEO Guide: Rank Higher on Google

## Key SEO Elements in Next.js

Next.js provides excellent built-in features for SEO optimization:

- Head component for managing meta tags
- Image component with automatic optimization
- Automatic sitemap generation
- Built-in support for structured data (JSON-LD)
- Static generation for SEO-friendly pages

## Implementation Steps

1. **Add meta tags** to your pages using next/head
2. **Optimize images** with next/image component
3. **Create sitemaps** for search engine crawling
4. **Add structured data** for rich snippets
5. **Monitor rankings** with Google Search Console

## Best Practices

- Write descriptive page titles (50-60 characters)
- Create compelling meta descriptions (150-160 characters)
- Use proper heading hierarchy (H1, H2, H3)
- Include alt text for all images
- Build internal linking strategy
- Optimize for Core Web Vitals
- Use canonical tags to avoid duplicates

Follow these practices to improve your Next.js website's search engine visibility and organic traffic.`,
  },
  {
    slug: "nodejs-backend-best-practices",
    title: "Node.js Backend Best Practices 2024",
    excerpt: "Build production-ready Node.js applications with industry best practices for security, performance, and scalability.",
    category: "nodejs",
    date: "2024-03-05",
    readTime: 15,
    author: "Muhammad Imran",
    metaTitle: "Node.js Backend Best Practices",
    metaDescription: "Learn Node.js best practices for building secure, scalable, and maintainable backend applications.",
    keywords: ["nodejs", "backend", "best practices", "production"],
    content: `# Node.js Backend Best Practices 2024

## Architecture & Structure

Building maintainable Node.js applications:

- Use MVC or similar architectural patterns
- Separate concerns: routes, controllers, services, models
- Implement proper error handling middleware
- Use environment variables for configuration
- Document your API with OpenAPI/Swagger

## Security Best Practices

- Validate all user inputs
- Use parameterized queries to prevent SQL injection
- Implement rate limiting and DDoS protection
- Use HTTPS for all communications
- Hash passwords with bcrypt
- Implement CORS properly
- Use security headers (helmet.js)
- Regular security audits

## Performance Optimization

- Use connection pooling for databases
- Implement caching strategies
- Optimize database queries
- Use clustering for multi-core systems
- Monitor memory usage and prevent leaks
- Implement proper logging

## Database Best Practices

- Use migrations for schema changes
- Index frequently queried columns
- Normalize your database schema
- Use transactions for data integrity
- Regular backups and testing
- Monitor query performance

Building robust Node.js applications requires attention to architecture, security, and performance. By following these best practices, you'll create applications that are maintainable, secure, and scalable.`,
  },
];

export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  return BLOG_POSTS.slice(0, limit);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
