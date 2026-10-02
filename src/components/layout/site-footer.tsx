import type { SocialLink } from "@/types/content";

type SiteFooterProps = {
  content: string;
  links: readonly SocialLink[];
};

export function SiteFooter({ content, links }: SiteFooterProps) {
  const availableLinks = links.filter(
    (link): link is SocialLink & { href: string } => Boolean(link.href),
  );

  return (
    <footer className="site-footer">
      <p>{content}</p>
      {availableLinks.length > 0 ? (
        <ul aria-label="外部链接">
          {availableLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="footer-note">联系方式将在确认后开放。</p>
      )}
    </footer>
  );
}
