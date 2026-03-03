
import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { globalStyles } from './styles';
import { GlobalInteraction } from './GlobalInteraction';
import { ChatBot } from './ChatBot';
import { LetterGlitch } from './LetterGlitch';
import { Home, PlaceholderPage, JoinCollective } from './SubPages';

// Lazy load the heavy StaggeredMenu component
const StaggeredMenu = lazy(() => import('./StaggeredMenu'));

export default function App() {
  const [page, setPage] = useState('home');

  const menuItems = useMemo(() => [
    { label: 'root_home', link: 'home' },
    { label: 'dev_forum', link: 'forum' },
    { label: 'src_projects', link: 'projects' },
    { label: 'bin_resources', link: 'resources' },
    { label: 'usr_members', link: 'members' },
    { label: 'etc_dashboard', link: 'dashboard' }
  ], []);

  const socialItems = useMemo(() => [
    { label: 'github_node', link: '#' },
    { label: 'discord_node', link: '#' },
    { label: 'x_twitter_node', link: '#' }
  ], []);

  const handlePageChange = (p: string) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderContent = () => {
    switch (page) {
      case 'home':
        return <Home setPage={handlePageChange} />;
      case 'started':
        return <JoinCollective setPage={handlePageChange} />;
      default:
        return <PlaceholderPage name={page} />;
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-[#5227FF]/50 selection:text-white">
      <style>{globalStyles}</style>

      <LetterGlitch />
      <ChatBot />
      <GlobalInteraction />

      <Suspense fallback={<div />}>
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials
          displayItemNumbering={true}
          colors={['#1a1a1a', '#0a0a0a', '#000000']}
          accentColor="#5227FF"
          onItemClick={(item) => handlePageChange(item.link)}
          onLogoClick={() => handlePageChange('home')}
          onJoinClick={() => handlePageChange('started')}
        />
      </Suspense>

      <main className="relative z-10 min-h-screen pt-20">
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>


      <footer className="relative z-10 border-t border-zinc-900 pt-32 pb-16 mt-32 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-10">
            <div className="flex items-center gap-3">
              <Terminal className="w-8 h-8 text-[#5227FF]" />
              <div className="text-2xl font-black tracking-tighter uppercase text-white">Invincible_Collective</div>
            </div>
            <p className="text-base text-zinc-500 max-w-sm font-medium leading-relaxed uppercase tracking-tight">
              architecting human progress through decentralized intelligence nodes and open-source legacy.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">./directories</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              {['About', 'Guidelines', 'Dashboard', 'Security'].map(p => (
                <li key={p}><button onClick={() => handlePageChange(p.toLowerCase())} className="hover:text-[#5227FF] transition-colors">{p}.exe</button></li>
              ))}
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em]">./protocols</h4>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
              {['Discord', 'Twitter', 'GitHub'].map(p => (
                <li key={p}><a href="#" className="hover:text-[#5227FF] transition-colors">ssh_{p.toLowerCase()}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] font-bold text-zinc-800 tracking-[0.5em] uppercase">
          <p>UTC_TIMESTAMP: {new Date().toISOString().slice(0, 16).replace('T', ' ')}</p>
          <p>STATUS: OPTIMIZED // BUILD: 0xA4F2</p>
        </div>
      </footer>
    </div >
  );
}
