import Link from "next/link";
import { TypewriterIntro } from "@/components/typewriter/typewriter-intro";
import { TypewriterSoundToggle } from "@/components/typewriter/typewriter-sound-toggle";
import type { NavigationItem } from "@/types/content";

type SiteHeaderProps = {
  name: string;
  navigation: readonly NavigationItem[];
};

export function SiteHeader({ name, navigation }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <Link
        className="wordmark"
        href="/"
        aria-label={`${name} 首页`}
      >
        <TypewriterIntro />
      </Link>
      <div className="header-tools">
        <nav aria-label="主要导航">
          <ul className="site-navigation">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <TypewriterSoundToggle />
      </div>
    </header>
  );
}
