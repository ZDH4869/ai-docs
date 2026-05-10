import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

type YearStory = {
  year: string;
  headline: string;
  subtitle: string;
  models: string[];
  tech: string;
  diagram: 'transformer' | 'diffusion' | 'rag' | 'moe' | 'agent' | 'multimodal';
  accent: string;
  secondary: string;
};

const stories: YearStory[] = [
  {
    year: '2020',
    headline: 'Transformer 扩展成为主线',
    subtitle: 'GPT-3 证明大规模预训练和少样本学习的跃迁效应。',
    models: ['GPT-3', 'T5', 'BERT'],
    tech: '预训练 + Prompt',
    diagram: 'transformer',
    accent: '#30d5c8',
    secondary: '#f6c85f',
  },
  {
    year: '2021',
    headline: '多模态生成开始出圈',
    subtitle: 'CLIP、DALL-E 把文本、图像和语义空间连接到一起。',
    models: ['CLIP', 'DALL-E', 'Codex'],
    tech: '对比学习 + 代码模型',
    diagram: 'multimodal',
    accent: '#7ad151',
    secondary: '#5da9ff',
  },
  {
    year: '2022',
    headline: '扩散模型与对话式 AI 爆发',
    subtitle: 'Stable Diffusion 降低图像生成门槛，ChatGPT 推动应用范式变化。',
    models: ['ChatGPT', 'Stable Diffusion', 'PaLM'],
    tech: 'Diffusion + RLHF',
    diagram: 'diffusion',
    accent: '#ff8a65',
    secondary: '#a78bfa',
  },
  {
    year: '2023',
    headline: '检索增强与工具调用进入生产',
    subtitle: 'GPT-4、Claude、Llama 2 让 RAG、插件和长上下文成为关键工程能力。',
    models: ['GPT-4', 'Claude 2', 'Llama 2'],
    tech: 'RAG + Tool Use',
    diagram: 'rag',
    accent: '#4dabf7',
    secondary: '#ffd166',
  },
  {
    year: '2024',
    headline: '原生多模态与小模型并进',
    subtitle: '视频、音频、图像和文本统一建模，端侧与低延迟部署加速。',
    models: ['GPT-4o', 'Gemini 1.5', 'Llama 3'],
    tech: 'Omni 模型 + 长上下文',
    diagram: 'multimodal',
    accent: '#ff5c8a',
    secondary: '#52e0c4',
  },
  {
    year: '2025',
    headline: '推理、MoE 与开源生态加速迭代',
    subtitle: 'DeepSeek、Qwen、Llama、Claude、Gemini 形成高强度模型竞速。',
    models: ['DeepSeek-V3.1', 'Qwen3', 'Llama 4', 'Claude 4.5', 'Gemini 3'],
    tech: 'MoE + Thinking + Agents',
    diagram: 'moe',
    accent: '#b197fc',
    secondary: '#69db7c',
  },
  {
    year: '2026',
    headline: '模型从回答者走向协作者',
    subtitle: 'GPT-5.3-Codex 与 GPT-5.4 强化编码、工具使用、文档和真实工作流。',
    models: ['GPT-5.3-Codex', 'GPT-5.4', 'Codex Spark'],
    tech: 'Agentic Workflow',
    diagram: 'agent',
    accent: '#38d9a9',
    secondary: '#74c0fc',
  },
];

const fps = 30;
const introFrames = 120;
const segmentFrames = 180;
const outroStart = introFrames + stories.length * segmentFrames;
const totalFrames = 1680;

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

export const AiEvolution: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const progress = frame / (totalFrames - 1);

  return (
    <AbsoluteFill style={styles.stage}>
      <Background progress={progress} />
      <Header frame={frame} />
      <Intro frame={frame} />
      {stories.map((story, index) => (
        <YearScene
          key={story.year}
          story={story}
          index={index}
          start={introFrames + index * segmentFrames}
        />
      ))}
      <Timeline frame={frame} />
      <Outro frame={frame} />
      <div style={{...styles.cornerGrid, width, height}} />
    </AbsoluteFill>
  );
};

