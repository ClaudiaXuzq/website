import type { Experience } from "@/types/content";

export const experience = [
  {
    id: "experience-placeholder",
    title: "北京邮电大学  电信工程及管理专业",
    description: "2024.09 - 2028.07",
    meta: ["Education"],
    category: "other",
    temporary: false,
  },
  {
    id: "experience-placeholder",
    title: "北京大学市场经济研究中心",
    description: "2025.12 - 至今",
    meta: ["Research"],
    category: "other",
    temporary: false,
  },
] as const satisfies readonly Experience[];
