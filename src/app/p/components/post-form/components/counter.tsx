import { useMemo } from 'react';
import { countCharacters, countWords } from '@/lib/posts/words';

interface Props {
  content: string;
}

export default function Counter({ content }: Props) {
  const words = useMemo(() => countWords(content), [content]);
  const chars = useMemo(() => countCharacters(content), [content]);

  return (
    <div className="py-1 px-2 transition text-xs bg-linear-to-r from-[#1b1f23] to-black rounded-3xl border border-slate-400">
      <span className="text-white">
        {words} {words === 1 ? 'word' : 'words'}
      </span>
      <span className="text-linkedin-low-emphasis"> | {chars} characters</span>
    </div>
  );
}
