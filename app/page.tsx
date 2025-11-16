import Image from 'next/image';
import { DailyQuote } from '@/components/DailyQuote';
import { LanguageSelector, useI18n } from '@/components/LanguageProvider';
import { ChapterList } from '@/components/ChapterList';
import { Tanpura } from '@/components/Tanpura';

export default function HomePage() {
  const t = useI18n();
  return (
    <div className="space-y-10">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            {t('title', 'Bhagavad Gita: Essence & Everyday Wisdom')}
          </h1>
          <p className="text-white/80 text-lg">
            {t('subtitle', 'Understand the Gita beyond religion ? brief insights, real-life scenarios, serene audio.')}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a href="/chapters/1" className="button-primary">
              {t('start_journey', 'Start your journey')}
            </a>
            <LanguageSelector />
          </div>
        </div>
        <div className="relative h-56 md:h-72">
          <Image src="/images/lotus.svg" alt="Lotus" fill priority className="object-contain" />
        </div>
      </section>

      <DailyQuote />

      <section className="card p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('chapters', 'Chapters')}</h2>
        <ChapterList />
      </section>

      <section className="card p-6">
        <h2 className="text-2xl font-semibold mb-4">{t('soundscape', 'Soundscape')}</h2>
        <p className="text-white/80 mb-4">
          {t('tanpura_desc', 'A gentle tanpura drone to accompany your reading. Toggle on/off below.')}
        </p>
        <Tanpura />
      </section>
    </div>
  );
}
