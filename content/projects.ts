import type { Project } from "@/types/content";

export const projects = [
  {
    id: "projects-placeholder",
    title: "项目内容整理中",
    description: "代表性量化、AI 与软件工程项目将在信息确认后发布。",
    meta: ["Quant", "AI", "Software"],
    category: "other",
    temporary: true,
  },
] as const satisfies readonly Project[];
