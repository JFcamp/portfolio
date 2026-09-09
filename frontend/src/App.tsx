import { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/ChatWidget';
import { CommandPalette } from '@/components/CommandPalette';
import { keepBackendWarm } from '@/services/api';
import { HomePage } from '@/pages/HomePage';
import { CaseStudyPage } from '@/pages/CaseStudyPage';
import { NotFound } from '@/pages/NotFound';

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  // A query pushed from the command palette; consumed by ChatWidget once.
  const [pendingQuery, setPendingQuery] = useState<string | null>(null);

  const askAiFromPalette = useCallback((query: string) => {
    setPendingQuery(query);
    setChatOpen(true);
  }, []);

  // Warm the free-tier backend on load and periodically, so the first chat
  // request doesn't hit a ~50s cold start.
  useEffect(() => keepBackendWarm(), []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage onOpenChat={() => setChatOpen(true)} />} />
        <Route path="/projects/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ChatWidget
        open={chatOpen}
        setOpen={setChatOpen}
        pendingQuery={pendingQuery}
        onPendingConsumed={() => setPendingQuery(null)}
      />
      <CommandPalette open={paletteOpen} setOpen={setPaletteOpen} onAskAi={askAiFromPalette} />
    </>
  );
}
