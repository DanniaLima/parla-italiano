import { useCallback, useEffect, useRef, useState } from 'react';

export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window
  );
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!supported) return;
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [supported]);

  const speak = useCallback(
    (text: string, lang = 'it-IT') => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.85;
      const voice = voicesRef.current.find((v) => v.lang === lang);
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [supported]
  );

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { speak, stop, speaking, supported };
}

interface SpeechRecognitionResultLike {
  transcript: string;
  confidence: number;
}

export type RecognitionState = 'idle' | 'listening' | 'success' | 'error';

export function useSpeechRecognition() {
  const [state, setState] = useState<RecognitionState>('idle');
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  const [supported] = useState(
    () =>
      typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)
  );

  const start = useCallback(
    (expectedPhrase: string) => {
      if (!supported) return;
      const SpeechRecognitionClass =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'it-IT';
      recognition.interimResults = false;
      recognition.maxAlternatives = 3;
      recognition.continuous = false;
      recognitionRef.current = recognition;

      setState('listening');
      setTranscript('');

      recognition.onresult = (event: any) => {
        const results: SpeechRecognitionResultLike[] = Array.from(event.results)
          .map((r: any) => ({
            transcript: r[0].transcript.trim().toLowerCase().replace(/[.,!?]/g, ''),
            confidence: r[0].confidence,
          }))
          .sort((a, b) => b.confidence - a.confidence);

        const expected = expectedPhrase.trim().toLowerCase().replace(/[.,!?]/g, '');
        const match = results.some((r) => {
          const t = r.transcript;
          return t === expected || t.includes(expected) || expected.includes(t);
        });
        const best = results[0]?.transcript ?? '';
        setTranscript(best);
        setState(match ? 'success' : 'error');
      };
      recognition.onerror = () => setState('error');
      recognition.onend = () => {
        setState((s) => (s === 'listening' ? 'idle' : s));
      };
      recognition.start();
    },
    [supported]
  );

  const stopRecognition = useCallback(() => {
    recognitionRef.current?.stop();
    setState('idle');
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setTranscript('');
  }, []);

  return { state, transcript, start, stop: stopRecognition, reset, supported };
}
