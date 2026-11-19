import { Trophy, Lock, Check } from 'lucide-react';
import { achievements } from '../data/achievements';
import type { Progress } from '../hooks/useProgress';

interface AchievementsScreenProps {
  progress: Progress;
}

export function AchievementsScreen({ progress }: AchievementsScreenProps) {
  const unlocked = achievements.filter((a) => a.check(progress));
  const locked = achievements.filter((a) => !a.check(progress));

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-md mb-3">
          <Trophy className="h-7 w-7" fill="currentColor" />
        </div>
        <h2 className="font-display font-bold text-2xl text-italy-green-800 mb-1">
          Conquistas
        </h2>
        <p className="text-italy-green-600 text-sm">
          {unlocked.length} de {achievements.length} medalhas desbloqueadas
        </p>
      </div>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-italy-green-100 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-italy-green-700">Progresso total</span>
          <span className="text-sm font-bold text-italy-green-600 tabular-nums">
            {Math.round((unlocked.length / achievements.length) * 100)}%
          </span>
        </div>
        <div className="h-3 bg-italy-green-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-700"
            style={{ width: `${(unlocked.length / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Unlocked achievements */}
      {unlocked.length > 0 && (
        <>
          <h3 className="font-display font-bold text-italy-green-700 text-sm mb-3 px-1">
            Desbloqueadas
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {unlocked.map((ach, i) => (
              <div
                key={ach.id}
                className="relative rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 p-4 text-center animate-pop-in overflow-hidden"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute top-2 right-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                </div>
                <div className="text-4xl mb-2">{ach.emoji}</div>
                <p className="font-display font-bold text-amber-800 text-sm leading-tight">
                  {ach.title}
                </p>
                <p className="text-xs text-amber-600 mt-1">{ach.description}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Locked achievements */}
      {locked.length > 0 && (
        <>
          <h3 className="font-display font-bold text-gray-400 text-sm mb-3 px-1">
            A desbloquear
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {locked.map((ach) => (
              <div
                key={ach.id}
                className="relative rounded-2xl bg-gray-50 border-2 border-gray-200 p-4 text-center"
              >
                <div className="absolute top-2 right-2">
                  <Lock className="h-4 w-4 text-gray-300" />
                </div>
                <div className="text-4xl mb-2 opacity-30 grayscale">{ach.emoji}</div>
                <p className="font-display font-bold text-gray-400 text-sm leading-tight">
                  {ach.title}
                </p>
                <p className="text-xs text-gray-400 mt-1">{ach.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
