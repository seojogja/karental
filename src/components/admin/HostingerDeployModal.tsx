import React, { useState } from 'react';
import {
  X,
  Globe,
  Terminal,
  Copy,
  Check,
  Server,
  CloudUpload,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Layers
} from 'lucide-react';

interface HostingerDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingerDeployModal: React.FC<HostingerDeployModalProps> = ({ isOpen, onClose }) => {
  const [activeDeployMethod, setActiveDeployMethod] = useState<'shared' | 'vps'>('shared');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const htaccessCode = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`;

  const nginxCode = `server {
    listen 80;
    server_name domainanda.com www.domainanda.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl border border-slate-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col font-sans my-8">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md px-6 py-5 border-b border-slate-800 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-500/20 text-[var(--theme-color)] rounded-2xl border border-orange-500/30">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black font-poppins text-white">
                Panduan Deploy ke Hostinger
              </h2>
              <p className="text-xs text-slate-400">
                Langkah resmi publikasi aplikasi Karental di Hostinger Web Hosting & VPS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Deploy Method Selector */}
        <div className="p-6 space-y-6 flex-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveDeployMethod('shared')}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-4 ${
                activeDeployMethod === 'shared'
                  ? 'bg-orange-500/10 border-[var(--theme-color)] text-white shadow-lg'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="p-3 bg-slate-800 rounded-xl text-orange-400 shrink-0">
                <CloudUpload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400 block">Metode 1 (Rekomendasi Cepat)</span>
                <strong className="text-sm font-bold text-white block">Hostinger Shared / Cloud Hosting</strong>
                <p className="text-xs text-slate-400">Paling mudah tanpa manage server. Upload hasil build dist/ ke File Manager hPanel.</p>
              </div>
            </button>

            <button
              onClick={() => setActiveDeployMethod('vps')}
              className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-4 ${
                activeDeployMethod === 'vps'
                  ? 'bg-indigo-500/10 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="p-3 bg-slate-800 rounded-xl text-indigo-400 shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block">Metode 2 (Full-Stack Node Server)</span>
                <strong className="text-sm font-bold text-white block">Hostinger VPS (KVM / Ubuntu)</strong>
                <p className="text-xs text-slate-400">Untuk performa Express server penuh, PM2 process manager, & Nginx reverse proxy.</p>
              </div>
            </button>
          </div>

          {/* METHOD 1: HOSTINGER SHARED / CLOUD HOSTING */}
          {activeDeployMethod === 'shared' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                <h3 className="font-bold text-base text-white font-poppins flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
                  Langkah Build Static Assets
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Jalankan perintah kompilasi di komputer lokal Anda untuk menghasilkan folder produksi <code className="text-orange-400 font-mono">dist/</code>:
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between font-mono text-xs text-emerald-400">
                  <span>npm run build</span>
                  <button
                    onClick={() => copyToClipboard('npm run build', 'cmd-build')}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-sans flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === 'cmd-build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'cmd-build' ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                <h3 className="font-bold text-base text-white font-poppins flex items-center gap-2">
                  <span className="w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
                  Upload File ke Hostinger hPanel File Manager
                </h3>
                <ol className="list-decimal list-inside text-xs text-slate-300 space-y-2 leading-relaxed">
                  <li>Login ke Dashboard <strong>Hostinger hPanel</strong>.</li>
                  <li>Buka <strong>Files</strong> &gt; <strong>File Manager</strong>.</li>
                  <li>Masuk ke folder <code className="text-amber-400 font-mono">public_html</code> domain Anda.</li>
                  <li>Upload seluruh file & folder di dalam folder <code className="text-amber-400 font-mono">dist/</code> (bukan folder dist nya, tapi isinya seperti <code className="text-slate-400">index.html</code>, folder <code className="text-slate-400">assets/</code>, dll).</li>
                </ol>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white font-poppins flex items-center gap-2">
                    <span className="w-6 h-6 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                    Buat File .htaccess untuk Routing Single Page App (SPA)
                  </h3>
                  <button
                    onClick={() => copyToClipboard(htaccessCode, 'htaccess')}
                    className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === 'htaccess' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'htaccess' ? 'Tersalin!' : 'Salin Kode .htaccess'}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Di dalam folder <code className="text-amber-400 font-mono">public_html</code>, buat file baru bernama <code className="text-amber-400 font-mono">.htaccess</code> dan paste kode berikut agar URL slug mobil & kota tidak 404 saat direfresh:
                </p>

                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
                  {htaccessCode}
                </pre>
              </div>
            </div>
          )}

          {/* METHOD 2: HOSTINGER VPS */}
          {activeDeployMethod === 'vps' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                <h3 className="font-bold text-base text-white font-poppins flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center font-bold">1</span>
                  Setup Node.js & PM2 di VPS Hostinger (SSH)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hubungkan SSH ke VPS Hostinger Anda dan jalankan perintah install Node.js v20 & PM2 process manager:
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-indigo-300 overflow-x-auto">
                  <p># Install Node.js v20 & PM2</p>
                  <p className="text-emerald-400">curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -</p>
                  <p className="text-emerald-400">sudo apt install -y nodejs npm</p>
                  <p className="text-emerald-400">sudo npm install -g pm2</p>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                <h3 className="font-bold text-base text-white font-poppins flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center font-bold">2</span>
                  Build & Jalankan Aplikasi dengan PM2
                </h3>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs text-emerald-400 overflow-x-auto">
                  <p className="text-slate-500"># Install dependensi & kompilasi server</p>
                  <p>npm install</p>
                  <p>npm run build</p>
                  <p className="text-slate-500"># Jalankan daemon server</p>
                  <p>pm2 start dist/server.cjs --name "karental-app"</p>
                  <p>pm2 save && pm2 startup</p>
                </div>
              </div>

              <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-base text-white font-poppins flex items-center gap-2">
                    <span className="w-6 h-6 bg-indigo-500 text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
                    Konfigurasi Nginx & Certificate SSL Gratis (Certbot)
                  </h3>
                  <button
                    onClick={() => copyToClipboard(nginxCode, 'nginx')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedId === 'nginx' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'nginx' ? 'Tersalin!' : 'Salin Nginx Config'}
                  </button>
                </div>

                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap">
                  {nginxCode}
                </pre>

                <p className="text-xs text-slate-400">
                  Setelah menaruh file di <code className="text-amber-400">/etc/nginx/sites-available/karental</code>, jalankan <code className="text-emerald-400">sudo certbot --nginx</code> untuk mengaktifkan HTTPS gratis otomatis.
                </p>
              </div>

            </div>
          )}

          {/* Guarantee Footer Info */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-900/50 rounded-2xl flex items-center gap-3 text-xs text-emerald-300">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              Seluruh kode aplikasi telah dioptimasi dengan Vite & CJS bundling sehingga kompatibel 100% dengan semua paket hosting Hostinger Indonesia.
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors"
          >
            Tutup Panduan
          </button>
        </div>

      </div>
    </div>
  );
};
