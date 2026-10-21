import React from 'react';
import { Flame, Skull, ChevronRight, Activity } from 'lucide-react';

interface MidBriefingModalProps {
  round: number;
  survivorCount: number;
  thriving: { id: string; nickname: string; emoji: string }[];
  inDanger: { id: string; nickname: string; emoji: string }[];
  onContinue: () => void;
}

export const MidBriefingModal: React.FC<MidBriefingModalProps> = ({
  round,
  survivorCount,
  thriving,
  inDanger,
  onContinue,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-red-600/20 blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="text-center mb-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/15 text-red-400 border border-red-500/30 mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>긴급 서바이벌 브리핑</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            ROUND {round} 종료 현황판
          </h3>
          <p className="text-sm text-neutral-400 mt-1">
            19명 중 현재 <span className="text-orange-400 font-bold">{survivorCount}명</span> 생존 중
          </p>
        </div>

        {/* Status Blocks */}
        <div className="space-y-4 mb-6 relative z-10">
          {/* Thriving Group */}
          <div className="bg-neutral-950/70 border border-orange-500/30 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-orange-400">
              <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
              <span>강하게 생존 중인 철학자 (TOP 3)</span>
            </div>
            <div className="space-y-2">
              {thriving.map((p, idx) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-xs sm:text-sm bg-neutral-900/90 px-3 py-2 rounded-lg border border-neutral-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-400">#{idx + 1}</span>
                    <span className="text-neutral-400 font-mono">???</span>
                    <span className="text-white font-medium">“{p.nickname}”</span>
                  </div>
                  <span className="text-emerald-400 font-semibold text-xs">안정권</span>
                </div>
              ))}
            </div>
          </div>

          {/* In Danger Group */}
          <div className="bg-neutral-950/70 border border-red-500/30 rounded-xl p-3.5">
            <div className="flex items-center gap-2 mb-2 text-xs font-bold text-red-400">
              <Skull className="w-4 h-4 text-red-500" />
              <span>탈락 위기 / 점수 급락 철학자</span>
            </div>
            <div className="space-y-2">
              {inDanger.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between text-xs sm:text-sm bg-neutral-900/90 px-3 py-2 rounded-lg border border-neutral-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-400 font-mono">???</span>
                    <span className="text-neutral-300">“{p.nickname}”</span>
                  </div>
                  <span className="text-red-400 font-semibold text-xs">위기</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Subtitle Lore */}
        <p className="text-xs text-neutral-400 text-center mb-5 leading-relaxed relative z-10">
          “당신의 선택과 생각이 멀어진 철학자들의 생존력이 급격히 떨어지고 있습니다.”
        </p>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className="w-full py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20"
        >
          <span>생존게임 계속하기</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
