
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Users, Rocket, Zap, ChevronRight, Terminal, UserPlus, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const Home: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => (
  <article className="space-y-12 md:space-y-32">
    {/* Hero Section */}
    <section className="relative min-h-[85vh] md:min-h-[95vh] flex flex-col items-center justify-center text-center px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="z-10 w-full max-w-6xl space-y-6 md:space-y-10"
      >
        <header className="space-y-4 md:space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 md:px-5 md:py-2 bg-zinc-900 border border-zinc-800 text-[8px] md:text-[10px] font-bold text-[#5227FF] uppercase tracking-[0.3em] rounded-full">
            <Terminal className="w-2.5 h-2.5 md:w-3 md:h-3" /> system.init(auth_success)
          </div>
          <h1 className="text-3xl sm:text-6xl md:text-8xl lg:text-[11rem] font-extrabold tracking-[-0.08em] leading-[0.9] md:leading-[0.8] uppercase break-words">
            Dev_Source.<br />
            <span className="text-[#5227FF]">Collective</span>
          </h1>
        </header>
        <p className="text-[10px] md:text-base text-zinc-500 max-w-xl mx-auto leading-relaxed font-medium uppercase tracking-tight px-4">
          A high-performance sanctuary for world-class engineers. share intelligence. deploy legacy. synchronize nodes.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 pt-4 md:pt-6">
          <button
            onClick={() => setPage('started')}
            className="interactive purple-liquid-glass px-8 py-4 md:px-14 md:py-6 text-white font-extrabold text-[10px] md:text-sm uppercase tracking-widest hover:brightness-110 transition-all rounded-full"
          >
            [ JOIN_COLLECTIVE ]
          </button>
        </div>
      </motion.div>
    </section>

    {/* Statistics Grid */}
    <section className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
      {[
        { label: 'Active_Nodes', val: '45.2k', icon: <Users className="w-4 h-4 md:w-6 md:h-6" /> },
        { label: 'Deployed_Src', val: '8.4k', icon: <Rocket className="w-4 h-4 md:w-6 md:h-6" /> },
        { label: 'Functions', val: '12.5k', icon: <Code className="w-4 h-4 md:w-6 md:h-6" /> },
        { label: 'Core_Uptime', val: '99.9%', icon: <Zap className="w-4 h-4 md:w-6 md:h-6" /> }
      ].map((s, i) => (
        <SpotlightCard key={i} className="py-4 md:py-10" label={`node_${i}`}>
          <div className="space-y-2 md:space-y-4">
            <div className="text-zinc-500">{s.icon}</div>
            <div className="text-xl md:text-5xl font-extrabold tracking-tighter">{s.val}</div>
            <div className="text-[7px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-zinc-600">{s.label}</div>
          </div>
        </SpotlightCard>
      ))}
    </section>

    {/* Forum / Feed Section */}
    <section className="max-w-7xl mx-auto px-4 md:px-6 space-y-8 md:space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-zinc-900 pb-6 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tighter uppercase underline decoration-[#5227FF] decoration-4 underline-offset-4 md:underline-offset-8">Feed_Sync</h2>
          <p className="text-zinc-600 text-[8px] md:text-xs uppercase tracking-widest">Real-time repository telemetry.</p>
        </div>
        <button
          onClick={() => setPage('forum')}
          className="text-zinc-500 font-bold text-[8px] md:text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 hover:text-[#5227FF] transition-colors py-2 px-4 rounded-full border border-zinc-900"
        >
          fetch_all_streams <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {[
          { title: "React 19 Server Components deep dive", author: "SarahDev", meta: "42 replies", tag: "React" },
          { title: "Building a Rust-based OS for embedded", author: "KernelMind", meta: "15 replies", tag: "Rust" },
          { title: "Is Mojo really faster than Python for AI?", author: "DataSage", meta: "128 replies", tag: "AI/ML" },
          { title: "Optimizing WebGL for mobile performance", author: "GfxWizard", meta: "31 replies", tag: "Web Graphics" }
        ].map((t, i) => (
          <div
            key={i}
            className="group bg-zinc-900/40 p-5 md:p-10 hover:bg-zinc-950 transition-all cursor-pointer border border-zinc-900 rounded-[24px] md:rounded-[48px] flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 md:gap-3">
                <span className="text-[10px] text-[#5227FF] font-bold">0{i + 1}</span>
                <div className="px-2 py-0.5 border border-zinc-800 text-[7px] md:text-[8px] font-bold uppercase text-zinc-500 tracking-widest rounded-full">{t.tag}</div>
              </div>
              <div className="text-[7px] md:text-[8px] text-zinc-700 font-bold uppercase tracking-widest">{t.meta}</div>
            </div>
            <h3 className="text-base md:text-2xl font-bold text-white group-hover:text-[#5227FF] transition-colors leading-tight mb-3 md:mb-4 lowercase tracking-tight break-words overflow-hidden">
              ./{t.title.replace(/\s+/g, '_')}
            </h3>
            <div className="mt-auto text-[8px] md:text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              owner: <span className="text-zinc-400">@{t.author}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  </article>
);

export const PlaceholderPage: React.FC<{ name: string }> = ({ name }) => (
  <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-32 space-y-6 md:space-y-8">
    <header className="space-y-4">
      <div className="inline-block px-4 py-1.5 md:px-5 md:py-2 bg-zinc-900 border border-zinc-800 text-[8px] md:text-[10px] text-red-500 font-bold uppercase tracking-widest rounded-full">
        error_404::node_not_found
      </div>
      <h1 className="text-3xl md:text-7xl font-extrabold tracking-tighter uppercase">{name}</h1>
    </header>
    <p className="text-zinc-500 text-xs md:text-xl max-w-2xl font-medium uppercase tracking-tight">
      Access denied. The target module '{name.toLowerCase()}.o' is currently undergoing maintenance or has been relocated to an offline subnet.
    </p>
  </section>
);

import { supabase } from './supabase';

export const JoinCollective: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    linkedin: '',
    github: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('members')
        .insert([
          {
            name: formData.name,
            phone: formData.number,
            email: formData.email,
            linkedin: formData.linkedin,
            github: formData.github
          }
        ]);

      if (dbError) throw dbError;

      setSubmitted(true);
    } catch (err: any) {
      console.error('Error saving to database:', err);
      // 🛡️ Sentinel Security Fix: Prevent database error details from leaking to the UI
      // by using a generic error message, while preserving the raw error in console logs for debugging.
      setError('Synchronization failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-24 md:py-48 flex flex-col items-center text-center space-y-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-24 h-24 rounded-full bg-[#5227FF]/10 border border-[#5227FF]/40 flex items-center justify-center"
        >
          <CheckCircle2 className="w-12 h-12 text-[#5227FF]" />
        </motion.div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black uppercase tracking-tighter">Synchronization_Request_Sent</h2>
          <p className="text-zinc-500 uppercase text-xs font-bold tracking-widest">Your node credentials have been queued for validation. protocol check in progress.</p>
        </div>
        <button
          onClick={() => setPage('home')}
          className="interactive purple-liquid-glass px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-3"
        >
          <ArrowLeft className="w-4 h-4" /> return_to_root
        </button>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-12 md:py-24 space-y-12">
      <div className="space-y-6">
        <button
          onClick={() => setPage('home')}
          className="flex items-center gap-2 text-zinc-600 hover:text-white transition-colors uppercase text-[10px] font-black tracking-[0.2em]"
        >
          <ArrowLeft className="w-3 h-3" /> [ back_to_main ]
        </button>
        <div className="space-y-2">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Join_Collective</h2>
          <p className="text-zinc-500 uppercase text-[10px] md:text-xs font-bold tracking-[0.3em]">Node initialization sequence. authorized personnel only.</p>
        </div>
      </div>

      <SpotlightCard label="node_init_v2.0" className="p-0 overflow-visible">
        <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">usr_name*</label>
              <input
                required
                disabled={loading}
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="0x_identity"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#5227FF]/50 transition-all placeholder-zinc-700 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">comms_channel_id*</label>
              <input
                required
                disabled={loading}
                type="tel"
                value={formData.number}
                onChange={e => setFormData({ ...formData, number: e.target.value })}
                placeholder="+00_telemetry"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#5227FF]/50 transition-all placeholder-zinc-700 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">net_address*</label>
              <input
                required
                disabled={loading}
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="protocol@intelligence.net"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#5227FF]/50 transition-all placeholder-zinc-700 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">linkedin_node*</label>
              <input
                required
                disabled={loading}
                type="url"
                value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/identity"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#5227FF]/50 transition-all placeholder-zinc-700 disabled:opacity-50"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">github_node_optional</label>
              <input
                disabled={loading}
                type="url"
                value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                placeholder="github.com/repository_host"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-[#5227FF]/50 transition-all placeholder-zinc-700 disabled:opacity-50"
              />
            </div>
          </div>

          {error && (
            <div className="px-6 py-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-[10px] text-red-500 font-bold uppercase tracking-widest">
              error_deteced: {error}
            </div>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full interactive purple-liquid-glass py-6 rounded-2xl text-white font-black text-xs uppercase tracking-[0.4em] flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <> [ SYNCHRONIZING_NODES... ] </>
              ) : (
                <>
                  [ EXECUTE_SYNCHRONIZATION ]
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </div>

          <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.2em] text-center">
            By executing, you agree to technical meritocracy and collective synchronization protocols.
          </p>
        </form>
      </SpotlightCard>
    </section>
  );
};
