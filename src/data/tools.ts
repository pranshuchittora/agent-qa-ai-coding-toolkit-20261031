export type ToolCategory = 'terminal' | 'ide' | 'plugin';

export interface Tool {
  slug: string;
  name: string;
  vendor: string;
  category: ToolCategory;
  tagline: string;
  price: string;
  freeTier: string;
  sweBench?: string;
  context?: string;
  stars?: string;
  model: string;
  pros: string[];
  cons: string[];
  install: string[];
  usage: string[];
  bestFor: string;
  china: 'excellent' | 'ok' | 'blocked';
  troubleshoot?: string;
}

export const categoryMeta: Record<
  ToolCategory,
  { name: string; desc: string; icon: string }
> = {
  terminal: {
    name: '终端 Agent',
    icon: '⌨️',
    desc: '在命令行里自治执行多步骤任务：读全库、改多文件、跑测试、自修。适合复杂重构与深度调试。',
  },
  ide: {
    name: 'AI 原生 IDE',
    icon: '🖥️',
    desc: '以 AI 为核心重建的编辑器，Tab 补全 + 多文件 Composer + Agent 模式一体化。日常开发体验最佳。',
  },
  plugin: {
    name: 'IDE 插件',
    icon: '🧩',
    desc: '装进你现有编辑器的辅助层，零迁移成本，生态与合规最成熟。',
  },
};

