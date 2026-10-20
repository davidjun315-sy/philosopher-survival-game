import React, { useRef, useState } from 'react';
import { X, Download, Share2, Check, Sparkles, Trophy } from 'lucide-react';
import { ScoreResult, TRAIT_LABELS } from '../utils/scoring';
import { PHILOSOPHERS } from '../data/philosophers';
import { TraitKey } from '../types';

interface SharePhotoCardModalProps {
  result: ScoreResult;
  onClose: () => void;
}

export const SharePhotoCardModal: React.FC<SharePhotoCardModalProps> = ({ result, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const winner = PHILOSOPHERS[result.winnerId];
  const traitEntries = Object.entries(result.normalizedTraits) as [TraitKey, number][];

  // HTML5 Canvas를 이용해 카드를 고해상도 PNG 이미지로 직접 생성하여 다운로드
  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      const card = cardRef.current;
      if (!card) return;

      const canvas = document.createElement('canvas');
      const scale = 2; // 고해상도 레티나 지원
      const width = 420;
      const height = 620;
      canvas.width = width * scale;
      canvas.height = height * scale;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.scale(scale, scale);

      // 1. 다크 배경 채우기
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#13141c');
      bgGrad.addColorStop(1, '#0a0a0d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 테두리
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.strokeRect(10, 10, width - 20, height - 20);

      // 2. 상단 헤더
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚔️ 철학자 생존게임 | 최종 생존자', width / 2, 38);

      // 3. 사상가 초상화 이미지 그리기
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = winner.imageUrl;

      await new Promise<void>((resolve) => {
        img.onload = () => {
          const imgSize = 130;
          const imgX = (width - imgSize) / 2;
          const imgY = 55;

          // 원형 클리핑 & 테두리
          ctx.save();
          ctx.beginPath();
          ctx.arc(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, imgX, imgY, imgSize, imgSize);
          ctx.restore();

          // 금빛 원형 테두리
          ctx.beginPath();
          ctx.arc(imgX + imgSize / 2, imgY + imgSize / 2, imgSize / 2 + 3, 0, Math.PI * 2);
          ctx.strokeStyle = '#f59e0b';
          ctx.lineWidth = 3;
          ctx.stroke();

          resolve();
        };
        img.onerror = () => {
          // 로드 실패 시 이모지 대체
          ctx.font = '60px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(winner.emoji, width / 2, 140);
          resolve();
        };
      });

      // 4. 이름 및 유형명
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`“${winner.nickname}”`, width / 2, 215);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'black 26px sans-serif';
      ctx.fillText(winner.name, width / 2, 248);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '11px sans-serif';
      ctx.fillText(winner.era, width / 2, 268);

      // 5. 한 줄 명언 박스
      ctx.fillStyle = '#1c1d27';
      ctx.fillRect(30, 285, width - 60, 48);
      ctx.strokeStyle = '#2e3040';
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 285, width - 60, 48);

      ctx.fillStyle = '#e5e7eb';
      ctx.font = 'italic 12px sans-serif';
      ctx.textAlign = 'center';
      // 텍스트 줄바꿈 간략 처리
      ctx.fillText(`“${winner.shortDesc.slice(0, 28)}...”`, width / 2, 314);

      // 6. 6대 성향 스탯 게이지 바 그리기
      ctx.fillStyle = '#9ca3af';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('📊 주요 철학적 성향', 35, 355);

      let currentY = 372;
      traitEntries.forEach(([tKey, val]) => {
        const label = TRAIT_LABELS[tKey];
        ctx.fillStyle = '#d1d5db';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(label.name, 35, currentY);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'right';
        ctx.fillText(String(val), width - 35, currentY);

        // Bar Track
        ctx.fillStyle = '#262837';
        ctx.fillRect(110, currentY - 8, width - 155, 7);

        // Fill Bar
        ctx.fillStyle = label.color;
        const fillW = ((width - 155) * val) / 100;
        ctx.fillRect(110, currentY - 8, fillW, 7);

        currentY += 21;
      });

      // 7. 하단 고유 코드 및 워터마크
      ctx.fillStyle = '#111218';
      ctx.fillRect(20, 520, width - 40, 55);
      ctx.strokeStyle = '#2d2f40';
      ctx.strokeRect(20, 520, width - 40, 55);

      ctx.fillStyle = '#9ca3af';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('철학 코드 (친구와 비교):', 35, 542);

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 14px monospace';
      ctx.fillText(result.shareCode, 35, 562);

      ctx.fillStyle = '#6b7280';
      ctx.font = '9px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText('고교 윤리와 사상 입문 웹게임', width - 35, 552);

      // 다운로드 트리거
      const link = document.createElement('a');
      link.download = `철학자생존게임_${winner.name}_결과카드.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error(e);
      alert('이미지 생성 중 오류가 발생했습니다. 화면을 캡처해서 사용하실 수도 있습니다!');
    } finally {
      setDownloading(false);
    }
  };

  const handleShareText = () => {
    const text = `[철학자 생존게임 결과]\n🥇 최후의 생존 사상가: ${winner.name} (“${winner.nickname}”)\n💬 "${winner.shortDesc}"\n고유 코드: ${result.shareCode}\n너의 생존 철학자는 누구야?`;
    if (navigator.share) {
      navigator.share({
        title: `철학자 생존게임 결과 - ${winner.name}`,
        text: text,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-3xl p-5 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1.5 rounded-full hover:bg-neutral-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
          <Trophy className="w-3.5 h-3.5" />
          <span>사상가 포토 카드 공유 & 저장</span>
        </div>

        {/* Photocard Preview Area */}
        <div
          ref={cardRef}
          className="bg-gradient-to-b from-neutral-950 via-[#12131a] to-neutral-950 border-2 border-amber-500/60 rounded-2xl p-4 text-center shadow-xl relative overflow-hidden mb-4"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-28 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          {/* Top Badge */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 mb-3">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>최종 생존 철학자 인증</span>
          </div>

          {/* Portrait Image (얼굴 사진) */}
          <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 mb-3">
            <div className="w-full h-full rounded-full overflow-hidden border-3 border-amber-400 shadow-2xl bg-neutral-800 flex items-center justify-center relative">
              <img
                src={winner.imageUrl}
                alt={winner.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // 로드 에러 시 이모지로 대체
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-4xl absolute -z-10">{winner.emoji}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-amber-500 text-black p-1 rounded-full text-xs shadow-lg">
              👑
            </div>
          </div>

          {/* Name & Nickname */}
          <div className="text-xs font-semibold text-amber-400 mb-0.5">
            “{winner.nickname}”
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {winner.name}
          </h3>
          <p className="text-[10px] text-neutral-400 mb-3 font-mono">{winner.era}</p>

          {/* Quote */}
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-200 leading-relaxed mb-3">
            “{winner.shortDesc}”
          </div>

          {/* Trait Bars */}
          <div className="space-y-1.5 text-left mb-3 bg-neutral-900/50 p-2.5 rounded-xl border border-neutral-800/80">
            <div className="text-[10px] font-bold text-neutral-400 mb-1">📊 성향 지수</div>
            {traitEntries.map(([tKey, val]) => (
              <div key={tKey} className="flex items-center justify-between text-[10px]">
                <span className="text-neutral-300">{TRAIT_LABELS[tKey].name}</span>
                <div className="w-28 h-1.5 bg-neutral-800 rounded-full overflow-hidden mx-2">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${val}%`,
                      backgroundColor: TRAIT_LABELS[tKey].color,
                    }}
                  />
                </div>
                <span className="font-mono text-neutral-400 w-5 text-right">{val}</span>
              </div>
            ))}
          </div>

          {/* Code Footer */}
          <div className="bg-neutral-950 p-2 rounded-lg border border-neutral-800/80 flex items-center justify-between text-[11px]">
            <span className="text-neutral-400">철학 코드</span>
            <span className="font-mono font-bold text-orange-400">{result.shareCode}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-600/25 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? '카드 생성 중...' : '📸 사진 카드 이미지로 저장 (다운로드)'}</span>
          </button>

          <button
            onClick={handleShareText}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-neutral-200 bg-neutral-800 hover:bg-neutral-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-neutral-700"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? '복사 완료!' : '결과 문구 복사 / 카톡 공유'}</span>
          </button>
        </div>

        <p className="text-[10px] text-neutral-500 text-center mt-2.5">
          저장된 이미지를 인스타그램, 카카오톡, 학급 밴드에 공유해보세요!
        </p>
      </div>
    </div>
  );
};
