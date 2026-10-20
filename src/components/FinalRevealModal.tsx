import React, { useEffect, useState } from 'react';
import { Skull, Sparkles, Award } from 'lucide-react';

interface FinalRevealModalProps {
  onComplete: () => void;
}

export const FinalRevealModal: React.FC<FinalRevealModalProps> = ({ onComplete }) => {
  const [seconds, setSeconds] = useState(3);
  const [phase, setPhase] = useState<'counting' | 'reveal'>('counting');

  useEffect(() => {
    if (seconds > 1) {
      const timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 950);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setPhase('reveal');
      }, 950);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Background Pulse */}
      <div className="absolute w-80 h-80 bg-orange-600/20 rounded-full blur-3xl animate-ping opacity-40 pointer-events-none" />

      {phase === 'counting' ? (
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-75 duration-300">
          <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center mb-6">
            <Skull className="w-8 h-8 text-red-500 animate-bounce" />
          </div>

          <p className="text-sm font-semibold tracking-widest text-neutral-400 uppercase mb-2">
            SURVIVAL COMPLETED
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
            철학 세계의 재난이 끝났습니다
          </h2>

          {/* Countdown Number */}
          <div className="relative my-4">
            <span className="text-7xl sm:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-red-600 animate-pulse font-mono">
              {seconds}
            </span>
          </div>

          <p className="text-sm text-neutral-400 mt-4 animate-pulse">
            당신의 15번의 선택을 바탕으로 <br />
            최후의 생존 철학자를 집계하고 있습니다...
          </p>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center max-w-sm animate-in fade-in zoom-in-95 duration-400">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-2xl shadow-orange-500/30 mb-5">
            <div className="w-full h-full bg-neutral-900 rounded-[14px] flex items-center justify-center">
              <Award className="w-10 h-10 text-amber-400 animate-bounce" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>생존 검증 완료</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            최종 생존 철학자를 공개합니다!
          </h2>
          <p className="text-xs text-neutral-400 mb-6">
            당신의 영혼과 가장 깊게 공명한 단 한 명의 사상가
          </p>

          <button
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-orange-500 via-amber-500 to-red-600 hover:from-orange-400 hover:to-red-500 active:scale-[0.98] transition-all shadow-xl shadow-orange-500/30 animate-pulse"
          >
            결과 확인하기 👑
          </button>
        </div>
      )}
    </div>
  );
};
