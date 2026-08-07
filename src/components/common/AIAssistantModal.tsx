import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Send, Bot, User, Loader2, MessageSquare } from 'lucide-react';

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
}

export const AIAssistantModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, trackWhatsAppClick } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Halo! Saya Karental AI Consultant. Saya dapat memberikan rekomendasi mobil rental terbaik, hitungan estimasi biaya harian, info sopir, hingga rute perjalanan dinas/liburan Anda di Jakarta, Bali, Surabaya, Bandung, Jogja, Medan, Semarang, dan Makassar. Ada yang bisa saya bantu?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAiModalOpen) return null;

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userQuery = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userQuery })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply || 'Maaf, terjadi masalah koneksi AI.' }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { sender: 'ai', text: 'Maaf, sistem AI sedang offline. Silakan hubungi CS Karental via WhatsApp.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base font-poppins">Karental AI Rental Advisor</h3>
              <p className="text-xs text-orange-100">Powered by Gemini AI • Konsultasi Armada & Estimasi Biaya</p>
            </div>
          </div>
          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-[var(--theme-color)] text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[var(--theme-color)] text-white font-medium rounded-tr-none'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none whitespace-pre-wrap'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
              <Loader2 className="w-4 h-4 animate-spin text-[var(--theme-color)]" />
              <span>Karental AI sedang memproses jawaban...</span>
            </div>
          )}
        </div>

        {/* Quick Query chips */}
        <div className="p-2 bg-slate-100 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto text-xs">
          {[
            'Rekomendasi mobil 7 orang di Bali',
            'Berapa harga sewa Alphard 3 hari?',
            'Syarat rental lepas kunci apa saja?',
            'Bedanya pakai driver vs lepas kunci'
          ].map((q, i) => (
            <button
              key={i}
              onClick={() => {
                setInputText(q);
              }}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 whitespace-nowrap hover:border-[var(--theme-color)] hover:text-[var(--theme-color)] transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Tanyakan rekomendasi mobil, harga, atau rute..."
            className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2.5 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[var(--theme-color)]"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="bg-[var(--theme-color)] hover:bg-orange-600 disabled:opacity-50 text-white p-3 rounded-2xl transition-all cursor-pointer shadow-lg shadow-orange-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsAiModalOpen(false);
              trackWhatsAppClick('AI Advisor Direct WA');
            }}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap"
            title="Lanjut Chat WhatsApp CS"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WA CS</span>
          </button>
        </div>

      </div>
    </div>
  );
};
