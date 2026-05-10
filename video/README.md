# AI Evolution Video

一个使用 Remotion + React 制作的中文动画视频项目，用于介绍 2020-2026 年 AI 技术发展与大模型迭代路线。

## 内容概览

- 时间范围：2020 年到 2026 年
- 视频长度：约 56 秒
- 输出格式：MP4 / H.264
- 分辨率：1920 x 1080
- 主要主题：Transformer、Diffusion、RAG、MoE、多模态模型、Agentic Workflow
- 代表模型：GPT-3、CLIP、DALL-E、ChatGPT、Stable Diffusion、GPT-4、Claude、Llama、GPT-4o、Gemini、DeepSeek、Qwen、GPT-5.x/Codex 等

## 文件结构

```text
video/
├── src/
│   ├── AiEvolution.tsx
│   ├── Root.tsx
│   └── index.ts
├── out/
│   ├── ai-evolution.mp4
│   ├── frame.png
│   ├── frame-210.png
│   └── frame-760.png
├── package.json
├── package-lock.json
├── remotion.config.ts
├── tsconfig.json
├── requirements.txt
└── README.md
```

## 快速开始

```bash
npm install
npm run dev
```

Remotion Studio 启动后，选择 `AiEvolution` composition 进行预览。

## 导出视频

```bash
npm run build
```

导出文件位置：

```text
out/ai-evolution.mp4
```

## 静帧检查

```bash
npm run still
```

默认会输出一张低分辨率检查图到：

```text
out/frame.png
```

## 说明

项目中的模型图标为信息图风格的抽象标识，并非品牌官方 Logo。技术框架图使用 SVG/React 组件绘制，适合继续修改文案、年份节点、颜色和动画节奏。
