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
    <section className="container">
      <Chat isOpen={isChatOpen} onOpenChange={handleCloseChat} initialQuery={initialQuery} onTriggerClick={() => handleOpenChat()} />
    </section>
  );
}
