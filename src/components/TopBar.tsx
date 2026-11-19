import { Flame, Star, Award } from 'lucide-react';
import { getLevelInfo } from '../hooks/useProgress';
import type { Progress } from '../hooks/useProgress';

interface TopBarProps {
  progress: Progress;
}

export function TopBar({ progress }: TopBarProps) {
  const levelInfo = getLevelInfo(progress.xp);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-italy-green-100 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-italy-green-500 to-italy-green-700 text-white font-display font-bold text-lg shadow-sm">
            P
          </div>
          <span className="font-display font-bold text-italy-green-800 text-lg hidden sm:block">
            Parla!
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1.5 border border-orange-200">
            <Flame className="h-4 w-4 text-orange-500" fill="currentColor" />
            <span className="font-bold text-orange-600 text-sm tabular-nums">
              {progress.streak}
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 border border-amber-200">
            <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
            <span className="font-bold text-amber-600 text-sm tabular-nums">
              {progress.xp}
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-italy-green-50 px-3 py-1.5 border border-italy-green-200">
            <Award className="h-4 w-4 text-italy-green-600" fill="currentColor" />
            <span className="font-bold text-italy-green-700 text-sm">
              {levelInfo.levelLabel}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
