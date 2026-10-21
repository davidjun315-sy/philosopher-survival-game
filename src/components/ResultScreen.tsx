import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Swords,
  BookOpen,
  HeartHandshake,
  Activity,
  Camera,
} from 'lucide-react';
import { ScoreResult, TRAIT_LABELS } from '../utils/scoring';
import { PHILOSOPHERS } from '../data/philosophers';
import { TraitKey } from '../types';
import { SharePhotoCardModal } from './SharePhotoCardModal';

interface ResultScreenProps {
  result: ScoreResult;
  onRestart: () => void;
  onOpenCompare: () => void;
  onOpenEncyclopedia: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onRestart,
  onOpenCompare,
  onOpenEncyclopedia,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isPhotoCardOpen, setIsPhotoCardOpen] = useState(false);

  const winner = PHILOSOPHERS[result.winnerId];
  const runnerUp = PHILOSOPHERS[result.runnerUpId];
  const thirdPlace = PHILOSOPHERS[result.thirdPlaceId];
  const nemesis = PHILOSOPHERS[result.nemesisId];

  // Confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fbbf24', '#ef4444', '#10b981'],
      });
    } catch {
      // Ignore if not supported
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(result.shareCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const traitEntries = Object.entries(result.normalizedTraits) as [TraitKey, number][];

  return (
    <div className="min-h-screen max-w-lg mx-auto p-4 sm:p-5 py-8 pb-16 space-y-6">
      {/* Top Banner */}
      <div className="text-center pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-2">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>최종 생존 철학자 판정</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          끝까지 살아남은 철학자
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 mt-1">
          21명의 철학자 중 당신의 선택과 끝까지 함께한 최후의 1인
        </p>
      </div>

      {/* Main Champion Card with Portrait */}
      <div className="bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Crown Badge */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="inline-flex items-center gap-1 text-[11px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md bg-amber-500 text-black shadow-md">
            👑 SOLE SURVIVOR
          </span>
          <span className="text-xs text-neutral-400 font-mono">
            {winner.era}
          </span>
        </div>

        {/* Champion Title with Portrait Image */}
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-xl bg-neutral-800 flex items-center justify-center relative">
              <img
                src={winner.imageUrl}
                alt={winner.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-4xl absolute -z-10">{winner.emoji}</span>
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-500 text-black text-xs font-bold p-1 rounded-full shadow">
              {winner.emoji}
            </span>
          </div>

          <div>
            <div className="text-xs sm:text-sm font-semibold text-amber-400 mb-0.5">
              “{winner.nickname}”
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {winner.name}
            </h2>
          </div>
        </div>

        {/* One Line Summary */}
        <div className="bg-neutral-950/80 rounded-xl p-3.5 border border-neutral-800 text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium mb-4 relative z-10">
          💬 “{winner.shortDesc}”
        </div>

        {/* Why You Match Section */}
        <div className="relative z-10 space-y-1.5">
          <h4 className="text-xs font-bold text-amber-400/90 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>왜 당신과 닮았을까?</span>
          </h4>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-900/60 p-3.5 rounded-xl border border-neutral-800/80">
            {winner.whyYouMatch}
          </p>
        </div>

        {/* Textbook Core Philosophy Tag */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-start gap-2 text-xs text-neutral-400 relative z-10">
          <BookOpen className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <span className="text-neutral-200 font-semibold">윤리와 사상 핵심: </span>
            {winner.corePhilosophy}
          </p>
        </div>
      </div>

      {/* Trait Graph Card */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">당신의 6대 철학적 성향</h3>
          </div>
          <span className="text-[11px] text-neutral-400">0 ~ 100 지수</span>
        </div>

        <div className="space-y-3.5">
          {traitEntries.map(([traitKey, value]) => {
            const labelInfo = TRAIT_LABELS[traitKey];
            return (
              <div key={traitKey} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-neutral-200">{labelInfo.name}</span>
                    <span className="text-[10px] text-neutral-400 hidden sm:inline">
                      • {labelInfo.desc}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-white">{value}</span>
                </div>
                {/* Gauge Bar */}
                <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800/80">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${value}%`,
                      backgroundColor: labelInfo.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOP 3 Ranking Card with Portraits */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-orange-400" />
          <h3 className="text-base font-bold text-white">최종 생존 순위 (TOP 3)</h3>
        </div>

        <div className="space-y-2.5">
          {/* 1st */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥇</span>
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-amber-400 shrink-0 bg-neutral-800">
                <img src={winner.imageUrl} alt={winner.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">{winner.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    최종 생존자
                  </span>
                </div>
                <div className="text-xs text-neutral-400">“{winner.nickname}”</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400">1위</span>
          </div>

          {/* 2nd */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥈</span>
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-700 shrink-0 bg-neutral-800">
                <img src={runnerUp.imageUrl} alt={runnerUp.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-200">{runnerUp.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    끝까지 버틴 철학자
                  </span>
                </div>
                <div className="text-xs text-neutral-400">“{runnerUp.nickname}”</div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-neutral-400">2위</span>
          </div>

          {/* 3rd */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/80 border border-neutral-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥉</span>
              <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-700 shrink-0 bg-neutral-800">
                <img src={thirdPlace.imageUrl} alt={thirdPlace.name} className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-neutral-200">{thirdPlace.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                    아쉽게 탈락
                  </span>
                </div>
                <div className="text-xs text-neutral-400">“{thirdPlace.nickname}”</div>
              </div>
            </div>
            <span className="text-xs font-mono font-semibold text-neutral-400">3위</span>
          </div>
        </div>
      </div>

      {/* Philosophical Nemesis Card with Portrait */}
      <div className="bg-neutral-900 border border-red-500/30 rounded-2xl p-5 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-red-400" />
            <h3 className="text-base font-bold text-red-400">나의 철학적 천적</h3>
          </div>
          <span className="text-[10px] text-neutral-400 font-mono">가장 낮은 호환도</span>
        </div>

        <div className="flex items-center gap-3 mb-3 bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-red-500/40 shrink-0 bg-neutral-800">
            <img src={nemesis.imageUrl} alt={nemesis.name} className="w-full h-full object-cover object-top" />
          </div>
          <div>
            <div className="text-sm font-black text-white">{nemesis.name}</div>
            <div className="text-xs text-red-400">“{nemesis.nickname}”</div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-red-950/20 border border-red-900/30 p-3 rounded-xl">
          {winner.nemesisReason}
        </p>
      </div>

      {/* Share & Compare Section */}
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-orange-500/40 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white font-bold text-base">
            <HeartHandshake className="w-5 h-5 text-orange-400" />
            <span>결과 공유 및 친구 비교</span>
          </div>
          <span className="text-[11px] text-amber-400 font-medium">얼굴 사진 포함 카드 지원</span>
        </div>

        {/* Main Photo Card Share Button */}
        <button
          onClick={() => setIsPhotoCardOpen(true)}
          className="w-full py-4 px-4 rounded-xl font-black text-sm sm:text-base text-white bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-xl shadow-orange-600/30 border border-amber-300/30"
        >
          <Camera className="w-5 h-5 animate-pulse" />
          <span>📸 {winner.name} 얼굴 사진 포토카드 저장 & 공유</span>
        </button>

        {/* Share Code Box */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
          <div>
            <div className="text-[10px] text-neutral-400">나의 고유 철학 코드</div>
            <div className="text-base font-mono font-black text-orange-400 tracking-wider">
              {result.shareCode}
            </div>
          </div>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors active:scale-95"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? '복사됨!' : '코드 복사'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2.5">
          <button
            onClick={onOpenCompare}
            className="py-3 px-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-orange-600 hover:bg-orange-500 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-600/20 active:scale-95"
          >
            <Swords className="w-4 h-4" />
            <span>친구 코드 입력 비교</span>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={onRestart}
          className="w-full py-4 px-4 rounded-xl font-bold text-base text-white bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-neutral-700 shadow-lg"
        >
          <RefreshCw className="w-4 h-4" />
          <span>생존게임 다시 플레이하기</span>
        </button>

        <button
          onClick={onOpenEncyclopedia}
          className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-900 border border-neutral-800/80 transition-colors flex items-center justify-center gap-2"
        >
          <BookOpen className="w-4 h-4" />
          <span>21명 전체 철학자 도감 확인하기</span>
        </button>
      </div>

      {/* Photo Card Modal */}
      {isPhotoCardOpen && (
        <SharePhotoCardModal
          result={result}
          onClose={() => setIsPhotoCardOpen(false)}
        />
      )}
    </div>
  );
};
