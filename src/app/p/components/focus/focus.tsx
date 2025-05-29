'use client';

import { IconX } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useCallback, useContext, useState } from 'react';
import { FormContext } from '../context/form';

interface Props {
  initialContent: string;
  onClose: () => void;
}

export default function Focus({ initialContent, onClose }: Props) {
  const [content, setContent] = useState(initialContent);
  const form = useContext(FormContext);
  if (!form) throw new Error('The form cannot be null');

  const onContentChanged = useCallback(
    (content: string) => {
      setContent(content);
      form.setValue('content', content);
    },
    [form.setValue]
  );

  return (
    <motion.article
      className="absolute top-0 bottom-0 right-0 left-0 h-screen w-screen transition-opacity bg-slate-900 p-4 md:p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-right mb-4 sm:mb-0">
        <button
          type="button"
          className="text-slate-500 cursor-pointer hover:text-white transition-colors"
          onClick={onClose}
        >
          <IconX size={20} />
        </button>
      </div>
      <div className="w-full h-full md:w-6xl mx-auto">
        <textarea
          value={content}
          onChange={(event) => onContentChanged(event.target.value)}
          placeholder="Distraction free typing here"
          className="text-lg md:text-2xl md:p-6 bg-slate-900 border-none field-sizing-content resize-none outline-none w-full text-slate-300"
        />
      </div>
    </motion.article>
  );
}
