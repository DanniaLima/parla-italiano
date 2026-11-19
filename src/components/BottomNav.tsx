import { GraduationCap, MessageCircle, Home } from 'lucide-react';

export type Tab = 'home' | 'learn' | 'chat';

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Início', icon: Home },
  { id: 'learn', label: 'Lições', icon: GraduationCap },
  { id: 'chat', label: 'Conversa', icon: MessageCircle },
];

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-italy-green-100 safe-bottom">
      <div className="max-w-2xl mx-auto flex items-center justify-around px-2 py-1.5">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-italy-green-700 scale-105'
                  : 'text-gray-400 hover:text-italy-green-500'
              }`}
            >
              <Icon
                className="h-5 w-5 transition-transform"
                fill={isActive ? 'currentColor' : 'none'}
                strokeWidth={isActive ? 2.2 : 2}
              />
              <span className="text-[11px] font-bold">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
