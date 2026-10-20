import { PHILOSOPHERS, PHILOSOPHER_LIST } from '../data/philosophers';
import { QUESTIONS } from '../data/questions';
import { TraitKey, TraitScore } from '../types';

export interface ScoreResult {
  winnerId: string;
  runnerUpId: string;
  thirdPlaceId: string;
  nemesisId: string;
  sortedRankings: { id: string; score: number; hp: number; name: string; nickname: string; emoji: string }[];
  normalizedTraits: TraitScore;
  shareCode: string;
}

// 6대 성향 한국어 라벨
export const TRAIT_LABELS: Record<TraitKey, { name: string; desc: string; color: string }> = {
  rational: { name: '이성·논리', desc: '이성적 검증과 명확한 원리 추구', color: '#06b6d4' }, // Cyan
  empirical: { name: '경험·공감', desc: '직접적인 관찰과 살아 숨쉬는 감정', color: '#f43f5e' }, // Rose
  duty: { name: '원칙·의무', desc: '양심과 보편적 도덕률에 대한 존중', color: '#8b5cf6' }, // Purple
  freedom: { name: '자유·실존', desc: '주체적 결단과 운명에 대한 독립성', color: '#f97316' }, // Orange
  happiness: { name: '행복·평정', desc: '내면의 고요와 삶의 질적 만족', color: '#10b981' }, // Green
  practical: { name: '실용·행동', desc: '현실 문제 해결과 실천적 유용성', color: '#eab308' }, // Amber
};

export function calculateGameResults(selectedAnswers: Record<number, string>): ScoreResult {
  // 1. 철학자 기본 점수 100점에서 시작
  const scores: Record<string, number> = {};
  PHILOSOPHER_LIST.forEach((p) => {
    scores[p.id] = 100;
  });

  // 2. 6대 성향 누적
  const traits: TraitScore = {
    rational: 30,
    empirical: 30,
    duty: 30,
    freedom: 30,
    happiness: 30,
    practical: 30,
  };

  QUESTIONS.forEach((q) => {
    const selectedOptId = selectedAnswers[q.round];
    if (!selectedOptId) return;

    const opt = q.options.find((o) => o.id === selectedOptId);
    if (!opt) return;

    // 철학자 가중치 반영
    Object.entries(opt.weights).forEach(([philId, weight]) => {
      if (scores[philId] !== undefined) {
        scores[philId] += weight * 4; // 가중치 증폭
      }
    });

    // 능력치 보너스 반영
    if (opt.traitBonuses) {
      Object.entries(opt.traitBonuses).forEach(([k, bonus]) => {
        const key = k as TraitKey;
        if (traits[key] !== undefined && bonus !== undefined) {
          traits[key] += bonus * 3.5;
        }
      });
    }
  });

  // 3. 랭킹 정렬
  const ranked = PHILOSOPHER_LIST.map((p) => ({
    id: p.id,
    name: p.name,
    nickname: p.nickname,
    emoji: p.emoji,
    score: scores[p.id] || 100,
    hp: Math.max(10, Math.min(100, Math.round((scores[p.id] / 160) * 100))),
  })).sort((a, b) => b.score - a.score);

  const winner = ranked[0];
  const runnerUp = ranked[1];
  const thirdPlace = ranked[2];
  const nemesis = ranked[ranked.length - 1];

  // 4. 스탯 정규화 (최소 20 ~ 최대 98 사이로 보기 좋게 매핑)
  const normalizedTraits: TraitScore = {
    rational: Math.min(99, Math.max(25, Math.round(traits.rational))),
    empirical: Math.min(99, Math.max(25, Math.round(traits.empirical))),
    duty: Math.min(99, Math.max(25, Math.round(traits.duty))),
    freedom: Math.min(99, Math.max(25, Math.round(traits.freedom))),
    happiness: Math.min(99, Math.max(25, Math.round(traits.happiness))),
    practical: Math.min(99, Math.max(25, Math.round(traits.practical))),
  };

  // 5. 고유 공유 코드 생성 (예: PHIL-KANT-8842)
  const topPhilCode = winner.id.toUpperCase().slice(0, 4);
  const hashVal = Math.abs(
    (normalizedTraits.duty * 31 + normalizedTraits.rational * 17 + normalizedTraits.freedom * 13) % 9000
  ) + 1000;
  const shareCode = `PHIL-${topPhilCode}-${hashVal}`;

  return {
    winnerId: winner.id,
    runnerUpId: runnerUp.id,
    thirdPlaceId: thirdPlace.id,
    nemesisId: nemesis.id,
    sortedRankings: ranked,
    normalizedTraits,
    shareCode,
  };
}

