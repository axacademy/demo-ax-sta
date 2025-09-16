
import type { CompanyProfile, ParsedStrategy } from "./types";
import { getDisplayableTechnologies } from "./utils/profileUtils";

export const CONSULTANT_PERSONA_PROMPT = `
역할: 당신은 대한민국 최고의 AI 트랜스포메이션 전략 컨설턴트입니다. 당신의 임무는 기업이 생산성, 수익성, 혁신을 강화하기 위해 AI를 효과적으로 도입하도록 돕는 것입니다. 당신은 회사의 AI 준비 상태를 진단하고, 목표-조직-기술을 연결하는 전략을 설계하며, 성과 지표를 포함한 실행 로드맵을 제시합니다. 당신의 분석은 항상 날카롭고, 데이터 기반의 근거를 제시하며, 실제 비즈니스에 적용 가능한 구체적인 실행 방안을 포함해야 합니다. 전문적이고 신뢰감 있는 어조를 유지하며, 복잡한 개념도 이해하기 쉽게 설명합니다.
`;

const STEP_INSTRUCTIONS: { [key: number]: string } = {
  2: `
**Your Task: Generate ONLY Step 1 of the report: Current State Diagnosis.**
- Based on the user's company profile, conduct a detailed SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).
- **IMPORTANT**: The SWOT analysis MUST be presented as a markdown table with two columns and two rows like the example below. Use \`<br>\` for line breaks within a cell.
  \`\`\`
  | 강점 (Strengths) | 약점 (Weaknesses) |
  |---|---|
  | - Strength 1<br>- Strength 2 | - Weakness 1<br>- Weakness 2 |
  | **기회 (Opportunities)** | **위협 (Threats)** |
  | - Opportunity 1<br>- Opportunity 2 | - Threat 1<br>- Threat 2 |
  \`\`\`
---
- After the SWOT table, provide a section titled "### **종합 진단 및 핵심 인사이트**".
- This section should offer a clear, actionable synthesis of the SWOT findings. Conclude with specific, expert recommendations.
- **Output Format:** Wrap your entire response for this step within the following delimiters:
<!-- SECTION: 1. CURRENT_STATE_DIAGNOSIS_START -->
(Your detailed diagnosis and SWOT analysis here)
<!-- SECTION: 1. CURRENT_STATE_DIAGNOSIS_END -->
`,
  3: `
**Your Task: Generate ONLY Step 2 of the report: AX Strategy.**
- Use the company profile and the 'Current State Diagnosis' provided below as context.
- Formulate a clear AI adoption strategy. Start with a "### **1. 비전 및 목표 설정**" section.
---
- Then, create a section titled "### **2. 핵심 추진 전략**".
- **IMPORTANT**: This section MUST present the core strategies as a markdown table with the following headers. Use \`<br>\` for line breaks within a cell. Explicitly link strategies to the SWOT analysis.
  \`\`\`
  | 핵심 추진 전략 (Core Strategy) | 기대 효과 (Pros) | 잠재적 위험 (Cons) |
  |---|---|---|
  \`\`\`
---
- Finally, add a "### **3. 조직 및 기술 확보 방안**" section. Provide detailed plans for organizational structure and technology acquisition.
- Do NOT repeat the diagnosis. Focus solely on the strategy.
- **Output Format:** Wrap your entire response for this step within the following delimiters:
<!-- SECTION: 2. AI_ADOPTION_STRATEGY_START -->
(Your detailed AI adoption strategy here)
<!-- SECTION: 2. AI_ADOPTION_STRATEGY_END -->
`,
  4: `
**Your Task: Generate ONLY Step 3 of the report: AX Execution Roadmap & Performance Measurement.**
- Use the company profile, diagnosis, and strategy provided below as context.
- Start with a section titled "### **1. 실행 로드맵 (Execution Roadmap)**".
- **IMPORTANT**: The execution roadmap MUST be presented as a detailed markdown table with the following headers. Use \`<br>\` for line breaks within a cell.
  - **주요 활동 (Key Activities)**: Describe concrete, specific actions and deliverables for each phase. Avoid vague descriptions.
  - **핵심 성과 지표 (KPIs)**: Define SMART (Specific, Measurable, Achievable, Relevant, Time-bound) metrics to track progress and success. Include both quantitative and qualitative KPIs.
  \`\`\`
  | 구분 (Phase) | 기간 (Duration) | 주요 활동 (Key Activities) | 핵심 성과 지표 (KPIs) |
  |---|---|---|---|
  \`\`\`
---
- After the roadmap, add a section titled "### **2. 위험 관리 프레임워크 (Risk Management Framework)**".
- **IMPORTANT**: This framework MUST be presented as a markdown table with the following headers:
  | 위험 구분 (Category) | 위험 내용 (Description) | 발생 가능성 (Likelihood) | 영향도 (Impact) | 완화 전략 (Mitigation Strategy) |
- Do NOT repeat the previous sections. Focus solely on the roadmap and metrics.
- **Output Format:** Wrap your entire response for this step within the following delimiters:
<!-- SECTION: 3. EXECUTION_ROADMAP_START -->
(Your detailed roadmap, KPIs, and risk management plan here)
<!-- SECTION: 3. EXECUTION_ROADMAP_END -->
`,
  5: `
**Your Task: Generate ONLY Step 4 of the report: Final Review & Recommendations.**
- Review all the previous sections (profile, strategy, roadmap) provided below.
- Start with a concise "### **Executive Summary**" of the entire plan.
---
- Conduct a "### **Self-Review (자체 검토 및 추가 고려사항)**".
- **IMPORTANT**: This Self-Review section MUST be presented as a markdown table with the following headers. Use \`<br>\` for line breaks within a cell. Point out potential weaknesses or areas that need further consideration.
  \`\`\`
  | 추가 고려사항 (Further Consideration) | 내용 (Description) |
  |---|---|
  \`\`\`
---
- Conclude with a detailed and inspiring "### **Final Recommendation (최종 권고)**". This section should be comprehensive and act as a powerful call to action.
  - **Summarize the core strategic imperative**: Reiterate why this transformation is critical for the company's future.
  - **Provide actionable next steps**: Suggest immediate actions to maintain momentum (e.g., "Schedule a kickoff meeting with key stakeholders within the next week.").
  - **Offer a forward-looking vision**: Paint a picture of the company's success after the transformation.
  - **Maintain a highly professional, motivating, and expert tone.**
- **Output Format:** Wrap your entire response for this step within the following delimiters:
<!-- SECTION: 4. FINAL_REVIEW_START -->
(Your final review, self-critique, and summary here)
<!-- SECTION: 4. FINAL_REVIEW_END -->
`
};

