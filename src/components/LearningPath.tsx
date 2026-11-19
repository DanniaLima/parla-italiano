import { Check, Lock, Star } from 'lucide-react';
import type { Lesson } from '../types';
import type { Progress } from '../hooks/useProgress';

interface LearningPathProps {
  lessons: Lesson[];
  progress: Progress;
  onSelect: (lesson: Lesson) => void;
}

export function LearningPath({ lessons, progress, onSelect }: LearningPathProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <h2 className="font-display font-bold text-2xl text-italy-green-800 mb-1">
          Sua trilha de italiano
        </h2>
        <p className="text-italy-green-600 text-sm">
          Toque em um módulo para começar a aprender
        </p>
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {lessons.map((lesson, index) => {
          const isCompleted = progress.completedLessons.includes(lesson.id);
          const previousCompleted =
            index === 0 || progress.completedLessons.includes(lessons[index - 1].id);
          const isLocked = index > 0 && !previousCompleted;
          const offset = index % 2 === 0 ? '-translate-x-20' : 'translate-x-20';
          const isEven = index % 2 === 0;

          return (
            <div
              key={lesson.id}
              className={`relative w-full max-w-xs ${
                isEven ? 'self-start ml-8' : 'self-end mr-8'
              }`}
            >
              <button
                onClick={() => !isLocked && onSelect(lesson)}
                disabled={isLocked}
                className={`group relative w-full flex items-center gap-4 rounded-2xl p-4 shadow-md transition-all duration-300 animate-slide-up ${
                  isLocked
                    ? 'bg-gray-100 cursor-not-allowed opacity-70'
                    : isCompleted
                    ? 'bg-gradient-to-br from-italy-green-400 to-italy-green-600 text-white hover:scale-105 hover:shadow-xl'
                    : 'bg-white hover:scale-105 hover:shadow-xl border-2 border-italy-green-200'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl shadow-inner ${
                    isCompleted
                      ? 'bg-white/25'
                      : isLocked
                      ? 'bg-gray-200'
                      : 'bg-italy-green-50'
                  }`}
                >
                  {isLocked ? (
                    <Lock className="h-6 w-6 text-gray-400" />
                  ) : isCompleted ? (
                    <Check className="h-7 w-7 text-white" strokeWidth={3} />
                  ) : (
                    <span>{lesson.emoji}</span>
                  )}
                </div>

                <div className="flex-1 text-left">
                  <p
                    className={`font-display font-bold text-base leading-tight ${
                      isCompleted ? 'text-white' : isLocked ? 'text-gray-400' : 'text-italy-green-800'
                    }`}
                  >
                    {lesson.title}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      isCompleted ? 'text-white/80' : isLocked ? 'text-gray-400' : 'text-italy-green-500'
                    }`}
                  >
                    {lesson.description}
                  </p>
                  <div
                    className={`flex items-center gap-1 mt-2 text-xs font-bold ${
                      isCompleted ? 'text-white' : 'text-amber-500'
                    }`}
                  >
                    <Star className="h-3.5 w-3.5" fill="currentColor" />
                    +{lesson.xp} XP
                  </div>
                </div>
              </button>

              {index < lessons.length - 1 && (
                <div
                  className={`hidden sm:block absolute top-full ${
                    isEven ? 'left-1/2' : 'right-1/2'
                  } -translate-x-1/2 w-1 h-6 bg-italy-green-200 rounded-full`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
