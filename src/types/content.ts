export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type SocialLink = {
  label: "Email" | "GitHub" | "Resume";
  href?: string;
};

export type ContentLanguage = "zh-CN" | "en";

export type TypewriterPhrase = {
  text: string;
  language: ContentLanguage;
  fontRole: "zh-display" | "en-display";
};

export type SiteContent = {
  name: string;
  typewriterIntro: readonly [TypewriterPhrase, ...TypewriterPhrase[]];
  intro: {
    label: string;
    en: {
      label: string;
      title?: string;
      lines: readonly string[];
    };
  };
  navigation: readonly NavigationItem[];
  socialLinks: readonly SocialLink[];
  sections: Record<
    "experience" | "research" | "projects" | "writing",
    {
      title: string;
      description?: string;
    }
  >;
  footer: string;
};

export type HomeEntry = {
  id: string;
  href?: string;
  title: string;
  description: string;
  titleLanguage?: ContentLanguage;
  descriptionLanguage?: ContentLanguage;
  meta: readonly string[];
  temporary?: boolean;
};

export type Experience = HomeEntry & {
  category: "education" | "research" | "work" | "activity" | "other";
};

export type ResearchItem = HomeEntry & {
  status: "published" | "working-paper" | "ongoing" | "temporary";
};

export type Project = HomeEntry & {
  category: "ai" | "quant" | "software" | "other";
};

export type WritingItem = HomeEntry & {
  date?: `${number}-${number}-${number}`;
};
