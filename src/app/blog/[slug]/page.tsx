import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/blog/article-content";
import { BlogHeader } from "@/components/blog/blog-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { siteContent } from "@content/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return {
    title: `${post.title} — Claudia Xu`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headingClass = post.lang === "en" ? "type-en-heading" : "type-zh-heading";
  const bodyClass = post.lang === "en" ? "type-en-body" : "type-zh-body";

  return (
    <div className="site-frame blog-shell">
      <BlogHeader />
      <main id="main-content" className="article-main">
        <article className={`blog-article ${bodyClass}`} lang={post.lang}>
          <header className="article-header">
            <p className="article-kicker">Blog / {post.lang}</p>
            <h1 className={headingClass}>{post.title}</h1>
            <p className="article-description">{post.description}</p>
            <div className="article-meta">
              <time dateTime={post.date}>{post.date}</time>
              {post.author ? <span>来自 {post.author}</span> : null}
              <ul className="blog-tags" aria-label="文章标签">
                {post.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </header>
          <ArticleContent source={post.content} />
        </article>
      </main>
      <SiteFooter content={siteContent.footer} links={siteContent.socialLinks} />
    </div>
  );
}
