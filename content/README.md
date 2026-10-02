# Content

此目录是网站内容的主要编辑入口。

- `site.ts`：姓名、介绍、导航、栏目说明与外部链接。
- `experience.ts`：结构化经历。
- `research.ts`：首页使用的研究摘要。
- `projects.ts`：首页使用的项目摘要。
- `src/content/blog/`：Blog 的 `.md` / `.mdx` 正文与 frontmatter；首页和 Blog 页面会自动读取。
- `research/`：未来的 Research Detail MDX 文件。
- `projects/`：未来的 Project Case Study MDX 文件。

v1 只使用中文，不建立完整的多语言目录。未来可以在保持组件不变的情况下，将内容演化为按 locale 组织的结构。

Blog metadata 只维护在文章 frontmatter 中，不再使用独立的 `writing.ts`。
