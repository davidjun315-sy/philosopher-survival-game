import React, { useState } from 'react';
import { X, HeartHandshake, Swords, Sparkles, AlertCircle } from 'lucide-react';
import { compareWithFriend } from '../utils/scoring';
import { PHILOSOPHERS } from '../data/philosophers';

interface CompareModalProps {
  myWinnerId: string;
  myShareCode: string;
  onClose: () => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({ myWinnerId, myShareCode, onClose }) => {
  const [friendInput, setFriendInput] = useState('');
  const [result, setResult] = useState<ReturnType<typeof compareWithFriend> | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const myPhil = PHILOSOPHERS[myWinnerId];

  const handleCompare = () => {
    setErrorMsg('');
    if (!friendInput.trim()) {
      setErrorMsg('친구의 결과 코드나 철학자 이름을 입력해주세요!');
      return;
    }

    const comparison = compareWithFriend(myWinnerId, friendInput);
    if (!comparison) {
      setErrorMsg('올바른 결과 코드(예: PHIL-BENT-8742)나 철학자 이름(예: 벤담, 칸트)을 입력해주세요.');
      setResult(null);
    } else {
      setResult(comparison);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-2xl p-5 sm:p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-2 text-orange-400 font-bold text-sm">
          <HeartHandshake className="w-4 h-4" />
          <span>친구와 철학적 궁합 비교</span>
        </div>
        <h3 className="text-xl font-black text-white mb-4">
          우리는 소울메이트일까, 라이벌일까?
        </h3>

        {/* My Info */}
        <div className="bg-neutral-950/70 border border-neutral-800 rounded-xl p-3 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-400 shrink-0 bg-neutral-800">
              <img src={myPhil.imageUrl} alt={myPhil.name} className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className="text-[10px] text-neutral-400">내 최종 생존 철학자</div>
              <div className="text-sm font-bold text-white">{myPhil.name}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-neutral-500 font-mono">내 코드</div>
            <div className="text-xs font-mono font-bold text-orange-400">{myShareCode}</div>
          </div>
        </div>

        {/* Input Box */}
        <div className="space-y-2 mb-4">
          <label className="text-xs font-medium text-neutral-300">
            친구의 결과 코드 또는 철학자 이름
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={friendInput}
              onChange={(e) => {
                setFriendInput(e.target.value);
                setErrorMsg('');
              }}
              placeholder="예: PHIL-BENT-1234 또는 벤담"
              className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-orange-500 font-mono"
            />
            <button
              onClick={handleCompare}
              className="px-4 py-2.5 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm rounded-xl transition-colors active:scale-95"
            >
              비교
            </button>
          </div>
          {errorMsg && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 mt-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Comparison Result */}
        {result && (
          <div className="bg-gradient-to-br from-neutral-950 to-neutral-900 border border-orange-500/30 rounded-xl p-4 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-amber-400 shrink-0 bg-neutral-800 shadow">
                  <img src={myPhil.imageUrl} alt={myPhil.name} className="w-full h-full object-cover object-top" />
                </div>
                <span className="text-xs font-black text-orange-400 font-mono">VS</span>
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400 shrink-0 bg-neutral-800 shadow">
                  <img src={result.friendPhil.imageUrl} alt={result.friendPhil.name} className="w-full h-full object-cover object-top" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-neutral-400">철학적 케미 점수</div>
                <div className="text-xl font-black text-orange-400">
                  {result.chemistryScore} <span className="text-xs text-neutral-400">/ 100</span>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/15 text-orange-300 border border-orange-500/30 mb-1.5">
                {result.chemistryScore < 50 ? (
                  <Swords className="w-3 h-3 text-red-400" />
                ) : (
                  <Sparkles className="w-3 h-3 text-amber-400" />
                )}
                <span>{result.chemistryType}</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="bg-neutral-900/80 rounded-lg p-2.5 text-xs text-neutral-400 border border-neutral-800">
              <span className="text-neutral-200 font-semibold">친구의 유형: </span>
              {result.friendPhil.name} — “{result.friendPhil.nickname}”
            </div>
          </div>
        )}

        {/* Quick Test Tags */}
        <div className="mt-4 pt-3 border-t border-neutral-800">
          <div className="text-[11px] text-neutral-500 mb-2">💡 바로 테스트해볼 수 있는 주요 철학자:</div>
          <div className="flex flex-wrap gap-1.5">
            {['벤담', '칸트', '사르트르', '소크라테스', '에피쿠로스', '듀이'].map((name) => (
              <button
                key={name}
                onClick={() => {
                  setFriendInput(name);
                  const c = compareWithFriend(myWinnerId, name);
                  setResult(c);
                  setErrorMsg('');
                }}
                className="text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1 rounded-md transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
