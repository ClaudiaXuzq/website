import { MDXRemote } from "next-mdx-remote/rsc";

type ArticleContentProps = {
  source: string;
};

export function ArticleContent({ source }: ArticleContentProps) {
  return (
    <div className="article-content">
      <MDXRemote source={source} />
    </div>
  );
}
