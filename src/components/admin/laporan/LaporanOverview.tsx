import React from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';

interface TrendData {
  month: string;
  value: number;
}

interface LaporanOverviewProps {
  trendData: TrendData[];
}

export default function LaporanOverview({ trendData }: LaporanOverviewProps) {
  const maxValue = Math.max(...trendData.map(d => d.value));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Trend Pendapatan</h3>
      </div>

      <div className="relative h-80">
        <div className="absolute inset-0 flex items-end justify-between gap-2 pb-8">
          {trendData.map((data, index) => {
            const height = (data.value / maxValue) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-gray-100 rounded-t-lg relative group cursor-pointer transition-all hover:opacity-80" 
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      Rp {(data.value / 1000).toFixed(0)}K
                    </div>
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-600 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-xs text-gray-500 font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>

        <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400 pr-2">
          <span>600K</span>
          <span>450K</span>
          <span>300K</span>
        </div>

        <svg className="absolute inset-0 pointer-events-none" style={{ height: 'calc(100% - 2rem)' }}>
          <polyline
            points={trendData.map((d, i) => {
              const x = (i / (trendData.length - 1)) * 100;
              const y = 100 - (d.value / maxValue) * 100;
              return `${x}%,${y}%`;
            }).join(' ')}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}