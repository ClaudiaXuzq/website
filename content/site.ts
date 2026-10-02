import type { NavigationItem, SiteContent, SocialLink } from "@/types/content";

const navigation = [
  { label: "经历", href: "#experience" },
  { label: "研究", href: "#research" },
  { label: "项目", href: "#projects" },
  { label: "写作", href: "#writing" },
] as const satisfies readonly NavigationItem[];

const socialLinks = [
  {
    label: "Email",
    href: "mailto:cxu08579@gmail.com",
  },
  // {
  //   label: "GitHub",
  //   href: "https://github.com/your-username",
  // },
  // {
  //   label: "Resume",
  //   href: "/resume.pdf",
  // },
] as const satisfies readonly SocialLink[];

export const siteContent: SiteContent = {
  name: "Claudia Xu",
  typewriterIntro: [
    {
      text: "你好！我是徐子淇",
      language: "zh-CN",
      fontRole: "zh-display",
    },
    {
      text: "Hi! I'm Claudia Xu",
      language: "en",
      fontRole: "en-display",
    },
  ],
  intro: {
    label: "About",
    en: {
      label: "English",
      // title: "Quantitative Research, Finance, and AI Engineering",
      lines: [
        "I'm an engineer and writer working at the intersection of quantitative finance and AI. I'm currently studying Telecommunication Engineering and Management at BUPT while doing quantitative research and engineering work, and I'm interning at a mutual fund company.",
        "I see finance as the heart and circulatory system of the modern world: it moves the products of human labor across borders, industries, and generations, and shapes how resources are distributed throughout society. I want to help build financial systems that are not only more efficient in allocating capital and supporting human progress, but also fairer and more human-centered. I'm particularly interested in how AI, data, and software can contribute to both goals.",
        "Outside of engineering and finance, I spend much of my time playing football and running—especially long-distance and trail running—traveling, listening to music, reading, and writing. I'm also working on a science fiction novel 😁.",
      ],
    },
  },
  navigation,
  socialLinks,
  sections: {
    experience: {
      title: "Experience",
      // description: "教育、研究、实习与其他重要经历。",
    },
    research: {
      title: "Research",
      // description: "学术论文、working papers 与正在进行的研究。",
    },
    projects: {
      title: "Projects",
      // description: "量化研究、AI Engineering 与软件工程项目。",
    },
    writing: {
      title: "Blog / Writing",
      // description: "关于研究、工程与持续学习的长期记录。",
    },
  },
  footer: "Claudia Xu · my space",
};
