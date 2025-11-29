
import React, { useReducer, useEffect } from 'react';
import { Workout } from '../types';
import ExerciseVideo from './ExerciseVideo';
import { workoutSessionReducer, initialWorkoutState } from '../reducers';

interface WorkoutPlayerProps {
  workout: Workout;
  onExit: () => void;
}

const WorkoutPlayer: React.FC<WorkoutPlayerProps> = ({ workout, onExit }) => {
  const [state, dispatch] = useReducer(workoutSessionReducer, initialWorkoutState);

  const currentExercise = workout.exercises[state.currentExerciseIndex];
  const isLastExercise = state.currentExerciseIndex === workout.exercises.length - 1;

  // Timer Effect
  useEffect(() => {
    let interval: number;
    if (!state.isPaused && state.timer > 0) {
      interval = window.setInterval(() => {
        dispatch({ type: 'TICK_TIMER' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isPaused, state.timer]);

  const handleNext = () => {
    if (isLastExercise) {
      dispatch({ type: 'FINISH_WORKOUT' });
      onExit(); // In a real app, show a summary screen first
    } else {
      dispatch({ type: 'NEXT_EXERCISE', totalExercises: workout.exercises.length });
    }
  };

  const toggleSet = (setIndex: number) => {
    dispatch({ 
      type: 'TOGGLE_SET', 
      payload: { exerciseIndex: state.currentExerciseIndex, setIndex } 
    });
  };

  const currentCompletedSets = state.completedSets[state.currentExerciseIndex] || [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-6">
        <button onClick={onExit} className="h-10 w-10 rounded-full bg-surfaceHighlight flex items-center justify-center hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className="text-sm font-bold uppercase tracking-widest text-secondary">
          {state.currentExerciseIndex + 1} / {workout.exercises.length}
        </h2>
        <div className="h-10 w-10"></div>
      </div>

      {/* Video Viewer Area */}
      <div className="relative h-[45vh] w-full px-4 pb-6">
        <ExerciseVideo videoUrl={currentExercise.videoUrl} paused={state.isPaused} />
        
        {/* Play/Pause Control Overlay */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
           <button 
             onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })}
             className="h-14 w-14 rounded-full bg-primary text-black flex items-center justify-center font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
           >
             <span className="material-symbols-outlined text-3xl">
               {state.isPaused ? 'play_arrow' : 'pause'}
             </span>
           </button>
        </div>
      </div>

      {/* Controls & Info */}
      <div className="flex-1 flex flex-col bg-surface mt-[-20px] rounded-t-3xl p-6 overflow-y-auto shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-30 border-t border-white/5">
        <h1 className="text-3xl font-bold font-display mb-2">{currentExercise.name}</h1>
        <div className="flex gap-3 mb-6">
          <span className="px-3 py-1 rounded-full bg-surfaceHighlight text-xs font-bold text-primary border border-primary/20">
            {currentExercise.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-surfaceHighlight text-xs font-bold text-white border border-white/10">
            {currentExercise.muscles[0]}
          </span>
        </div>

        {/* Sets */}
        <div className="flex-1">
          <h3 className="text-sm font-bold text-secondary mb-3 uppercase tracking-wider">Sets</h3>
          <div className="space-y-3">
            {[...Array(currentExercise.sets)].map((_, i) => (
              <button 
                key={i}
                onClick={() => toggleSet(i)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  currentCompletedSets.includes(i) 
                    ? 'bg-primary/10 border-primary' 
                    : 'bg-surfaceHighlight border-transparent hover:border-white/10'
                }`}
              >
                <span className="font-bold text-white">Set {i + 1}</span>
                <span className="text-sm text-secondary">{currentExercise.reps} reps</span>
                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  currentCompletedSets.includes(i) ? 'bg-primary border-primary' : 'border-secondary'
                }`}>
                  {currentCompletedSets.includes(i) && <span className="material-symbols-outlined text-black text-sm font-bold">check</span>}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 bg-surfaceHighlight rounded-2xl p-3 flex items-center justify-between border border-white/5">
            <span className="text-xs text-secondary font-bold pl-2">REST</span>
            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold font-display ${state.timer < 10 && state.timer > 0 ? 'text-error animate-pulse' : 'text-white'}`}>
                {state.timer}s
              </span>
              <button 
                onClick={() => dispatch({ type: 'SET_TIMER', payload: state.timer + 10 })}
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
          <button 
            onClick={handleNext}
            className="flex-[2] bg-primary text-black h-16 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg shadow-primary/10"
          >
            {isLastExercise ? 'Finish Workout' : 'Next Exercise'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlayer;
