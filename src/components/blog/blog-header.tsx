import Link from "next/link";
import { siteContent } from "@content/site";

export function BlogHeader() {
  return (
    <header className="blog-header">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <Link className="blog-wordmark type-en-heading" href="/">
        {siteContent.name}
      </Link>
      <nav aria-label="Blog 导航">
        <ul className="blog-navigation">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
