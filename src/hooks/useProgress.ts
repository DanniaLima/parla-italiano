import { useCallback, useEffect, useState } from 'react';

export interface Progress {
  xp: number;
  streak: number;
  completedLessons: string[];
  completedScenarios: string[];
  lastVisit: string;
}

const STORAGE_KEY = 'parla-progress';
const LEVEL_THRESHOLD = 100;

const defaultProgress: Progress = {
  xp: 0,
  streak: 1,
  completedLessons: [],
  completedScenarios: [],
  lastVisit: new Date().toDateString(),
};

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw) as Progress;
    return { ...defaultProgress, ...parsed };
  } catch {
    return defaultProgress;
  }
}

export function getLevelInfo(xp: number) {
  const level = Math.floor(xp / LEVEL_THRESHOLD) + 1;
  const currentLevelXp = (level - 1) * LEVEL_THRESHOLD;
  const xpIntoLevel = xp - currentLevelXp;
  const progress = (xpIntoLevel / LEVEL_THRESHOLD) * 100;
  return {
    level,
    levelLabel: level === 1 ? 'Iniciante A1' : level === 2 ? 'A2' : level === 3 ? 'Intermediário B1' : 'B2+',
    xpIntoLevel,
    xpForNext: LEVEL_THRESHOLD,
    progress,
  };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    const today = new Date().toDateString();
    setProgress((prev) => {
      if (prev.lastVisit === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = prev.lastVisit === yesterday ? prev.streak + 1 : 1;
      const updated = { ...prev, streak: newStreak, lastVisit: today };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const updated = { ...prev, xp: prev.xp + amount };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, xp: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) {
        return prev;
      }
      const updated = {
        ...prev,
        xp: prev.xp + xp,
        completedLessons: [...prev.completedLessons, lessonId],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeScenario = useCallback((scenarioId: string, xp = 30) => {
    setProgress((prev) => {
      if (prev.completedScenarios.includes(scenarioId)) {
        return prev;
      }
      const updated = {
        ...prev,
        xp: prev.xp + xp,
        completedScenarios: [...prev.completedScenarios, scenarioId],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { progress, addXp, completeLesson, completeScenario };
}
