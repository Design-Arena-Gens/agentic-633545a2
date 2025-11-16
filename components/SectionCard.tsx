"use client";
import { Chapter, Section } from '@data/chapters';
import { useI18n, useLanguage } from './LanguageProvider';
import { useEffect, useMemo, useRef, useState } from 'react';

function useSpeech(text: string, lang: string) {
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 1.0;
    u.pitch = 1.0;
    u.onend = () => setSpeaking(false);
    u.onpause = () => setSpeaking(false);
    utteranceRef.current = u;
    return () => {
      if (speaking) window.speechSynthesis.cancel();
      utteranceRef.current = null;
    };
  }, [text, lang]);

  const play = () => {
    if (!utteranceRef.current) return;
    window.speechSynthesis.cancel();
    setSpeaking(true);
    window.speechSynthesis.speak(utteranceRef.current);
  };
  const pause = () => { window.speechSynthesis.pause(); setSpeaking(false); };
  const stop = () => { window.speechSynthesis.cancel(); setSpeaking(false); };

  return { play, pause, stop, speaking };
}

const LangToBcp47: Record<string, string> = {
  en: 'en-US', hi: 'hi-IN', ml: 'ml-IN', ta: 'ta-IN', kn: 'kn-IN', te: 'te-IN', bn: 'bn-IN', ar: 'ar-SA'
};

export function SectionCard({ chapter, section }: { chapter: Chapter; section: Section }) {
  const t = useI18n();
  const { lang } = useLanguage();

  const narration = useMemo(() => {
    return `${chapter.title}. ${section.title}. ${section.brief} ${section.scenario}`;
  }, [chapter.title, section.title, section.brief, section.scenario]);

  const { play, pause, stop, speaking } = useSpeech(narration, LangToBcp47[lang] ?? 'en-US');

  return (
    <article className="card p-5 space-y-3">
      <h3 className="text-xl font-semibold">{section.title}</h3>
      <p className="text-white/90">{section.brief}</p>
      <p className="text-white/70 text-sm">{section.scenario}</p>
      <div className="flex gap-2 pt-2">
        <button className="button-primary" onClick={play}>{t('listen','Listen')}</button>
        <button className="button-ghost" onClick={pause}>{t('pause','Pause')}</button>
        <button className="button-ghost" onClick={stop}>{t('stop','Stop')}</button>
        {speaking && <span className="text-xs text-white/60 self-center">Speaking?</span>}
      </div>
    </article>
  );
}