const Background: React.FC<{progress: number}> = ({progress}) => {
  const frame = useCurrentFrame();
  const drift = Math.sin(frame / 80) * 18;
  return (
    <AbsoluteFill style={styles.background}>
      <div
        style={{
          ...styles.gradientWash,
          transform: `translate3d(${drift}px, ${-drift / 2}px, 0) rotate(${
            progress * 18
          }deg)`,
        }}
      />
      <svg viewBox="0 0 1920 1080" style={styles.mesh}>
        {Array.from({length: 13}).map((_, row) =>
          Array.from({length: 20}).map((__, col) => {
            const x = col * 104 + ((row % 2) * 52);
            const y = row * 92 + 8;
            const pulse = 0.35 + Math.sin(frame / 24 + row + col) * 0.18;
            return (
              <circle
                key={`${row}-${col}`}
                cx={x}
                cy={y}
                r={1.5 + pulse}
                fill="rgba(215,245,255,0.24)"
              />
            );
          })
        )}
        {Array.from({length: 26}).map((_, i) => {
          const y = 92 + i * 36;
          const offset = (frame * (0.18 + (i % 4) * 0.03)) % 240;
          return (
            <path
              key={i}
              d={`M ${-240 + offset} ${y} C 360 ${y - 90}, 600 ${
                y + 80
              }, 960 ${y} S 1540 ${y - 80}, 2160 ${y + 30}`}
              stroke={`rgba(100,220,255,${0.035 + (i % 5) * 0.008})`}
              strokeWidth="2"
              fill="none"
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};

const Header: React.FC<{frame: number}> = ({frame}) => {
  const show = fade(frame, 20, 70);
  return (
    <div style={{...styles.header, opacity: show}}>
      <div style={styles.headerKicker}>AI 技术演进路线图</div>
      <div style={styles.headerMeta}>2020-2026 · 模型迭代 · 方法框架</div>
    </div>
  );
};

const Intro: React.FC<{frame: number}> = ({frame}) => {
  const enter = fade(frame, 0, 75);
  const leave = 1 - fade(frame, 92, 118);
  const scale = interpolate(enter, [0, 1], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill
      style={{
        ...styles.centerScene,
        opacity: enter * leave,
        transform: `scale(${scale})`,
      }}
    >
      <div style={styles.introYear}>2020 → 2026</div>
      <h1 style={styles.title}>从大模型到智能体</h1>
      <p style={styles.introCopy}>
        大规模预训练、多模态生成、RAG、MoE、推理模型与工具使用，把 AI
        从“会回答”推向“能执行”。
      </p>
      <div style={styles.introStack}>
        {['Transformer', 'Diffusion', 'RAG', 'MoE', 'Agents'].map((item, i) => (
          <div
            key={item}
            style={{
              ...styles.introPill,
              transform: `translateY(${interpolate(
                fade(frame, 28 + i * 7, 72 + i * 7),
                [0, 1],
                [24, 0]
              )}px)`,
              opacity: fade(frame, 28 + i * 7, 72 + i * 7),
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const YearScene: React.FC<{story: YearStory; index: number; start: number}> = ({
  story,
  index,
  start,
}) => {
  const frame = useCurrentFrame();
  const {fps: configFps} = useVideoConfig();
  const local = frame - start;
  const enter = fade(local, 0, 32);
  const exit = 1 - fade(local, segmentFrames - 34, segmentFrames - 4);
  const visible = enter * exit;
  const springIn = spring({
    frame: Math.max(0, local),
    fps: configFps,
    config: {damping: 18, stiffness: 90, mass: 0.85},
  });

  const slide = interpolate(springIn, [0, 1], [70, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scan = clamp01(local / segmentFrames);

  if (visible <= 0) {
    return null;
  }

  return (
    <AbsoluteFill
      style={{
        ...styles.scene,
        opacity: visible,
        transform: `translateY(${slide}px)`,
      }}
    >
      <div style={styles.leftPanel}>
        <div style={{...styles.yearBadge, color: story.accent}}>
          {story.year}
        </div>
        <h2 style={styles.headline}>{story.headline}</h2>
        <p style={styles.subtitle}>{story.subtitle}</p>
        <div style={styles.techLabel}>
          <span
            style={{...styles.techDot, backgroundColor: story.secondary}}
          />
          {story.tech}
        </div>
      </div>

      <div style={styles.diagramPanel}>
        <TechDiagram story={story} progress={scan} />
      </div>

      <div style={styles.modelPanel}>
        {story.models.map((model, modelIndex) => {
          const modelIn = fade(local, 32 + modelIndex * 12, 70 + modelIndex * 12);
          return (
            <ModelChip
              key={model}
              model={model}
              index={modelIndex}
              opacity={modelIn}
              accent={modelIndex % 2 === 0 ? story.accent : story.secondary}
            />
          );
        })}
      </div>

      <div
        style={{
          ...styles.scanLine,
          background: `linear-gradient(90deg, transparent, ${story.accent}, transparent)`,
          transform: `translateX(${interpolate(
            scan,
            [0, 1],
            [-780, 780]
          )}px)`,
        }}
      />
      <div
        style={{
          ...styles.sceneIndex,
          borderColor: `${story.accent}66`,
          color: story.secondary,
        }}
      >
        0{index + 1}
      </div>
    </AbsoluteFill>
  );
};

const ModelChip: React.FC<{
  model: string;
  index: number;
  opacity: number;
  accent: string;
}> = ({model, index, opacity, accent}) => {
  const frame = useCurrentFrame();
  const y = Math.sin(frame / 28 + index) * 5;
  const initials = model
    .replace('Stable Diffusion', 'SD')
    .replace('DeepSeek', 'DS')
    .replace('Claude', 'CL')
    .replace('Gemini', 'GE')
    .replace('Llama', 'LA')
    .replace('Qwen', 'QW')
    .replace('Codex', 'CX')
    .split(/[\s.-]+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      style={{
        ...styles.modelChip,
        opacity,
        transform: `translateX(${interpolate(opacity, [0, 1], [44, 0])}px) translateY(${y}px)`,
        borderColor: `${accent}88`,
        boxShadow: `0 0 34px ${accent}22`,
      }}
    >
      <div style={{...styles.logoMark, borderColor: accent}}>
        <span style={{color: accent}}>{initials}</span>
        <svg viewBox="0 0 64 64" style={styles.logoOrbit}>
          <path
            d="M32 7 C50 10 58 27 48 44 C38 60 15 57 8 39 C1 20 14 4 32 7Z"
            fill="none"
            stroke={accent}
            strokeWidth="4"
            opacity="0.62"
          />
          <path
            d="M15 42 C22 25 39 19 55 26"
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="3"
          />
        </svg>
      </div>
      <div style={styles.modelName}>{model}</div>
    </div>
  );
};

const TechDiagram: React.FC<{story: YearStory; progress: number}> = ({
  story,
  progress,
}) => {
  const frame = useCurrentFrame();
  const dash = 800 - progress * 800;
  const pulse = 0.88 + Math.sin(frame / 18) * 0.06;

  if (story.diagram === 'diffusion') {
    return (
      <DiagramShell story={story}>
        <svg viewBox="0 0 720 520" style={styles.diagramSvg}>
          <defs>
            <radialGradient id="diffGlow" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor={story.accent} stopOpacity="0.8" />
              <stop offset="100%" stopColor={story.secondary} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="360" cy="260" r={190 * pulse} fill="url(#diffGlow)" />
          {Array.from({length: 52}).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 52 + frame / 80;
            const radius = 70 + (i % 7) * 22 + progress * 24;
            return (
              <circle
                key={i}
                cx={360 + Math.cos(angle) * radius}
                cy={260 + Math.sin(angle) * radius}
                r={4 + (i % 4)}
                fill={i % 2 ? story.accent : story.secondary}
                opacity={0.35 + (i % 5) * 0.08}
              />
            );
          })}
          <path
            d="M112 420 C220 300 275 315 360 260 S512 176 612 92"
            stroke="rgba(255,255,255,0.78)"
            strokeWidth="7"
            fill="none"
            strokeDasharray="800"
            strokeDashoffset={dash}
            strokeLinecap="round"
          />
          <text x="102" y="462" style={styles.diagramText}>
            noise
          </text>
          <text x="552" y="82" style={styles.diagramText}>
            image
          </text>
        </svg>
      </DiagramShell>
    );
  }

  if (story.diagram === 'rag') {
    return (
      <DiagramShell story={story}>
        <svg viewBox="0 0 720 520" style={styles.diagramSvg}>
          <Node x={104} y={235} label="Query" color={story.accent} />
          <Node x={300} y={120} label="Vector DB" color={story.secondary} />
          <Node x={300} y={350} label="Docs" color={story.secondary} />
          <Node x={530} y={235} label="LLM" color={story.accent} />
          <Flow from={[172, 260]} to={[236, 155]} progress={progress} />
          <Flow from={[172, 260]} to={[236, 365]} progress={progress} delay={0.12} />
          <Flow from={[368, 145]} to={[472, 240]} progress={progress} delay={0.24} />
          <Flow from={[368, 365]} to={[472, 260]} progress={progress} delay={0.36} />
          <path
            d="M588 235 C635 235 640 300 592 310"
            stroke={story.secondary}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.8"
          />
          <text x="494" y="380" style={styles.diagramText}>
            grounded answer
          </text>
        </svg>
      </DiagramShell>
    );
  }

  if (story.diagram === 'moe') {
    return (
      <DiagramShell story={story}>
        <svg viewBox="0 0 720 520" style={styles.diagramSvg}>
          <Node x={82} y={238} label="Token" color={story.accent} />
          <Node x={285} y={238} label="Router" color={story.secondary} />
          {[82, 172, 262, 352].map((y, i) => (
            <g key={y}>
              <rect
                x="486"
                y={y}
                width="150"
                height="58"
                rx="16"
                fill={i === 1 || i === 3 ? `${story.accent}33` : 'rgba(255,255,255,0.08)'}
                stroke={i === 1 || i === 3 ? story.accent : 'rgba(255,255,255,0.18)'}
                strokeWidth="3"
              />
              <text x="520" y={y + 37} style={styles.diagramText}>
                Expert {i + 1}
              </text>
              <Flow
                from={[362, 266]}
                to={[486, y + 29]}
                progress={progress}
                delay={i * 0.08}
                active={i === 1 || i === 3}
              />
            </g>
          ))}
          <Flow from={[150, 266]} to={[235, 266]} progress={progress} />
          <text x="233" y="405" style={styles.diagramText}>
            sparse activation
          </text>
        </svg>
      </DiagramShell>
    );
  }

  if (story.diagram === 'agent') {
    return (
      <DiagramShell story={story}>
        <svg viewBox="0 0 720 520" style={styles.diagramSvg}>
          <Node x={280} y={70} label="Plan" color={story.accent} />
          <Node x={520} y={225} label="Tools" color={story.secondary} />
          <Node x={280} y={380} label="Verify" color={story.accent} />
          <Node x={70} y={225} label="Memory" color={story.secondary} />
          <path
            d="M350 112 C460 120 535 150 558 218 C583 292 490 364 348 410 C210 448 80 354 94 246 C104 154 180 104 280 100"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="15"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M350 112 C460 120 535 150 558 218 C583 292 490 364 348 410 C210 448 80 354 94 246 C104 154 180 104 280 100"
            stroke={story.accent}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1040"
            strokeDashoffset={1040 - progress * 1040}
          />
          <circle
            cx={360 + Math.cos(frame / 24) * 95}
            cy={260 + Math.sin(frame / 24) * 95}
            r="12"
            fill={story.secondary}
          />
          <text x="270" y="270" style={styles.diagramBigText}>
            Agent Loop
          </text>
        </svg>
      </DiagramShell>
    );
  }

  if (story.diagram === 'multimodal') {
    return (
      <DiagramShell story={story}>
        <svg viewBox="0 0 720 520" style={styles.diagramSvg}>
          {[
            ['Text', 110, 105],
            ['Image', 110, 365],
            ['Audio', 540, 105],
            ['Video', 540, 365],
          ].map(([label, x, y], i) => (
            <React.Fragment key={label}>
              <Node
                x={Number(x)}
                y={Number(y)}
                label={String(label)}
                color={i % 2 ? story.secondary : story.accent}
              />
              <Flow
                from={[Number(x) + 70, Number(y) + 28]}
                to={[360, 260]}
                progress={progress}
                delay={i * 0.08}
              />
            </React.Fragment>
          ))}
          <circle
            cx="360"
            cy="260"
            r={86 + Math.sin(frame / 20) * 5}
            fill={`${story.accent}24`}
            stroke={story.accent}
            strokeWidth="5"
          />
          <text x="305" y="270" style={styles.diagramBigText}>
            Shared
          </text>
          <text x="300" y="306" style={styles.diagramText}>
            semantic space
          </text>
        </svg>
      </DiagramShell>
    );
  }

  return (
    <DiagramShell story={story}>
      <svg viewBox="0 0 720 520" style={styles.diagramSvg}>
        {[0, 1, 2, 3].map((layer) => {
          const x = 115 + layer * 150;
          return (
            <g key={layer}>
              <rect
                x={x}
                y="95"
                width="86"
                height="330"
                rx="22"
                fill="rgba(255,255,255,0.08)"
                stroke={layer % 2 ? story.secondary : story.accent}
                strokeWidth="3"
              />
              {Array.from({length: 6}).map((_, i) => (
                <circle
                  key={i}
                  cx={x + 43}
                  cy={140 + i * 48}
                  r="13"
                  fill={i % 2 ? story.secondary : story.accent}
                  opacity={0.55 + Math.sin(frame / 18 + i + layer) * 0.18}
                />
              ))}
              {layer < 3 && (
                <path
                  d={`M ${x + 88} 260 C ${x + 124} 180, ${x + 120} 330, ${
                    x + 150
                  } 260`}
                  stroke="rgba(255,255,255,0.46)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="200"
                  strokeDashoffset={200 - progress * 200}
                />
              )}
            </g>
          );
        })}
        <text x="180" y="474" style={styles.diagramText}>
          attention layers scale with data + compute
        </text>
      </svg>
    </DiagramShell>
  );
};

const DiagramShell: React.FC<{story: YearStory; children: React.ReactNode}> = ({
  story,
  children,
}) => (
  <div style={{...styles.diagramShell, borderColor: `${story.accent}55`}}>
    <div style={styles.diagramHeader}>
      <span style={{...styles.techDot, backgroundColor: story.accent}} />
      {story.tech}
    </div>
    {children}
  </div>
);

const Node: React.FC<{x: number; y: number; label: string; color: string}> = ({
  x,
  y,
  label,
  color,
}) => (
  <g>
    <rect
      x={x}
      y={y}
      width="132"
      height="62"
      rx="18"
      fill={`${color}26`}
      stroke={color}
      strokeWidth="4"
    />
    <text x={x + 25} y={y + 40} style={styles.diagramText}>
      {label}
    </text>
  </g>
);

const Flow: React.FC<{
  from: [number, number];
  to: [number, number];
  progress: number;
  delay?: number;
  active?: boolean;
}> = ({from, to, progress, delay = 0, active = true}) => {
  const local = clamp01((progress - delay) / 0.7);
  const x = from[0] + (to[0] - from[0]) * local;
  const y = from[1] + (to[1] - from[1]) * local;
  return (
    <g opacity={active ? 1 : 0.35}>
      <path
        d={`M ${from[0]} ${from[1]} C ${(from[0] + to[0]) / 2} ${from[1]}, ${
          (from[0] + to[0]) / 2
        } ${to[1]}, ${to[0]} ${to[1]}`}
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={x} cy={y} r="9" fill="white" opacity="0.85" />
    </g>
  );
};

const Timeline: React.FC<{frame: number}> = ({frame}) => {
  const lineIn = fade(frame, 70, 130);
  const progress = clamp01((frame - introFrames) / (stories.length * segmentFrames));
  return (
    <div style={{...styles.timeline, opacity: lineIn}}>
      <div style={styles.timelineTrack}>
        <div
          style={{
            ...styles.timelineFill,
            width: `${progress * 100}%`,
          }}
        />
        {stories.map((story, index) => {
          const start = introFrames + index * segmentFrames;
          const active = fade(frame, start, start + 28) * (1 - fade(frame, start + segmentFrames - 36, start + segmentFrames));
          const passed = frame >= start;
          return (
            <div
              key={story.year}
              style={{
                ...styles.tick,
                left: `${(index / (stories.length - 1)) * 100}%`,
              }}
            >
              <div
                style={{
                  ...styles.tickDot,
                  transform: `scale(${1 + active * 0.7})`,
                  backgroundColor: passed ? story.accent : '#395064',
                  boxShadow: passed ? `0 0 28px ${story.accent}` : 'none',
                }}
              />
              <div style={{...styles.tickLabel, color: passed ? '#eef8ff' : '#8193a8'}}>
                {story.year}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Outro: React.FC<{frame: number}> = ({frame}) => {
  const enter = fade(frame, outroStart, outroStart + 60);
  const progress = clamp01((frame - outroStart) / (totalFrames - outroStart));
  if (enter <= 0) {
    return null;
  }

  return (
    <AbsoluteFill style={{...styles.outro, opacity: enter}}>
      <div style={styles.outroTitle}>2026 的关键词</div>
      <div style={styles.outroGrid}>
        {[
          ['Reasoning', '更长推理链和自我校验'],
          ['Agents', '规划、调用工具、执行任务'],
          ['Multimodal', '文本、图像、音频、视频统一理解'],
          ['Open Ecosystem', '开源模型推动成本下降和部署多样化'],
        ].map(([title, copy], i) => (
          <div
            key={title}
            style={{
              ...styles.outroCard,
              opacity: fade(frame, outroStart + 35 + i * 13, outroStart + 80 + i * 13),
              transform: `translateY(${interpolate(
                fade(frame, outroStart + 35 + i * 13, outroStart + 80 + i * 13),
                [0, 1],
                [28, 0]
              )}px)`,
            }}
          >
            <div style={styles.outroCardTitle}>{title}</div>
            <div style={styles.outroCopy}>{copy}</div>
          </div>
        ))}
      </div>
      <div
        style={{
          ...styles.outroRing,
          transform: `rotate(${progress * 130}deg) scale(${0.9 + progress * 0.14})`,
        }}
      />
    </AbsoluteFill>
  );
};

const styles: Record<string, React.CSSProperties> = {
  stage: {
    backgroundColor: '#071019',
    color: '#f4fbff',
    fontFamily:
      '"Inter", "Segoe UI", "Microsoft YaHei", "PingFang SC", Arial, sans-serif',
    overflow: 'hidden',
  },
  background: {
    background:
      'linear-gradient(135deg, #071019 0%, #101d2a 42%, #142016 78%, #0a1018 100%)',
  },
  gradientWash: {
    position: 'absolute',
    left: 210,
    top: 40,
    width: 1500,
    height: 990,
    background:
      'radial-gradient(circle at 20% 30%, rgba(48,213,200,0.22), transparent 28%), radial-gradient(circle at 78% 40%, rgba(255,138,101,0.18), transparent 30%), radial-gradient(circle at 50% 78%, rgba(177,151,252,0.18), transparent 34%)',
    filter: 'blur(28px)',
    opacity: 0.95,
  },
  mesh: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
  cornerGrid: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
    backgroundSize: '80px 80px',
    maskImage:
      'radial-gradient(circle at center, rgba(0,0,0,0.25), rgba(0,0,0,1) 70%)',
    pointerEvents: 'none',
  },
  header: {
    position: 'absolute',
    left: 74,
    top: 54,
    display: 'flex',
    gap: 22,
    alignItems: 'center',
    zIndex: 10,
  },
  headerKicker: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: 0,
  },
  headerMeta: {
    fontSize: 22,
    color: '#a9bdca',
    borderLeft: '2px solid rgba(255,255,255,0.22)',
    paddingLeft: 22,
  },
  centerScene: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingBottom: 70,
  },
  introYear: {
    fontSize: 42,
    color: '#30d5c8',
    fontWeight: 900,
    marginBottom: 22,
  },
  title: {
    fontSize: 118,
    lineHeight: 1.03,
    margin: 0,
    fontWeight: 900,
    letterSpacing: 0,
  },
  introCopy: {
    width: 1180,
    fontSize: 34,
    lineHeight: 1.55,
    color: '#c7d8e6',
    margin: '34px auto 40px',
  },
  introStack: {
    display: 'flex',
    gap: 18,
  },
  introPill: {
    fontSize: 28,
    fontWeight: 800,
    padding: '18px 26px',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.16)',
  },
  scene: {
    padding: '150px 78px 160px',
    display: 'grid',
    gridTemplateColumns: '520px 1fr 430px',
    columnGap: 42,
    alignItems: 'center',
  },
  leftPanel: {
    zIndex: 2,
  },
  yearBadge: {
    fontSize: 116,
    fontWeight: 950,
    lineHeight: 0.9,
    marginBottom: 24,
    textShadow: '0 0 38px rgba(255,255,255,0.12)',
  },
  headline: {
    fontSize: 54,
    lineHeight: 1.15,
    margin: '0 0 24px',
    fontWeight: 900,
    letterSpacing: 0,
  },
  subtitle: {
    fontSize: 27,
    lineHeight: 1.55,
    color: '#c7d8e6',
    margin: '0 0 30px',
  },
  techLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 25,
    fontWeight: 800,
    color: '#eff8ff',
    padding: '16px 20px',
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.14)',
  },
  techDot: {
    width: 13,
    height: 13,
    borderRadius: 999,
    display: 'inline-block',
    boxShadow: '0 0 18px currentColor',
  },
  diagramPanel: {
    height: 610,
    zIndex: 2,
  },
  diagramShell: {
    position: 'relative',
    height: '100%',
    border: '2px solid',
    borderRadius: 8,
    backgroundColor: 'rgba(8,18,28,0.62)',
    boxShadow: '0 24px 80px rgba(0,0,0,0.28)',
    overflow: 'hidden',
  },
  diagramHeader: {
    position: 'absolute',
    left: 26,
    top: 24,
    zIndex: 3,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 24,
    fontWeight: 900,
    color: '#f7fbff',
  },
  diagramSvg: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  diagramText: {
    fill: '#eaf7ff',
    fontSize: 24,
    fontWeight: 800,
    letterSpacing: 0,
  },
  diagramBigText: {
    fill: '#f7fbff',
    fontSize: 32,
    fontWeight: 950,
    letterSpacing: 0,
  },
  modelPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    zIndex: 2,
  },
  modelChip: {
    display: 'flex',
    alignItems: 'center',
    gap: 18,
    minHeight: 86,
    padding: '16px 18px',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.09)',
    border: '2px solid',
  },
  logoMark: {
    width: 58,
    height: 58,
    borderRadius: 16,
    border: '2px solid',
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
    flex: '0 0 auto',
    backgroundColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  logoOrbit: {
    position: 'absolute',
    inset: 5,
    width: 48,
    height: 48,
    opacity: 0.75,
  },
  modelName: {
    fontSize: 25,
    fontWeight: 900,
    color: '#f7fbff',
    lineHeight: 1.15,
  },
  scanLine: {
    position: 'absolute',
    left: 570,
    top: 140,
    width: 560,
    height: 3,
    opacity: 0.6,
  },
  sceneIndex: {
    position: 'absolute',
    right: 78,
    top: 70,
    width: 72,
    height: 72,
    border: '2px solid',
    borderRadius: 8,
    display: 'grid',
    placeItems: 'center',
    fontSize: 26,
    fontWeight: 950,
  },
  timeline: {
    position: 'absolute',
    left: 105,
    right: 105,
    bottom: 70,
    height: 86,
    zIndex: 20,
  },
  timelineTrack: {
    position: 'relative',
    top: 22,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  timelineFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    background:
      'linear-gradient(90deg, #30d5c8, #ff8a65, #b197fc, #38d9a9)',
  },
  tick: {
    position: 'absolute',
    top: -11,
    transform: 'translateX(-50%)',
    textAlign: 'center',
  },
  tickDot: {
    width: 26,
    height: 26,
    borderRadius: 999,
    border: '4px solid rgba(7,16,25,0.95)',
    margin: '0 auto',
  },
  tickLabel: {
    marginTop: 14,
    fontSize: 23,
    fontWeight: 850,
  },
  outro: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 120px 170px',
    background:
      'radial-gradient(circle at center, rgba(48,213,200,0.13), rgba(7,16,25,0.02) 58%, rgba(7,16,25,0.82))',
  },
  outroTitle: {
    fontSize: 76,
    fontWeight: 950,
    marginBottom: 45,
  },
  outroGrid: {
    width: 1280,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 22,
    zIndex: 3,
  },
  outroCard: {
    minHeight: 145,
    padding: '28px 32px',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.09)',
    border: '1px solid rgba(255,255,255,0.16)',
  },
  outroCardTitle: {
    fontSize: 32,
    fontWeight: 950,
    marginBottom: 13,
    color: '#a9fff0',
  },
  outroCopy: {
    fontSize: 25,
    lineHeight: 1.42,
    color: '#d5e7f2',
  },
  outroRing: {
    position: 'absolute',
    width: 760,
    height: 760,
    borderRadius: 999,
    border: '2px dashed rgba(255,255,255,0.18)',
  },
};
