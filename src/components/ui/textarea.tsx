
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = React.useState(props.value || props.defaultValue || '');

    React.useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

    const adjustHeight = () => {
      if (internalRef.current) {
        internalRef.current.style.height = 'auto';
        internalRef.current.style.height = `${internalRef.current.scrollHeight}px`;
      }
    };

    React.useEffect(() => {
        adjustHeight();
    }, [value]);

    // This handles the initial value from props
    React.useEffect(() => {
        if (props.value !== undefined && props.value !== value) {
            setValue(props.value);
        }
    }, [props.value]);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <textarea
        className={cn(
          'flex min-h-[40px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-y-auto',
          className
        )}
        ref={internalRef}
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
