import { useState } from 'react';
import { ArrowLeft, Volume2, Check, X, MessageCircle, RefreshCw, Trophy } from 'lucide-react';
import type { ConversationScenario } from '../types';
import { useSpeech } from '../hooks/useSpeech';

interface ConversationSimulatorProps {
  scenarios: ConversationScenario[];
  completedScenarios: string[];
  onComplete: (scenarioId: string, xp?: number) => void;
}

export function ConversationSimulator({
  scenarios,
  completedScenarios,
  onComplete,
}: ConversationSimulatorProps) {
  const [activeScenario, setActiveScenario] = useState<ConversationScenario | null>(null);

  if (activeScenario) {
    return (
      <ConversationChat
        scenario={activeScenario}
        onExit={() => setActiveScenario(null)}
        onComplete={onComplete}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-italy-green-400 to-italy-green-600 text-white shadow-md mb-3">
          <MessageCircle className="h-7 w-7" fill="currentColor" />
        </div>
        <h2 className="font-display font-bold text-2xl text-italy-green-800 mb-1">
          Simulador de Conversação
        </h2>
        <p className="text-italy-green-600 text-sm">
          Pratique diálogos reais escolhendo a resposta certa
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {scenarios.map((scenario, index) => {
          const isCompleted = completedScenarios.includes(scenario.id);
          return (
            <button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario)}
              className="group flex items-start gap-4 rounded-2xl bg-white shadow-md border-2 border-italy-green-100 p-4 text-left hover:shadow-xl hover:border-italy-green-300 active:scale-[0.98] transition-all animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-italy-green-50 text-2xl">
                {scenario.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-italy-green-800">{scenario.title}</h3>
                  {isCompleted && (
                    <span className="flex items-center gap-0.5 text-xs font-bold text-italy-green-600 bg-italy-green-50 rounded-full px-2 py-0.5 border border-italy-green-200">
                      <Check className="h-3 w-3" strokeWidth={3} /> Feito
                    </span>
                  )}
                </div>
                <p className="text-sm text-italy-green-500 mt-1">{scenario.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {scenario.steps.length} turnos de conversa
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Chat ---------- */

type ChatMessage = {
  role: 'npc' | 'user';
  text: string;
  translation: string;
  correct?: boolean;
  feedback?: string;
};

function ConversationChat({
  scenario,
  onExit,
  onComplete,
}: {
  scenario: ConversationScenario;
  onExit: () => void;
  onComplete: (scenarioId: string, xp?: number) => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'npc',
      text: scenario.steps[0].npcMessage,
      translation: scenario.steps[0].npcTranslation,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const { speak, speaking, supported } = useSpeech();

  const currentStep = scenario.steps[stepIndex];

  const handleSelect = (optionId: string) => {
    if (selectedOption) return;
    const option = currentStep.options.find((o) => o.id === optionId);
    if (!option) return;

    setSelectedOption(optionId);
    setMessages((prev) => [
      ...prev,
      {
        role: 'user',
        text: option.text,
        translation: option.translation,
        correct: option.isCorrect,
        feedback: option.feedback,
      },
    ]);
  };

  const handleNext = () => {
    const nextStepIndex = stepIndex + 1;
    if (nextStepIndex < scenario.steps.length) {
      const nextStep = scenario.steps[nextStepIndex];
      setStepIndex(nextStepIndex);
      setSelectedOption(null);
      setMessages((prev) => [
        ...prev,
        {
          role: 'npc',
          text: nextStep.npcMessage,
          translation: nextStep.npcTranslation,
        },
      ]);
    } else {
      setFinished(true);
      onComplete(scenario.id, 30);
    }
  };

  const handleRestart = () => {
    setStepIndex(0);
    setMessages([
      {
        role: 'npc',
        text: scenario.steps[0].npcMessage,
        translation: scenario.steps[0].npcTranslation,
      },
    ]);
    setSelectedOption(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="min-h-screen bg-italy-green-50 flex flex-col items-center justify-center px-4 animate-pop-in">
        <div className="text-6xl mb-4 animate-bounce-soft">{scenario.emoji}</div>
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-4">
          <Trophy className="h-5 w-5 text-amber-500" fill="currentColor" />
          <span className="font-bold text-amber-700">+30 XP</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-italy-green-700 mb-2">
          Conversa completa!
        </h2>
        <p className="text-italy-green-500 mb-6 text-center max-w-sm">
          Ottimo lavoro! Você concluiu o cenário "{scenario.title}".
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 rounded-2xl bg-white border-2 border-italy-green-200 px-5 py-3 font-bold text-italy-green-700 hover:bg-italy-green-50 active:scale-95 transition-all"
          >
            <RefreshCw className="h-5 w-5" />
            Repetir
          </button>
          <button
            onClick={onExit}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-italy-green-500 to-italy-green-600 px-5 py-3 font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            Outros cenários
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-italy-green-50 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-italy-green-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-italy-green-600 hover:text-italy-green-800 transition-colors p-1"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-italy-green-50 text-lg">
            {scenario.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-italy-green-800 text-sm leading-tight">
              {scenario.title}
            </h2>
            <p className="text-xs text-italy-green-400">
              Turno {stepIndex + 1} de {scenario.steps.length}
            </p>
          </div>
          <div className="h-2 w-20 bg-italy-green-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-italy-green-500 rounded-full transition-all duration-500"
              style={{ width: `${((stepIndex + (selectedOption ? 1 : 0)) / scenario.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-4 flex flex-col gap-3 overflow-y-auto pb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 ${
                msg.role === 'npc'
                  ? 'bg-white border border-italy-green-100 shadow-sm rounded-tl-sm'
                  : msg.correct
                  ? 'bg-italy-green-500 text-white rounded-tr-sm'
                  : 'bg-italy-red-400 text-white rounded-tr-sm'
              }`}
            >
              <div className="flex items-start gap-2">
                <p className={`font-bold text-sm ${msg.role === 'npc' ? 'text-italy-green-800' : 'text-white'}`}>
                  {msg.text}
                </p>
                {msg.role === 'npc' && supported && (
                  <button
                    onClick={() => speak(msg.text)}
                    className={`shrink-0 transition-colors ${
                      speaking ? 'text-italy-green-600' : 'text-italy-green-400 hover:text-italy-green-600'
                    }`}
                  >
                    <Volume2 className="h-4 w-4" fill={speaking ? 'currentColor' : 'none'} />
                  </button>
                )}
              </div>
              <p className={`text-xs mt-1 ${msg.role === 'npc' ? 'text-gray-400' : 'text-white/80'}`}>
                {msg.translation}
              </p>
              {msg.role === 'user' && msg.feedback && !msg.correct && (
                <div className="flex items-center gap-1.5 mt-2 bg-white/15 rounded-lg px-2 py-1.5">
                  <X className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
                  <p className="text-xs text-white/90">{msg.feedback}</p>
                </div>
              )}
              {msg.role === 'user' && msg.correct && (
                <div className="flex items-center gap-1 mt-1.5">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  <p className="text-xs text-white/90">Resposta correta!</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Options */}
      <div className="sticky bottom-0 bg-white border-t border-italy-green-100 safe-bottom">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {!selectedOption && (
            <>
              <p className="text-xs font-bold text-italy-green-500 mb-2 text-center">
                Escolha sua resposta:
              </p>
              <div className="flex flex-col gap-2">
                {currentStep.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className="rounded-2xl px-4 py-3 text-left border-2 border-italy-green-200 bg-white hover:bg-italy-green-50 hover:border-italy-green-400 active:scale-[0.98] transition-all"
                  >
                    <p className="font-bold text-italy-green-800 text-sm">{option.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{option.translation}</p>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedOption && (
            <button
              onClick={handleNext}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-italy-green-500 to-italy-green-600 px-5 py-3.5 font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
            >
              {stepIndex < scenario.steps.length - 1 ? 'Continuar conversa' : 'Finalizar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
