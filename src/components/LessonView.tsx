import { useState } from 'react';
import { ArrowLeft, Volume2, ChevronRight, RotateCcw, Mic, Check, X, Lightbulb } from 'lucide-react';
import type { Lesson } from '../types';
import { useSpeech, useSpeechRecognition } from '../hooks/useSpeech';

interface LessonViewProps {
  lesson: Lesson;
  onExit: () => void;
  onComplete: (lessonId: string, xp: number) => void;
}

type Phase = 'flashcards' | 'multiple-choice' | 'speech' | 'complete';

export function LessonView({ lesson, onExit, onComplete }: LessonViewProps) {
  const [phase, setPhase] = useState<Phase>('flashcards');
  const [cardIndex, setCardIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [speechIndex, setSpeechIndex] = useState(0);

  const totalSteps = lesson.flashcards.length + lesson.questions.length + lesson.flashcards.length;
  const currentStep =
    phase === 'flashcards'
      ? cardIndex + 1
      : phase === 'multiple-choice'
      ? lesson.flashcards.length + questionIndex + 1
      : phase === 'speech'
      ? lesson.flashcards.length + lesson.questions.length + speechIndex + 1
      : totalSteps;

  const progressPercent = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-italy-green-50 flex flex-col">
      {/* Progress header */}
      <div className="sticky top-0 z-20 bg-white border-b border-italy-green-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="text-italy-green-600 hover:text-italy-green-800 transition-colors p-1"
              aria-label="Sair"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <div className="flex-1 h-3 bg-italy-green-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-italy-green-400 to-italy-green-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-sm font-bold text-italy-green-600 tabular-nums w-10 text-right">
              {currentStep}/{totalSteps}
            </span>
          </div>
          <h2 className="font-display font-bold text-italy-green-800 mt-1 text-sm flex items-center gap-1.5">
            <span>{lesson.emoji}</span> {lesson.title}
          </h2>
        </div>
      </div>

      <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-6">
        {phase === 'flashcards' && (
          <FlashcardPhase
            lesson={lesson}
            cardIndex={cardIndex}
            onNext={() => {
              if (cardIndex < lesson.flashcards.length - 1) {
                setCardIndex(cardIndex + 1);
              } else {
                setPhase('multiple-choice');
              }
            }}
          />
        )}

        {phase === 'multiple-choice' && (
          <MultipleChoicePhase
            lesson={lesson}
            questionIndex={questionIndex}
            selectedAnswer={selectedAnswer}
            onSelect={(option, isCorrect) => {
              setSelectedAnswer(option);
              if (isCorrect) setCorrectCount((c) => c + 1);
            }}
            onNext={() => {
              if (questionIndex < lesson.questions.length - 1) {
                setQuestionIndex(questionIndex + 1);
                setSelectedAnswer(null);
              } else {
                setPhase('speech');
              }
            }}
          />
        )}

        {phase === 'speech' && (
          <SpeechPhase
            lesson={lesson}
            speechIndex={speechIndex}
            onNext={() => {
              if (speechIndex < lesson.flashcards.length - 1) {
                setSpeechIndex(speechIndex + 1);
              } else {
                setPhase('complete');
                onComplete(lesson.id, lesson.xp);
              }
            }}
          />
        )}

        {phase === 'complete' && (
          <CompletePhase
            lesson={lesson}
            correctCount={correctCount}
            totalQuestions={lesson.questions.length}
            onExit={onExit}
          />
        )}
      </div>
    </div>
  );
}

/* ---------- Flashcards ---------- */

