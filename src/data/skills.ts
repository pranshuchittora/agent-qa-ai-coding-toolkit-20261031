export interface Skill {
  name: string;
  author: string;
  official?: boolean;
  type: 'capability' | 'preference';
  oneLiner: string;
  install: string;
  when: string;
}

export const skillTypeMeta = {
  capability: {
    name: '能力扩展类',
    icon: '🧰',
    desc: '给 Agent 增加新的实际能力：网页抓取、文档处理、浏览器测试、安全审计等。',
  },
  preference: {
    name: '编码偏好类',
    icon: '🎯',
    desc: '约束 Agent 的执行方式：前端质量、测试驱动、代码简化、省 token 等，避免"AI 味"。',
  },
} as const;

export const skills: Skill[] = [
  {
    name: 'Frontend Design',
    author: 'anthropics/skills',
    official: true,
    type: 'preference',
    oneLiner: '官方出品，让前端代码摆脱"AI 味"，做出大胆配色、有意设计的生产级界面。安装量 27 万+。',
    install: 'npx skills add anthropics/claude-code --skill frontend-design',
    when: '任何需要用户界面的开发，尤其是想做出"不像 AI 生成的"设计。',
  },
  {
    name: 'Superpowers',
    author: 'obra/superpowers',
    type: 'preference',
    oneLiner: '以计划、子 Agent、TDD 结构化的多步开发流程，是目前最热门的工程流程 skill。',
    install: 'npx skills add obra/superpowers',
    when: '复杂多步骤功能开发，需要明确计划与验证。',
  },
  {
    name: 'Document Skills（PDF/DOCX/XLSX/PPTX）',
    author: 'anthropics/skills',
    official: true,
    type: 'capability',
    oneLiner: '官方文档处理四件套：生成与解析 Word、Excel、PowerPoint、PDF 报告。',
    install: 'npx skills add https://github.com/anthropics/skills --skill pdf',
    when: '需要生成或解析办公文档、报表、合同。',
  },
  {
    name: 'Webapp Testing',
    author: 'anthropics/skills',
    official: true,
    type: 'capability',
    oneLiner: '用 Playwright 在真实浏览器里测试你的本地应用，替代口头承诺。',
    install: 'npx skills add https://github.com/anthropics/skills --skill webapp-testing',
    when: '任何跑在浏览器里的功能开发与调试。',
  },
  {
    name: 'Skill Creator',
    author: 'anthropics/skills',
    official: true,
    type: 'capability',
    oneLiner: '官方制作器，通过交互式问答帮你把工作流封装成新 SKILL.md。',
    install: 'npx skills add https://github.com/anthropics/skills --skill skill-creator',
    when: '想把你的专属工作流沉淀成可复用 skill。',
  },
  {
    name: 'Firecrawl',
    author: 'firecrawl/firecrawl-cli',
    type: 'capability',
    oneLiner: '可靠的网页抓取、搜索与浏览器自动化，接入即用。',
    install: 'npx -y firecrawl-cli@latest init --all --browser',
    when: '需要抓取网页内容、深度搜索、采集数据。',
  },
  {
    name: 'Handoff',
    author: 'mattpocock/skills',
    type: 'capability',
    oneLiner: '把当前会话压缩成 markdown 交接文档，换新会话或换 Agent 无缝继续。',
    install: 'npx skills add mattpocock/skills --skill handoff -y -g',
    when: '长任务要跨会话/跨 Agent 交接时。',
  },
  {
    name: 'Grill Me',
    author: 'mattpocock/skills',
    type: 'preference',
    oneLiner: '写任何代码前，先像审问一样拷问你的方案直到共识，避免做错方向。',
    install: 'npx skills add https://github.com/mattpocock/skills --skill grill-me',
    when: '需求模糊、方案未定、即将写大代码前。',
  },
  {
    name: "Karpathy's Coding Guidelines",
    author: 'forrestchang/andrej-karpathy-skills',
    type: 'preference',
    oneLiner: 'Karpathy 四条 LLM 编码铁律：先思考、简单优先、外科手术式改动、目标驱动。',
    install: '/plugin marketplace add forrestchang/andrej-karpathy-skills',
    when: '希望 Agent 遵循更严谨的编码纪律。',
  },
  {
    name: 'Vercel Web Design Guidelines',
    author: 'vercel-labs/agent-skills',
    type: 'preference',
    oneLiner: '对照 100+ 条可访问性与 UX 规则审计你的 UI 代码。',
    install: 'npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines',
    when: '上线前做 UI 质量审计。',
  },
  {
    name: 'Vercel React Best Practices',
    author: 'vercel-labs/agent-skills',
    type: 'preference',
    oneLiner: '把 57 条 React / Next.js 性能规则应用到生成的代码上。',
    install: 'npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices',
    when: 'React / Next.js 项目开发。',
  },
  {
    name: 'Trail of Bits Security',
    author: 'trailofbits/skills',
    type: 'capability',
    oneLiner: '用 CodeQL 和 Semgrep 自动做漏洞检测与代码审计，安全团队出品。',
    install: 'npx skills add trailofbits/skills',
    when: '涉及安全敏感代码、上线前漏洞扫描。',
  },
  {
    name: 'Remotion Best Practices',
    author: 'remotion-dev/skills',
    type: 'capability',
    oneLiner: '用 React 写程序化视频，内置 Remotion 深度实践知识。',
    install: 'npx skills add https://github.com/remotion-dev/skills --skill remotion-best-practices',
    when: '需要生成演示视频、动效视频。',
  },
  {
    name: 'Caveman',
    author: 'mattpocock/skills',
    type: 'preference',
    oneLiner: '平均砍掉 65% 的输出 token：去掉叙述保留所有技术事实，省钱利器。',
    install: 'npx skills add mattpocock/skills --skill caveman -g',
    when: '想让 Agent 输出更精简、省 token 时。',
  },
  {
    name: 'code-simplifier',
    author: 'anthropics/claude-plugins-official',
    official: true,
    type: 'preference',
    oneLiner: '官方简化器：清理刚写好的代码但不改行为，只做可读性优化。',
    install: '/plugin marketplace add anthropics/claude-plugins-official',
    when: '代码能跑但难读，想保持行为不变的清理。',
  },
  {
    name: 'addyosmani/agent-skills（24 件套）',
    author: 'addyosmani/agent-skills',
    type: 'preference',
    oneLiner: 'Chrome 团队工程总监出品，24 个工程流程 skill：TDD、规范开发、安全加固、CI/CD 等一整套。',
    install: 'npx skills add addyosmani/agent-skills',
    when: '想要一套覆盖完整工程生命周期的流程 skill。',
  },
  {
    name: 'Code Review',
    author: 'anthropics/skills',
    official: true,
    type: 'capability',
    oneLiner: '官方审查器：从架构、安全、性能、可维护性多维度系统审查代码变更。',
    install: 'npx skills add https://github.com/anthropics/skills --skill code-review',
    when: '合并代码前做一次结构化的多维度审查。',
  },
  {
    name: 'Excel / Spreadsheets',
    author: 'anthropics/skills',
    official: true,
    type: 'capability',
    oneLiner: '官方表格技能：读写 xlsx、公式、图表、条件格式，生成专业报表。',
    install: 'npx skills add https://github.com/anthropics/skills --skill excel',
    when: '需要生成或处理 Excel 报表、数据透视、图表。',
  },
  {
    name: 'Brand Guidelines',
    author: 'anthropics/skills',
    official: true,
    type: 'preference',
    oneLiner: '官方品牌规范：保持输出的配色、语气、排版与你的品牌一致，杜绝"AI 味"素材。',
    install: 'npx skills add https://github.com/anthropics/skills --skill brand-guidelines',
    when: '对外输出需要严格统一品牌风格时。',
  },
  {
    name: 'TypeScript Best Practices',
    author: 'addyosmani/agent-skills',
    type: 'preference',
    oneLiner: 'TypeScript 工程规范：类型安全、性能与可维护性规则集，适合 TS 项目。',
    install: 'npx skills add addyosmani/agent-skills',
    when: 'TypeScript 项目开发，希望代码类型更严谨、更可维护。',
  },
];

export const skillInstallMethods = [
  {
    name: 'skills CLI（推荐）',
    detail:
      'vercel-labs/skills 的统一安装器，一条命令装进 70+ Agent（Claude Code、Cursor、Codex、Copilot、Cline）。',
    code: 'npx skills add <github-repo> --skill <skill-name>',
  },
  {
    name: 'Claude Code 插件市场',
    detail: '在 Claude Code 会话内直接添加 GitHub 仓库为插件市场，浏览后安装。',
    code: '/plugin marketplace add <owner>/<repo>',
  },
  {
    name: '手动复制',
    detail:
      '个人技能放 ~/.claude/skills/ 全项目可用；项目技能放 .claude/skills/ 随仓库共享。改完重开会话生效。',
    code: 'mkdir -p ~/.claude/skills/<skill-name>',
  },
];
