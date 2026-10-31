export type McpCategory =
  | 'core'
  | 'data'
  | 'web'
  | 'cloud'
  | 'productivity'
  | 'design'
  | 'reasoning';

export interface McpServer {
  name: string;
  vendor: string;
  category: McpCategory;
  stars?: string;
  oneLiner: string;
  install: string;
  env?: string;
}

export const mcpCategoryMeta: Record<
  McpCategory,
  { name: string; desc: string; icon: string }
> = {
  core: {
    name: '核心必备',
    icon: '🧱',
    desc: '装 3–5 个就覆盖 90% 的价值：GitHub、文档、浏览器、数据库。',
  },
  data: {
    name: '数据库与后端',
    icon: '🗄️',
    desc: 'PostgreSQL、Supabase、Neon、Redis 等数据库连接。',
  },
  web: {
    name: '搜索与抓取',
    icon: '🌐',
    desc: '网页搜索、抓取、浏览器自动化。',
  },
  cloud: {
    name: '云与运维',
    icon: '☁️',
    desc: 'AWS、Cloudflare、Vercel、Sentry 等部署运维。',
  },
  productivity: {
    name: '效率与协作',
    icon: '🧑‍🤝‍🧑',
    desc: 'Notion、Slack、Jira、Google Drive 等团队工具。',
  },
  design: {
    name: '设计与媒体',
    icon: '🎨',
    desc: 'Figma、Blender、DaVinci Resolve 等创意工具。',
  },
  reasoning: {
    name: '推理与记忆',
    icon: '🧠',
    desc: 'Agent 的思维链与持久记忆。',
  },
};

