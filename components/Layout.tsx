import React from 'react';
import { View } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="flex h-screen w-full flex-col bg-background font-sans text-white overflow-hidden">
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 md:pb-0 md:pl-20">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-surface/95 backdrop-blur-lg md:hidden">
        <div className="flex h-20 items-center justify-around px-2">
          <NavButton 
            active={currentView === View.DASHBOARD} 
            icon="home" 
            label="Home" 
            onClick={() => onNavigate(View.DASHBOARD)} 
          />
          <NavButton 
            active={currentView === View.WORKOUTS || currentView === View.EXERCISE_DETAIL || currentView === View.WORKOUT_PLAYER} 
            icon="fitness_center" 
            label="Workouts" 
            onClick={() => onNavigate(View.WORKOUTS)} 
          />
          
          {/* Floating FAB Placeholder effect for middle button */}
          <div className="relative -top-6">
            <button 
              onClick={() => onNavigate(View.AI_CHAT)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-background shadow-[0_0_15px_rgba(205,255,0,0.4)] transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-3xl">smart_toy</span>
            </button>
          </div>

          <NavButton 
            active={currentView === View.NUTRITION} 
            icon="restaurant" 
            label="Nutrition" 
            onClick={() => onNavigate(View.NUTRITION)} 
          />
          <NavButton 
            active={currentView === View.PROGRESS} 
            icon="bar_chart" 
            label="Progress" 
            onClick={() => onNavigate(View.PROGRESS)} 
          />
        </div>
      </nav>

      {/* Desktop Sidebar (Hidden on Mobile) */}
      <nav className="hidden fixed left-0 top-0 bottom-0 z-50 w-20 flex-col items-center border-r border-white/10 bg-surface py-8 md:flex">
        <div className="mb-8 text-primary">
          <span className="material-symbols-outlined text-4xl">bolt</span>
        </div>
        <div className="flex flex-col gap-8">
          <NavButtonIconOnly active={currentView === View.DASHBOARD} icon="home" onClick={() => onNavigate(View.DASHBOARD)} />
          <NavButtonIconOnly active={currentView === View.WORKOUTS} icon="fitness_center" onClick={() => onNavigate(View.WORKOUTS)} />
          <NavButtonIconOnly active={currentView === View.NUTRITION} icon="restaurant" onClick={() => onNavigate(View.NUTRITION)} />
          <NavButtonIconOnly active={currentView === View.PROGRESS} icon="bar_chart" onClick={() => onNavigate(View.PROGRESS)} />
          <NavButtonIconOnly active={currentView === View.AI_CHAT} icon="smart_toy" onClick={() => onNavigate(View.AI_CHAT)} />
        </div>
        <div className="mt-auto">
           <NavButtonIconOnly active={currentView === View.SETTINGS} icon="settings" onClick={() => onNavigate(View.SETTINGS)} />
        </div>
      </nav>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-secondary'}`}>
    <span className={`material-symbols-outlined text-2xl ${active ? 'filled' : ''}`}>{icon}</span>
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

const NavButtonIconOnly: React.FC<{ active: boolean; icon: string; onClick: () => void }> = ({ active, icon, onClick }) => (
  <button 
    onClick={onClick} 
    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${active ? 'bg-primary text-background' : 'text-secondary hover:text-white hover:bg-white/10'}`}
  >
    <span className="material-symbols-outlined text-2xl">{icon}</span>
  </button>
);

export default Layout;
