# Indie Hacker 技能评估

一个帮助独立开发者评估自己在各个领域技能水平的在线工具。

## 特点

- 📊 六大领域技能评估：商业洞察、产品设计、编码开发、运营营销、增长变现、自我管理
- 🌐 中英文双语支持
- 📱 响应式设计，支持移动端和桌面端
- 🎨 美观的 UI 设计和流畅的动画效果
- 📈 可视化的评估结果展示
- 💡 针对性的提升建议

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## Vercel 部署指南

1. Fork 或克隆此仓库到你的 GitHub 账号

2. 在 [Vercel](https://vercel.com) 注册账号（如果还没有）

3. 在 Vercel 控制台中点击 "New Project"

4. 选择你 fork 的仓库，点击 "Import"

5. 配置项目：
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next

6. 点击 "Deploy" 开始部署

项目会自动部署，并生成一个可访问的 URL。每次推送到主分支时，Vercel 都会自动重新部署。

### 自定义域名（可选）

1. 在 Vercel 项目设置中点击 "Domains"
2. 添加你的域名
3. 按照 Vercel 的指引配置 DNS 记录
4. 等待 DNS 生效（通常需要几分钟到几小时）

## 技术栈

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand

## License

[MIT](LICENSE)

## 效果图
![效果](img/screenshot_pc.png)

![效果](img/screenshot.png)