function FlashcardPhase({
  lesson,
  cardIndex,
  onNext,
}: {
  lesson: Lesson;
  cardIndex: number;
  onNext: () => void;
}) {
  const card = lesson.flashcards[cardIndex];
  const [flipped, setFlipped] = useState(false);
  const { speak, speaking, supported } = useSpeech();

  const handleNext = () => {
    setFlipped(false);
    onNext();
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <p className="text-sm font-bold text-italy-green-500 mb-3">
        Flashcard {cardIndex + 1} de {lesson.flashcards.length}
      </p>

      <button
        onClick={() => setFlipped(!flipped)}
        className="w-full max-w-md min-h-[280px] rounded-3xl bg-white shadow-lg border-2 border-italy-green-100 p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:shadow-xl active:scale-[0.98]"
        style={{ perspective: '1000px' }}
      >
        <div className="text-4xl">{lesson.emoji}</div>

        {!flipped ? (
          <>
            <div className="text-center">
              <p className="font-display font-bold text-3xl text-italy-green-800 leading-tight">
                {card.italian}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mt-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-700">
                {card.pronunciationTip}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Toque para ver a tradução</p>
          </>
        ) : (
          <div className="text-center animate-pop-in">
            <p className="text-sm text-italy-green-400 mb-2 font-semibold">Tradução</p>
            <p className="font-display font-bold text-2xl text-italy-green-700 leading-tight">
              {card.portuguese}
            </p>
          </div>
        )}
      </button>

      <div className="flex items-center gap-3 mt-6 w-full max-w-md">
        <button
          onClick={() => speak(card.italian)}
          disabled={!supported}
          className={`flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-bold transition-all ${
            speaking
              ? 'bg-italy-green-600 text-white scale-105'
              : 'bg-white text-italy-green-700 border-2 border-italy-green-200 hover:bg-italy-green-50 active:scale-95'
          } ${!supported ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Volume2 className="h-5 w-5" fill={speaking ? 'currentColor' : 'none'} />
          {speaking ? 'Falando...' : 'Ouvir'}
        </button>

        <button
          onClick={handleNext}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-italy-green-500 to-italy-green-600 px-5 py-3.5 font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
        >
          Continuar
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      {!supported && (
        <p className="text-xs text-gray-400 mt-3">
          Seu navegador não suporta áudio. Use o Chrome ou Edge.
        </p>
      )}
    </div>
  );
}

/* ---------- Multiple Choice ---------- */

function MultipleChoicePhase({
  lesson,
  questionIndex,
  selectedAnswer,
  onSelect,
  onNext,
}: {
  lesson: Lesson;
  questionIndex: number;
  selectedAnswer: string | null;
  onSelect: (option: string, isCorrect: boolean) => void;
  onNext: () => void;
}) {
  const question = lesson.questions[questionIndex];
  const answered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="flex flex-col animate-fade-in">
      <p className="text-sm font-bold text-italy-green-500 mb-4">
        Exercício {questionIndex + 1} de {lesson.questions.length}
      </p>

      <div className="bg-white rounded-3xl shadow-lg border-2 border-italy-green-100 p-6 mb-4">
        <p className="font-display font-bold text-xl text-italy-green-800 text-center mb-4">
          {question.prompt}
        </p>
        <div className="bg-italy-green-50 rounded-2xl p-4 text-center">
          <p className="font-display text-2xl text-italy-green-700">
            {question.promptPrefix}
            <span
              className={`inline-block min-w-[2rem] mx-1 border-b-2 ${
                answered && isCorrect
                  ? 'border-italy-green-500 text-italy-green-700'
                  : answered
                  ? 'border-italy-red-400 text-italy-red-500 line-through'
                  : 'border-gray-300 text-gray-300'
              }`}
            >
              {answered ? selectedAnswer : '?'}
            </span>
            {question.promptSuffix}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const showCorrect = answered && option === question.answer;
          const showWrong = answered && isSelected && option !== question.answer;

          return (
            <button
              key={option}
              onClick={() => !answered && onSelect(option, option === question.answer)}
              disabled={answered}
              className={`rounded-2xl px-4 py-4 font-bold text-lg transition-all border-2 ${
                showCorrect
                  ? 'bg-italy-green-50 border-italy-green-500 text-italy-green-700 animate-pop-in'
                  : showWrong
                  ? 'bg-italy-red-50 border-italy-red-400 text-italy-red-600 animate-shake'
                  : answered
                  ? 'bg-white border-gray-200 text-gray-400'
                  : 'bg-white border-italy-green-200 text-italy-green-700 hover:border-italy-green-400 hover:bg-italy-green-50 active:scale-95'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className={`mt-4 rounded-2xl p-4 animate-slide-up ${
            isCorrect ? 'bg-italy-green-50 border border-italy-green-200' : 'bg-italy-red-50 border border-italy-red-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            {isCorrect ? (
              <Check className="h-5 w-5 text-italy-green-600" strokeWidth={3} />
            ) : (
              <X className="h-5 w-5 text-italy-red-500" strokeWidth={3} />
            )}
            <p className={`font-bold ${isCorrect ? 'text-italy-green-700' : 'text-italy-red-600'}`}>
              {isCorrect ? 'Correto!' : 'Quase!'}
            </p>
          </div>
          <p className="text-sm text-italy-green-600">{question.translation}</p>
        </div>
      )}

      <button
        onClick={onNext}
        disabled={!answered}
        className={`mt-4 flex items-center justify-center gap-2 rounded-2xl px-5 py-3.5 font-bold text-white shadow-md transition-all ${
          answered
            ? 'bg-gradient-to-r from-italy-green-500 to-italy-green-600 hover:shadow-lg active:scale-95'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Continuar
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ---------- Speech Practice ---------- */

function SpeechPhase({
  lesson,
  speechIndex,
  onNext,
}: {
  lesson: Lesson;
  speechIndex: number;
  onNext: () => void;
}) {
  const card = lesson.flashcards[speechIndex];
  const { speak, speaking, supported: ttsSupported } = useSpeech();
  const { state, transcript, start, reset, supported: srSupported } = useSpeechRecognition();

  const handleNext = () => {
    reset();
    onNext();
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <p className="text-sm font-bold text-italy-green-500 mb-2">
        Prática de fala {speechIndex + 1} de {lesson.flashcards.length}
      </p>
      <p className="text-xs text-italy-green-400 mb-6 text-center">
        Toque no microfone e repita a frase em italiano
      </p>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border-2 border-italy-green-100 p-6 mb-4">
        <div className="text-center mb-4">
          <p className="font-display font-bold text-2xl text-italy-green-800 leading-tight">
            {card.italian}
          </p>
          <p className="text-sm text-italy-green-500 mt-2">{card.portuguese}</p>
          <div className="flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 mt-3 inline-flex">
            <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-semibold text-amber-700">{card.pronunciationTip}</span>
          </div>
        </div>

        <button
          onClick={() => speak(card.italian)}
          disabled={!ttsSupported}
          className={`w-full flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-bold transition-all mb-4 ${
            speaking
              ? 'bg-italy-green-600 text-white'
              : 'bg-italy-green-50 text-italy-green-700 border-2 border-italy-green-200 hover:bg-italy-green-100'
          } ${!ttsSupported ? 'opacity-50' : ''}`}
        >
          <Volume2 className="h-5 w-5" fill={speaking ? 'currentColor' : 'none'} />
          {speaking ? 'Escutando a frase...' : 'Ouvir a frase'}
        </button>

        <div className="flex flex-col items-center gap-4 py-4">
          <button
            onClick={() => start(card.italian)}
            disabled={!srSupported || state === 'listening'}
            className={`relative flex h-20 w-20 items-center justify-center rounded-full shadow-lg transition-all ${
              state === 'listening'
                ? 'bg-italy-red-500 text-white scale-110'
                : state === 'success'
                ? 'bg-italy-green-500 text-white'
                : state === 'error'
                ? 'bg-italy-red-400 text-white'
                : 'bg-gradient-to-br from-italy-green-400 to-italy-green-600 text-white hover:scale-105 active:scale-95'
            } ${!srSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {state === 'listening' && (
              <span className="absolute inset-0 rounded-full bg-italy-red-400 animate-pulse-ring" />
            )}
            <Mic className="h-8 w-8 relative z-10" fill={state === 'listening' ? 'currentColor' : 'none'} />
          </button>

          <p className="text-sm font-bold text-italy-green-600">
            {state === 'listening'
              ? 'Escutando... fale agora!'
              : state === 'success'
              ? 'Perfeito! Você acertou!'
              : state === 'error'
              ? 'Tente novamente'
              : 'Toque no microfone e fale'}
          </p>

          {transcript && (
            <div
              className={`w-full rounded-2xl p-3 text-center animate-pop-in ${
                state === 'success'
                  ? 'bg-italy-green-50 border border-italy-green-200'
                  : 'bg-italy-red-50 border border-italy-red-200'
              }`}
            >
              <p className="text-xs text-gray-400 mb-1">Você disse:</p>
              <p className={`font-bold ${state === 'success' ? 'text-italy-green-700' : 'text-italy-red-600'}`}>
                "{transcript}"
              </p>
            </div>
          )}

          {state === 'error' && (
            <button
              onClick={() => {
                reset();
                start(card.italian);
              }}
              className="flex items-center gap-1.5 text-sm font-bold text-italy-green-600 hover:text-italy-green-800"
            >
              <RotateCcw className="h-4 w-4" />
              Tentar de novo
            </button>
          )}
        </div>
      </div>

      {!srSupported && (
        <p className="text-xs text-gray-400 text-center mb-4 max-w-md">
          Seu navegador não suporta reconhecimento de voz. Use o Google Chrome no desktop ou Android para esta funcionalidade.
        </p>
      )}

      <button
        onClick={handleNext}
        className="w-full max-w-md flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-italy-green-500 to-italy-green-600 px-5 py-3.5 font-bold text-white shadow-md hover:shadow-lg active:scale-95 transition-all"
      >
        {speechIndex < lesson.flashcards.length - 1 ? 'Próxima frase' : 'Finalizar'}
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

/* ---------- Complete ---------- */

function CompletePhase({
  lesson,
  correctCount,
  totalQuestions,
  onExit,
}: {
  lesson: Lesson;
  correctCount: number;
  totalQuestions: number;
  onExit: () => void;
}) {
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-pop-in">
      <div className="text-6xl mb-4 animate-bounce-soft">{lesson.emoji}</div>
      <h2 className="font-display font-bold text-3xl text-italy-green-700 mb-2">
        Lição completa!
      </h2>
      <p className="text-italy-green-500 mb-6 text-center">
        Bravo! Você concluiu "{lesson.title}"
      </p>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
        <div className="bg-white rounded-2xl shadow-md border border-italy-green-100 p-4 text-center">
          <p className="font-display font-bold text-3xl text-amber-500">+{lesson.xp}</p>
          <p className="text-xs font-bold text-gray-500 mt-1">XP ganho</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md border border-italy-green-100 p-4 text-center">
          <p className="font-display font-bold text-3xl text-italy-green-600">
            {correctCount}/{totalQuestions}
          </p>
          <p className="text-xs font-bold text-gray-500 mt-1">Acertos ({percentage}%)</p>
        </div>
      </div>

      <button
        onClick={onExit}
        className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-italy-green-500 to-italy-green-600 px-8 py-3.5 font-bold text-white shadow-lg hover:shadow-xl active:scale-95 transition-all"
      >
        Voltar à trilha
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
