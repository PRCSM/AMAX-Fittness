import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', weight: 180 },
  { name: 'Tue', weight: 179.5 },
  { name: 'Wed', weight: 179 },
  { name: 'Thu', weight: 178.8 },
  { name: 'Fri', weight: 178.2 },
  { name: 'Sat', weight: 178 },
  { name: 'Sun', weight: 177.5 },
];

const Progress: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 pt-6">
      <h2 className="text-2xl font-bold font-display">Progress</h2>

      {/* Weight Chart */}
      <div className="rounded-2xl bg-surface p-4 h-64">
        <h3 className="text-sm font-bold text-secondary mb-4">WEIGHT TREND</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" stroke="#555" tick={{fontSize: 12}} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#252525', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#CDFF00' }}
            />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#CDFF00" 
              strokeWidth={3} 
              dot={{ fill: '#CDFF00', strokeWidth: 0, r: 4 }} 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Calendar Heatmap (Simplified) */}
      <div className="rounded-2xl bg-surface p-4">
        <h3 className="text-sm font-bold text-secondary mb-4">CONSISTENCY</h3>
        <div className="flex justify-between gap-1">
          {[...Array(14)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1 w-full">
              {[...Array(5)].map((_, j) => (
                <div 
                  key={j} 
                  className={`aspect-square w-full rounded-sm ${Math.random() > 0.5 ? 'bg-primary/80' : 'bg-surfaceHighlight'}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-bold mb-3">Achievements</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="aspect-square rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
            <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
          </div>
          <div className="aspect-square rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
            <span className="material-symbols-outlined text-primary text-2xl">local_fire_department</span>
          </div>
          <div className="aspect-square rounded-full bg-surfaceHighlight flex items-center justify-center opacity-50">
            <span className="material-symbols-outlined text-white text-2xl">lock</span>
          </div>
          <div className="aspect-square rounded-full bg-surfaceHighlight flex items-center justify-center opacity-50">
            <span className="material-symbols-outlined text-white text-2xl">lock</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-2xl p-4">
          <p className="text-xs text-secondary uppercase">Total Workouts</p>
          <p className="text-2xl font-bold mt-1">24</p>
        </div>
        <div className="bg-surface rounded-2xl p-4">
          <p className="text-xs text-secondary uppercase">Current Streak</p>
          <p className="text-2xl font-bold mt-1 text-primary">5 Days</p>
        </div>
        <div className="bg-surface rounded-2xl p-4">
          <p className="text-xs text-secondary uppercase">Total Time</p>
          <p className="text-2xl font-bold mt-1">18.5h</p>
        </div>
        <div className="bg-surface rounded-2xl p-4">
          <p className="text-xs text-secondary uppercase">Avg Calories</p>
          <p className="text-2xl font-bold mt-1">340</p>
        </div>
      </div>
    </div>
  );
};

export default Progress;