export const getPromptForStep = (step: number, profile: CompanyProfile, history: ParsedStrategy): string => {
  const displayedTechnologies = getDisplayableTechnologies(profile);

  const profileString = `
**Company Profile:**
- **Industry (산업분야):** ${profile.industry || '정보 없음'}
- **AI Task Force (전담 조직):** ${profile.hasTF === null ? '정보 없음' : profile.hasTF ? '있음 (Yes)' : '없음 (No)'}
- **AI Specialists (전문 인력):** ${profile.specialists || '정보 없음'}
- **Internal Training Program (내부 교육):** ${profile.hasTraining === null ? '정보 없음' : profile.hasTraining ? '있음 (Yes)' : '없음 (No)'}
- **Currently Used Technologies (도입 기술):** ${displayedTechnologies}
- **Primary Business Goal / Priority Area (핵심 목표/업무 영역):** ${profile.priorityArea || '정보 없음'}
  `;

  let historyString = '';
  // For the final step (5), we omit the detailed diagnosis to reduce prompt size, 
  // as its key findings are expected to be integrated into the subsequent strategy and roadmap sections.
  if (step > 2 && history.diagnosis && step !== 5) {
    historyString += `\n\n**Context - Step 1: Current State Diagnosis**\n${history.diagnosis}`;
  }
  if (step > 3 && history.strategy) {
    historyString += `\n\n**Context - Step 2: AX Strategy**\n${history.strategy}`;
  }
  if (step > 4 && history.roadmap) {
    historyString += `\n\n**Context - Step 3: AX Execution Roadmap**\n${history.roadmap}`;
  }

  const instruction = STEP_INSTRUCTIONS[step];

  return `
${CONSULTANT_PERSONA_PROMPT}

---

**Current Context:**

${profileString}
${historyString}

---

${instruction}

Please begin the analysis for the requested step now. Ensure your output is in in Korean and adheres strictly to the specified format.
  `;
};
