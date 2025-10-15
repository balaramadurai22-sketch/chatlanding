
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    // This effect handles the auto-resizing
    React.useEffect(() => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = 'auto'; // Reset height to recalculate
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${scrollHeight}px`;
      }
    }, [value]); // Depend only on `value` to resize when content changes

    return (
      <textarea
        ref={internalRef}
        value={value}
        onChange={onChange}
        className={cn(
          'flex w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-hidden',
          'min-h-[40px]',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
