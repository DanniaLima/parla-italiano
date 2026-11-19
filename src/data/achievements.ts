import type { Progress } from '../hooks/useProgress';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  check: (progress: Progress) => boolean;
}

export const achievements: Achievement[] = [
  {
    id: 'first-lesson',
    title: 'Primo Passo',
    description: 'Complete sua primeira lição',
    emoji: '🎯',
    check: (p) => p.completedLessons.length >= 1,
  },
  {
    id: 'three-lessons',
    title: 'Studente Dedito',
    description: 'Complete 3 lições',
    emoji: '📚',
    check: (p) => p.completedLessons.length >= 3,
  },
  {
    id: 'all-lessons',
    title: 'Maestro Italiano',
    description: 'Complete todas as lições da trilha',
    emoji: '🏆',
    check: (p) => p.completedLessons.length >= 5,
  },
  {
    id: 'first-chat',
    title: 'Prima Conversazione',
    description: 'Complete sua primeira conversa',
    emoji: '💬',
    check: (p) => p.completedScenarios.length >= 1,
  },
  {
    id: 'three-chats',
    title: 'Chiacchierone',
    description: 'Complete 3 cenários de conversação',
    emoji: '🗣️',
    check: (p) => p.completedScenarios.length >= 3,
  },
  {
    id: 'streak-3',
    title: 'Costanza',
    description: 'Mantenha uma ofensiva de 3 dias',
    emoji: '🔥',
    check: (p) => p.streak >= 3,
  },
  {
    id: 'streak-7',
    title: 'Settimana di Fuoco',
    description: 'Mantenha uma ofensiva de 7 dias',
    emoji: '⚡',
    check: (p) => p.streak >= 7,
  },
  {
    id: 'xp-100',
    title: 'Centenario',
    description: 'Acumule 100 pontos de XP',
    emoji: '⭐',
    check: (p) => p.xp >= 100,
  },
  {
    id: 'xp-300',
    title: 'Esperto',
    description: 'Acumule 300 pontos de XP',
    emoji: '🌟',
    check: (p) => p.xp >= 300,
  },
  {
    id: 'xp-500',
    title: 'Campione',
    description: 'Acumule 500 pontos de XP',
    emoji: '👑',
    check: (p) => p.xp >= 500,
  },
];
