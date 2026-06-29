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
    metaTitle: "NextJS App Router Migration Guide - Imran Coding Blog",
    metaDescription: "Complete guide on migrating React apps from Pages Router to Next.js App Router. Learn layouts, Server Components, and best practices.",
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
    metaTitle: "NodeJS REST API Design Best Practices - Imran Coding Blog",
    metaDescription: "Learn Node.js REST API design best practices, architecture patterns, authentication, error handling, and production optimization.",
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
    metaTitle: "Database Query Optimization Guide - Imran Coding Blog",
    metaDescription: "Master database query optimization techniques. Learn indexing strategies, query tuning, and schema design to speed up your applications.",
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

Look for sequential scans instead of index scans-that's your optimization target.

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

Database optimization is ongoing-monitor and improve continuously.`,
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
    metaTitle: "10 Web Development Productivity Hacks - Imran Dev Blog",
    metaDescription: "Boost your coding speed with 10 web development productivity hacks. Tools, workflows, and shortcuts that save hours every single week.",
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
  {
    slug: "typescript-advanced-patterns",
    title: "Advanced TypeScript Patterns for Enterprise Applications",
    excerpt: "Explore advanced TypeScript patterns including generics, conditional types, mapped types, and decorators for building scalable enterprise applications.",
    category: "tools",
    date: "2024-01-16",
    readTime: 14,
    author: "Muhammad Imran",
    metaTitle: "Advanced TypeScript Patterns - Imran Developer Coding Blog",
    metaDescription: "Master advanced TypeScript patterns including generics, conditional types, and decorators for enterprise-grade applications.",
    keywords: ["typescript", "generics", "conditional types", "enterprise"],
    content: `TypeScript's advanced features enable building type-safe, scalable applications. Master these patterns to write professional enterprise code.

## Generics: Reusable Type-Safe Components

Generics allow you to create flexible, reusable code while maintaining type safety.

