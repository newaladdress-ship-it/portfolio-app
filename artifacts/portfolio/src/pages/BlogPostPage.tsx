import { Fragment } from "react";
import { useRoute, Link, Redirect } from "wouter";
import SEOHead from "@/components/SEOHead";
import SectionHeading from "@/components/layout/SectionHeading";
import SpotlightCard from "@/components/layout/SpotlightCard";
import Breakline from "@/components/layout/Breakline";
import { MdCalendarToday, MdPerson, MdTimer, MdLocalOffer } from "react-icons/md";
import { MdArrowForward, MdArrowBack } from "react-icons/md";
import { getBlogPostBySlug, BLOG_POSTS, BLOG_CATEGORIES } from "@/data/blog";

function BlogContent({ content }: { content: string }) {
  let isCodeBlock = false;

  return (
    <div className="space-y-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
      {content.split("\n").map((line, index) => {
        const key = `${index}-${line.slice(0, 20)}`;
        if (line.startsWith("```")) {
          isCodeBlock = !isCodeBlock;
          return null;
        }
        if (isCodeBlock) {
          return <pre key={key} className="overflow-x-auto rounded-lg bg-neutral-950 p-4 text-xs text-neutral-100"><code>{line}</code></pre>;
        }
        if (line.startsWith("## ")) return <h2 key={key}>{line.slice(3)}</h2>;
        if (line.startsWith("### ")) return <h3 key={key}>{line.slice(4)}</h3>;
        if (!line.trim()) return <Fragment key={key} />;
        return <p key={key}>{line}</p>;
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return <Redirect to="/blog" />;
  }

  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: "https://www.imrandigitals.online/opengraph.jpg",
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://www.imrandigitals.online",
      jobTitle: "Full-Stack Web Developer",
      sameAs: [
        "https://github.com/muhammadimran9",
        "https://www.linkedin.com/in/muhammad-imran-972364373/"
      ]
    },
    publisher: {
      "@type": "Organization",
      name: "Imran Digitals",
      logo: {
        "@type": "ImageObject",
        url: "https://www.imrandigitals.online/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.imrandigitals.online/blog/${post.slug}`
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.imrandigitals.online/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.imrandigitals.online/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://www.imrandigitals.online/blog/${post.slug}` },
    ],
  };

  return (
    <article className="space-y-8 max-w-2xl mx-auto">
      <SEOHead
        title={post.metaTitle || `${post.title} | Muhammad Imran Blog`}
        description={post.metaDescription}
        path={`/blog/${post.slug}`}
        type="article"
        jsonLd={[articleSchema, breadcrumbJsonLd]}
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
        <Link href="/blog" className="hover:text-neutral-800 dark:hover:text-neutral-300">
          Blog
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-neutral-700 dark:text-neutral-300">{post.title}</span>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <Link
            href={`/blog?category=${post.category}`}
            className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            {BLOG_CATEGORIES[post.category].label}
          </Link>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-2">
            <MdCalendarToday size={16} />
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
          </div>
          <div className="flex items-center gap-2">
            <MdPerson size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <MdTimer size={16} />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </header>

      <Breakline />

      {/* Content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <BlogContent content={post.content} />
      </div>

      <Breakline />

      {/* Keywords */}
      <div className="space-y-3">
        <SectionHeading title="Keywords" icon={<MdLocalOffer />} />
        <div className="flex flex-wrap gap-2">
          {post.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-medium text-neutral-700 dark:text-neutral-300"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      <Breakline />

      {/* Navigation */}
      <div className="grid grid-cols-2 gap-4">
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`}>
            <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full">
              <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                <MdArrowBack size={14} />
                Previous
              </div>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-2">
                {prevPost.title}
              </h3>
            </SpotlightCard>
          </Link>
        ) : (
          <div />
        )}
        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`}>
            <SpotlightCard className="p-4 cursor-pointer hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors h-full text-right">
              <div className="flex items-center justify-end gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                Next
                <MdArrowForward size={14} />
              </div>
              <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 line-clamp-2">
                {nextPost.title}
              </h3>
            </SpotlightCard>
          </Link>
        ) : (
          <div />
        )}
      </div>

      {/* Back to blog */}
      <div className="text-center pt-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <MdArrowBack size={16} />
          Back to blog
        </Link>
      </div>
    </article>
  );
}
