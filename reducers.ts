
import { AppState, AppAction, WorkoutSessionState, WorkoutSessionAction, View } from './types';

// --- Global App Reducer ---

export const initialAppState: AppState = {
  currentView: View.ONBOARDING,
  userProfile: null,
  dailyStats: {
    steps: 8432,
    stepsGoal: 10000,
    calories: 1845,
    caloriesGoal: 2500,
    water: 1.8,
    waterGoal: 3.0,
    workoutsCompleted: 12
  },
  selectedWorkout: null,
};

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentView: action.payload };
    case 'SET_USER_PROFILE':
      return { ...state, userProfile: action.payload, currentView: View.DASHBOARD };
    case 'START_WORKOUT':
      return { ...state, selectedWorkout: action.payload, currentView: View.WORKOUT_PLAYER };
    case 'EXIT_WORKOUT':
      return { ...state, selectedWorkout: null, currentView: View.DASHBOARD };
    case 'UPDATE_STATS':
      return { ...state, dailyStats: { ...state.dailyStats, ...action.payload } };
    default:
      return state;
  }
};

// --- Workout Session Reducer ---

export const initialWorkoutState: WorkoutSessionState = {
  currentExerciseIndex: 0,
  isPaused: false,
  timer: 45, // Default rest time
  completedSets: {},
  isFinished: false,
};

export const workoutSessionReducer = (state: WorkoutSessionState, action: WorkoutSessionAction): WorkoutSessionState => {
  switch (action.type) {
    case 'NEXT_EXERCISE':
      if (state.currentExerciseIndex < action.totalExercises - 1) {
        return {
          ...state,
          currentExerciseIndex: state.currentExerciseIndex + 1,
          timer: 45, // Reset timer for next exercise rest
          isPaused: false
        };
      }
      return state; // Or handle finish here if called on last exercise
    case 'PREV_EXERCISE':
      if (state.currentExerciseIndex > 0) {
        return {
          ...state,
          currentExerciseIndex: state.currentExerciseIndex - 1,
          isPaused: false
        };
      }
      return state;
    case 'TOGGLE_PAUSE':
      return { ...state, isPaused: !state.isPaused };
    case 'SET_TIMER':
      return { ...state, timer: action.payload };
    case 'TICK_TIMER':
      return { ...state, timer: Math.max(0, state.timer - 1) };
    case 'TOGGLE_SET':
      const { exerciseIndex, setIndex } = action.payload;
      const currentSets = state.completedSets[exerciseIndex] || [];
      const newSets = currentSets.includes(setIndex)
        ? currentSets.filter(i => i !== setIndex)
        : [...currentSets, setIndex];
      
      return {
        ...state,
        completedSets: {
          ...state.completedSets,
          [exerciseIndex]: newSets
        }
      };
    case 'FINISH_WORKOUT':
      return { ...state, isFinished: true };
    default:
      return state;
  }
};
