"use client";

import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Timer,
  AlertCircle,
  Award,
  BookOpen,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Progress } from "../ui/progress";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Level {
  id: string;
  title: string;
  questions: Question[];
}

interface Quiz {
  id: string;
  title: string;
  levels: Level[];
}

interface QuizPlayerProps {
  quizId: string;
  onClose: () => void;
}

export function QuizPlayer({ quizId, onClose }: QuizPlayerProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [levelResults, setLevelResults] = useState<{ levelId: string; score: number; total: number; answers: number[] }[]>([]);
  const [currentLevelAnswers, setCurrentLevelAnswers] = useState<number[]>([]);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isFinalFinished, setIsFinalFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const res = await fetch(`/api/quizzes/${quizId}`);
        if (res.ok) {
          const data = await res.json();
          setQuiz(data);
        }
      } catch (err) {
        console.error("Quiz fetch failed", err);
      } finally {
        setLoading(false);
      }
    }
    fetchQuiz();
  }, [quizId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4 animate-pulse">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
            <Timer className="w-8 h-8 text-slate-300 dark:text-slate-700" />
        </div>
        <p className="text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-[10px]">Syncing Knowledge Hub...</p>
      </div>
    );
  }

  if (!quiz) return null;

  const currentLevel = quiz.levels[currentLevelIdx];
  const currentQuestion = currentLevel.questions[currentQuestionIdx];
  const totalQuestionsInTopic = quiz.levels.reduce((acc, lvl) => acc + lvl.questions.length, 0);
  const totalAnsweredBefore = levelResults.reduce((acc, res) => acc + res.total, 0);
  const overallProgress = ((totalAnsweredBefore + currentQuestionIdx + 1) / totalQuestionsInTopic) * 100;
  
  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setCurrentLevelAnswers([...currentLevelAnswers, index]);
  };

  const handleNext = () => {
    if (currentQuestionIdx < currentLevel.questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Level Complete
      const levelScore = [...currentLevelAnswers, selectedAnswer as number].reduce((acc, curr, idx) => {
          return curr === currentLevel.questions[idx].correctAnswer ? acc + 1 : acc;
      }, 0);
      
      const result = {
        levelId: currentLevel.id,
        score: levelScore,
        total: currentLevel.questions.length,
        answers: [...currentLevelAnswers]
      };
      
      setLevelResults([...levelResults, result]);
      setShowLevelComplete(true);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIdx < quiz.levels.length - 1) {
      setCurrentLevelIdx(currentLevelIdx + 1);
      setCurrentQuestionIdx(0);
      setCurrentLevelAnswers([]);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setShowLevelComplete(false);
    } else {
      setIsFinalFinished(true);
    }
  };

  const calculateFinalScore = () => {
    const score = levelResults.reduce((acc, curr) => acc + curr.score, 0);
    const total = levelResults.reduce((acc, curr) => acc + curr.total, 0);
    return { score, total };
  };

  if (showLevelComplete) {
     const lastResult = levelResults[levelResults.length - 1];
     const levelPass = lastResult.score / lastResult.total >= 0.7;
     
     return (
       <div className="p-10 space-y-8 animate-in fade-in zoom-in-95 duration-700 text-center">
          <div className="space-y-4">
             <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto border-4 border-white dark:border-slate-900 shadow-premium relative">
                <Sparkles className="w-12 h-12 text-primary animate-pulse" />
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm">
                   <CheckCircle2 className="w-4 h-4" />
                </div>
             </div>
             <div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Congratulations!</h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold mt-1">You've mastered the <span className="text-primary">{currentLevel.title}</span> stage.</p>
             </div>
          </div>

          <div className="flex justify-center gap-8">
             <div className="text-center">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Level Accuracy</span>
                <span className="text-3xl font-black text-slate-800">{Math.round((lastResult.score / lastResult.total) * 100)}%</span>
             </div>
             <div className="w-px h-12 bg-slate-100" />
             <div className="text-center">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Next Phase</span>
                <span className="text-3xl font-black text-primary">
                   {currentLevelIdx < quiz.levels.length - 1 ? 'UNLOCKED' : 'ULTIMATE'}
                </span>
             </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 italic text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
             &ldquo;You've demonstrated consistent competence in core architectural patterns. The next level will challenge your ability to optimize for regional scalability.&rdquo;
          </div>

          <button 
             onClick={handleNextLevel}
             className="w-full h-14 rounded-2xl bg-primary text-white font-black text-[14px] uppercase tracking-widest hover:bg-[#004182] transition-all active:scale-95 shadow-premium flex items-center justify-center gap-3 group"
          >
             {currentLevelIdx < quiz.levels.length - 1 ? 'Advance to Next Level' : 'View Ultimate Results'}
             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
       </div>
     );
  }

  if (isFinalFinished) {
    const { score, total } = calculateFinalScore();
    const percentage = (score / total) * 100;

    return (
      <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center space-y-4">
           <div className="w-24 h-24 bg-[#FFD700]/10 rounded-full flex items-center justify-center mx-auto border-4 border-white dark:border-slate-900 shadow-premium">
              <Trophy className="w-12 h-12 text-[#B8860B]" />
           </div>
           <div className="space-y-1">
             <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Grand Mastery Achieved!</h2>
             <p className="text-slate-500 dark:text-slate-400 font-medium">You have completed all levels of the {quiz.title} assessment.</p>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
           <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
             <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Overall Depth</span>
             <span className="text-3xl font-black text-slate-800 dark:text-slate-200">{score}/{total}</span>
           </div>
           <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-center">
             <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Technical IQ</span>
             <span className="text-3xl font-black text-primary">{Math.round(percentage)}%</span>
           </div>
           <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-center">
             <span className="block text-[10px] font-black text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mb-1">Status</span>
             <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400">VERIFIED</span>
           </div>
        </div>

        <div className="space-y-4">
           <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest flex items-center gap-2">
             <BookOpen className="w-4 h-4 text-primary" /> Mastery Breakdown
           </h3>
           <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {levelResults.map((res, lIdx) => (
                <div key={res.levelId} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                            <Award className="w-4 h-4 text-primary" />
                         </div>
                         <h4 className="font-bold text-slate-800 dark:text-slate-200">{quiz.levels[lIdx].title}</h4>
                      </div>
                      <span className="text-sm font-black text-primary">{res.score}/{res.total}</span>
                   </div>
                   <div className="mt-3">
                      <Progress value={(res.score / res.total) * 100} className="h-1.5" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black text-[14px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 shadow-premium"
        >
          Return to Learning Hub
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
           <div>
              <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">{quiz.title}</h2>
              <p className="text-xs font-black text-primary uppercase tracking-widest mt-1 flex items-center gap-2">
                 <Sparkles className="w-3 h-3" /> Level {currentLevelIdx + 1}: {currentLevel.title}
              </p>
           </div>
           <div className="text-right">
              <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Overall {Math.round(overallProgress)}%</span>
           </div>
        </div>
        <Progress value={overallProgress} className="h-2 rounded-full bg-slate-100 dark:bg-slate-900" />
      </div>

      {/* Question */}
      <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-inner group transition-all">
         <div className="flex justify-center mb-4">
            <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
               Question {currentQuestionIdx + 1} of {currentLevel.questions.length}
            </span>
         </div>
         <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight text-center">
           {currentQuestion.question}
         </h3>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-4">
         {currentQuestion.options.map((option, idx) => {
           let style = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:shadow-lg";
           let icon = null;

           if (showExplanation) {
             if (idx === currentQuestion.correctAnswer) {
               style = "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 dark:border-emerald-900 ring-1 ring-emerald-500";
               icon = <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
             } else if (idx === selectedAnswer) {
               style = "bg-red-50 dark:bg-red-950/20 border-red-500 dark:border-red-900 ring-1 ring-red-500";
               icon = <XCircle className="w-5 h-5 text-red-600" />;
             } else {
               style = "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-50";
             }
           } else if (selectedAnswer === idx) {
             style = "bg-primary/5 dark:bg-primary/10 border-primary ring-1 ring-primary";
           }

           return (
             <button
               key={idx}
               disabled={showExplanation}
               onClick={() => handleAnswerSelect(idx)}
               className={`p-5 rounded-2xl border-2 transition-all flex items-center justify-between group active:scale-[0.98] ${style}`}
             >
               <span className={`text-[15px] font-bold ${showExplanation ? 'text-slate-800 dark:text-slate-200' : 'text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors'}`}>
                  {option}
               </span>
               {icon}
             </button>
           );
         })}
      </div>

      {/* Explanation Action Area */}
      {showExplanation && (
        <div className="animate-in slide-in-from-top-4 duration-500 space-y-6">
           <div className="p-6 rounded-3xl bg-primary/5 dark:bg-primary/10 border border-primary/10 dark:border-primary/20 flex gap-4 items-start">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
                 <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest">Architect's Note</span>
                 <p className="text-[13px] font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">&ldquo;{currentQuestion.explanation}&rdquo;</p>
              </div>
           </div>

           <button 
             onClick={handleNext}
             className="w-full h-14 rounded-2xl bg-primary text-white font-black text-[14px] uppercase tracking-widest hover:bg-[#004182] transition-all active:scale-95 shadow-premium flex items-center justify-center gap-3 group"
           >
             {currentQuestionIdx < currentLevel.questions.length - 1 ? 'Next Question' : 'Complete Level'}
             <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      )}
    </div>
  );
}
