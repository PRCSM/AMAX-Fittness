
import React, { useReducer } from 'react';
import { View, Workout, UserProfile } from './types';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Nutrition from './pages/Nutrition';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import WorkoutPlayer from './components/WorkoutPlayer';
import AIAssistant from './components/AIAssistant';
import Onboarding from './pages/Onboarding';
import { appReducer, initialAppState } from './reducers';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const handleNavigate = (view: View) => {
    dispatch({ type: 'NAVIGATE', payload: view });
  };

  const handleSelectWorkout = (workout: Workout) => {
    dispatch({ type: 'START_WORKOUT', payload: workout });
  };

  const handleExitWorkout = () => {
    dispatch({ type: 'EXIT_WORKOUT' });
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    dispatch({ type: 'SET_USER_PROFILE', payload: profile });
  };

  // Full screen views overlaying the layout
  if (state.currentView === View.ONBOARDING) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (state.currentView === View.WORKOUT_PLAYER && state.selectedWorkout) {
    return <WorkoutPlayer workout={state.selectedWorkout} onExit={handleExitWorkout} />;
  }

  // Views inside Layout
  const renderView = () => {
    switch (state.currentView) {
      case View.DASHBOARD:
        return <Dashboard stats={state.dailyStats} onNavigate={handleNavigate} onSelectWorkout={handleSelectWorkout} />;
      case View.WORKOUTS:
        return <Workouts onSelectWorkout={handleSelectWorkout} />;
      case View.NUTRITION:
        return <Nutrition />;
      case View.PROGRESS:
        return <Progress />;
      case View.SETTINGS:
        return <Settings />;
      case View.AI_CHAT:
        return <AIAssistant />;
      default:
        return <Dashboard stats={state.dailyStats} onNavigate={handleNavigate} onSelectWorkout={handleSelectWorkout} />;
    }
  };

  return (
    <Layout currentView={state.currentView} onNavigate={handleNavigate}>
      {renderView()}
    </Layout>
  );
};

export default App;
