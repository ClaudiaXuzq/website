import { MDXRemote } from "next-mdx-remote/rsc";

type ArticleContentProps = {
  source: string;
};

function normalizeLegacyMarkdown(source: string) {
  return source
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/?font(?:\s[^>]*)?>/gi, "");
}

export function ArticleContent({ source }: ArticleContentProps) {
  return (
    <div className="article-content">
      <MDXRemote source={normalizeLegacyMarkdown(source)} />
    </div>
  );
}
