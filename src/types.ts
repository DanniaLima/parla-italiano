export interface Flashcard {
  id: string;
  italian: string;
  portuguese: string;
  pronunciationTip: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  prompt: string;
  promptPrefix: string;
  promptSuffix: string;
  answer: string;
  options: string[];
  translation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  emoji: string;
  xp: number;
  flashcards: Flashcard[];
  questions: MultipleChoiceQuestion[];
}

export interface ConversationOption {
  id: string;
  text: string;
  translation: string;
  isCorrect: boolean;
  feedback?: string;
}

export interface ConversationStep {
  id: string;
  npcMessage: string;
  npcTranslation: string;
  options: ConversationOption[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  emoji: string;
  description: string;
  steps: ConversationStep[];
}
