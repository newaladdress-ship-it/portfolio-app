export type BlogCategory = "react" | "nodejs" | "nextjs" | "fullstack" | "database" | "tips" | "case-study" | "seo" | "career" | "tools";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // YYYY-MM-DD
  readTime: number; // minutes
  author: string;
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
    metaDescription:
      "Complete guide to React performance optimization. Learn code splitting, memoization, lazy loading, and achieve 90+ Lighthouse scores in your React applications.",
    keywords: ["react performance", "optimization", "code splitting", "memoization"],
    content: `React performance optimization is critical for user experience. This comprehensive guide covers techniques to boost your React app performance dramatically.

## Why React Performance Matters

Slow React applications drive users away. Every 100ms delay reduces conversions by 1%. Performance is a feature, not an afterthought.

### Key Metrics
- Largest Contentful Paint (LCP): < 2.5s
- Interaction to Next Paint (INP): < 200ms  
- Cumulative Layout Shift (CLS): < 0.1

## Optimization Techniques

### 1. Code Splitting
Break your React bundle into smaller chunks loaded on-demand.

\`\`\`jsx
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>
\`\`\`

### 2. Memoization
Prevent unnecessary re-renders with React.memo and useMemo.

\`\`\`jsx
const UserCard = React.memo(({ user }) => (
  <div>{user.name}</div>
));

const value = useMemo(() => expensiveCalculation(), [deps]);
\`\`\`

### 3. Image Optimization
Use modern formats and responsive images.

\`\`\`jsx
<Image
  src="/image.webp"
  alt="Description"
  width={800}
  height={600}
  priority
/>
\`\`\`

### 4. Virtual Scrolling
For long lists, render only visible items.

\`\`\`jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList height={600} itemCount={10000} itemSize={50}>
  {({index, style}) => <div style={style}>{items[index]}</div>}
</FixedSizeList>
\`\`\`

## Monitoring & Measurement

Use Web Vitals API to track real user metrics.

\`\`\`jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getLCP(console.log);
getFID(console.log);
\`\`\`

## Results

Applying these techniques typically results in:
- 40-60% reduction in bundle size
- 50-70% improvement in Core Web Vitals
- 25-40% improvement in Time to Interactive

Start with code splitting and memoization for immediate gains.`,
  },
  {
    slug: "nextjs-app-router-migration-guide",
    title: "Migrating from Pages Router to Next.js App Router",
    excerpt:
      "Step-by-step guide to migrate your Next.js project from the legacy Pages Router to the modern App Router with server components and improved layouts.",
    category: "nextjs",
    date: "2024-01-12",
    readTime: 15,
    author: "Muhammad Imran",
    metaDescription:
      "Complete Next.js App Router migration guide. Learn how to upgrade from Pages Router to App Router with server components, layouts, and new features.",
    keywords: ["nextjs", "app router", "migration", "server components"],
    content: `The Next.js App Router represents a significant evolution with server components, improved layouts, and better data fetching patterns.

## Why Migrate?

App Router advantages:
- Server Components for faster rendering
- Simplified data fetching with async/await
- Improved layout hierarchy
- Built-in error handling with error.js
- Better performance with streaming

## Migration Steps

### Step 1: Create app Directory
\`\`\`bash
mkdir -p app/(routes)
\`\`\`

### Step 2: Add Root Layout
\`\`\`tsx
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

### Step 3: Migrate Pages
Convert \`pages/\` to \`app/\` structure.

\`\`\`
pages/index.tsx → app/page.tsx
pages/about.tsx → app/about/page.tsx
pages/[id].tsx → app/[id]/page.tsx
\`\`\`

### Step 4: Update Exports
\`\`\`tsx
// Old
export const getStaticProps = async () => {}

// New (App Router)
export async function generateStaticParams() {}

export default function Page() {}
\`\`\`

## Best Practices

1. Use Server Components by default
2. Mark interactive components with 'use client'
3. Keep Server Components at the top level
4. Use fetch() with caching options
5. Implement error.js and loading.js

## Migration Checklist

- [ ] Create app directory structure
- [ ] Add root layout
- [ ] Migrate top-level pages
- [ ] Convert data fetching to async components
- [ ] Add error and loading boundaries
- [ ] Test all routes thoroughly
- [ ] Remove pages directory
- [ ] Update deployment configuration

Start small with one route, then gradually migrate others.`,
  },
  {
    slug: "nodejs-api-design-best-practices",
    title: "Node.js REST API Design: Best Practices & Patterns",
    excerpt:
      "Learn professional Node.js API design patterns including versioning, error handling, authentication, rate limiting, and documentation for production APIs.",
    category: "nodejs",
    date: "2024-01-10",
    readTime: 14,
    author: "Muhammad Imran",
    metaDescription:
      "Node.js REST API best practices. Learn API versioning, error handling, authentication, rate limiting, and documentation patterns for production APIs.",
    keywords: ["nodejs", "rest api", "api design", "best practices"],
    content: `Building a well-designed REST API is foundational for modern web applications.

## API Versioning

Version your API from the start.

\`\`\`js
// Route versioning
GET /api/v1/users
GET /api/v2/users

// Implementation
app.use('/api/v1', usersV1Router);
app.use('/api/v2', usersV2Router);
\`\`\`

## Error Handling

Consistent error responses build trust.

\`\`\`js
// Error response format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}

// Status codes
200 OK - Success
201 Created - Resource created
400 Bad Request - Invalid input
401 Unauthorized - Authentication required
403 Forbidden - Permission denied
404 Not Found - Resource not found
500 Server Error - Internal error
\`\`\`

## Authentication

Implement secure JWT-based authentication.

\`\`\`js
const jwt = require('jsonwebtoken');

// Issue token
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
);

// Verify middleware
const verify = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = decoded;
    next();
  });
};
\`\`\`

## Rate Limiting

Protect your API from abuse.

\`\`\`js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit per IP
});

app.use('/api/', limiter);
\`\`\`

## Documentation

Document comprehensively with OpenAPI/Swagger.

\`\`\`js
const swaggerUi = require('swagger-ui-express');

const spec = {
  openapi: '3.0.0',
  info: { title: 'API', version: '1.0.0' },
  paths: {
    '/users': {
      get: {
        summary: 'List users',
        responses: { '200': { description: 'Success' } }
      }
    }
  }
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
\`\`\`

## Pagination

Implement efficient pagination.

\`\`\`js
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  
  // Query with offset/limit
  const users = User.find().skip(offset).limit(limit);
  
  res.json({
    data: users,
    pagination: { page, limit, total }
  });
});
\`\`\`

Professional API design takes time but pays dividends in maintenance and user satisfaction.`,
  },
  {
    slug: "database-query-optimization-techniques",
    title: "Database Query Optimization: Techniques for Lightning-Fast Apps",
    excerpt:
      "Master database optimization techniques including indexing strategies, query analysis, n+1 problem solutions, and caching for 10x faster applications.",
    category: "database",
    date: "2024-01-08",
    readTime: 16,
    author: "Muhammad Imran",
    metaDescription:
      "Database optimization guide. Learn indexing, query analysis, n+1 solutions, and caching techniques for dramatically faster database performance.",
    keywords: ["database", "optimization", "indexing", "performance"],
    content: `Database performance directly impacts application speed. Poor queries can slow even the best frontend.

## Understanding Query Performance

Use EXPLAIN to analyze queries.

\`\`\`sql
EXPLAIN ANALYZE
SELECT users.* FROM users
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
\`\`\`

Look for sequential scans instead of index scans—that's your optimization target.

## Indexing Strategy

Indexes are database best friends.

\`\`\`sql
-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index for common queries
CREATE INDEX idx_users_created_active 
ON users(created_at DESC, is_active);

-- Partial index for filtered queries
CREATE INDEX idx_users_premium 
ON users(id) WHERE subscription_type = 'premium';
\`\`\`

## The N+1 Problem

Classic performance killer.

\`\`\`js
// ❌ BAD - N+1 queries
const users = await User.find();
for (const user of users) {
  user.posts = await Post.find({ userId: user.id });
}

// ✅ GOOD - Single query with join
const users = await User.find()
  .populate('posts');

// ✅ GOOD - Explicit join in SQL
SELECT u.*, p.* FROM users u
LEFT JOIN posts p ON u.id = p.user_id;
\`\`\`

## Query Caching

Cache expensive queries.

\`\`\`js
const redis = require('redis');
const client = redis.createClient();

app.get('/users/:id/analytics', async (req, res) => {
  const cacheKey = \`user:\${req.params.id}:analytics\`;
  
  // Try cache first
  let data = await client.get(cacheKey);
  if (data) return res.json(JSON.parse(data));
  
  // If not cached, query database
  data = await expensiveAnalyticsQuery(req.params.id);
  
  // Cache for 1 hour
  await client.setEx(cacheKey, 3600, JSON.stringify(data));
  
  res.json(data);
});
\`\`\`

## Denormalization Strategies

Strategic denormalization improves read performance.

\`\`\`sql
-- Instead of joining on every query
-- Store frequently accessed data

ALTER TABLE users ADD user_post_count INT DEFAULT 0;

-- Update counts on post creation/deletion
UPDATE users SET user_post_count = user_post_count + 1 
WHERE id = NEW.user_id;
\`\`\`

## Connection Pooling

Reuse database connections.

\`\`\`js
const { Pool } = require('pg');

const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Use pool for all queries
const result = await pool.query('SELECT * FROM users');
\`\`\`

## Optimization Checklist

- [ ] Add indexes to frequently queried columns
- [ ] Use EXPLAIN to analyze slow queries
- [ ] Implement caching for expensive queries
- [ ] Fix N+1 problems with eager loading
- [ ] Use connection pooling
- [ ] Monitor query performance regularly
- [ ] Archive old data to improve table size

Database optimization is ongoing—monitor and improve continuously.`,
  },
  {
    slug: "10-web-development-productivity-hacks",
    title: "10 Web Development Productivity Hacks That Save Hours Weekly",
    excerpt:
      "Practical productivity tips for web developers including keyboard shortcuts, browser tools, VS Code extensions, and automation tricks to work smarter.",
    category: "tips",
    date: "2024-01-05",
    readTime: 10,
    author: "Muhammad Imran",
    metaDescription:
      "Web development productivity hacks. Learn shortcuts, tools, and automation tricks that save developers hours every week.",
    keywords: ["productivity", "development", "shortcuts", "hacks"],
    content: `Small productivity improvements compound into significant time savings.

## 1. VS Code Shortcuts You Need

\`\`\`
Cmd+Shift+L - Select all occurrences
Cmd+D - Select next occurrence  
Cmd+Ctrl+Space - Trigger IntelliSense
Cmd+Shift+Enter - Insert line above
Alt+Up/Down - Move line up/down
Cmd+/ - Toggle comment
Cmd+K Cmd+C - Toggle block comment
\`\`\`

## 2. Browser DevTools Secrets

### Chrome DevTools
- $() - querySelector shortcut
- $() - querySelectorAll
- getEventListeners(element) - Find all listeners
- monitor(function) - Log all function calls
- copy(object) - Copy to clipboard

## 3. Git Aliases

\`\`\`bash
# .gitconfig
[alias]
  st = status
  co = checkout
  br = branch
  cm = commit -m
  amend = commit --amend --no-edit
  undo = reset --soft HEAD~1
  lg = log --oneline --graph --all
\`\`\`

## 4. Package Management Tricks

\`\`\`bash
# Upgrade all packages safely
npm update

# Find outdated packages  
npm outdated

# Check for security vulnerabilities
npm audit

# Install from specific version
npm install package@1.2.3
\`\`\`

## 5. Database Query Snippets

Keep reusable queries in snippets.

\`\`\`sql
-- Find slow queries
SELECT query, calls, total_time 
FROM pg_stat_statements 
ORDER BY total_time DESC 
LIMIT 10;

-- Check index usage
SELECT schemaname, tablename, indexname 
FROM pg_indexes 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema');
\`\`\`

## 6. API Testing with cURL

\`\`\`bash
# POST with JSON
curl -X POST http://localhost:3000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com"}'

# Include auth header
curl -H "Authorization: Bearer TOKEN" \\
  http://localhost:3000/api/data

# Save response to file
curl -o response.json http://localhost:3000/api/data
\`\`\`

## 7. Docker Quick Commands

\`\`\`bash
# Build and run in one
docker build -t myapp . && docker run myapp

# See what containers are running
docker ps

# Remove dangling images
docker image prune

# Check logs
docker logs container_id
\`\`\`

## 8. Automated Formatting

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
\`\`\`

## 9. Quick Local Testing

Use local tunneling for mobile testing.

\`\`\`bash
# Share local dev server
npx lt --port 3000

# Get public URL for testing on phone
# Use the generated URL on any device
\`\`\`

## 10. Code Review Checklist

Create a template for consistency.

\`\`\`
- [ ] Code is readable and well-commented
- [ ] No console.log or debug code left
- [ ] Tests are included and passing
- [ ] Performance impact considered
- [ ] Security best practices followed
- [ ] No sensitive data in code/comments
- [ ] Database migrations included
- [ ] Documentation updated
\`\`\`

Implement 2-3 of these this week and notice the time savings.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category === category).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  return BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}
