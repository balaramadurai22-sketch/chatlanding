'use client';

import { useState } from 'react';
import Chat from '@/components/landing/chat';

export default function AiLabPage() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [initialQuery, setInitialQuery] = useState('');

  const handleOpenChat = (query?: string) => {
    if (query) {
      setInitialQuery(query);
    }
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setInitialQuery('');
  };

  return (
    <div className="bg-muted/50 py-20 sm:py-24 md:py-32">
        <Chat isOpen={isChatOpen} onOpenChange={handleCloseChat} initialQuery={initialQuery} onTriggerClick={() => handleOpenChat()} />
    </div>
  );
}