export const mcpServers: McpServer[] = [
  {
    name: 'GitHub MCP Server',
    vendor: 'GitHub 官方',
    category: 'core',
    stars: '30k',
    oneLiner: '浏览代码、管理 Issue/PR、触发 Actions、搜索仓库，GitHub 全能力。',
    install: 'npx @modelcontextprotocol/server-github',
    env: 'GITHUB_PERSONAL_ACCESS_TOKEN',
  },
  {
    name: 'Context7',
    vendor: 'Upstash',
    category: 'core',
    stars: '56k',
    oneLiner: '把最新、版本匹配的库文档喂给模型，杜绝幻觉 API。装上它 = 不再用过期训练数据写代码。',
    install: 'npx -y @upstash/context7-mcp',
  },
  {
    name: 'Playwright MCP',
    vendor: 'Microsoft',
    category: 'core',
    stars: '33k',
    oneLiner: '真实浏览器自动化：点击、截图、抓取、E2E 测试，前端测试神器。',
    install: 'npx @playwright/mcp@latest',
  },
  {
    name: 'Filesystem（官方）',
    vendor: 'Anthropic 参考实现',
    category: 'core',
    stars: '86k（整套参考）',
    oneLiner: '沙箱内的安全文件读写、搜索、目录操作，Agent 的本地文件抓手。',
    install: 'npx @modelcontextprotocol/server-filesystem <允许的目录>',
  },
  {
    name: 'Git（官方）',
    vendor: 'Anthropic 参考实现',
    category: 'core',
    stars: '86k（整套参考）',
    oneLiner: 'commit、diff、blame、分支管理、日志搜索，纯 git 操作。',
    install: 'npx @modelcontextprotocol/server-git',
  },
  {
    name: 'Firecrawl MCP',
    vendor: 'Firecrawl',
    category: 'web',
    stars: '6.4k',
    oneLiner: '网页抓取、搜索、反爬破解，一份 URL 变干净的 LLM 可读 markdown。',
    install: 'npx -y firecrawl-mcp',
    env: 'FIRECRAWL_API_KEY',
  },
  {
    name: 'Exa MCP',
    vendor: 'Exa',
    category: 'web',
    stars: '4.5k',
    oneLiner: '语义级网页搜索，找相关资料与当前信息。',
    install: 'npx -y exa-mcp-server',
    env: 'EXA_API_KEY',
  },
  {
    name: 'Brave Search MCP',
    vendor: 'Brave 官方',
    category: 'web',
    stars: '86k（整套参考）',
    oneLiner: '官方参考实现里的搜索工具，接 Brave API。',
    install: 'npx @modelcontextprotocol/server-brave-search',
    env: 'BRAVE_API_KEY',
  },
  {
    name: 'UI-TARS-desktop',
    vendor: '字节跳动',
    category: 'web',
    stars: '38k',
    oneLiner: '基于 Puppeteer 的浏览器自动化，支持本地/远程浏览器连接。',
    install: '官方应用下载；MCP 模式接入',
  },
  {
    name: 'agent-qa',
    vendor: 'vostride',
    category: 'web',
    oneLiner: '自然语言网页与移动端测试，结合 memidex 持久记忆、经验证的自我改进和可检查的运行证据。',
    install: `# Node.js 24+；配置说明：https://vostride.com/docs/agent-qa/quickstart
npm install -D agent-qa
npx agent-qa init
# 在含 agent-qa.config.yaml 的项目目录启动；客户端工具超时至少 100 分钟
npx agent-qa mcp`,
  },
  {
    name: 'PostgreSQL MCP',
    vendor: '官方参考（已归档）',
    category: 'data',
    oneLiner: '直连 PostgreSQL 查 schema、跑 SQL、做只读审计。',
    install: 'npx @modelcontextprotocol/server-postgres <connection-string>',
  },
  {
    name: 'Supabase MCP',
    vendor: 'Supabase 官方',
    category: 'data',
    oneLiner: '托管版 Postgres + 实时订阅 + Auth + Storage，云数据库接入。',
    install: '官方 npm 包 / npx @supabase/mcp-server',
    env: 'SUPABASE_ACCESS_TOKEN',
  },
  {
    name: 'Neon MCP',
    vendor: 'Neon 官方',
    category: 'data',
    oneLiner: 'Serverless Postgres，Schema 分支、只读查询。',
    install: 'npx @neondatabase/serverless-mcp-server',
  },
  {
    name: 'Redis MCP',
    vendor: 'Redis 官方',
    category: 'data',
    oneLiner: 'Redis 键值操作、缓存管理。',
    install: 'npx @redis/mcp',
  },
  {
    name: 'AWS MCP Servers',
    vendor: 'AWS 官方',
    category: 'cloud',
    stars: '9.1k',
    oneLiner: 'AWS 全套服务操作与最佳实践参考。',
    install: '官方 npm 包，分服务安装',
  },
  {
    name: 'Cloudflare MCP',
    vendor: 'Cloudflare 官方',
    category: 'cloud',
    stars: '3.8k',
    oneLiner: 'Workers、Pages、DNS 等 Cloudflare 全套管理。',
    install: '官方 npm 包',
  },
  {
    name: 'Vercel MCP',
    vendor: 'Vercel 官方',
    category: 'cloud',
    oneLiner: '部署、环境变量、日志管理，部署闭环。',
    install: '官方 npm 包',
  },
  {
    name: 'Sentry MCP',
    vendor: 'Sentry 官方',
    category: 'cloud',
    oneLiner: '错误上报、Issue 分析、性能问题定位。',
    install: '官方 npm 包',
  },
  {
    name: 'Notion MCP',
    vendor: 'Notion 官方',
    category: 'productivity',
    stars: '4.4k',
    oneLiner: '读写 Notion 页面、数据库、搜索工作区。',
    install: '官方 npm 包',
    env: 'NOTION_TOKEN',
  },
  {
    name: 'Slack MCP',
    vendor: '社区',
    category: 'productivity',
    oneLiner: '读消息、发消息、查频道，Agent 进团队聊天。',
    install: '社区 npm 包',
  },
  {
    name: 'Jira/Confluence MCP',
    vendor: '官方',
    category: 'productivity',
    oneLiner: 'Issue 管理、Wiki 检索，研发流程集成。',
    install: '官方 npm 包',
  },
  {
    name: 'Framelink Figma MCP',
    vendor: 'Framelink',
    category: 'design',
    stars: '15k',
    oneLiner: '把 Figma 设计稿直接变成可理解的 UI 上下文，设计转代码。',
    install: 'Framelink 官方',
  },
  {
    name: 'Figma Context MCP',
    vendor: 'GLips 社区',
    category: 'design',
    stars: '—',
    oneLiner: '社区热门：让 Claude 读 Figma 文件结构做设计还原。',
    install: 'npx figma-context-mcp',
  },
  {
    name: 'Blender MCP',
    vendor: 'ahujasid 社区',
    category: 'design',
    stars: '25k',
    oneLiner: '自然语言驱动 Blender 建模与渲染。',
    install: '社区 Python 包',
  },
  {
    name: 'Sequential Thinking',
    vendor: 'Anthropic 官方',
    category: 'reasoning',
    oneLiner: '强制模型一步步线性思考复杂问题，减少跳步。',
    install: '官方参考实现',
  },
  {
    name: 'Memory',
    vendor: 'Anthropic 官方',
    category: 'reasoning',
    oneLiner: '跨会话持久记忆，存用户偏好与关键事实。',
    install: '官方参考实现',
  },
  {
    name: 'Fetch MCP',
    vendor: 'Anthropic 官方参考',
    category: 'web',
    oneLiner: '抓取任意网页内容转成干净的 markdown，给模型读外部文档。',
    install: 'npx @modelcontextprotocol/server-fetch',
  },
  {
    name: 'Docker MCP',
    vendor: 'Docker 官方',
    category: 'cloud',
    oneLiner: '容器、镜像、Compose 全套管理，Agent 直接操作本地/远程 Docker。',
    install: 'Docker Desktop → Settings → MCP 官方扩展',
  },
  {
    name: 'Stripe MCP',
    vendor: 'Stripe 官方',
    category: 'cloud',
    oneLiner: '支付、订阅、对账查询，给 Agent 接 Stripe 财务数据。',
    install: 'npx stripe-mcp --api-key <key>',
    env: 'STRIPE_API_KEY',
  },
  {
    name: 'OpenTelemetry MCP',
    vendor: 'OpenTelemetry 官方',
    category: 'cloud',
    oneLiner: '查询 trace 与指标，Agent 直接定位线上性能与可用性问题。',
    install: '官方 npm 包',
  },
];

