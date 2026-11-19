import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { BottomNav, type Tab } from './components/BottomNav';
import { LearningPath } from './components/LearningPath';
import { LessonView } from './components/LessonView';
import { ConversationSimulator } from './components/ConversationSimulator';
import { AchievementsScreen } from './components/AchievementsScreen';
import { HomeScreen } from './components/HomeScreen';
import { lessons } from './data/lessons';
import { scenarios } from './data/scenarios';
import { achievements } from './data/achievements';
import { useProgress } from './hooks/useProgress';
import type { Lesson } from './types';

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const { progress, completeLesson, completeScenario } = useProgress();

  const unlockedCount = achievements.filter((a) => a.check(progress)).length;

  if (activeLesson) {
    return (
      <LessonView
        lesson={activeLesson}
        onExit={() => setActiveLesson(null)}
        onComplete={completeLesson}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {tab !== 'home' && <TopBar progress={progress} />}

      {tab === 'home' && (
        <HomeScreen
          progress={progress}
          lessons={lessons}
          completedScenariosCount={progress.completedScenarios.length}
          unlockedAchievements={unlockedCount}
          totalAchievements={achievements.length}
          onStartLearning={() => setTab('learn')}
          onStartChat={() => setTab('chat')}
          onTabChange={setTab}
          activeTab={tab}
        />
      )}

      {tab === 'learn' && (
        <div className="pb-24">
          <LearningPath
            lessons={lessons}
            progress={progress}
            onSelect={(lesson) => setActiveLesson(lesson)}
          />
          <BottomNav active={tab} onChange={setTab} />
        </div>
      )}

      {tab === 'chat' && (
        <div className="pb-24">
          <ConversationSimulator
            scenarios={scenarios}
            completedScenarios={progress.completedScenarios}
            onComplete={completeScenario}
          />
          <BottomNav active={tab} onChange={setTab} />
        </div>
      )}

      {tab === 'achievements' && (
        <div className="pb-24">
          <AchievementsScreen progress={progress} />
          <BottomNav active={tab} onChange={setTab} />
        </div>
      )}
    </div>
  );
}
