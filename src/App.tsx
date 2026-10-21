import { useState, useEffect } from 'react';
import { QUESTIONS } from './data/questions';
import { calculateGameResults, getMidRoundBriefing, ScoreResult } from './utils/scoring';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { MidBriefingModal } from './components/MidBriefingModal';
import { FinalRevealModal } from './components/FinalRevealModal';
import { ResultScreen } from './components/ResultScreen';
import { CompareModal } from './components/CompareModal';
import { AllPhilosophersModal } from './components/AllPhilosophersModal';

type GamePhase = 'intro' | 'playing' | 'reveal' | 'result';

export function App() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [currentRound, setCurrentRound] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showMidBriefing, setShowMidBriefing] = useState(false);
  const [midBriefingData, setMidBriefingData] = useState<ReturnType<typeof getMidRoundBriefing> | null>(null);
  const [resultData, setResultData] = useState<ScoreResult | null>(null);

  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState(false);

  // URL 파라미터 감지 (예: 공유 링크로 접속한 경우)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      // 바로 비교 모달 열기 가능하도록 유도
    }
  }, []);

  const totalRounds = QUESTIONS.length;
  const currentQuestion = QUESTIONS[currentRound - 1];

  // 생존 추정 인원수 (라운드 진행에 따른 시각적 카운트다운 연출)
  const getEstimatedSurvivors = (round: number) => {
    if (round <= 4) return 19;
    if (round <= 8) return 18;
    if (round <= 12) return 14;
    if (round < 15) return 8;
    return 3;
  };

  const handleStartGame = () => {
    setPhase('playing');
    setCurrentRound(1);
    setSelectedAnswers({});
    setShowMidBriefing(false);
    setResultData(null);
  };

  const handleSelectOption = (optionId: string) => {
    const updatedAnswers = { ...selectedAnswers, [currentRound]: optionId };
    setSelectedAnswers(updatedAnswers);

    // 4, 8, 12 라운드 종료 시 중간 브리핑
    if (currentRound === 4 || currentRound === 8 || currentRound === 12) {
      const briefing = getMidRoundBriefing(currentRound, updatedAnswers);
      setMidBriefingData(briefing);
      setShowMidBriefing(true);
      return;
    }

    // 마지막 라운드 종료 시 최종 연출로 진입
    if (currentRound >= totalRounds) {
      const finalResult = calculateGameResults(updatedAnswers);
      setResultData(finalResult);
      setPhase('reveal');
      return;
    }

    // 다음 라운드로 진행
    setCurrentRound((prev) => prev + 1);
  };

  const handleContinueFromBriefing = () => {
    setShowMidBriefing(false);
    if (currentRound >= totalRounds) {
      const finalResult = calculateGameResults(selectedAnswers);
      setResultData(finalResult);
      setPhase('reveal');
    } else {
      setCurrentRound((prev) => prev + 1);
    }
  };

  const handlePrevRound = () => {
    if (currentRound > 1) {
      setCurrentRound((prev) => prev - 1);
    }
  };

  const handleRevealComplete = () => {
    setPhase('result');
  };

  const handleRestart = () => {
    setPhase('intro');
    setCurrentRound(1);
    setSelectedAnswers({});
    setShowMidBriefing(false);
    setResultData(null);
  };

  return (
    <div className="min-h-screen bg-survival-dark text-neutral-100 flex flex-col justify-between selection:bg-orange-500 selection:text-black">
      {phase === 'intro' && (
        <IntroScreen
          onStart={handleStartGame}
          onOpenEncyclopedia={() => setIsEncyclopediaOpen(true)}
        />
      )}

      {phase === 'playing' && currentQuestion && (
        <>
          <QuestionScreen
            question={currentQuestion}
            totalRounds={totalRounds}
            currentRound={currentRound}
            selectedOptionId={selectedAnswers[currentRound]}
            onSelectOption={handleSelectOption}
            onPrevRound={handlePrevRound}
            canGoPrev={currentRound > 1}
            survivorCountEstimated={getEstimatedSurvivors(currentRound)}
          />

          {showMidBriefing && midBriefingData && (
            <MidBriefingModal
              round={midBriefingData.round}
              survivorCount={midBriefingData.survivorCount}
              thriving={midBriefingData.thriving}
              inDanger={midBriefingData.inDanger}
              onContinue={handleContinueFromBriefing}
            />
          )}
        </>
      )}

      {phase === 'reveal' && (
        <FinalRevealModal onComplete={handleRevealComplete} />
      )}

      {phase === 'result' && resultData && (
        <ResultScreen
          result={resultData}
          onRestart={handleRestart}
          onOpenCompare={() => setIsCompareOpen(true)}
          onOpenEncyclopedia={() => setIsEncyclopediaOpen(true)}
        />
      )}

      {/* Friends Comparison Modal */}
      {isCompareOpen && resultData && (
        <CompareModal
          myWinnerId={resultData.winnerId}
          myShareCode={resultData.shareCode}
          onClose={() => setIsCompareOpen(false)}
        />
      )}

      {/* Encyclopedia Modal */}
      {isEncyclopediaOpen && (
        <AllPhilosophersModal onClose={() => setIsEncyclopediaOpen(false)} />
      )}
    </div>
  );
}
export default App;
