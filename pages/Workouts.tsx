import React, { useState } from 'react';
import { Workout } from '../types';
import { MOCK_WORKOUTS } from '../constants';

interface WorkoutsProps {
  onSelectWorkout: (workout: Workout) => void;
}

const Workouts: React.FC<WorkoutsProps> = ({ onSelectWorkout }) => {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Strength', 'Cardio', 'Flexibility'];

  const filteredWorkouts = filter === 'All' 
    ? MOCK_WORKOUTS 
    : MOCK_WORKOUTS.filter(w => w.category === filter);

  return (
    <div className="flex flex-col gap-6 p-4 pt-6">
      <h2 className="text-2xl font-bold font-display">Browse Workouts</h2>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              filter === cat 
                ? 'bg-primary text-black' 
                : 'bg-surface text-secondary hover:bg-surfaceHighlight'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWorkouts.map((workout) => (
          <div 
            key={workout.id} 
            onClick={() => onSelectWorkout(workout)}
            className="flex flex-col gap-3 rounded-2xl bg-surface p-3 transition-transform hover:scale-[1.02] cursor-pointer"
          >
            <div className="relative h-40 w-full overflow-hidden rounded-xl">
              <img src={workout.image} alt={workout.title} className="h-full w-full object-cover" />
              <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-1 backdrop-blur-sm">
                <span className="text-xs font-bold text-primary">{workout.calories} Cal</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold font-display leading-tight">{workout.title}</h3>
              <div className="mt-2 flex items-center gap-4 text-xs text-secondary">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  {workout.duration} min
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">fitness_center</span>
                  {workout.exercises.length} Exercises
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
