import type { ResearchItem } from "@/types/content";

export const research = [
  {
    id: "research-placeholder",
    title: "研究成果整理中",
    description: "论文、working papers 与 ongoing research 将在内容确认后发布。",
    meta: ["Papers", "Working Papers"],
    status: "temporary",
    temporary: true,
  },
] as const satisfies readonly ResearchItem[];
