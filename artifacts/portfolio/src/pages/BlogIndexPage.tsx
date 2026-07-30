import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { MdArticle, MdArrowForward, MdCalendarToday, MdTimer } from "react-icons/md";
import { BLOG_POSTS, BLOG_CATEGORIES, getFeaturedBlogPosts } from "@/data/blog";

export default function BlogIndexPage() {
  const featured = getFeaturedBlogPosts(3);
  const recentPosts = BLOG_POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 12);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.imrandigitals.online/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.imrandigitals.online/blog" },
    ],
  };

  const blogCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Web Development Blog",
    description: "Tutorials and guides on React, Node.js, and modern web development.",
    itemListElement: recentPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: post.title,
      url: `https://www.imrandigitals.online/blog/${post.slug}`,
    })),
  };

  return (
    <section className="space-y-8">
      <SEOHead
        title="Web Development Blog - React and Node.js Coding Tips"
        description="Read expert web development tutorials, React tips, Node.js guides, and full-stack development articles by Muhammad Imran."
        path="/blog"
        jsonLd={[breadcrumbJsonLd, blogCollectionJsonLd]}
      />

      {/* Breadcrumbs */}
      <nav
        aria-label="Breadcrumb"
        className="text-xs text-neutral-500 dark:text-neutral-500"
      >
        <Link href="/" className="hover:text-neutral-800 dark:hover:text-neutral-300">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700 dark:text-neutral-300">Blog</span>
      </nav>

      {/* Hero */}
      <header className="space-y-3">
        <SectionHeading title="Blog" icon={<MdArticle />} />
        <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
          Web Development Tips, Tutorials & Guides
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Expert articles on React, Node.js, Next.js, database optimization, and full-stack web development. Learn best practices and industry insights.
        </p>
      </header>

      <Breakline />

      {/* Featured Posts */}
      <div className="space-y-3">
        <SectionHeading title="Featured Articles" icon={<MdArticle />} />
        <div className="grid sm:grid-cols-3 gap-4 mt-2">
          {featured.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full flex flex-col">
                <div className="flex items-center gap-1.5 text-xs font-medium mb-2">
                  <span className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-neutral-700 dark:text-neutral-300">
                    {BLOG_CATEGORIES[post.category].label}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2 flex-grow">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500 pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span className="flex items-center gap-1">
                    <MdCalendarToday size={12} />
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1">
                    <MdTimer size={12} />
                    {post.readTime}m
                  </span>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>

      <Breakline />

      {/* Recent Posts */}
      <div className="space-y-3">
        <SectionHeading title="Latest Articles" icon={<MdArticle />} />
        <div className="grid sm:grid-cols-2 gap-4 mt-2">
          {recentPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 text-neutral-700 dark:text-neutral-300">
                    {BLOG_CATEGORIES[post.category].label}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-500">
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span className="flex items-center gap-1">
                    {post.readTime}m read
                  </span>
                </div>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>

      <Breakline />

      {/* Categories */}
      <div className="space-y-3">
        <SectionHeading title="Browse by Category" icon={<MdArticle />} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
          {Object.entries(BLOG_CATEGORIES).map(([key, category]) => (
            <SpotlightCard key={key} className="p-4">
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
                {category.label}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                {category.description}
              </p>
              <Link href={`/blog?category=${key}`}>
                <button className="text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors flex items-center gap-1">
                  Explore <MdArrowForward size={12} />
                </button>
              </Link>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
