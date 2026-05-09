# Roadmap（中文增强版）：融合 UI 包项目方向、实施路径与验收标准

## 背景

本仓库目标是构建可治理的 ToB 融合 UI 包体系，核心方向为：

- BUI-first
- AntD-assisted
- `@tob-ui/ui-bridge` 作为业务侧统一导入入口
- 通过 metadata + CLI + lint 形成“可约束、可查询、可自动化验证”的工程闭环

项目原则：**不直接改上游 UI 源码**（Backstage UI / AntD），所有定制通过 wrapper、adapter、theme token 与 metadata 实现，保证后续可升级能力。

## 当前现状（基于仓库代码）

- 已完成 monorepo 与核心包骨架：
  - `@tob-ui/bui`
  - `@tob-ui/antd`
  - `@tob-ui/ui-bridge`
  - `@tob-ui/theme`
  - `@tob-ui/ui-meta`
  - `@tob-ui/ui-cli`
  - `@tob-ui/eslint-plugin-ui-bridge`
- 已具备 docs / storybook / backstage plugin 三类文档入口。
- 当前主要缺口是“方向治理流程”与“实施任务闭环”的模板化沉淀不足，导致 issue/PR 信息结构不统一，难以系统推进。

## 目标

1. 方向层：每个方向都有明确背景、边界、里程碑与可验收标准。
2. 实施层：每个实现任务都必须关联方向 issue，并给出实现方案与任务拆解。
3. 验证层：PR 必须记录多模型/多 Agent 交叉验证结论，避免单一路径判断偏差。
4. 治理层：确保业务代码持续通过 `@tob-ui/ui-bridge` 收口，不泄漏底层库依赖。

## 范围

### 包含

- Issue 模板（方向规划 + 实现任务）中文化与结构化。
- PR 模板结构化，固化方案、验证、风险与回滚信息。
- 形成“方向 -> 实施 -> PR 验证”的标准交付链路。

### 不包含

- 一次性完成所有组件能力重构。
- 对上游 UI 库源码进行直接改写。
- 在未形成方向 Issue 前直接大规模改动业务 API。

## 分阶段里程碑

- 里程碑 1（流程基建）：完成 Issue/PR 模板，团队统一提交流程。
- 里程碑 2（实现推进）：按方向 Issue 拆解多个 implementation issue，分批落地。
- 里程碑 3（治理增强）：结合 lint/cli/docs 完成治理可视化与回归验证闭环。

## 验收标准（DoD）

- [ ] 新建方向 issue 时，必填背景、目标、边界、里程碑、验收标准（中文）。
- [ ] 新建实现 issue 时，必填关联方向 issue、实现方案、任务拆解、交叉验证计划。
- [ ] PR 必须包含：关联 issue、实现方案摘要、验证记录、风险与回滚。
- [ ] 关键改动在 PR 中有“多模型 / 多 Agent”交叉验证结论记录。
- [ ] 与 `ui-bridge` 收口原则一致，不引入业务侧底层库直接依赖扩散。

