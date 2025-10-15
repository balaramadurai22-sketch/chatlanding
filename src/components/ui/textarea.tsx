
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    onValueChange?: (value: string) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onValueChange, value: controlledValue, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const [internalValue, setInternalValue] = React.useState(controlledValue || '');

    React.useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

    const adjustHeight = React.useCallback(() => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = 'auto'; // Reset height
        textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
      }
    }, []);

    // Effect for handling controlled value changes from parent
    React.useEffect(() => {
        if (controlledValue !== undefined && controlledValue !== internalValue) {
            setInternalValue(controlledValue as string);
        }
    }, [controlledValue]);

    // Effect for adjusting height when value changes
    React.useEffect(() => {
        adjustHeight();
    }, [internalValue, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <textarea
        className={cn(
          'flex min-h-[40px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto',
          className
        )}
        ref={internalRef}
        value={internalValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
