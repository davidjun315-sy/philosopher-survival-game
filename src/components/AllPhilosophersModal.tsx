import React, { useState } from 'react';
import { X, Search, BookOpen } from 'lucide-react';
import { PHILOSOPHER_LIST } from '../data/philosophers';

interface AllPhilosophersModalProps {
  onClose: () => void;
}

export const AllPhilosophersModal: React.FC<AllPhilosophersModalProps> = ({ onClose }) => {
  const [search, setSearch] = useState('');

  const filtered = PHILOSOPHER_LIST.filter(
    (p) =>
      p.name.includes(search) ||
      p.nickname.includes(search) ||
      p.corePhilosophy.includes(search) ||
      p.era.includes(search)
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-2xl p-5 shadow-2xl relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-bold text-white">서양 철학자 21인 생존 도감</h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="my-3 relative">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="철학자 이름, 별명, 키워드 검색..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filtered.map((p, idx) => (
            <div
              key={p.id}
              className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3 hover:border-neutral-700 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl overflow-hidden border border-neutral-700 shrink-0 bg-neutral-800 flex items-center justify-center relative shadow">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <span className="text-xl absolute -z-10">{p.emoji}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{p.name}</span>
                      <span className="text-[10px] text-neutral-400">({p.era})</span>
                    </div>
                    <div className="text-xs text-orange-400 font-medium">“{p.nickname}”</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">#{idx + 1}</span>
              </div>

              <p className="text-xs text-neutral-300 mt-2 leading-relaxed bg-neutral-900/60 p-2 rounded-lg border border-neutral-800/60">
                <span className="text-amber-400 font-semibold">핵심 사상: </span>
                {p.corePhilosophy}
              </p>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-8 text-neutral-500 text-xs">
              검색된 철학자가 없습니다.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-neutral-800 text-center">
          <p className="text-[11px] text-neutral-500">
            총 21명의 사상가가 고교 「윤리와 사상」 서양윤리 핵심 영역을 구성합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