export const mcpBestPractices = [
  {
    title: '别装超过 5–7 个',
    detail:
      '每多一个 server 都吃上下文、拖慢 Agent。超过 7 个，Agent 会变慢变笨。这是菜单，不是购物车。',
  },
  {
    title: '把每个 server 当成陌生人的 CLI',
    detail: '固定版本（pin version），token 先只读授权，观察 Agent 怎么用再放开。优先官方版，别用随机 fork。',
  },
  {
    title: '定期复查',
    detail: '生态三个月一变，2026 年 3 月前配的 server 很可能已被更快、鉴权更好的替代品超越。每季度过一遍。',
  },
  {
    title: '注意安全',
    detail: '对热门 server 的审计发现约三分之二存在安全问题。装之前读 README，scope 最小权限。',
  },
];

export const mcpStarterBundles = [
  {
    name: '独立开发者 80/20 套件',
    items: ['GitHub', 'Memory', 'Playwright', 'PostgreSQL/Supabase', 'Stripe'],
    note: '5 个就覆盖大部分独立开发场景，其它按需再加。',
  },
  {
    name: '后端 / 微服务',
    items: ['Context7', 'GitHub', 'PostgreSQL', 'Sentry', 'Cloudflare'],
    note: '文档 + 代码 + 数据库 + 监控 + 运维闭环。',
  },
  {
    name: '前端 / 设计转代码',
    items: ['Context7', 'Playwright', 'Framelink Figma', 'Firecrawl'],
    note: '实时文档、浏览器测试、设计稿上下文。',
  },
];
