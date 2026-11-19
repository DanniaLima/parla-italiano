import type { ConversationScenario } from '../types';

export const scenarios: ConversationScenario[] = [
  {
    id: 'coffee-rome',
    title: 'Pedindo um café em Roma',
    emoji: '☕',
    description: 'Você está em um café em Roma. Peça seu café como um local!',
    steps: [
      {
        id: 's1',
        npcMessage: 'Buongiorno! Cosa desidera?',
        npcTranslation: 'Bom dia! O que o senhor(a) deseja?',
        options: [
          {
            id: 'o1',
            text: 'Buongiorno! Vorrei un caffè, per favore.',
            translation: 'Bom dia! Gostaria de um café, por favor.',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Ciao! Io sono Marco.',
            translation: 'Olá! Eu sou Marco.',
            isCorrect: false,
            feedback: 'Você se apresentou, mas não pediu o café.',
          },
          {
            id: 'o3',
            text: 'Arrivederci!',
            translation: 'Tchau!',
            isCorrect: false,
            feedback: 'Você foi embora sem pedir nada!',
          },
        ],
      },
      {
        id: 's2',
        npcMessage: 'Subito! Un caffè. Lo vuole macchiato?',
        npcTranslation: 'Na hora! Um café. Quer com leite (macchiato)?',
        options: [
          {
            id: 'o1',
            text: 'No, grazie. Lo preferisco nero.',
            translation: 'Não, obrigado. Prefiro preto.',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Sì, per favore. Con latte.',
            translation: 'Sim, por favor. Com leite.',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Non capisco.',
            translation: 'Não entendo.',
            isCorrect: false,
            feedback: 'Tente responder à pergunta sobre o leite.',
          },
        ],
      },
      {
        id: 's3',
        npcMessage: 'Perfetto! Due euro, per favore.',
        npcTranslation: 'Perfeito! Dois euros, por favor.',
        options: [
          {
            id: 'o1',
            text: 'Ecco a lei. Grazie!',
            translation: 'Aqui está. Obrigado!',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Quanto costa?',
            translation: 'Quanto custa?',
            isCorrect: false,
            feedback: 'O garçom já disse o preço: dois euros.',
          },
          {
            id: 'o3',
            text: 'Non ho soldi.',
            translation: 'Não tenho dinheiro.',
            isCorrect: false,
            feedback: 'Você precisa pagar pelo café!',
          },
        ],
      },
      {
        id: 's4',
        npcMessage: 'Grazie a lei! Buona giornata!',
        npcTranslation: 'Obrigado a você! Tenha um bom dia!',
        options: [
          {
            id: 'o1',
            text: 'Grazie, altrettanto! Arrivederci!',
            translation: 'Obrigado, igualmente! Tchau!',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Ciao!',
            translation: 'Tchau!',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Aiuto!',
            translation: 'Socorro!',
            isCorrect: false,
            feedback: 'Nada de socorro, tudo deu certo!',
          },
        ],
      },
    ],
  },
  {
    id: 'asking-directions',
    title: 'Pedindo informações em Florença',
    emoji: '🗺️',
    description: 'Você está perdido em Florença. Pergunte o caminho para o Duomo!',
    steps: [
      {
        id: 's1',
        npcMessage: 'Posso aiutarla?',
        npcTranslation: 'Posso ajudá-lo?',
        options: [
          {
            id: 'o1',
            text: 'Scusi, dov\'è il Duomo?',
            translation: 'Com licença, onde fica o Duomo?',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Sì, grazie. Ho fame.',
            translation: 'Sim, obrigado. Estou com fome.',
            isCorrect: false,
            feedback: 'Você não fez a pergunta sobre o Duomo.',
          },
          {
            id: 'o3',
            text: 'Non parlo italiano.',
            translation: 'Não falo italiano.',
            isCorrect: false,
            feedback: 'Tente perguntar em italiano!',
          },
        ],
      },
      {
        id: 's2',
        npcMessage: 'È vicino! Vada dritto, poi giri a destra.',
        npcTranslation: 'É perto! Vá em frente, depois vire à direita.',
        options: [
          {
            id: 'o1',
            text: 'Grazie! Quanto ci vuole a piedi?',
            translation: 'Obrigado! Quanto tempo a pé?',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Non ho capito.',
            translation: 'Não entendi.',
            isCorrect: false,
            feedback: 'A resposta foi clara: em frente e à direita.',
          },
          {
            id: 'o3',
            text: 'Ciao ciao!',
            translation: 'Tchau tchau!',
            isCorrect: false,
            feedback: 'Você não agradeceu nem perguntou mais nada.',
          },
        ],
      },
      {
        id: 's3',
        npcMessage: 'Cinque minuti a piedi. È facile!',
        npcTranslation: 'Cinco minutos a pé. É fácil!',
        options: [
          {
            id: 'o1',
            text: 'Perfetto! Grazie mille!',
            translation: 'Perfeito! Muito obrigado!',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Troppo lontano.',
            translation: 'Muito longe.',
            isCorrect: false,
            feedback: 'Cinco minutos não é longe!',
          },
          {
            id: 'o3',
            text: 'Dov\'è il bagno?',
            translation: 'Onde fica o banheiro?',
            isCorrect: false,
            feedback: 'Pergunta válida, mas não relacionada à conversa.',
          },
        ],
      },
    ],
  },
];
