export type TraitKey = 'rational' | 'empirical' | 'duty' | 'freedom' | 'happiness' | 'practical';

export interface TraitScore {
  rational: number;   // 이성 (합리, 논리, 질서)
  empirical: number;  // 경험 (관찰, 감각, 공감)
  duty: number;       // 원칙 (의무, 보편성, 선의지)
  freedom: number;    // 자유 (주체적 결단, 실존, 책임)
  happiness: number;  // 행복 (평정, 만족, 즐거움)
  practical: number;  // 실용 (도구, 문제 해결, 유용성)
}

export interface Philosopher {
  id: string;              // 영문 식별자 (예: 'kant')
  name: string;            // 한국어 이름 (예: '임마누엘 칸트')
  era: string;             // 시대/학파 (예: '독일 관념론 / 근대')
  nickname: string;        // 재미있는 유형명 (예: '절대선 넘지 않는 원칙 수호자')
  shortDesc: string;       // 한 줄 설명
  traits: Record<TraitKey, number>; // 기본 성향 가중치 (0~100)
  corePhilosophy: string;  // 핵심 사상 요약 (교과서 핵심)
  whyYouMatch: string;     // 당신과 닮은 이유 (선택 결과 해설 3~4문장)
  emoji: string;           // 상징 이모지
  nemesisId: string;       // 철학적 천적 ID
  nemesisReason: string;   // 천적인 이유 설명
}

export interface Option {
  id: string;
  text: string;
  // 각 철학자에게 부여되는 점수 가중치 (예: { kant: 4, bentham: -2 })
  weights: Record<string, number>;
  // 주요 성향 축 보너스 (스탯 그래프용)
  traitBonuses: Partial<Record<TraitKey, number>>;
}

export interface Question {
  round: number;
  title: string;
  scenario: string;
  category: string;
  options: Option[];
}

export interface SurvivalState {
  currentRound: number;
  selectedAnswers: Record<number, string>; // round -> optionId
  philosopherScores: Record<string, number>; // id -> score (기본 100)
  accumulatedTraits: TraitScore;
}
