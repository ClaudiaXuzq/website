import Link from "next/link";
import type { BlogMetadata } from "@/lib/blog";

type BlogListProps = {
  posts: readonly BlogMetadata[];
};

export function BlogList({ posts }: BlogListProps) {
  return (
    <ol className="blog-list">
      {posts.map((post) => (
        <li key={post.slug}>
          <article lang={post.lang}>
            <div className="blog-list-heading">
              <h2 className={post.lang === "en" ? "type-en-heading" : "type-zh-heading"}>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <p>{post.description}</p>
            <ul className="blog-tags" aria-label="文章标签">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        </li>
      ))}
    </ol>
  );
}
