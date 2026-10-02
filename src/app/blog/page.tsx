import type { Metadata } from "next";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogList } from "@/components/blog/blog-list";
import { SiteFooter } from "@/components/layout/site-footer";
import { getAllPosts } from "@/lib/blog";
import { siteContent } from "@content/site";

export const metadata: Metadata = {
  title: "Blog — Claudia Xu",
  description: "Claudia Xu 关于研究、工程、生活与持续学习的文章。",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="site-frame blog-shell">
      <BlogHeader />
      <main id="main-content" className="blog-index">
        <header className="blog-page-heading">
          <p className="section-label">Writing</p>
          <h1 className="type-en-heading" lang="en">Blog</h1>
          <p>关于研究、工程、生活与持续学习的记录。</p>
        </header>
        <BlogList posts={posts} />
      </main>
      <SiteFooter content={siteContent.footer} links={siteContent.socialLinks} />
    </div>
  );
}
