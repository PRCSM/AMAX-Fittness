import React from 'react';
import { DailyStats, View, Workout } from '../types';
import { MOCK_WORKOUTS } from '../constants';

interface DashboardProps {
  stats: DailyStats;
  onNavigate: (view: View) => void;
  onSelectWorkout: (workout: Workout) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate, onSelectWorkout }) => {
  const featuredWorkout = MOCK_WORKOUTS[0];

  return (
    <div className="flex flex-col gap-6 p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-display">Hello, Athlete!</h2>
          <p className="text-sm text-secondary">Let's crush your goals today.</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-surfaceHighlight border-2 border-primary overflow-hidden">
          <img src="https://picsum.photos/100/100" alt="Profile" className="h-full w-full object-cover" />
        </div>
      </div>

      {/* Activity Ring */}
      <div className="relative flex items-center justify-center py-4">
        <div className="relative h-64 w-64">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              className="text-surfaceHighlight"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
            {/* Progress Circle - Steps */}
            <circle
              className="text-primary transition-all duration-1000 ease-out"
              strokeWidth="8"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * stats.steps) / stats.stepsGoal}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="40"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-secondary text-sm font-medium">Steps</span>
            <span className="text-4xl font-bold font-display text-white">{stats.steps.toLocaleString()}</span>
            <span className="text-xs text-secondary">/ {stats.stepsGoal.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">local_fire_department</span>
            <span className="text-xs font-bold">CALORIES</span>
          </div>
          <p className="text-2xl font-bold font-display">{stats.calories}</p>
          <div className="h-1.5 w-full bg-surfaceHighlight rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: `${(stats.calories / stats.caloriesGoal) * 100}%` }}></div>
          </div>
        </div>
        <div className="bg-surface rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#3A96FF]">
            <span className="material-symbols-outlined">water_drop</span>
            <span className="text-xs font-bold">WATER</span>
          </div>
          <p className="text-2xl font-bold font-display">{stats.water}L</p>
          <div className="h-1.5 w-full bg-surfaceHighlight rounded-full overflow-hidden">
            <div className="h-full bg-[#3A96FF]" style={{ width: `${(stats.water / stats.waterGoal) * 100}%` }}></div>
          </div>
        </div>
      </div>

      {/* Featured Workout */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Featured Workout</h3>
          <button onClick={() => onNavigate(View.WORKOUTS)} className="text-xs text-primary font-medium">View All</button>
        </div>
        
        <div 
          onClick={() => onSelectWorkout(featuredWorkout)}
          className="group relative h-48 w-full overflow-hidden rounded-2xl cursor-pointer"
        >
          <img src={featuredWorkout.image} alt={featuredWorkout.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-4 flex flex-col justify-end">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-primary text-black text-[10px] font-bold uppercase">{featuredWorkout.difficulty}</span>
              <span className="text-xs text-white/80">{featuredWorkout.duration} min</span>
            </div>
            <h4 className="text-xl font-bold font-display">{featuredWorkout.title}</h4>
          </div>
          <div className="absolute right-4 bottom-4 h-10 w-10 rounded-full bg-primary text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
            <span className="material-symbols-outlined">play_arrow</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
