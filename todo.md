# Personal Website Development TODO

> 目标：从空目录构建一个长期维护的个人网站，用于展示 Experience、Research、Projects 和 Blog。
>
> 推荐技术：Next.js（App Router）、React、TypeScript、Tailwind CSS、MDX、Git、GitHub、Vercel。
>
> 架构原则：内容优先、静态生成、最少客户端 JavaScript；不引入 Backend、Database、Authentication、CMS 或独立 API，除非未来出现明确需求。

## 已确认的 Project Foundation 决策

- **Node.js：** Node.js 22 LTS；当前本机版本为 `v22.19.0`。
- **Package Manager：** npm；使用 `package-lock.json`，统一采用 `npm install`、`npm run dev` 和 `npm run build`。
- **Website Name：** Claudia Xu。
- **Positioning：** 个人学术 / 技术 Portfolio，重点展示 Quantitative Research、Finance、AI Engineering 和 Software Development。
- **Default Language：** 简体中文（`zh-CN`）；v1 不引入 i18n framework、语言切换器或 `/zh`、`/en` 双路由。
- **Future i18n boundary：** 保持 content 与 presentation 分离；reusable UI 不硬编码大量文案；布局不依赖固定中文字数；未来英文内容复用现有 components 和 design system。
- **Timezone：** `Asia/Shanghai`（UTC+8）；仅表示发布日期时优先使用 `YYYY-MM-DD` date-only 格式。
- **Domain：** TBD；首版使用 Vercel 默认域名，独立域名不阻塞开发。
- **Public entries：** Email、GitHub、Resume；具体地址尚待提供，不创建虚假链接。
- **Design direction：** Minimal、Clean、Elegant、Content-first、Typography-focused。
- **Primary reference：** [leerob.com](https://leerob.com/)；提取设计原则，不直接复制。
- **Signature visual：** Hero / About 附近的 Interactive Financial Globe；在独立阶段评估 Three.js / React Three Fiber，不纳入 Foundation。

## Priority 定义

- **MVP**：第一版正式上线前必须完成。
- **Post-MVP**：上线后建议完善。
- **Optional**：有真实需求时再开发。

## 推荐内容架构

- `Experience`：TypeScript data file，适合结构化时间线。
- `Research`：MDX + frontmatter，同时支持列表摘要和可选详情页。
- `Projects`：MDX + frontmatter，同时支持项目卡片和详细 case study。
- `Blog`：MDX + frontmatter，支持代码、公式、图片、表格和目录。
- `Site identity`：单独的 TypeScript config，集中管理姓名、简介、链接、域名和 Resume。
- 所有内容在构建时读取并校验；页面不直接解析文件或 hard-code 大量内容。

## 目标路由

```text
/
/experience
/research
/research/[slug]
/projects
/projects/[slug]
/blog
/blog/[slug]
```

## 目标目录结构

```text
.
├── content/
│   ├── blog/
│   ├── projects/
│   └── research/
├── public/
│   ├── images/
│   └── resume/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── blog/
│   │   ├── experience/
│   │   ├── layout/
│   │   ├── mdx/
│   │   ├── projects/
│   │   ├── research/
│   │   └── ui/
│   ├── config/
│   ├── data/
│   ├── lib/
│   │   └── content/
│   └── types/
├── tests/
├── README.md
└── todo.md
```

---

## Phase 1 — Project Foundation

### 1.1 确认开发环境与基础决策

- [x] 确认开发环境与基础决策

**目标：** 确定项目初始化所需的运行环境和站点基本信息。

**需要完成：**

- [x] 使用 Node.js 22 LTS；当前环境为 Node.js `v22.19.0`、npm `10.9.3`。
- [x] 使用 npm 和 `package-lock.json`，不使用 pnpm 或 yarn。
- [x] 网站名称暂定为 Claudia Xu。
- [x] v1 使用简体中文（`zh-CN`）和 `Asia/Shanghai` 时区。
- [x] 正式域名暂未决定；使用 Vercel 默认域名进行首版部署与测试。
- [x] 第一版公开 Email、GitHub 和 Resume 入口，具体地址稍后提供。
- [x] v1 不加入完整 i18n 系统、语言切换器或语言前缀路由。
- [x] 视觉方向为 Minimal、Clean、Elegant、Content-first、Typography-focused。

**预计涉及文件：** 暂无；结论随后记录到 `README.md`。

**依赖：** 无。

**完成标准：** 上述决策均有明确答案，可以无歧义地初始化项目。**已完成。**

**优先级：** MVP

### 1.2 初始化 Next.js 项目

- [x] 初始化 Next.js 项目

**目标：** 获得最小可运行的 Next.js 项目。

**需要完成：**

- 使用官方初始化工具。
- 启用 TypeScript、App Router、Tailwind CSS、ESLint 和 `src/` 目录。
- 确认路径别名。
- 使用 npm 并提交 `package-lock.json`。
- 设置页面根语言为 `zh-CN`，不安装 i18n dependency。
- 添加 `.nvmrc`，声明 Node.js 22；在 `package.json` 中记录兼容的 Node.js 22 engine 要求。
- 移除无关演示内容，保留可运行首页。

**预计涉及文件：** `package.json`、`src/app/`、`tsconfig.json`、`next.config.*`、ESLint 配置。

**依赖：** 1.1。

**完成标准：** Node.js 22 环境下可通过 npm 安装依赖；开发服务器正常启动；页面根语言正确；lint、TypeScript 检查和 production build 通过。**已完成。**

**优先级：** MVP

### 1.3 初始化 Git 与项目文档

- [ ] 初始化 Git 与项目文档

**目标：** 建立可回溯的版本历史和基础使用说明。

**需要完成：**

- 初始化 Git。
- 检查 `.gitignore`。
- 编写 README，记录技术栈和开发命令。
- 创建干净的初始提交。

**预计涉及文件：** `.gitignore`、`README.md`、`.git/`。

**依赖：** 1.2。

**完成标准：** 初始提交不包含缓存、构建产物、密钥或无关文件。

**优先级：** MVP

**我需要参与决定：** 初始化前暂无阻塞项。GitHub repository 的 public/private 权限可在执行 12.1 前决定。

**Codex 可以主要负责：** 环境检查、初始化、配置和基础文档。

**Phase 验证：** `dev`、`lint`、TypeScript 检查和 `build` 均成功。

---

## Phase 2 — Project Architecture

### 2.1 建立目录与模块边界

- [ ] 建立目录与模块边界

**目标：** 清晰分离路由、组件、配置、内容、数据、类型和工具。

**需要完成：**

- 建立 `components`、`config`、`data`、`lib`、`types` 和 `content`。
- 约定组件、类型、slug 和内容文件命名规则。
- 避免创建没有实际使用者的抽象层。

**预计涉及文件：** `src/`、`content/`、`public/` 下的相关目录。

**依赖：** 1.2。

**完成标准：** README 能解释各目录职责；每类内容只有一个权威来源。

**优先级：** MVP

### 2.2 建立全局站点配置

- [ ] 建立全局站点配置

**目标：** 集中管理个人信息、站点 URL、社交链接和导航。

**需要完成：**

- 定义 `siteConfig`。
- 定义主导航配置。
- 支持 Email、GitHub、Resume 和可选社交链接。
- 将默认 locale 设为 `zh-CN`，将时区设为 `Asia/Shanghai`。
- 未提供的 Email、GitHub、Resume 不渲染为虚假或空链接。
- 将可变 UI 文案集中在页面或配置层，避免散落在 reusable components 中。
- 避免相同信息散落在多个组件中。

**预计涉及文件：** `src/config/site.ts`、`src/config/navigation.ts`、相关类型。

**依赖：** 2.1。

**完成标准：** 修改一个配置即可更新全站相同个人信息。

**优先级：** MVP

### 2.3 建立核心路由骨架

- [ ] 建立核心路由骨架

**目标：** 尽早获得所有核心 URL 可访问的 runnable 网站。

**需要完成：**

- 建立 Home、Experience、Research、Projects 和 Blog 页面。
- 建立 Research、Project、Blog 动态详情路由。
- 使用语义化占位内容，不提前锁定视觉风格。

**预计涉及文件：** `src/app/**/page.tsx`。

**依赖：** 2.1、2.2。

**完成标准：** 所有静态路由可访问，动态路由具备明确的内容接入位置。

**优先级：** MVP

**我需要参与决定：** 导航名称、顺序、Resume 是否公开。

**Codex 可以主要负责：** 目录、路由、布局和配置实现。

**Phase 验证：** 手动访问全部核心路由，运行 production build。

---

## Phase 3 — Content Architecture

### 3.1 定义 Experience 数据模型

- [ ] 定义 Experience 数据模型

**目标：** 让首页和 Experience 页面读取同一个结构化数据源。

**需要完成：**

- 定义 category、organization、role、location、日期、summary 和 highlights。
- 定义 links、featured 和 order 等可选字段。
- 约定机器可排序的日期格式和展示规则。
- v1 内容使用中文；数据结构不把语言写死在展示组件中，为未来按 locale 拆分数据保留空间。

**预计涉及文件：** `src/types/experience.ts`、`src/data/experience.ts`。

**依赖：** 2.1。

**完成标准：** 新增一段经历只需添加数据，不需要修改页面逻辑。

**优先级：** MVP

### 3.2 定义 Research 内容模型

- [ ] 定义 Research 内容模型

**目标：** 使用统一内容驱动列表、首页、详情页和关联链接。

**需要完成：**

- 定义 title、slug、authors、venue、year、status 和 summary。
- 支持 PDF、code、related project、external links、tags、featured、draft 和 `hasDetail`。
- 定义 Published、Working Paper、Ongoing 的分类规则。
- 检查重复 slug 和非法元数据。
- 日期优先采用 `YYYY-MM-DD` 或仅年份字段，不为 date-only 内容引入时区转换。

**预计涉及文件：** `src/types/research.ts`、`src/lib/content/research.ts`、`content/research/`。

**依赖：** 2.1。

**完成标准：** 新增合法 MDX 后自动进入正确分类；非法内容产生明确构建错误。

**优先级：** MVP

### 3.3 定义 Project 内容模型

- [ ] 定义 Project 内容模型

**目标：** 同时支持项目卡片和详细 case study。

**需要完成：**

- 定义 title、slug、summary、category、status 和日期。
- 支持 tech stack、GitHub、Demo、图片、关联研究、featured、draft 和 `hasDetail`。
- 约定详情正文的 Problem、Motivation、Contribution、Architecture、Results 和 Lessons 结构。
- 日期优先采用 `YYYY-MM-DD`，避免无意义 timestamp。

**预计涉及文件：** `src/types/project.ts`、`src/lib/content/projects.ts`、`content/projects/`。

**依赖：** 2.1。

**完成标准：** 新增项目只需添加 MDX 和资源，不需要修改 Projects 页面。

**优先级：** MVP

### 3.4 定义 Blog frontmatter schema

- [ ] 定义 Blog frontmatter schema

**目标：** 为长期发布技术文章建立稳定格式。

**需要完成：**

- 定义 title、slug、description、publishedAt、updatedAt、tags、coverImage、draft 和 featured。
- 自动计算 reading time。
- 约定日期和 tag slug 格式。
- 拒绝重复 slug 和无效日期。
- 发布日期采用 `YYYY-MM-DD`；以 `Asia/Shanghai` 解释展示语义，不做无必要的 timestamp conversion。
- v1 使用中文 MDX；未来可按 locale 扩展内容目录或 metadata，而无需重写渲染组件。

**预计涉及文件：** `src/types/content.ts`、`src/lib/content/blog.ts`、`content/blog/`。

**依赖：** 2.1。

**完成标准：** 新增 MDX 后能够被读取、排序和校验，不修改页面逻辑。

**优先级：** MVP

### 3.5 建立统一内容查询层

- [ ] 建立统一内容查询层

**目标：** 页面不直接处理文件系统、frontmatter 或排序细节。

**需要完成：**

- 提供 get-all、get-by-slug 和 get-featured 查询。
- 在 production 中统一过滤 draft。
- 解析 Research 与 Project 的关联。
- 对内容 schema、重复 slug 和关联进行构建期校验。

**预计涉及文件：** `src/lib/content/`、共享内容类型。

**依赖：** 3.1–3.4。

**完成标准：** 页面只调用类型安全查询函数；未知 slug 可交给 `notFound()`。

**优先级：** MVP

**我需要参与决定：** 字段含义、分类、排序、公开范围和内容准确性。

**Codex 可以主要负责：** 类型、schema、读取器、校验和关联逻辑。

**Phase 验证：** 正确内容可构建；无效日期、重复 slug 和错误关联被明确拒绝。

---

## Phase 4 — Design Reference & Design System

### 4.1 收集并拆解设计参考

- [ ] 收集并拆解设计参考

**目标：** 在大量实现 UI 前确定设计方向。

**需要完成：**

- [x] Primary reference 确定为 [leerob.com](https://leerob.com/)。
- [x] 初步方向确定为 Minimal、Clean、Elegant、Content-first、Typography-focused。
- [ ] 分析参考站的 typography、留白、content width、信息层级和 writing presentation。
- [ ] 形成适配 Claudia Xu 内容结构的 design brief。
- [ ] 明确只提取设计原则，不复制具体实现或视觉细节。
- [ ] 如有必要，再补充 2–4 个参考网站以覆盖 Research 和 Project 展示。

**预计涉及文件：** `docs/design.md` 或 `README.md`。

**依赖：** 2.3。

**完成标准：** 已有明确方向和 primary reference；完成可执行 design brief 后，本任务全部完成。

**优先级：** MVP

### 4.2 定义基础设计 token

- [ ] 定义基础设计 token

**目标：** 统一字体、颜色、间距、圆角、容器和响应式规则。

**需要完成：**

- 定义背景、文字、边框和强调色等语义 token。
- 定义正文与标题比例。
- 定义页面容器和长文阅读宽度。
- 采用 mobile-first，避免过多断点。

**预计涉及文件：** `src/app/globals.css`、Tailwind 相关配置。

**依赖：** 4.1。

**完成标准：** 页面不需要反复 hard-code 相同颜色、间距和宽度。

**优先级：** MVP

### 4.3 确定主题策略

- [ ] 确定并实现主题策略

**目标：** 决定第一版采用单主题还是 light/dark 双主题。

**需要完成：**

- MVP 可先采用一个成熟主题或跟随系统主题。
- 如实现手动切换，处理持久化和首屏闪烁。
- 检查所有主题的颜色对比度。

**预计涉及文件：** 全局样式、根布局、可选主题组件。

**依赖：** 4.2。

**完成标准：** 主题行为明确，不出现不可读内容或 hydration 问题。

**优先级：** 单主题为 MVP；手动切换为 Post-MVP

### 4.4 规划 Interactive Financial Globe

- [ ] 规划 Interactive Financial Globe

**目标：** 为 Hero / About 附近的原创交互式地球定义视觉叙事、技术边界和渐进增强策略。

**需要完成：**

- 明确全球节点、网络连接和流动效果所表达的金融含义。
- 产出静态构图、交互状态和动效说明，避免无目的装饰。
- 评估原生 Three.js 与 React Three Fiber；只有收益明确时才加入依赖。
- 设计静态 fallback、reduced-motion 模式和不支持 WebGL 时的降级。
- 设定移动端、低性能设备、加载体积和 Core Web Vitals 预算。
- 确保 Globe 不阻塞 Hero 文本、主要 CTA、SEO 或键盘浏览。

**预计涉及文件：** `docs/globe-design.md`、未来 Globe component、相关 assets；本任务规划阶段不要求安装依赖。

**依赖：** 4.1、4.2；实现依赖 Homepage 基础布局。

**完成标准：** 有明确视觉规格、交互说明、技术选择记录、性能预算和无障碍降级方案，才能进入实现。

**优先级：** Post-MVP；如果它被确定为首发品牌核心，可在基础网站稳定后提升为 MVP

**我需要参与决定：** design brief 的最终取舍、字体和颜色、主题策略，以及 Globe 的视觉叙事与首发优先级。

**Codex 可以主要负责：** 将设计决定转换为 token 和响应式规则。

**Phase 验证：** 在手机和桌面宽度检查排版、间距、对比度和主题。

---

## Phase 5 — Shared UI

### 5.1 实现全局布局、Navbar 和 Footer

- [ ] 实现全局布局、Navbar 和 Footer

**目标：** 建立全站一致的导航和页面结构。

**需要完成：**

- 实现 skip link、header、main 和 footer。
- 实现桌面与移动导航。
- 显示当前路由状态。
- 统一外部链接行为。
- 为 Email、GitHub、Resume 预留位置；配置缺失时隐藏对应入口，不使用虚假链接。

**预计涉及文件：** `src/app/layout.tsx`、`src/components/layout/`。

**依赖：** 2.2、4.2。

**完成标准：** 所有页面共享布局，键盘可操作导航，移动菜单正常。

**优先级：** MVP

### 5.2 实现基础 UI components

- [ ] 实现基础 UI components

**目标：** 统一常见布局和交互，同时避免过度抽象。

**需要完成：**

- 实现 Container、Section、Heading、Button/Link 和 Tag。
- 提供一致的 focus、hover 和 disabled 状态。
- 只有存在真实复用场景时才提取组件。

**预计涉及文件：** `src/components/ui/`。

**依赖：** 4.2。

**完成标准：** 核心页面可复用这些组件，组件 API 简单清晰。

**优先级：** MVP

### 5.3 实现领域展示组件

- [ ] 实现领域展示组件

**目标：** 统一四类内容的摘要显示。

**需要完成：**

- 实现 ExperienceItem、ResearchCard、ProjectCard 和 BlogCard。
- 将展示逻辑与内容查询逻辑分离。
- 正确处理可选图片、链接和缺失字段。

**预计涉及文件：** `src/components/experience/`、`research/`、`projects/`、`blog/`。

**依赖：** 3.1–3.5、5.2。

**完成标准：** 首页与列表页能使用同一组件或清晰变体，不复制卡片逻辑。

**优先级：** MVP

**我需要参与决定：** 导航顺序、Footer 内容和外链展示方式。

**Codex 可以主要负责：** 组件、键盘行为和响应式导航。

**Phase 验证：** 测试键盘遍历、移动菜单、长标题和空字段。

---

## Phase 6 — Core Pages

### 6.1 实现 Homepage

- [ ] 实现 Homepage

**目标：** 让访问者快速理解个人定位与代表成果。

**需要完成：**

- Hero 和 About。
- Selected Experience、Research 和 Projects。
- Latest Blog Posts。
- Email、GitHub、Resume 入口。
- 链接到各完整列表页。
- 为未来 Interactive Financial Globe 保留可扩展区域；MVP 不因 Globe 尚未实现而阻塞。

**预计涉及文件：** `src/app/page.tsx`、首页相关组件。

**依赖：** 3.5、5.1–5.3。

**完成标准：** 内容来自统一数据源；调整精选内容不需要修改布局代码。

**优先级：** MVP

### 6.2 实现 Experience 页面

- [ ] 实现 Experience 页面

**目标：** 按清晰时间和类别展示完整经历。

**需要完成：**

- 选择 timeline、分组列表或组合展示方式。
- 展示日期、机构、角色、摘要和 highlights。
- 正确处理 ongoing 经历。

**预计涉及文件：** `src/app/experience/page.tsx`、Experience 组件。

**依赖：** 3.1、5.3。

**完成标准：** 页面完全由数据生成，移动端时间信息依然清楚。

**优先级：** MVP

### 6.3 实现 Research 列表页

- [ ] 实现 Research 列表页

**目标：** 分类展示 Published、Working Papers 和 Ongoing Research。

**需要完成：**

- 展示作者、venue、year、status 和资源链接。
- 仅在存在详情内容时显示详情入口。
- 为暂无内容的分类提供合理空状态。

**预计涉及文件：** `src/app/research/page.tsx`、Research 组件。

**依赖：** 3.2、3.5、5.3。

**完成标准：** 分类和排序自动生成，PDF、Code、Project 链接正确。

**优先级：** MVP

### 6.4 实现 Projects 列表页

- [ ] 实现 Projects 列表页

**目标：** 清晰展示项目类别、贡献、技术栈和成果入口。

**需要完成：**

- 实现可扫描的卡片布局。
- MVP 可按类别分组，不做复杂客户端过滤。
- 显示 GitHub、Demo 和详情入口。

**预计涉及文件：** `src/app/projects/page.tsx`、Project 组件。

**依赖：** 3.3、3.5、5.3。

**完成标准：** 新增项目自动出现；缺少封面或外链时布局不破坏。

**优先级：** MVP

**我需要参与决定：** 首页叙事、精选内容、排序、个人简介和 CTA。

**Codex 可以主要负责：** 数据查询、页面组合、响应式布局和空状态。

**Phase 验证：** 内容与源文件一致；空状态、链接和移动布局正常。

---

## Phase 7 — MDX & Detail Pages

### 7.1 建立 MDX pipeline

- [ ] 建立 MDX pipeline

**目标：** 统一渲染 Blog、Research 和 Project 长篇内容。

**需要完成：**

- 解析 frontmatter 和 MDX body。
- 支持 GFM、syntax highlighting、数学公式、图片、表格和链接。
- 建立受控 MDX component map。
- 只编译 repository 中的可信内容。

**预计涉及文件：** `src/components/mdx/`、`src/lib/content/`、Next 配置和样式。

**依赖：** 3.2–3.5、4.2。

**完成标准：** 示例 MDX 能正确显示代码、公式、图片、表格、内链和外链。

**优先级：** MVP

### 7.2 实现 Research Detail Page

- [ ] 实现 Research Detail Page

**目标：** 为需要详细说明的研究提供稳定页面。

**需要完成：**

- 静态生成有效 slug。
- 展示元数据、摘要、正文和资源链接。
- 没有详情的研究不显示误导入口。
- 非法 slug 调用 `notFound()`。

**预计涉及文件：** `src/app/research/[slug]/page.tsx`。

**依赖：** 7.1。

**完成标准：** 有效研究可访问，无效 slug 返回正式 404。

**优先级：** Post-MVP；首发已有详细 Research 时提升为 MVP

### 7.3 实现 Project Detail Page

- [ ] 实现 Project Detail Page

**目标：** 系统展示重要项目的背景、贡献、架构和结果。

**需要完成：**

- 渲染 MDX 正文。
- 支持截图、架构图、GitHub、Demo 和关联研究。
- 静态生成合法 slug。
- 处理可选章节。

**预计涉及文件：** `src/app/projects/[slug]/page.tsx`。

**依赖：** 7.1。

**完成标准：** 至少一个代表项目有完整详情，无效 slug 返回 404。

**优先级：** MVP

### 7.4 实现 Blog index 与详情页

- [ ] 实现 Blog index 与详情页

**目标：** 支持长期发布和阅读技术文章。

**需要完成：**

- Blog index 按发布日期倒序。
- 详情页显示标题、日期、tags、reading time 和正文。
- 生成 heading anchor 和 Table of Contents。
- production 中隐藏 draft。
- 暂不把全文搜索作为 MVP。

**预计涉及文件：** `src/app/blog/page.tsx`、`src/app/blog/[slug]/page.tsx`、Blog/MDX 组件。

**依赖：** 3.4、7.1。

**完成标准：** 添加文章后自动出现在列表和静态路由，技术内容正确显示。

**优先级：** MVP

**我需要参与决定：** 正文结构、代码样式、公式样例、图片和 alt 文本。

**Codex 可以主要负责：** MDX 编译、组件映射、目录、静态路由和错误处理。

**Phase 验证：** 构建一篇包含代码、公式、表格、图片和 TOC 的示例文章。

---

## Phase 8 — Responsive Design & Accessibility

### 8.1 完成响应式适配

- [ ] 完成响应式适配

**目标：** 在 Desktop、Tablet 和 Mobile 上保持内容可读、导航可用。

**需要完成：**

- 从窄屏开始检查所有页面。
- 处理长标题、代码、表格、公式和横向溢出。
- 图片使用合理尺寸和比例。
- 不依赖 hover 才能发现重要操作。

**预计涉及文件：** 页面、组件和 MDX 样式。

**依赖：** 6.1–7.4。

**完成标准：** 常见宽度没有页面级横向滚动、遮挡或不可操作内容。

**优先级：** MVP

### 8.2 完成 Accessibility 审查

- [ ] 完成 Accessibility 审查

**目标：** 达到合理的 WCAG 2.2 AA 基础水平。

**需要完成：**

- 检查 semantic landmarks、heading hierarchy 和链接文案。
- 检查键盘导航、focus 和 skip link。
- 为信息图片提供 alt，为装饰图片使用空 alt。
- 只在必要时使用 ARIA。
- 检查颜色对比度和 reduced motion。

**预计涉及文件：** 全站页面、布局和组件。

**依赖：** 8.1。

**完成标准：** 纯键盘可完成主要浏览流程，自动审计没有严重问题。

**优先级：** MVP

**我需要参与决定：** 小屏内容优先级和可接受的视觉简化。

**Codex 可以主要负责：** 断点、键盘行为、语义结构、对比度和审计修复。

**Phase 验证：** 设备模拟、纯键盘测试和 Lighthouse accessibility audit。

---

## Phase 9 — SEO, Errors & Performance

### 9.1 建立页面级 metadata

- [ ] 建立页面级 metadata

**目标：** 为搜索结果和社交分享提供准确摘要。

**需要完成：**

- 定义全局 title template 和 description。
- 添加 canonical URL、Open Graph 和 Twitter Card。
- 为内容详情页动态生成 metadata。
- 准备默认分享图。
- v1 metadata 使用中文；正式 description 在 SEO 阶段确定，不阻塞项目初始化。
- 域名未确定时使用环境感知的 site URL；正式绑定域名后统一更新 canonical base。

**预计涉及文件：** `src/app/layout.tsx`、`src/lib/metadata.ts`、public assets、详情页。

**依赖：** 2.2、核心页面。

**完成标准：** 每个公开页面具有唯一 title、合理 description 和 canonical URL。

**优先级：** MVP

### 9.2 实现 sitemap、robots 与 structured data

- [ ] 实现搜索引擎发现机制

**目标：** 让公开静态内容被正确发现和索引。

**需要完成：**

- sitemap 包含所有非 draft 公开页面。
- robots 使用正式站点 URL。
- 首页可添加 Person/ProfilePage JSON-LD。
- Blog 可添加 BlogPosting；只输出可靠字段。

**预计涉及文件：** `src/app/sitemap.ts`、`src/app/robots.ts`、structured data 组件。

**依赖：** 3.5、9.1。

**完成标准：** sitemap URL 有效，draft 和无详情页面不会错误出现。

**优先级：** sitemap/robots 为 MVP；扩展 structured data 为 Post-MVP

### 9.3 实现 404 与内容错误处理

- [ ] 实现 404 与内容错误处理

**目标：** 正确处理无效 slug、缺失资源和损坏关联。

**需要完成：**

- 创建自定义 404 页面。
- 动态路由使用 `notFound()`。
- 构建时报告重复 slug、缺失资源和无效关联。
- 可选外部资源缺失时合理降级。

**预计涉及文件：** `src/app/not-found.tsx`、内容读取和校验模块。

**依赖：** 3.5、详情路由。

**完成标准：** 无效 URL 返回 404；内容错误在构建期指出具体文件。

**优先级：** MVP

### 9.4 完成基础性能优化

- [ ] 完成基础性能优化

**目标：** 在不提前微优化的前提下获得快速静态网站。

**需要完成：**

- 使用 `next/image` 和 `next/font`。
- 默认采用 Server Components。
- 避免不必要的客户端 JavaScript。
- 为图片提供尺寸，非首屏资源合理 lazy load。
- 检查 bundle 和 Core Web Vitals。

**预计涉及文件：** 布局、图片组件、字体和 Next 配置。

**依赖：** 核心页面完成。

**完成标准：** 无明显 layout shift、无不必要大资源、无严重性能警告。

**优先级：** MVP

**我需要参与决定：** 正式域名、站点描述和社交分享图内容。

**Codex 可以主要负责：** metadata、sitemap、robots、404 和性能修复。

**Phase 验证：** 检查 metadata、sitemap、robots、404、production build 和 Lighthouse。

---

## Phase 10 — Code Quality & Testing

### 10.1 固化代码质量规则

- [ ] 固化代码质量规则

**目标：** 保持长期代码风格和目录组织一致。

**需要完成：**

- 配置 ESLint。
- 决定是否加入 Prettier。
- 增加独立 TypeScript check 命令。
- 记录组件、文件、类型和内容命名规范。

**预计涉及文件：** lint/format 配置、`package.json`、README。

**依赖：** 1.2、主要目录结构。

**完成标准：** lint、format check 和 typecheck 可重复运行且没有 warning。

**优先级：** MVP

### 10.2 添加高价值自动测试

- [ ] 添加高价值自动测试

**目标：** 保护容易影响发布的行为，而不是追求覆盖率数字。

**需要完成：**

- 测试内容 schema、排序、draft 过滤和重复 slug。
- 测试关键页面可以生成。
- Post-MVP 可添加最小浏览器测试覆盖导航和代表详情页。
- 不为纯展示组件添加低价值 snapshot tests。

**预计涉及文件：** `tests/`、测试配置、`package.json`。

**依赖：** 3.5、核心页面。

**完成标准：** 常见内容错误可被稳定、快速的测试捕获。

**优先级：** 内容测试为 MVP；浏览器 E2E 为 Post-MVP

### 10.3 建立链接与本地资源检查

- [ ] 建立链接与本地资源检查

**目标：** 防止页面、图片、PDF 和内容关联随维护失效。

**需要完成：**

- 构建期检查内部 slug 和本地资源。
- 部署前检查站内链接。
- 外部链接检查定期运行，不因网络波动阻塞每次开发。

**预计涉及文件：** 检查脚本、`package.json`、可选 CI 配置。

**依赖：** 内容和路由稳定。

**完成标准：** 不存在已知破损站内链接或缺失本地资源。

**优先级：** 内部检查为 MVP；周期性外链检查为 Post-MVP

**我需要参与决定：** 测试投入和格式化偏好。

**Codex 可以主要负责：** 工具配置、测试、检查脚本和修复。

**Phase 验证：** lint、typecheck、tests、link check 和 build 全部通过。

---

## Phase 11 — Content & Production Verification

### 11.1 完成第一版真实内容

- [ ] 完成第一版真实内容

**目标：** 确保上线网站没有虚构信息、占位内容或无效入口。

**需要完成：**

- 补全个人介绍和联系方式。
- 添加核心 Experience、Research 和 Projects。
- 至少准备一篇代表性 Blog，或设计诚实的空状态。
- 更新 Resume。
- 校对日期、作者、链接、拼写和隐私信息。

**预计涉及文件：** `src/config/site.ts`、Experience data、`content/`、`public/`。

**依赖：** 核心功能完成。

**完成标准：** 内容经本人确认，没有 lorem ipsum、假链接或不应公开的信息。

**优先级：** MVP

### 11.2 执行 Production Verification

- [ ] 执行 Production Verification

**目标：** 使用接近生产的方式检查完整网站。

**需要完成：**

- 运行 lint、typecheck、tests 和 build。
- 本地启动 production build。
- 检查设备宽度、metadata、图片、公式和链接。
- 检查 sitemap、robots、404 和所有核心路由。
- 处理 console 和构建 warning。

**预计涉及文件：** 问题对应的页面、组件、内容或配置。

**依赖：** 11.1 和所有 MVP 开发任务。

**完成标准：** 所有检查通过，并形成可复用的 deployment checklist。

**优先级：** MVP

**我需要参与决定：** 所有经历、论文状态、作者顺序、项目成果和公开范围。

**Codex 可以主要负责：** 格式化内容、资源优化和执行发布检查。

**Phase 验证：** 从 clean install 开始的 production build 和 smoke test 成功。

---

## Phase 12 — GitHub, Vercel & Domain

### 12.1 创建并连接 GitHub repository

- [ ] 创建并连接 GitHub repository

**目标：** 将本地历史安全同步到远程。

**需要完成：**

- 创建 public 或 private repository。
- 设置 remote 并推送默认分支。
- 确认没有密钥、缓存或不必要的大文件。
- 可选配置基础 CI。

**预计涉及文件：** Git metadata；可选 `.github/workflows/ci.yml`。

**依赖：** 1.3；建议在开发早期完成远程备份。

**完成标准：** 新 clone 可以安装依赖并成功构建。

**优先级：** MVP

### 12.2 建立 Vercel Preview Deployment

- [ ] 建立 Vercel Preview Deployment

**目标：** 在正式发布前验证真实托管环境。

**需要完成：**

- 导入 GitHub repository。
- 确认 framework、安装和 build 设置。
- 检查 preview URL 和提交触发部署。
- 确认没有不必要环境变量。

**预计涉及文件：** 通常无需额外文件；仅在特殊需求时加入 Vercel 配置。

**依赖：** 11.2、12.1。

**完成标准：** Preview build 成功，页面、资源和 metadata 正常。

**优先级：** MVP

### 12.3 发布 Production

- [ ] 发布 Production

**目标：** 建立可重复的正式发布流程。

**需要完成：**

- 确定 production branch。
- 执行最终验证。
- 部署并执行上线后 smoke test。
- 记录回滚和重新部署方式。

**预计涉及文件：** `README.md` 或部署文档。

**依赖：** 12.2。

**完成标准：** Production URL 稳定可访问，关键路由无错误。

**优先级：** MVP

### 12.4 配置 Custom Domain

- [ ] 配置 Custom Domain

**目标：** 使用长期稳定的个人域名访问网站。

**需要完成：**

- 选择 apex 或 `www` 为主域名。
- 配置 DNS 和 HTTPS。
- 将另一种域名形式重定向到主域名。
- 更新 canonical、sitemap 和站点配置 URL。

**预计涉及文件：** `src/config/site.ts`；Vercel 和 DNS 外部配置。

**依赖：** 12.3、已拥有域名。

**完成标准：** HTTPS 正常，`www` 与 non-www 只有一个 canonical 版本。

**优先级：** Post-MVP（当前 Domain 为 TBD，首版使用 Vercel 默认域名）

**我需要参与决定：** 仓库权限、Vercel 账号、域名购买、主域名和 DNS 授权。

**Codex 可以主要负责：** 配置指导、部署验证和问题排查。

**Phase 验证：** 从干净浏览器访问正式域名，检查 HTTPS、重定向和核心路由。

---

## Phase 13 — Long-term Maintenance & Enhancements

### 13.1 编写内容维护手册

- [ ] 编写内容维护手册

**目标：** 未来更新内容时不需要修改页面逻辑或依赖个人记忆。

**需要完成：**

- 记录添加 Experience、Research、Project 和 Blog 的步骤。
- 提供 frontmatter 模板。
- 记录图片、PDF、slug、draft 和关联规则。
- 记录修改个人信息和 Resume 的位置。
- 记录本地验证和发布流程。

**预计涉及文件：** `README.md` 或 `docs/content-guide.md`。

**依赖：** 内容架构稳定。

**完成标准：** 按文档可以独立添加四类内容并成功构建。

**优先级：** MVP

### 13.2 评估 Analytics

- [ ] 评估并按需添加 Analytics

**目标：** 只收集真正有用且符合隐私要求的访问趋势。

**需要完成：**

- 先明确需要回答的数据问题。
- 优先评估低配置的 Vercel Analytics。
- 只有需要复杂营销分析时才考虑 Google Analytics。
- 检查 cookie 和隐私披露要求。

**预计涉及文件：** 根布局、隐私说明和平台配置。

**依赖：** Production 上线。

**完成标准：** 指标目标明确，不收集不必要的数据。

**优先级：** Optional

### 13.3 扩展 Blog 内容发现功能

- [ ] 添加 Blog tags、RSS 与可选搜索

**目标：** 在文章数量增长后改善内容发现。

**需要完成：**

- 根据文章规模决定是否增加 tag routes。
- 提供 RSS/Atom feed。
- 文章较多后再添加静态客户端搜索。
- 避免为少量文章提前增加依赖。

**预计涉及文件：** Blog routes、内容查询和 feed 生成模块。

**依赖：** Blog 已积累足够内容。

**完成标准：** 功能由真实内容规模驱动，并保持静态部署能力。

**优先级：** RSS/tags 为 Post-MVP；搜索为 Optional

### 13.4 建立定期维护流程

- [ ] 建立定期维护流程

**目标：** 降低长期失修和一次性大升级风险。

**需要完成：**

- 定期小批次更新 dependencies。
- 检查 broken links、Resume、Research 状态和项目信息。
- 检查 Lighthouse、域名续费和部署状态。
- 避免跨越多个 Next.js 大版本后一次性升级。

**预计涉及文件：** README、维护清单和可选 GitHub 配置。

**依赖：** 网站上线。

**完成标准：** 建立明确的月度或季度维护清单。

**优先级：** Post-MVP

**我需要参与决定：** Analytics、隐私偏好、发布节奏和后续功能优先级。

**Codex 可以主要负责：** 集成、维护文档、自动检查和升级支持。

**Phase 验证：** 按维护文档新增一项内容并完成一次完整部署。

---

## MVP Release Checklist

- [ ] 所有 MVP 任务完成。
- [ ] 首页与四个核心栏目使用真实内容。
- [ ] 至少一个 Project Detail 和一篇技术 Blog 可正常访问。
- [ ] Mobile、Tablet 和 Desktop 布局正常。
- [ ] 键盘导航和 focus 状态正常。
- [ ] Metadata、canonical、sitemap、robots 和 404 正常。
- [ ] 没有已知破损站内链接或缺失资源。
- [ ] 没有占位内容、错误日期或不应公开的信息。
- [ ] `npm run lint` 通过。
- [ ] TypeScript check 通过。
- [ ] 自动测试通过。
- [ ] `npm run build` 通过。
- [ ] 本地 production smoke test 通过。
- [ ] Vercel Preview 验证通过。
- [ ] Production 部署和上线后 smoke test 通过。
- [ ] 内容维护手册完成。

## 实际执行顺序

1. Phase 1：建立最小可运行项目和 Git 历史。
2. Phase 2：建立架构和全部路由骨架。
3. Phase 3：优先稳定内容 schema 和查询层。
4. Phase 4：确定设计方向和最小 design tokens。
5. Phase 5：建立全局布局和共享组件。
6. Phase 6：完成首页和核心列表页。
7. Phase 7：接入 MDX 和详情页。
8. Phase 8–9：完成响应式、无障碍、SEO、错误处理和性能。
9. Phase 10：固化质量检查。
10. Phase 11：填入真实内容并完成 production verification。
11. Phase 12：连接 GitHub、部署 Vercel、发布和配置域名。
12. Phase 13：按真实需要完成上线后增强。

## 下一步

Project Foundation 所需的基础决策已经足够，**1.1 已完成**。下一步是 **1.2 初始化 Next.js 项目**；执行前仍需获得明确授权。初始化时使用 Node.js 22、npm、TypeScript、App Router、Tailwind CSS、ESLint 和 `src/` 目录，并添加 `.nvmrc`，但不安装 i18n、Three.js 或 React Three Fiber。
