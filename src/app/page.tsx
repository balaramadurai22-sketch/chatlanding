'use client';

import { useState } from 'react';
import Hero from '@/components/landing/hero';

export default function Home() {
  // This state is kept for potential future use where the chat
  // might be initiated from the hero section even on the home page.
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');

  const handleOpenChat = (query?: string) => {
    if (query) {
      setInitialQuery(query);
    }
    // In a full-page navigation setup, this might navigate to the /ai-lab page
    // For now, we'll keep the logic but it won't be used as the chat component is removed.
    // A more advanced implementation could use: router.push(`/ai-lab?query=${query}`);
    console.log("Chat initiated with query:", query);
  };

  return (
    <>
      <Hero onChatSubmit={handleOpenChat} />
    </>
  );
}
