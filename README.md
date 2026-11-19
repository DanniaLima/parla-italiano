# Parla! 🇮🇹

> Aprenda italiano de forma prática e gamificada — feito para brasileiros.

Parla! é um aplicativo web moderno e responsivo focado em ensinar italiano para falantes de português, com flashcards interativos, áudio nativo, reconhecimento de voz e simulador de conversação.

---

## ✨ Funcionalidades

### 🏠 Tela Inicial
- Barra superior com **ofensiva** (dias seguidos), **pontos de XP** e **nível atual** (Iniciante A1)
- Cartões de acesso rápido para aprender ou conversar
- Estatísticas de progresso e dica do dia

### 📚 Trilha de Aprendizado
- 5 módulos visuais dispostos em trilha:
  - 👋 **Cumprimentos e Apresentações**
  - 🍝 **No Restaurante**
  - 🧭 **Pedindo Direções**
  - 🛍️ **Fazendo Compras**
  - 👨‍👩‍👧‍👦 **Família e Amigos**
- Módulos desbloqueados em sequência, com indicador de conclusão

### 🎯 Tela de Lição Interativa
Cada lição possui 4 fases:

1. **Flashcards** — frase em italiano, tradução em português (toque para virar o card) e dica de pronúncia escrita para brasileiros (ex: _"Ciao" se lê "Tchau"_)
2. **Botão de áudio** — usa a Web Speech API nativa do navegador para falar a frase em italiano (`it-IT`)
3. **Exercício de múltipla escolha** — complete a frase com feedback visual de acerto/erro
4. **Exercício de fala** — usa o SpeechRecognition do navegador: o aluno toca no microfone, repete a frase e recebe feedback visual se acertou

### 💬 Simulador de Conversação
- 4 cenários prontos de diálogo:
  - ☕ **Pedindo um café em Roma**
  - 🗺️ **Pedindo informações em Florença**
  - 👗 **Comprando roupas em Milão**
  - 🚆 **Comprando bilhete na estação**
- Chat com personagem que fala em italiano, com tradução e botão de áudio
- O usuário escolhe entre 3 opções de resposta para continuar o diálogo
- Feedback imediato quando a resposta não é a ideal

### 🏆 Sistema de Conquistas
- 10 medalhas desbloqueáveis baseadas em progresso:
  - 🎯 **Primo Passo** — primeira lição concluída
  - 📚 **Studente Dedito** — 3 lições concluídas
  - 🏆 **Maestro Italiano** — todas as lições concluídas
  - 💬 **Prima Conversazione** — primeira conversa concluída
  - 🗣️ **Chiacchierone** — 3 conversas concluídas
  - 🔥 **Costanza** — ofensiva de 3 dias
  - ⚡ **Settimana di Fuoco** — ofensiva de 7 dias
  - ⭐ **Centenario** — 100 XP acumulados
  - 🌟 **Esperto** — 300 XP acumulados
  - 👑 **Campione** — 500 XP acumulados
- Tela dedicada com medalhas desbloqueadas e bloqueadas
- Barra de progresso de conquistas na tela inicial

---

## 🎨 Design

- Paleta de cores inspirada na bandeira da Itália: **verde escuro**, **branco** e **vermelho suave**
- Interface limpa no estilo **Duolingo/Babbel**
- **Mobile-first** e totalmente responsivo
- Animações suaves e micro-interações para uma experiência envolvente
- Fontes: [Nunito](https://fonts.google.com/specimen/Nunito) e [Baloo 2](https://fonts.google.com/specimen/Baloo+2)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) | Framework principal |
| [Vite](https://vitejs.dev/) | Build e dev server |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização |
| [Lucide React](https://lucide.dev/) | Ícones |
| Web Speech API (`SpeechSynthesis`) | Narração das frases em italiano |
| Web Speech API (`SpeechRecognition`) | Reconhecimento de voz do aluno |
| LocalStorage | Persistência do progresso (XP, ofensiva, lições concluídas) |

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) 18 ou superior
- npm (vem junto com o Node.js)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/SEU_USUARIO/parla-italiano.git

# 2. Entre na pasta do projeto
cd parla-italiano

# 3. Instale as dependências
npm install

# 4. Rode o servidor de desenvolvimento
npm run dev
```

O app vai abrir em `http://localhost:5173` no seu navegador.

### Outros comandos

```bash
npm run build      # Gera a versão de produção na pasta dist/
npm run preview    # Visualiza a versão de produção localmente
npm run typecheck  # Verifica os tipos do TypeScript
```

---

## 📱 Compatibilidade

| Recurso | Chrome | Edge | Safari | Firefox |
|---|---|---|---|---|
| Flashcards e áudio (narração) | ✅ | ✅ | ✅ | ✅ |
| Reconhecimento de voz | ✅ | ✅ | ⚠️ Parcial | ❌ |

> **Dica:** Para a melhor experiência com todos os recursos (incluindo reconhecimento de voz), use o **Google Chrome** no desktop ou Android.

---

## 📂 Estrutura do projeto

```
src/
├── components/
│   ├── AchievementsScreen.tsx  # Tela de conquistas e medalhas
│   ├── BottomNav.tsx           # Navegação inferior (Início, Lições, Conversa, Medalhas)
│   ├── ConversationSimulator.tsx  # Simulador de conversação
│   ├── HomeScreen.tsx          # Tela inicial com estatísticas
│   ├── LearningPath.tsx        # Trilha visual de módulos
│   ├── LessonView.tsx          # Tela de lição (flashcards, quiz, fala)
│   └── TopBar.tsx              # Barra superior (ofensiva, XP, nível)
├── data/
│   ├── achievements.ts         # Definição das medalhas e conquistas
│   ├── lessons.ts              # Conteúdo das lições (frases, quiz)
│   └── scenarios.ts            # Cenários de conversação
├── hooks/
│   ├── useProgress.ts          # Gerencia progresso (XP, ofensiva, conclusões)
│   └── useSpeech.ts            # Hooks de áudio e reconhecimento de voz
├── types.ts                    # Tipos TypeScript do app
├── App.tsx                     # Componente principal
└── index.css                   # Estilos globais e tema
```

---

## 🎯 Roadmap (ideias futuras)

- [ ] Modo escuro
- [ ] Sincronização de progresso entre dispositivos
- [ ] Mais módulos e cenários (viagens de trem, no hotel, no mercado)

---

## 📄 Licença

Este projeto é livre para uso pessoal e educacional.

---

Feito com 💚🤍❤️ para brasileiros que sonham em falar italiano.
