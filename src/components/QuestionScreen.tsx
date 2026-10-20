import React from 'react';
import { ArrowLeft, Sparkles, AlertTriangle } from 'lucide-react';
import { Question } from '../types';

interface QuestionScreenProps {
  question: Question;
  totalRounds: number;
  currentRound: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onPrevRound: () => void;
  canGoPrev: boolean;
  survivorCountEstimated: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  totalRounds,
  currentRound,
  selectedOptionId,
  onSelectOption,
  onPrevRound,
  canGoPrev,
  survivorCountEstimated,
}) => {
  const progressPercent = Math.round((currentRound / totalRounds) * 100);

  // 선택지 알파벳 레이블
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-lg mx-auto p-4 sm:p-5 pb-8 relative">
      {/* Top Header & Progress */}
      <div className="w-full pt-2 mb-4">
        <div className="flex items-center justify-between mb-2">
          {canGoPrev ? (
            <button
              onClick={onPrevRound}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>이전 질문</span>
            </button>
          ) : (
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              PHILOSOPHER SURVIVAL
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              생존 약 {survivorCountEstimated}명
            </span>
            <span className="text-xs font-black text-orange-400">
              ROUND {currentRound} / {totalRounds}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Scenario Card */}
      <div className="flex-1 flex flex-col justify-center my-2">
        <div className="bg-neutral-900/90 rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-2xl relative overflow-hidden mb-5">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Category Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-neutral-800/80 text-orange-400 border border-neutral-700/60 mb-3">
            <Sparkles className="w-3 h-3 text-orange-400" />
            <span>{question.category}</span>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3 leading-snug">
            {question.title}
          </h2>

          {/* Scenario Text */}
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
            {question.scenario}
          </p>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            const label = optionLabels[index] || `${index + 1}`;

            return (
              <button
                key={option.id}
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.99] flex items-start gap-3.5 group relative overflow-hidden ${
                  isSelected
                    ? 'bg-orange-600/15 border-orange-500 text-white shadow-lg shadow-orange-950/40 ring-1 ring-orange-500'
                    : 'bg-neutral-900/70 hover:bg-neutral-850 border-neutral-800 hover:border-neutral-700 text-neutral-200'
                }`}
              >
                {/* Option Letter Pill */}
                <div
                  className={`w-7 h-7 shrink-0 rounded-lg flex items-center justify-center font-bold text-xs transition-colors mt-0.5 ${
                    isSelected
                      ? 'bg-orange-500 text-black shadow-md'
                      : 'bg-neutral-800 group-hover:bg-neutral-700 text-neutral-400 group-hover:text-white'
                  }`}
                >
                  {label}
                </div>

                {/* Option Text */}
                <span className="text-sm sm:text-base leading-snug font-medium flex-1">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Survival Tension Subtitle */}
      <div className="pt-3 text-center">
        <p className="text-xs text-neutral-500 flex items-center justify-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-orange-500/70" />
          <span>당신의 선택에 따라 철학자들의 생존 점수가 실시간 변동됩니다</span>
        </p>
      </div>
    </div>
  );
};
