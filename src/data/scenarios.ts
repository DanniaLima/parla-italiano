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
  {
    id: 'shopping-milan',
    title: 'Comprando roupas em Milão',
    emoji: '👗',
    description: 'Você está numa boutique em Milão. Encontre a peça certa e negocie!',
    steps: [
      {
        id: 's1',
        npcMessage: 'Buongiorno! Posso aiutarla?',
        npcTranslation: 'Bom dia! Posso ajudá-la?',
        options: [
          {
            id: 'o1',
            text: 'Sì, cerco una maglietta.',
            translation: 'Sim, procuro uma camiseta.',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'No, grazie. Solo guardo.',
            translation: 'Não, obrigado. Só estou olhando.',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Buongiorno! Come stai?',
            translation: 'Bom dia! Como você está?',
            isCorrect: false,
            feedback: 'Você perguntou como ele está, mas não respondeu à oferta de ajuda.',
          },
        ],
      },
      {
        id: 's2',
        npcMessage: 'Abbiamo questa maglietta blu. Le piace?',
        npcTranslation: 'Temos esta camiseta azul. O senhor(a) gosta?',
        options: [
          {
            id: 'o1',
            text: 'Sì, mi piace molto! Quanto costa?',
            translation: 'Sim, gosto muito! Quanto custa?',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'No, è brutta.',
            translation: 'Não, é feia.',
            isCorrect: false,
            feedback: 'Meio rude... tente ser mais educado.',
          },
          {
            id: 'o3',
            text: 'Non lo so.',
            translation: 'Não sei.',
            isCorrect: false,
            feedback: 'Dê alguma opinião sobre a peça.',
          },
        ],
      },
      {
        id: 's3',
        npcMessage: 'Costa trenta euro. Vuole provarla?',
        npcTranslation: 'Custa trinta euros. Quer experimentar?',
        options: [
          {
            id: 'o1',
            text: 'Sì, posso provare una taglia media?',
            translation: 'Sim, posso experimentar um tamanho médio?',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'È troppo caro!',
            translation: 'É muito caro!',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Ciao!',
            translation: 'Tchau!',
            isCorrect: false,
            feedback: 'Você não respondeu à pergunta do vendedor.',
          },
        ],
      },
      {
        id: 's4',
        npcMessage: 'Perfetto! La prendo? Vuole pagare con la carta?',
        npcTranslation: 'Perfeito! Vai levar? Quer pagar com cartão?',
        options: [
          {
            id: 'o1',
            text: 'Sì, lo prendo. Pago con la carta, grazie!',
            translation: 'Sim, vou levar. Pago com cartão, obrigado!',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'No, non lo prendo.',
            translation: 'Não, não vou levar.',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Dov\'è il bagno?',
            translation: 'Onde fica o banheiro?',
            isCorrect: false,
            feedback: 'Não é hora de procurar banheiro, decida sobre a compra!',
          },
        ],
      },
    ],
  },
  {
    id: 'train-station',
    title: 'Comprando bilhete na estação',
    emoji: '🚆',
    description: 'Você está na estação de trem em Roma. Compre seu bilhete para Veneza!',
    steps: [
      {
        id: 's1',
        npcMessage: 'Buongiorno! Dove vuole andare?',
        npcTranslation: 'Bom dia! Para onde o senhor(a) quer ir?',
        options: [
          {
            id: 'o1',
            text: 'Vorrei un biglietto per Venezia, per favore.',
            translation: 'Gostaria de um bilhete para Veneza, por favor.',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Non lo so.',
            translation: 'Não sei.',
            isCorrect: false,
            feedback: 'Você precisa dizer para onde quer ir!',
          },
          {
            id: 'o3',
            text: 'Quanto costa il caffè?',
            translation: 'Quanto custa o café?',
            isCorrect: false,
            feedback: 'Você está na estação de trem, não no café.',
          },
        ],
      },
      {
        id: 's2',
        npcMessage: 'Andata e ritorno? Quando vuole partire?',
        npcTranslation: 'Ida e volta? Quando quer partir?',
        options: [
          {
            id: 'o1',
            text: 'Solo andata. Voglio partire oggi.',
            translation: 'Só ida. Quero partir hoje.',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Andata e ritorno. Domani mattina.',
            translation: 'Ida e volta. Amanhã de manhã.',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Sì, grazie.',
            translation: 'Sim, obrigado.',
            isCorrect: false,
            feedback: 'O atendente precisa saber se é ida e volta e quando.',
          },
        ],
      },
      {
        id: 's3',
        npcMessage: 'Il treno parte alle dieci. Binario tre. Sono venticinque euro.',
        npcTranslation: 'O trem parte às dez. Plataforma três. São vinte e cinco euros.',
        options: [
          {
            id: 'o1',
            text: 'Perfetto! Ecco i soldi. Grazie!',
            translation: 'Perfeito! Aqui está o dinheiro. Obrigado!',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Posso pagare con la carta?',
            translation: 'Posso pagar com cartão?',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Non ho capito. Ripeta, per favore.',
            translation: 'Não entendi. Repita, por favor.',
            isCorrect: false,
            feedback: 'A informação foi clara: plataforma 3, às 10h, 25 euros.',
          },
        ],
      },
      {
        id: 's4',
        npcMessage: 'Ecco il biglietto! Buon viaggio!',
        npcTranslation: 'Aqui está o bilhete! Boa viagem!',
        options: [
          {
            id: 'o1',
            text: 'Grazie mille! Arrivederci!',
            translation: 'Muito obrigado! Tchau!',
            isCorrect: true,
          },
          {
            id: 'o2',
            text: 'Grazie! Buona giornata!',
            translation: 'Obrigado! Tenha um bom dia!',
            isCorrect: true,
          },
          {
            id: 'o3',
            text: 'Dov\'è il treno?',
            translation: 'Onde está o trem?',
            isCorrect: false,
            feedback: 'O atendente disse: plataforma três. Boa viagem!',
          },
        ],
      },
    ],
  },
];