// 중간 라운드 생존 현황 계산
export function getMidRoundBriefing(
  round: number,
  selectedAnswers: Record<number, string>
) {
  const partialScores: Record<string, number> = {};
  PHILOSOPHER_LIST.forEach((p) => {
    partialScores[p.id] = 100;
  });

  QUESTIONS.forEach((q) => {
    if (q.round <= round) {
      const selectedOptId = selectedAnswers[q.round];
      if (!selectedOptId) return;
      const opt = q.options.find((o) => o.id === selectedOptId);
      if (!opt) return;
      Object.entries(opt.weights).forEach(([philId, weight]) => {
        if (partialScores[philId] !== undefined) {
          partialScores[philId] += weight * 4;
        }
      });
    }
  });

  const ranked = PHILOSOPHER_LIST.map((p) => ({
    id: p.id,
    nickname: p.nickname,
    emoji: p.emoji,
    score: partialScores[p.id],
  })).sort((a, b) => b.score - a.score);

  let survivorCount = 21;
  let briefingTitle = '';

  if (round === 4) {
    survivorCount = 18;
    briefingTitle = '제1차 서바이벌 생존 집계';
  } else if (round === 8) {
    survivorCount = 14;
    briefingTitle = '제2차 데스매치 생존 집계';
  } else if (round === 12) {
    survivorCount = 8;
    briefingTitle = '파이널 진출권 쟁탈 집계';
  }

  // 상위권 (강하게 생존 중) & 하위권 (위험)
  const thriving = ranked.slice(0, 3);
  const inDanger = ranked.slice(ranked.length - 3);

  return {
    round,
    survivorCount,
    briefingTitle,
    thriving,
    inDanger,
  };
}

// 친구와의 철학적 케미 분석
export function compareWithFriend(myWinnerId: string, friendCodeOrId: string) {
  const cleanInput = friendCodeOrId.trim().toUpperCase();
  let friendId = '';

  // 코드가 PHIL-KANT-xxxx 형식인 경우
  if (cleanInput.startsWith('PHIL-')) {
    const parts = cleanInput.split('-');
    const tag = parts[1]?.toLowerCase();
    const found = PHILOSOPHER_LIST.find((p) => p.id.toUpperCase().startsWith(tag));
    if (found) friendId = found.id;
  } else {
    // 철학자 ID 직접 입력 혹은 이름 입력
    const found = PHILOSOPHER_LIST.find(
      (p) => p.id.toLowerCase() === cleanInput.toLowerCase() || p.name.includes(cleanInput)
    );
    if (found) friendId = found.id;
  }

  if (!friendId || !PHILOSOPHERS[friendId]) {
    return null;
  }

  const myPhil = PHILOSOPHERS[myWinnerId];
  const friendPhil = PHILOSOPHERS[friendId];

  // 궁합 점수 및 설명 계산
  let chemistryScore = 75;
  let chemistryType = '흥미로운 토론 메이트';
  let description = '';

  if (myPhil.id === friendPhil.id) {
    chemistryScore = 99;
    chemistryType = '영혼의 도플갱어';
    description = `두 사람은 생각의 결이 완벽하게 일치합니다! 같은 상황에서 동일한 도덕적 나침반을 공유하며 말하지 않아도 통하는 최고의 소울메이트입니다.`;
  } else if (myPhil.nemesisId === friendPhil.id || friendPhil.nemesisId === myPhil.id) {
    chemistryScore = 42;
    chemistryType = '세기의 라이벌 (불꽃 튀는 배틀)';
    description = `서로의 가치관이 정반대 축에 서 있습니다! 한 사람은 "${myPhil.nickname}", 다른 사람은 "${friendPhil.nickname}". 수업 시간에 토론 배틀이 열리면 가장 뜨겁게 맞붙을 천적 관계입니다. 하지만 서로에게 가장 날카로운 영감을 줍니다!`;
  } else {
    chemistryScore = 85;
    chemistryType = '상호 보완적인 환상의 파트너';
    description = `한 사람이 놓칠 수 있는 맹점을 다른 사람이 든든하게 채워주는 균형 잡힌 관계입니다. "${myPhil.name}"의 시선과 "${friendPhil.name}"의 통찰이 만나면 어떤 난제도 함께 풀어낼 수 있습니다.`;
  }

  return {
    friendPhil,
    chemistryScore,
    chemistryType,
    description,
  };
}
