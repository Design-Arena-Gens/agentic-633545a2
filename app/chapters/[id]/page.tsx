import { notFound } from 'next/navigation';
import { getChapterById } from '@data/chapters';
import { SectionCard } from '@/components/SectionCard';
import { LanguageSelector, useI18n, useLanguage } from '@/components/LanguageProvider';
import Link from 'next/link';

export default function ChapterPage({ params }: { params: { id: string } }) {
  const chapter = getChapterById(Number(params.id));
  const t = useI18n();
  const { lang } = useLanguage();

  if (!chapter) return notFound();

  const brief = chapter.briefs[lang] ?? chapter.briefs.en;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{t('chapter', 'Chapter')} {chapter.id}: {chapter.title}</h1>
          <p className="text-white/80">{brief}</p>
          <div className="flex gap-2 text-sm">
            <Link className="button-ghost" href={chapter.id > 1 ? `/chapters/${chapter.id - 1}` : '/'}>
              ? {t('previous', 'Previous')}
            </Link>
            <Link className="button-ghost" href={chapter.id < 18 ? `/chapters/${chapter.id + 1}` : '/'}>
              {t('next', 'Next')} ?
            </Link>
          </div>
        </div>
        <LanguageSelector />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {chapter.sections.map(section => (
          <SectionCard key={section.id} chapter={chapter} section={section} />
        ))}
      </div>
    </div>
  );
}
