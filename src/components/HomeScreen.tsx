import { Sparkles, ArrowRight, Flame, BookOpen, MessageCircle, Trophy } from 'lucide-react';
import type { Lesson } from '../types';
import type { Progress } from '../hooks/useProgress';
import { getLevelInfo } from '../hooks/useProgress';
import { BottomNav, type Tab } from './BottomNav';

interface HomeScreenProps {
  progress: Progress;
  lessons: Lesson[];
  completedScenariosCount: number;
  unlockedAchievements: number;
  totalAchievements: number;
  onStartLearning: () => void;
  onStartChat: () => void;
  onTabChange: (tab: Tab) => void;
  activeTab: Tab;
}

export function HomeScreen({
  progress,
  lessons,
  completedScenariosCount,
  unlockedAchievements,
  totalAchievements,
  onStartLearning,
  onStartChat,
  onTabChange,
  activeTab,
}: HomeScreenProps) {
  const levelInfo = getLevelInfo(progress.xp);
  const completedCount = progress.completedLessons.length;

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-italy-green-600 via-italy-green-700 to-italy-green-800 text-white">
        <div className="absolute top-0 right-0 w-48 h-48 bg-italy-red-500/20 rounded-full blur-3xl -translate-y-12 translate-x-12" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl translate-y-8 -translate-x-8" />

        <div className="relative max-w-2xl mx-auto px-4 pt-8 pb-10">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="h-4 w-4 text-amber-300" />
            <span className="text-sm font-bold text-italy-green-100">Bem-vindo de volta!</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl mb-2">
            Ciao! Pronto para aprender italiano?
          </h1>
          <p className="text-italy-green-100 text-sm mb-6 max-w-md">
            Aprenda de forma divertida e prática, com áudio, flashcards e conversas reais.
          </p>

          {/* Level card */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-italy-green-50">Nível {levelInfo.level}</span>
                <span className="text-xs bg-white/20 rounded-full px-2 py-0.5 font-semibold">
                  {levelInfo.levelLabel}
                </span>
              </div>
              <span className="text-xs font-bold text-italy-green-100 tabular-nums">
                {levelInfo.xpIntoLevel}/{levelInfo.xpForNext} XP
              </span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-300 to-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${levelInfo.progress}%` }}
              />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-4">
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <Flame className="h-5 w-5 text-orange-300 mx-auto mb-1" fill="currentColor" />
              <p className="font-display font-bold text-xl tabular-nums">{progress.streak}</p>
              <p className="text-[10px] sm:text-[11px] text-italy-green-100 font-semibold">dias</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <BookOpen className="h-5 w-5 text-italy-green-100 mx-auto mb-1" fill="currentColor" />
              <p className="font-display font-bold text-xl tabular-nums">{completedCount}/{lessons.length}</p>
              <p className="text-[10px] sm:text-[11px] text-italy-green-100 font-semibold">lições</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <MessageCircle className="h-5 w-5 text-italy-green-100 mx-auto mb-1" fill="currentColor" />
              <p className="font-display font-bold text-xl tabular-nums">{completedScenariosCount}</p>
              <p className="text-[10px] sm:text-[11px] text-italy-green-100 font-semibold">conversas</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 text-center border border-white/20">
              <Trophy className="h-5 w-5 text-amber-300 mx-auto mb-1" fill="currentColor" />
              <p className="font-display font-bold text-xl tabular-nums">{unlockedAchievements}/{totalAchievements}</p>
              <p className="text-[10px] sm:text-[11px] text-italy-green-100 font-semibold">medalhas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="max-w-2xl mx-auto px-4 -mt-4">
        <button
          onClick={onStartLearning}
          className="group w-full flex items-center gap-4 rounded-2xl bg-white shadow-lg border border-italy-green-100 p-4 text-left hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-italy-green-400 to-italy-green-600 text-white shadow-md">
            <BookOpen className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-italy-green-800">Continuar a aprender</h3>
            <p className="text-sm text-italy-green-500">
              {completedCount === 0
                ? 'Comece sua primeira lição de italiano'
                : `${lessons.length - completedCount} lições restantes na trilha`}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-italy-green-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={onStartChat}
          className="group w-full flex items-center gap-4 rounded-2xl bg-white shadow-lg border border-italy-green-100 p-4 text-left mt-3 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-italy-red-400 to-italy-red-600 text-white shadow-md">
            <MessageCircle className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-italy-green-800">Simular conversa</h3>
            <p className="text-sm text-italy-green-500">
              Pratique diálogos do dia a dia na Itália
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-italy-green-400 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => onTabChange('achievements')}
          className="group w-full flex items-center gap-4 rounded-2xl bg-white shadow-lg border border-italy-green-100 p-4 text-left mt-3 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md">
            <Trophy className="h-7 w-7" fill="currentColor" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-italy-green-800">Suas conquistas</h3>
            <p className="text-sm text-italy-green-500">
              {unlockedAchievements === 0
                ? 'Nenhuma medalha ainda. Comece a aprender!'
                : `${unlockedAchievements} de ${totalAchievements} medalhas desbloqueadas`}
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-italy-green-400 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Tip card */}
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🇮🇹</span>
            <div>
              <p className="font-display font-bold text-amber-800 text-sm">Dica do dia</p>
              <p className="text-sm text-amber-700 mt-1">
                Em italiano, "Ciao" serve tanto para "olá" quanto para "tchau". Prático, não é?
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  );
}