export const tools: Tool[] = [
  {
    slug: 'claude-code',
    name: 'Claude Code',
    vendor: 'Anthropic',
    category: 'terminal',
    tagline: 'SWE-bench 80.8% 断层第一的终端 Agent，2026 年事实标准',
    price: 'Pro $20/月，Max $100+/月',
    freeTier: 'Claude Free/Pro 订阅含使用额度',
    sweBench: '80.8%（行业第一）',
    context: '100 万 token（Max）',
    model: 'Claude Sonnet 5 / Opus 4.8 / Fable 5',
    pros: [
      '自治能力最强：读库 → 改多文件 → 跑测试 → 自修，零干预闭环',
      '100 万 token 上下文，整库重构不"失忆"',
      '原生 MCP + Agent Skills 生态，可扩展性最强',
      'Plan 模式先展示再动手，Worktree 隔离安全',
    ],
    cons: [
      '纯 CLI，无图形界面，学习曲线陡',
      '只用 Claude 模型，不能切换 GPT/Gemini',
      '重度使用按量计费，成本随用量上升',
      '国内访问需要代理 + 国际支付',
    ],
    install: [
      'npm install -g @anthropic-ai/claude-code',
      '或 curl -fsSL https://claude.ai/install.sh | bash',
      'cd 项目目录 && claude',
      '首次运行按提示登录（claude.ai 账号 / API key）',
    ],
    usage: [
      'claude -p "迁移这个 Express 项目到 TypeScript"  # 非交互一次性任务',
      'claude --model opus           # 切换模型',
      'claude --dangerously-skip-permissions  # 跳过权限确认（慎用）',
      '/mcp add                      # 在会话里添加 MCP server',
    ],
    bestFor: '复杂重构、架构决策、需要跑命令验证的大型任务',
    china: 'blocked',
    troubleshoot: 'claude',
  },
  {
    slug: 'openai-codex',
    name: 'OpenAI Codex',
    vendor: 'OpenAI',
    category: 'terminal',
    tagline: 'ChatGPT 全家桶内置的云端 Agent，可并行异步执行',
    price: '含在 ChatGPT Plus $20/月起',
    freeTier: 'ChatGPT 免费/Plus 含额度',
    sweBench: '78.2%',
    context: '105 万 token（Sol）',
    model: 'GPT-5.6 Sol / Terra / Luna',
    pros: [
      '云沙箱执行，不碰本地环境，验证结果干净',
      '支持并行异步任务（后台跑多个）',
      '与 ChatGPT 桌面端、浏览器 Agent 深度整合',
      'Luna 层 2026 年 7 月降价 80%，成本可控',
    ],
    cons: [
      '代码质量略逊 Claude Code（SWE-bench 78.2%）',
      '只能在云端沙箱里跑仓库克隆，合并需手动',
      '上下文理解偏广度、深嵌套结构易"跑偏"',
      '锁 OpenAI 生态与数据政策',
    ],
    install: [
      'npm install -g @openai/codex',
      'codex login            # 用 ChatGPT 账号登录',
      'cd 项目目录 && codex',
    ],
    usage: [
      'codex exec "修复所有打开测试失败的用例"   # 一次性执行',
      'codex exec --parallel 3 "并行修复三个 Issue"',
      'codex                      # 进入交互会话',
    ],
    bestFor: '委托式异步任务、并行修 bug、需要云端验证的集成任务',
    china: 'ok',
    troubleshoot: 'codex',
  },
  {
    slug: 'gemini-cli',
    name: 'Gemini CLI',
    vendor: 'Google',
    category: 'terminal',
    tagline: '免费额度最大的终端 Agent，百万上下文',
    price: '免费（Google 账号）；企业用 Vertex AI',
    freeTier: '每天约 1000 次请求免费',
    context: '100 万 token',
    model: 'Gemini 2.5 Pro',
    pros: [
      '免费额度大，日常使用几乎不花钱',
      '百万 token 上下文，大库不"失忆"',
      '与 Google Cloud / Workspace 生态集成',
    ],
    cons: [
      '产品较年轻，稳定性和边界场景不如 Claude Code',
      '只能 Gemini 模型，无回退',
      '企业用户需评估 Google 数据处理政策',
    ],
    install: [
      'npm install -g @google/gemini-cli',
      'gemini                # 首次运行用 Google 账号登录',
      'cd 项目目录 && gemini',
    ],
    usage: [
      'gemini "分析这个仓库的架构并给出改进建议"',
      'gemini --mcp          # 查看/配置 MCP',
    ],
    bestFor: '零预算 + 大上下文的终端工作流',
    china: 'blocked',
  },
  {
    slug: 'aider',
    name: 'Aider',
    vendor: '开源社区',
    category: 'terminal',
    tagline: 'Git 原生的开源终端 Agent，模型自由',
    price: '免费（BYOK 自付模型费）',
    freeTier: '完全免费',
    context: '依赖所用模型',
    model: '任意（GPT / Claude / 本地）',
    pros: [
      '开源透明，每个改动自动语义 commit',
      '模型无关，可用任意 API 或本地模型',
      'Git 工作流严格，适合精细管理',
    ],
    cons: [
      '需要自己写 prompt 脚手架，setup 有门槛',
      '无官方 GUI，交互全在终端',
    ],
    install: [
      'uv tool install aider-chat',
      '或 pip install aider-chat',
      'cd 项目目录 && aider',
    ],
    usage: [
      'aider --model gpt-4.1     # 指定模型',
      'aider --gitignore         # 自动管理 .gitignore',
      'aider "为这个 API 添加缓存"',
    ],
    bestFor: '偏好开源、git 工作流严格、模型自由的用户',
    china: 'excellent',
  },
  {
    slug: 'opencode',
    name: 'OpenCode',
    vendor: '开源社区',
    category: 'terminal',
    tagline: 'Claude Code 的开源平替，多模型自由切换',
    price: '免费（BYOK）',
    freeTier: '完全免费',
    context: '依赖所用模型',
    model: 'Anthropic / OpenAI / Google / Groq 等',
    pros: [
      '开源可自部署，透明',
      '终端体验接近 Claude Code，社区活跃',
      '支持多家模型供应商',
    ],
    cons: [
      '打磨程度不及 Claude Code',
      '生态（MCP/插件）相对小',
    ],
    install: [
      'npm install -g opencode-ai',
      'opencode                    # 按提示配置模型 key',
    ],
    usage: [
      'opencode "解释这个项目的启动流程"',
      'opencode                          # 交互会话',
    ],
    bestFor: '想要终端 Agent 又拒绝厂商锁定的用户',
    china: 'excellent',
  },
  {
    slug: 'cursor',
    name: 'Cursor',
    vendor: 'Anysphere',
    category: 'ide',
    tagline: 'AI 原生 IDE 标杆，Composer 2.5 十倍性价比',
    price: 'Pro $20/月，Business $40/用户',
    freeTier: '免费版（有限额度）',
    sweBench: '51.7%（Composer Agent）',
    context: '编辑区作用域 + 大型仓库索引',
    model: 'Composer 2.5 / Claude / GPT / Gemini 可切换',
    pros: [
      'Tab 补全行业第一，亚秒级响应',
      'Composer 多文件编辑 + Agent 模式成熟',
      '模型自由切换，自带 key 也行',
      'VS Code fork，插件快捷键全兼容',
    ],
    cons: [
      '上下文实际可用 70–120k，超大仓库会"失忆"',
      '2026 年 7 月曝出打开恶意仓库自动执行代码的安全漏洞',
      '国内访问不稳定，需要代理',
      '不支持 JetBrains',
    ],
    install: [
      '官网 cursor.com 下载安装包',
      '首次启动登录账号（GitHub / Google）',
      '选模型：Settings → Models',
    ],
    usage: [
      'Tab 键接受补全；Ctrl+K 内联编辑；Ctrl+L 对话',
      'Ctrl+Shift+A 打开 Composer 多文件编辑',
      'Agent 模式：自然语言下达多步骤任务',
      '.cursor/rules/*.mdc 配置项目规则',
    ],
    bestFor: '日常开发、前端多文件编辑、想要最佳 IDE 体验',
    china: 'ok',
  },
  {
    slug: 'devin-desktop',
    name: 'Devin Desktop',
    vendor: 'Cognition（原 Windsurf）',
    category: 'ide',
    tagline: '多 Agent 指挥中心，ACP 托管任意 Agent',
    price: 'Pro $15/月起',
    freeTier: '免费版',
    context: '编辑区作用域',
    model: 'Devin Local（SWE-1.6）/ 任意 ACP Agent',
    pros: [
      'Agent Command Center：Kanban 管理本地+云端 Agent',
      'ACP 开放协议，可托管 Codex / Claude / Gemini 第三方 Agent',
      'Cascade 引擎重写，token 效率高 30%',
    ],
    cons: [
      '品牌刚改名，社区认知度需重建',
      '功能堆叠较多，上手有学习成本',
    ],
    install: [
      '官网 devin.com 下载桌面端',
      '登录 Cognition 账号',
      '在 Command Center 里添加本地/云端 Agent',
    ],
    usage: [
      'Command Center 看板管理多个并行 Agent',
      '在编辑器内直接调用任意已注册 ACP Agent',
    ],
    bestFor: '同时跑多个厂商 Agent、需要统一指挥中心的团队',
    china: 'ok',
  },
  {
    slug: 'trae',
    name: 'Trae',
    vendor: '字节跳动',
    category: 'ide',
    tagline: '国内直连不卡的中文 AI IDE，免费党的首选',
    price: '基础版免费（每日限额），Pro $10/月',
    freeTier: '基础版免费',
    context: '编辑区作用域',
    model: '豆包 / Claude 等内置多模型',
    pros: [
      '国内直连，中文需求理解准确率高',
      '三模式：IDE / Work / Builder',
      '免费额度大方，性价比高',
      '支持移动端 SOLO 写代码',
    ],
    cons: [
      '2026 年 7 月从"永久免费"转向每日限额，信任受损',
      'Agent 自主能力与 Cursor 有差距',
      '字节生态数据隐私存疑',
    ],
    install: [
      '官网 trae.ai 下载安装',
      '登录（支持国内手机号）',
      '选模型即可开始',
    ],
    usage: [
      'Ctrl+I 对话 / 补全；Builder 模式描述需求直接出应用',
    ],
    bestFor: '国内中文开发者、预算有限、不想折腾代理',
    china: 'excellent',
  },
  {
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    vendor: '微软 / GitHub',
    category: 'plugin',
    tagline: '生态最广的老牌选手，企业合规首选',
    price: 'Pro $10/月，Business $19/用户',
    freeTier: '免费版（用量受限）',
    sweBench: '56.0%（Agent 模式）',
    context: '工作区级',
    model: 'GPT-5.5 / Claude / Gemini 可选',
    pros: [
      'IDE 覆盖最广：VS Code / JetBrains / Vim / GitHub 网页',
      '与 Issues、PR、Actions 深度集成',
      '多模型可选（GPT-5.4、Claude Opus 4.6、Gemini）',
      '企业协议成熟，最便宜的主流方案',
    ],
    cons: [
      'Agent 能力与 Claude Code 差距明显',
      '模型路由不透明，不可完全复现',
      '2026 年转向按量计费，重度用户成本需重新评估',
    ],
    install: [
      'GitHub 账号 → Settings → Billing 订阅 Copilot',
      'VS Code 装 GitHub Copilot 扩展并登录',
      'JetBrains / Vim 同理装对应扩展',
    ],
    usage: [
      'Tab 接受补全；Ctrl+I 对话',
      'Copilot Edit 多文件修改；Copilot Agent 后台任务',
      '@workspace 基于整个仓库问答',
    ],
    bestFor: '企业团队标准化、GitHub 生态重度用户、入门首选',
    china: 'ok',
  },
  {
    slug: 'cline',
    name: 'Cline',
    vendor: '开源社区',
    category: 'plugin',
    tagline: '开源 BYOM 插件，每个操作都有批准',
    price: '免费（BYOK 自付模型费）',
    freeTier: '完全免费',
    context: '依赖所用模型',
    model: '任意 API 模型（BYOK）',
    pros: [
      '开源透明，操作逐项批准，安全可控',
      '模型自由，成本只花在 API 上',
      '内置 MCP 支持',
    ],
    cons: [
      '每次操作都确认，自动化流畅度打折',
      '需要自己配置模型 key 和 prompt 脚手架',
    ],
    install: [
      'VS Code 扩展市场搜索 Cline 安装',
      '在设置里填 API Key 与模型',
    ],
    usage: [
      '侧边栏对话式下达任务，逐项批准工具调用',
    ],
    bestFor: '追求透明可控、模型自由的开发者',
    china: 'excellent',
  },
  {
    slug: 'tongyi-lingma',
    name: '通义灵码',
    vendor: '阿里巴巴',
    category: 'plugin',
    tagline: '国内 Java/云原生生态首选，免费',
    price: '基础版免费',
    freeTier: '基础版免费',
    context: '工作区级',
    model: 'Qwen 系列',
    pros: [
      'JetBrains + VS Code 都支持，不改习惯',
      'Java / Spring Boot / MyBatis-Plus 适配最好',
      '国内直连稳定，免费',
      '企业版支持私有模型微调',
    ],
    cons: [
      '补全一次通过率约 62%，低于 Cursor 85%+',
      '免费版功能有限，高级能力在收费版',
    ],
    install: [
      'VS Code / JetBrains 插件市场搜索"通义灵码"安装',
      '用阿里云 / 淘宝账号登录',
    ],
    usage: [
      '侧边栏对话、选中代码解释、行内补全',
    ],
    bestFor: '国内企业团队、Java 技术栈、合规优先',
    china: 'excellent',
  },
  {
    slug: 'zed',
    name: 'Zed',
    vendor: 'Zed Industries（开源）',
    category: 'ide',
    tagline: 'Rust 写的极速 AI 原生编辑器,内置多模型 Agent 面板',
    price: '编辑器免费;Zed AI 按用量/订阅',
    freeTier: '编辑器完全免费',
    context: '依赖项目索引',
    model: 'GPT / Claude / Gemini 可切换',
    pros: [
      '性能天花板:Rust 原生,冷启动与超大文件不卡',
      '内置多模型 Agent 面板,不用装插件就有 AI',
      '开源可自建,支持协作编辑',
    ],
    cons: [
      '插件生态比 VS Code 小不少',
      'Agent 自主能力仍在追赶 Cursor',
      '国内部分功能访问需要代理',
    ],
    install: [
      '官网 zed.dev 下载安装包',
      'macOS 也可 brew install --cask zed',
      '首次启动按提示登录/配置模型',
    ],
    usage: [
      'Cmd+K 内联编辑;Cmd+R 重构',
      'Agent Panel:自然语言下达任务',
      '/context 添加项目上下文',
    ],
    bestFor: '追求编辑器性能、喜欢轻量开源方案的开发者',
    china: 'ok',
  },
  {
    slug: 'continue',
    name: 'Continue',
    vendor: '开源社区',
    category: 'plugin',
    tagline: '开源 AI 代码助手,本地优先、模型完全自由',
    price: '免费（BYOK 自付模型费）',
    freeTier: '完全免费',
    context: '依赖所用模型',
    model: '任意（本地 / 云端 BYOK）',
    pros: [
      '开源透明,数据可完全留在本地',
      '本地模型优先,隐私友好',
      'VS Code / JetBrains 都支持',
    ],
    cons: [
      '托管功能少,需要自己配模型与 prompt',
      '补全质量依赖你选的模型',
    ],
    install: [
      'VS Code / JetBrains 插件市场搜索 Continue 安装',
      '在设置里选择模型(本地 Ollama 或云端 API)',
    ],
    usage: [
      'Cmd+L 对话;Cmd+I 内联编辑',
      '@codebase 全仓库问答',
    ],
    bestFor: '开源、隐私优先、已有模型 Key 的开发者',
    china: 'excellent',
  },
  {
    slug: 'roo-code',
    name: 'Roo Code',
    vendor: '开源社区（Cline 分支）',
    category: 'plugin',
    tagline: 'Cline 的活跃分支,多角色 Agent 模式',
    price: '免费（BYOK 自付模型费）',
    freeTier: '完全免费',
    context: '依赖所用模型',
    model: '任意 API 模型（BYOK）',
    pros: [
      'Code / Architect / Ask 多角色模式,分工清晰',
      '社区活跃,迭代快',
      '模型自由,逐项批准安全可控',
    ],
    cons: [
      '每个操作都要确认,自动化流畅度打折',
      '需要自己配置模型 key',
    ],
    install: [
      'VS Code 扩展市场搜索 Roo Code 安装',
      '设置里填 API Key 与模型',
    ],
    usage: [
      '侧边栏选模式后下达任务,逐项批准工具调用',
    ],
    bestFor: '想要多角色分工、追求透明可控的 VS Code 用户',
    china: 'excellent',
  },
];
