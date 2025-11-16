import Link from 'next/link';
import { chapters } from '@data/chapters';

export function ChapterList() {
  return (
    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {chapters.map((c) => (
        <li key={c.id} className="card p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-white/70">Chapter {c.id}</div>
              <div className="font-semibold">{c.title}</div>
            </div>
            <Link href={`/chapters/${c.id}`} className="button-primary">Open</Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
