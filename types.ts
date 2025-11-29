
export interface Exercise {
  id: string;
  name: string;
  category: string;
  duration: string;
  reps: string;
  sets: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  muscles: string[];
  equipment: string;
  instructions: string[];
  videoUrl?: string;
}

export interface Workout {
  id: string;
  title: string;
  duration: number; // minutes
  calories: number;
  difficulty: string;
  exercises: Exercise[];
  image: string;
  category: string;
}

export interface DailyStats {
  steps: number;
  stepsGoal: number;
  calories: number;
  caloriesGoal: number;
  water: number; // liters
  waterGoal: number;
  workoutsCompleted: number;
}

export interface UserProfile {
  name: string;
  email: string;
  goal: string;
  equipment: string[];
  experience: string;
}

export enum View {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  WORKOUTS = 'WORKOUTS',
  WORKOUT_PLAYER = 'WORKOUT_PLAYER',
  EXERCISE_DETAIL = 'EXERCISE_DETAIL',
  NUTRITION = 'NUTRITION',
  PROGRESS = 'PROGRESS',
  SETTINGS = 'SETTINGS',
  AI_CHAT = 'AI_CHAT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

// --- Reducer Types ---

export interface AppState {
  currentView: View;
  userProfile: UserProfile | null;
  dailyStats: DailyStats;
  selectedWorkout: Workout | null;
}

export type AppAction =
  | { type: 'NAVIGATE'; payload: View }
  | { type: 'SET_USER_PROFILE'; payload: UserProfile }
  | { type: 'START_WORKOUT'; payload: Workout }
  | { type: 'EXIT_WORKOUT' }
  | { type: 'UPDATE_STATS'; payload: Partial<DailyStats> };

export interface WorkoutSessionState {
  currentExerciseIndex: number;
  isPaused: boolean;
  timer: number;
  completedSets: { [exerciseIndex: number]: number[] }; // Map exercise index to array of completed set indices
  isFinished: boolean;
}

export type WorkoutSessionAction =
  | { type: 'NEXT_EXERCISE'; totalExercises: number }
  | { type: 'PREV_EXERCISE' }
  | { type: 'TOGGLE_PAUSE' }
  | { type: 'SET_TIMER'; payload: number }
  | { type: 'TICK_TIMER' }
  | { type: 'TOGGLE_SET'; payload: { exerciseIndex: number; setIndex: number } }
  | { type: 'FINISH_WORKOUT' };
