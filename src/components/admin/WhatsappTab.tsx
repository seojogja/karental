import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { WhatsAppLog } from '../../types';
import { PhoneCall, MousePointerClick, Globe, Car, Smartphone } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const WhatsappTab = () => {
  const { whatsappLogs } = useApp();

  const stats = useMemo(() => {
    let sourceCount: Record<string, number> = {};
    let carCount: Record<string, number> = {};
    let cityCount: Record<string, number> = {};

    whatsappLogs.forEach(log => {
      sourceCount[log.sourcePage] = (sourceCount[log.sourcePage] || 0) + 1;
      if (log.carName) carCount[log.carName] = (carCount[log.carName] || 0) + 1;
      if (log.cityName) cityCount[log.cityName] = (cityCount[log.cityName] || 0) + 1;
    });

    const sourceData = Object.keys(sourceCount).map(k => ({ name: k, clicks: sourceCount[k] })).sort((a,b) => b.clicks - a.clicks);
    const carData = Object.keys(carCount).map(k => ({ name: k, clicks: carCount[k] })).sort((a,b) => b.clicks - a.clicks);
    const cityData = Object.keys(cityCount).map(k => ({ name: k, clicks: cityCount[k] })).sort((a,b) => b.clicks - a.clicks);

    return { sourceData, carData, cityData };
  }, [whatsappLogs]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Statistik Konversi WhatsApp</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-emerald-500 font-bold"><MousePointerClick className="w-5 h-5"/> Total Klik</div>
          <div className="text-4xl font-black">{whatsappLogs.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-blue-500 font-bold"><Car className="w-5 h-5"/> Mobil Terfavorit</div>
          <div className="text-xl font-black">{stats.carData[0]?.name || '-'}</div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="flex items-center gap-3 mb-2 text-orange-500 font-bold"><Globe className="w-5 h-5"/> Kota Terpopuler</div>
          <div className="text-xl font-black">{stats.cityData[0]?.name || '-'}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="font-bold text-sm">Sumber Halaman (Source Page)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.sourceData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} fontSize={10} stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                <Bar dataKey="clicks" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h4 className="font-bold text-sm">Ketertarikan Mobil</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.carData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} fontSize={10} stroke="#94a3b8" />
                <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
                <Bar dataKey="clicks" fill="var(--theme-color)" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 space-y-4">
        <h4 className="font-bold text-sm">Log History Terbaru</h4>
        <div className="space-y-2">
          {whatsappLogs.slice(0, 10).map((log) => (
            <div key={log.id} className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">{log.sourcePage}</span>
                <span className="text-[11px] text-slate-500">{log.carName || 'General Inquiry'} • {log.cityName || 'All Cities'}</span>
              </div>
              <div className="text-right text-[11px] text-slate-400">
                <div className="flex items-center justify-end gap-1"><Smartphone className="w-3 h-3"/> {log.userDevice}</div>
                <span>{new Date(log.timestamp).toLocaleString('id-ID')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