\`\`\`typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic interface
interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  save(item: T): Promise<T>;
}

// Generic class
class UserRepository implements Repository<User> {
  async getAll(): Promise<User[]> {
    return fetch('/api/users').then(r => r.json());
  }
}
\`\`\`

## Conditional Types: Dynamic Type Resolution

Conditional types resolve types based on conditions.

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">; // true
type B = IsString<number>; // false

// Practical example: Extract function parameter types
type Parameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;
\`\`\`

## Mapped Types: Transform Properties

Transform existing types to create new ones.

\`\`\`typescript
// Make all properties readonly
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties optional
type Partial<T> = {
  [K in keyof T]?: T[K];
};

// Create getters for all properties
type Getters<T> = {
  [K in keyof T as \`get\${Capitalize<string & K>}\`]: () => T[K];
};
\`\`\`

## Decorators: Metadata and Behavior Injection

Decorators enable metadata attachment and runtime behavior modification.

\`\`\`typescript
function Deprecated(message: string) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      console.warn(\`⚠️ \${propertyKey} is deprecated: \${message}\`);
      return originalMethod.apply(this, args);
    };
  };
}

class API {
  @Deprecated("Use fetchV2 instead")
  fetch() {}
}
\`\`\`

## Utility Types: Built-in Type Helpers

TypeScript provides built-in utility types for common transformations.

\`\`\`typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Exclude specific properties
type UserWithoutPassword = Omit<User, 'password'>;

// Make specific properties required
type UserWithEmail = Required<Pick<User, 'email'>>;

// Create record type
type Permission = 'read' | 'write' | 'delete';
type RolePermissions = Record<Permission, boolean>;
\`\`\`

These patterns enable you to write type-safe, maintainable code at scale.`,
  },
  {
    slug: "postgresql-optimization-guide",
    title: "PostgreSQL Performance Optimization: Indexing and Query Tuning",
    excerpt: "Deep dive into PostgreSQL optimization techniques including strategic indexing, query analysis, and execution plan optimization for high-performance databases.",
    category: "database",
    date: "2024-01-17",
    readTime: 16,
    author: "Muhammad Imran",
    metaTitle: "PostgreSQL Optimization Guide - Imran Developer Blog",
    metaDescription: "Complete PostgreSQL optimization guide. Learn indexing strategies, query tuning, and execution plan analysis for fast databases.",
    keywords: ["postgresql", "optimization", "indexing", "query performance"],
    content: `PostgreSQL powers millions of applications. Optimize it properly and watch your response times plummet.

## Understanding EXPLAIN ANALYZE

Every query has a cost. Analyze it to find bottlenecks.

\`\`\`sql
EXPLAIN ANALYZE
SELECT u.id, u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
WHERE u.created_at > NOW() - INTERVAL '30 days'
ORDER BY order_count DESC;
\`\`\`

Look for:
- Sequential scans (should be index scans)
- High execution time nodes
- Nested loop joins (often slower than hash joins)

## Indexing Strategies

### Single Column Index
\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
-- Query: SELECT * FROM users WHERE email = 'user@example.com'
\`\`\`

### Composite Index (for multi-column WHERE/ORDER BY)
\`\`\`sql
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);
-- Query: SELECT * FROM orders WHERE user_id = 1 ORDER BY created_at DESC
\`\`\`

### Partial Index (for filtered queries)
\`\`\`sql
CREATE INDEX idx_active_users ON users(id) WHERE deleted_at IS NULL;
-- Much smaller than full index, perfect for soft deletes
\`\`\`

## Query Optimization Patterns

### 1. Use BETWEEN for ranges
\`\`\`sql
-- Slow: Multiple comparisons
SELECT * FROM orders WHERE created_at >= '2024-01-01' AND created_at < '2024-02-01';

-- Fast: BETWEEN with index
SELECT * FROM orders WHERE created_at BETWEEN '2024-01-01' AND '2024-02-01';
\`\`\`

### 2. Batch operations
\`\`\`sql
-- Slow: 1000 individual inserts
INSERT INTO logs (user_id, action) VALUES (1, 'login');
INSERT INTO logs (user_id, action) VALUES (2, 'logout');

-- Fast: Batch insert
INSERT INTO logs (user_id, action) VALUES 
  (1, 'login'), (2, 'logout'), (3, 'view');
\`\`\`

### 3. Aggregate at the database level
\`\`\`sql
-- Fetches 1M rows to aggregate (wasteful)
SELECT * FROM events WHERE date > NOW() - INTERVAL '30 days';

-- Returns 1 row (efficient)
SELECT COUNT(*), AVG(value) FROM events WHERE date > NOW() - INTERVAL '30 days';
\`\`\`

## Connection Pooling

Never create new connections per request.

\`\`\`typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'myapp',
  user: 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20, // Connection pool size
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Reuse pool connections
const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
\`\`\`

These optimizations reduce query times by 10-100x.`,
  },
  {
    slug: "docker-containerization-guide",
    title: "Docker for Web Developers: Containerization Best Practices",
    excerpt: "Learn Docker containerization from basics to production deployment including Dockerfile optimization, multi-stage builds, and container orchestration.",
    category: "tools",
    date: "2024-01-18",
    readTime: 15,
    author: "Muhammad Imran",
    metaTitle: "Docker for Web Developers Guide - Imran Developer Blog",
    metaDescription: "Complete Docker guide for web developers. Learn containerization, Dockerfile optimization, and production deployment strategies.",
    keywords: ["docker", "containerization", "devops", "deployment"],
    content: `Docker transforms how we develop, test, and deploy applications. Master it and collaborate seamlessly across teams.

## Basic Dockerfile Structure

\`\`\`dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Build if needed
RUN npm run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \\
  CMD node healthcheck.js

# Start application
CMD ["npm", "start"]
\`\`\`

## Multi-Stage Builds: Optimize Image Size

\`\`\`dockerfile
# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime (much smaller)
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

## Docker Compose: Multi-Container Apps

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgres://db:5432/myapp
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_PASSWORD=secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  pgdata:
\`\`\`

## Production Deployment Best Practices

### 1. Use specific base image versions
\`\`\`dockerfile
# Bad: Could break unexpectedly
FROM node:latest

# Good: Predictable
FROM node:18.17.1-alpine
\`\`\`

### 2. Non-root user for security
\`\`\`dockerfile
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs
\`\`\`

### 3. Minimal final images
\`\`\`dockerfile
# Alpine is 40MB vs Ubuntu's 77MB
FROM node:18-alpine
\`\`\`

Docker ensures consistency across development, testing, and production environments.`,
  },
  {
    slug: "api-security-best-practices",
    title: "API Security: Authentication, Authorization, and Rate Limiting",
    excerpt: "Comprehensive guide to securing your APIs including JWT authentication, role-based access control, rate limiting, and protection against common attacks.",
    category: "nodejs",
    date: "2024-01-19",
    readTime: 17,
    author: "Muhammad Imran",
    metaTitle: "API Security Best Practices Guide - Imran Coding Blog",
    metaDescription: "API security best practices including JWT, OAuth2, RBAC, rate limiting, and protection against OWASP top 10 vulnerabilities.",
    keywords: ["api security", "authentication", "jwt", "rate limiting"],
    content: `Insecure APIs expose your entire application. Implement these security patterns from day one.

## JWT Authentication

\`\`\`typescript
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

// Generate token
function generateToken(userId: string): string {
  return jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    SECRET,
    { expiresIn: '24h' }
  );
}

// Verify token middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
\`\`\`

## Role-Based Access Control (RBAC)

\`\`\`typescript
type Role = 'user' | 'admin' | 'moderator';

function authorize(...allowedRoles: Role[]) {
  return (req, res, next) => {
    const userRole = req.user.role as Role;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}

// Usage
app.delete('/api/users/:id', 
  authMiddleware, 
  authorize('admin'),
  deleteUserHandler
);
\`\`\`

## Rate Limiting

\`\`\`typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply globally
app.use(limiter);

// Stricter limit for login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 attempts per 15 minutes
  skipSuccessfulRequests: true, // Don't count successful logins
});

app.post('/api/login', loginLimiter, loginHandler);
\`\`\`

## Input Validation & Sanitization

\`\`\`typescript
import { body, validationResult } from 'express-validator';

app.post('/api/users',
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }),
  body('name').trim().notEmpty(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Validated and safe data
    const { email, password, name } = req.body;
    // Process...
  }
);
\`\`\`

## Prevent Common Attacks

### 1. SQL Injection (use parameterized queries)
\`\`\`typescript
// Vulnerable
const user = await db.query(\`SELECT * FROM users WHERE email = '\${email}'\`);

// Safe
const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
\`\`\`

### 2. CSRF Protection
\`\`\`typescript
import csrf from 'csurf';
app.use(csrf());

// Add token to forms
res.json({ csrfToken: req.csrfToken() });
\`\`\`

### 3. CORS Configuration
\`\`\`typescript
import cors from 'cors';

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
\`\`\`

Secure APIs are resilient APIs.`,
  },
  {
    slug: "testing-strategies-jest-vitest",
    title: "Testing Strategies: Unit, Integration, and E2E Testing",
    excerpt: "Master testing strategies using Jest and Vitest including unit tests, integration tests, E2E testing, and achieving high code coverage.",
    category: "tools",
    date: "2024-01-20",
    readTime: 15,
    author: "Muhammad Imran",
    metaTitle: "Testing Strategies Guide Jest Vitest - Imran Dev Blog",
    metaDescription: "Complete testing guide using Jest and Vitest. Learn unit, integration, and E2E testing strategies for production-grade code.",
    keywords: ["testing", "jest", "vitest", "unit testing", "e2e"],
    content: `Tested code is reliable code. Implement a testing pyramid to catch bugs before production.

## Unit Tests with Jest

\`\`\`typescript
import { sum, multiply } from './math';

describe('Math utilities', () => {
  it('should add two numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('should multiply two numbers', () => {
    expect(multiply(4, 5)).toBe(20);
  });
});
\`\`\`

## Testing React Components

\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react';
import UserButton from './UserButton';

describe('UserButton', () => {
  it('renders button with correct text', () => {
    render(<UserButton name="John" />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const onClick = jest.fn();
    render(<UserButton onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
\`\`\`

## Integration Tests

\`\`\`typescript
describe('User API Integration', () => {
  it('should create and retrieve user', async () => {
    const user = await api.createUser({
      email: 'test@example.com',
      name: 'John'
    });

    const retrieved = await api.getUser(user.id);
    expect(retrieved.email).toBe('test@example.com');
  });
});
\`\`\`

## E2E Testing with Playwright

\`\`\`typescript
import { test, expect } from '@playwright/test';

test('user can sign up and login', async ({ page }) => {
  // Navigate to signup
  await page.goto('https://example.com/signup');
  
  // Fill form
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'SecurePass123');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Verify redirect to dashboard
  await expect(page).toHaveURL('/dashboard');
});
\`\`\`

## Coverage Goals

- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

Test critical paths thoroughly.`,
  },
  {
    slug: "graphql-api-development",
    title: "GraphQL API Development: Schema Design and Best Practices",
    excerpt: "Build efficient GraphQL APIs with Apollo Server including schema design, resolvers, caching strategies, and production optimization.",
    category: "nodejs",
    date: "2024-01-21",
    readTime: 14,
    author: "Muhammad Imran",
    metaTitle: "GraphQL API Development Guide - Imran Developer Blog",
    metaDescription: "GraphQL API development guide. Learn schema design, resolvers, caching, and production best practices with Apollo Server.",
    keywords: ["graphql", "apollo", "api development", "schema design"],
    content: `GraphQL provides flexible, efficient data querying. Build APIs your clients will love.

## Basic Schema Definition

\`\`\`typescript
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, content: String!): Post!
    updateUser(id: ID!, name: String): User!
  }
\`;
\`\`\`

## Resolvers

\`\`\`typescript
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      return await db.users.findById(id);
    },
    posts: async () => {
      return await db.posts.findAll();
    },
  },
  Mutation: {
    createPost: async (_, { title, content }, { userId }) => {
      return await db.posts.create({
        title, content, authorId: userId
      });
    },
  },
  User: {
    posts: async (user) => {
      return await db.posts.findByAuthor(user.id);
    },
  },
};
\`\`\`

## N+1 Query Prevention with DataLoader

\`\`\`typescript
import DataLoader from 'dataloader';

const userLoader = new DataLoader(async (userIds) => {
  const users = await db.users.findByIds(userIds);
  return userIds.map(id => users.find(u => u.id === id));
});

const resolvers = {
  Post: {
    author: (post) => userLoader.load(post.authorId),
  },
};
\`\`\`

GraphQL enables developers to request exactly what they need, reducing over-fetching.`,
  },
  {
    slug: "monorepo-management",
    title: "Monorepo Architecture: Managing Multiple Packages with Turborepo",
    excerpt: "Scale development across multiple packages using monorepo architecture with Turborepo including shared dependencies, CI/CD optimization, and code sharing.",
    category: "tools",
    date: "2024-01-22",
    readTime: 13,
    author: "Muhammad Imran",
    metaTitle: "Monorepo Turborepo Management - Imran Developer Blog",
    metaDescription: "Monorepo management with Turborepo. Learn scaling multiple packages, CI/CD optimization, and code sharing strategies for projects.",
    keywords: ["monorepo", "turborepo", "monorepo architecture"],
    content: `Monorepos enable teams to manage multiple packages efficiently. Scale beyond single repositories.

## Turborepo Structure

\`\`\`
apps/
  web/
  api/
packages/
  shared/
  ui/
  database/
turbo.json
package.json
\`\`\`

## Root Configuration

\`\`\`json
{
  "name": "myproject",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "devDependencies": {
    "turbo": "^1.13.0"
  }
}
\`\`\`

## Turborepo Config

\`\`\`json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "test": {
      "outputs": ["coverage/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
\`\`\`

## Code Sharing

\`\`\`typescript
// packages/shared/src/utils.ts
export function formatDate(date: Date): string {
  return date.toISOString();
}

// apps/web/package.json
{
  "dependencies": {
    "@myapp/shared": "*"
  }
}

// apps/web/src/main.tsx
import { formatDate } from '@myapp/shared';
\`\`\`

Monorepos increase productivity and ensure code consistency.`,
  },
  {
    slug: "ci-cd-automation",
    title: "CI/CD Automation with GitHub Actions: Deploy Like a Pro",
    excerpt: "Automate testing, building, and deployment using GitHub Actions workflows for continuous integration and deployment pipelines.",
    category: "tools",
    date: "2024-01-23",
    readTime: 12,
    author: "Muhammad Imran",
    metaTitle: "CI/CD Automation GitHub Actions Guide - Imran Dev Blog",
    metaDescription: "GitHub Actions CI/CD automation guide. Learn workflow creation, automated testing, and production deployment strategies.",
    keywords: ["ci/cd", "github actions", "automation", "deployment"],
    content: `Automate your entire deployment pipeline with GitHub Actions. Deploy with confidence every time.

## Basic Workflow

\`\`\`yaml
name: Build and Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm ci
      - run: npm run test
      - run: npm run build
      
      - name: Deploy
        if: github.ref == 'refs/heads/main'
        run: npm run deploy
        env:
          DEPLOY_KEY: \${{ secrets.DEPLOY_KEY }}
\`\`\`

## Conditional Deployments

\`\`\`yaml
- name: Deploy to Production
  if: github.event_name == 'push' && github.ref == 'refs/heads/main'
  run: |
    echo "Deploying to production..."
    npm run deploy:prod
\`\`\`

CI/CD eliminates manual deployment errors and ensures consistent, reliable releases.`,
  },
  {
    slug: "accessibility-wcag-compliance",
    title: "Web Accessibility: WCAG 2.1 Compliance and Best Practices",
    excerpt: "Build inclusive web applications meeting WCAG 2.1 standards including semantic HTML, ARIA labels, keyboard navigation, and screen reader support.",
    category: "tips",
    date: "2024-01-24",
    readTime: 13,
    author: "Muhammad Imran",
    metaTitle: "Web Accessibility WCAG Compliance - Imran Coding Blog",
    metaDescription: "Web accessibility guide following WCAG 2.1 standards. Learn semantic HTML, ARIA, keyboard navigation, and inclusive design.",
    keywords: ["accessibility", "wcag", "a11y", "inclusive design"],
    content: `Accessibility isn't a feature-it's a requirement. Make the web inclusive.

## Semantic HTML

\`\`\`html
<!-- Bad: Non-semantic -->
<div class="header">
  <div class="nav">
    <div class="link">Home</div>
  </div>
</div>

<!-- Good: Semantic -->
<header>
  <nav>
    <a href="/">Home</a>
  </nav>
</header>
\`\`\`

## ARIA Labels

\`\`\`html
<!-- Screen readers need context -->
<button aria-label="Close menu">✕</button>
<input type="search" aria-label="Search products" />
<div role="status" aria-live="polite">
  3 items added to cart
</div>
\`\`\`

## Keyboard Navigation

\`\`\`typescript
// Handle keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

// Tab order is natural with semantic HTML
<form>
  <input /> {/* Tab 1 */}
  <input /> {/* Tab 2 */}
  <button>Submit</button> {/* Tab 3 */}
</form>
\`\`\`

## Color Contrast

- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio

Use tools like Contrast Checker to verify.

Accessible sites benefit everyone.`,
  },
  {
    slug: "web-performance-core-vitals",
    title: "Web Performance Optimization: Core Web Vitals Deep Dive",
    excerpt: "Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS) for exceptional user experience.",
    category: "seo",
    date: "2024-01-25",
    readTime: 16,
    author: "Muhammad Imran",
    metaTitle: "Web Performance Core Vitals Guide - Imran Coding Blog",
    metaDescription: "Web performance optimization guide. Master LCP, INP, and CLS for top Google rankings, web speed, and better user satisfaction.",
    keywords: ["web performance", "core vitals", "lcp", "inp", "cls"],
    content: `Google ranks sites on performance. Optimize your Core Web Vitals and climb search results.

## Largest Contentful Paint (LCP)

Target: < 2.5s

### Optimize Images
\`\`\`html
<!-- Use modern formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy" />
</picture>
\`\`\`

### Preload Critical Resources
\`\`\`html
<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://cdn.example.com">
\`\`\`

## Interaction to Next Paint (INP)

Target: < 200ms

### Debounce User Input
\`\`\`typescript
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const handleSearch = debounce(async (query) => {
  const results = await api.search(query);
  updateResults(results);
}, 300);
\`\`\`

## Cumulative Layout Shift (CLS)

Target: < 0.1

### Reserve Space for Dynamic Content
\`\`\`html
<!-- Bad: Causes layout shift -->
<div id="ads"></div>

<!-- Good: Reserve space -->
<div style="height: 250px;">
  <div id="ads"></div>
</div>
\`\`\`

Core Web Vitals are ranking factors. Optimize them aggressively.`,
  },
  {
    slug: "microservices-architecture",
    title: "Microservices Architecture: Design Patterns and Best Practices",
    excerpt: "Design scalable microservices architectures with API gateways, service communication, data consistency, and fault tolerance patterns.",
    category: "fullstack",
    date: "2024-01-26",
    readTime: 14,
    author: "Muhammad Imran",
    metaTitle: "Microservices Architecture Guide - Imran Coding Blog",
    metaDescription: "Microservices architecture guide. Learn design patterns, API gateways, service communication, and scalability strategies.",
    keywords: ["microservices", "architecture", "scalability", "distributed systems"],
    content: `Microservices enable teams to scale independently. Design them properly from the start.

## Service Boundaries

Organize around business capabilities, not technical layers.

\`\`\`
┌─────────────────┐
│  User Service   │
├─────────────────┤
│ REST API        │
│ Database        │
│ Business Logic  │
└─────────────────┘

┌─────────────────┐
│ Order Service   │
├─────────────────┤
│ REST API        │
│ Database        │
│ Business Logic  │
└─────────────────┘
\`\`\`

## API Gateway Pattern

\`\`\`typescript
const gateway = express();

// Route requests to services
gateway.use('/api/users', proxyTo('user-service'));
gateway.use('/api/orders', proxyTo('order-service'));
gateway.use('/api/products', proxyTo('product-service'));
\`\`\`

## Service Communication

### Synchronous (Request-Response)
\`\`\`typescript
// User service calls order service
const userOrders = await fetch('http://order-service/api/users/123/orders');
\`\`\`

### Asynchronous (Event-Driven)
\`\`\`typescript
// User service publishes event
eventBus.publish('user.created', { userId: 123 });

// Other services subscribe
eventBus.subscribe('user.created', (event) => {
  handleNewUser(event.userId);
});
\`\`\`

## Handling Failures

### Circuit Breaker Pattern
\`\`\`typescript
class CircuitBreaker {
  state = 'closed'; // closed, open, half-open
  failures = 0;
  
  call(fn) {
    if (this.state === 'open') {
      throw new Error('Circuit open');
    }
    
    try {
      const result = fn();
      this.failures = 0;
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures > 5) {
        this.state = 'open';
      }
      throw error;
    }
  }
}
\`\`\`

Microservices require careful design to succeed.`,
  },
  {
    slug: "paid-traffic-marketing",
    title: "Attracting Paid Traffic: Google Ads and LinkedIn Strategies",
    excerpt: "Optimize paid advertising campaigns on Google and LinkedIn to attract qualified leads and customers to your web development services.",
    category: "career",
    date: "2024-01-27",
    readTime: 11,
    author: "Muhammad Imran",
    metaTitle: "Attracting Paid Traffic Guide - Imran Developer Blog",
    metaDescription: "Paid advertising strategy for web developers. Learn Google Ads and LinkedIn marketing campaigns to attract clients and grow business.",
    keywords: ["marketing", "google ads", "linkedin", "paid traffic"],
    content: `Organic traffic takes time. Accelerate growth with strategic paid campaigns.

## Google Ads Strategy

### Search Ads Keywords
- "React developer for hire"
- "Web development services Multan"
- "MERN stack developer Pakistan"

### Targeting
- Location: Pakistan, focus Multan
- Daily budget: $10-20
- Target: $50-100 per lead

### Ad Copy
- Highlight unique value
- Include call-to-action
- Link to relevant landing page

## LinkedIn B2B Marketing

### Content Strategy
- Share case studies
- Post industry insights
- Engage with prospects' content

### Outreach
- Personalized connection requests
- Value-first messaging
- Follow-up sequences

## Conversion Optimization

- Landing page optimization
- Clear call-to-action buttons
- Trust signals (testimonials, case studies)
- Fast loading times

Paid traffic converts quickly if optimized properly.`,
  },
  {
    slug: "freelance-pricing-strategies",
    title: "Freelance Pricing Strategies: Value-Based Pricing vs Hourly Rates",
    excerpt: "Master pricing strategies for freelance web development including value-based pricing, project estimation, and negotiation tactics.",
    category: "career",
    date: "2024-01-28",
    readTime: 10,
    author: "Muhammad Imran",
    metaTitle: "Freelance Pricing Strategies - Imran Developer Coding Blog",
    metaDescription: "Freelance pricing guide. Learn value-based pricing, hourly rates, project estimation, and client negotiation strategies.",
    keywords: ["pricing", "freelance", "value-based pricing", "negotiation"],
    content: `How you price determines your income. Price strategically.

## Value-Based Pricing

Stop charging hourly. Charge based on value delivered.

### Example: E-commerce Site
- Hourly: 200 hours × $50 = $10,000
- Value-based: Generates $50,000/month revenue → $15,000 fee = 3.6 month payback

Clients prefer value pricing-they know the investment ROI.

## Project Estimation

1. Break project into milestones
2. Estimate time for each milestone
3. Add 20% buffer for unknowns
4. Multiply hourly rate × hours

## Negotiation Tips

1. Establish your floor price
2. Always ask for their budget first
3. Show ROI of your work
4. Package services strategically
5. Offer payment plans for large projects

## Pricing Tiers

- Starter: $500-1,000 (landing pages)
- Standard: $2,000-5,000 (web apps)
- Premium: $10,000+ (full-stack solutions)
- Enterprise: Custom (complex systems)

Higher prices attract better clients.`,
  },
  {
    slug: "client-management-workflow",
    title: "Client Management: Communication, Contracts, and Scope Control",
    excerpt: "Master client relationships with clear communication, proper contracts, scope management, and conflict resolution for successful projects.",
    category: "career",
    date: "2024-01-29",
    readTime: 11,
    author: "Muhammad Imran",
    metaTitle: "Client Management Workflow Guide - Imran Coding Blog",
    metaDescription: "Client management best practices for developers. Learn communication, contracts, scope control, and project success strategies.",
    keywords: ["client management", "contracts", "scope management", "communication"],
    content: `Clear contracts prevent 90% of project problems. Document everything.

## Proposal Structure

1. Executive Summary (1 paragraph)
2. Scope of Work (what you'll build)
3. Timeline (milestones and deadlines)
4. Investment (pricing breakdown)
5. Terms & Conditions (payment, refunds, IP rights)

## Communication Templates

### Project Kickoff
"We're excited to start your project! Here's our plan:
- Week 1: Discovery and planning
- Week 2-3: Development
- Week 4: Testing and launch

You'll receive updates every Friday."

### Scope Change Request
"We received your feature request. This falls outside the original scope and will add 2 weeks. Impact: $X additional investment. Proceed?"

### Final Delivery
"Your project is complete and ready for launch. Here's what we delivered and next steps for maintenance."

## Preventing Scope Creep

1. Define scope clearly upfront
2. Use change request process for additions
3. Charge for out-of-scope work
4. Say "no" when necessary
5. Document all approvals

## Handling Difficult Clients

1. Stay professional
2. Communicate in writing
3. Set firm boundaries
4. Refer to contract
5. Escalate or exit if needed

Well-managed projects lead to happy clients and referrals.`,
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
