import React from 'react';
import { ShieldAlert, Sparkles, BookOpen, ChevronRight, Users, Flame } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
  onOpenEncyclopedia: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onStart, onOpenEncyclopedia }) => {
  return (
    <div className="min-h-screen flex flex-col justify-between max-w-lg mx-auto p-5 py-8 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-center gap-2 pt-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
          <Flame className="w-3.5 h-3.5 animate-pulse text-orange-500" />
          고교 윤리와 사상 특별 입문전
        </span>
      </div>

      {/* Main Hero Section */}
      <div className="relative z-10 my-auto py-6 flex flex-col items-center">
        {/* Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neutral-800 to-neutral-900 border border-neutral-700/80 shadow-2xl flex items-center justify-center relative">
            <span className="text-5xl select-none transform hover:scale-110 transition-transform duration-200">⚔️</span>
            <div className="absolute -top-2 -right-2 bg-red-600 text-[10px] font-black px-2 py-0.5 rounded-full text-white shadow-lg animate-bounce">
              SURVIVAL
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2 leading-tight">
          철학자 생존게임
        </h1>
        <p className="text-orange-400 font-medium text-base sm:text-lg mb-6 tracking-wide">
          “끝까지 살아남는 철학자는 누구인가?”
        </p>

        {/* Story Intro Card */}
        <div className="w-full bg-neutral-900/80 backdrop-blur-md rounded-2xl p-5 border border-neutral-800 shadow-xl text-left space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-300 leading-relaxed">
              서양 철학자 <span className="text-orange-400 font-bold">20명</span>이 한 공간에 모였다.
              하지만 철학 세계에 정체불명의 재난이 발생했다.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-300 leading-relaxed">
              각 라운드마다 하나의 선택을 해야 하고, <span className="text-white font-semibold">너의 선택과 생각이 비슷한 철학자만 살아남는다.</span>
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-sm text-neutral-300 leading-relaxed">
              15번의 선택 끝에 마침내 공개될 <span className="text-cyan-300 font-semibold">나의 최후 생존 철학자</span>는 누구일까?
            </p>
          </div>
        </div>

        {/* Callout Notice */}
        <div className="text-xs text-neutral-400 bg-neutral-950/60 rounded-xl px-4 py-3 border border-neutral-800/80 max-w-sm">
          <p className="text-neutral-200 font-medium mb-1">💡 플레이 팁</p>
          <p className="leading-relaxed">
            “정답은 없다. 선생님이 좋아할 것 같은 답 말고, <br className="hidden sm:inline" />
            <span className="text-orange-400 font-semibold">진짜 네가 할 것 같은 선택</span>을 골라라.”
          </p>
        </div>
      </div>

      {/* Bottom CTA Area */}
      <div className="relative z-10 w-full space-y-3 pt-2">
        <button
          onClick={onStart}
          className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-orange-600 via-amber-600 to-red-600 hover:from-orange-500 hover:to-red-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-600/25 flex items-center justify-center gap-2 group border border-orange-400/30"
        >
          <span>생존게임 시작하기</span>
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onOpenEncyclopedia}
          className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-200 bg-neutral-900/60 hover:bg-neutral-800/60 border border-neutral-800 active:scale-[0.99] transition-colors flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-4 h-4 text-neutral-400" />
          <span>20명 철학자 도감 열람하기</span>
        </button>

        <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 px-1">
          <span>v1.2 (사상가 사진 카드 탑재)</span>
          <button
            onClick={() => {
              window.location.href = window.location.pathname + '?t=' + Date.now();
            }}
            className="text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
          >
            🔄 최신 화면으로 새로고침
          </button>
        </div>
      </div>
    </div>
  );
};
