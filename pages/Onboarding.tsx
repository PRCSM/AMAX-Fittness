
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({
    goal: '',
    equipment: [] as string[],
    experience: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  // const prevStep = () => setStep(prev => prev - 1); // Not currently used but good to have

  const toggleEquipment = (id: string) => {
    setSelections(prev => ({
      ...prev,
      equipment: prev.equipment.includes(id) 
        ? prev.equipment.filter(item => item !== id)
        : [...prev.equipment, id]
    }));
  };

  const setGoal = (goal: string) => {
    setSelections(prev => ({ ...prev, goal }));
  };

  const setExperience = (exp: string) => {
    setSelections(prev => ({ ...prev, experience: exp }));
  };

  const handleFinish = () => {
    // Construct UserProfile
    const profile: UserProfile = {
      name: 'User', // Default or could ask in another step
      email: '',
      goal: selections.goal,
      equipment: selections.equipment,
      experience: selections.experience
    };
    onComplete(profile);
  };

  // --- Step Components ---

  const WelcomeStep = () => (
    <div className="relative flex h-full w-full flex-col items-center justify-between overflow-hidden p-6 text-center">
      <div className="absolute inset-0 z-0 h-full w-full" style={{
        backgroundImage: `linear-gradient(rgba(26,26,26,0.6) 1px, transparent 1px), linear-gradient(to right, rgba(26,26,26,0.6) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <div className="mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-primary/10 text-primary shadow-[0_0_20px_rgba(205,255,0,0.4)]">
          <span className="material-symbols-outlined text-9xl">fitness_center</span>
        </div>
        <h1 className="text-[32px] font-bold leading-tight tracking-tight text-white drop-shadow-[0_0_8px_rgba(205,255,0,0.3)]">
          AMAX FIT
        </h1>
        <p className="pt-1 text-base font-normal text-secondary">
          Your Personal Fitness Journey
        </p>
      </div>

      <div className="relative z-10 w-full pb-8">
        <button 
          onClick={nextStep}
          className="flex h-14 w-full items-center justify-center rounded-xl bg-primary text-base font-bold text-black shadow-[0_0_20px_rgba(205,255,0,0.4)] transition-transform active:scale-95"
        >
          Get Started
        </button>
      </div>
    </div>
  );

  const GoalStep = () => (
    <div className="flex h-full flex-col">
      <h1 className="px-4 pt-12 pb-6 text-left text-[32px] font-bold leading-tight text-white">
        What's your goal?
      </h1>
      
      <div className="grid grid-cols-2 gap-4 px-4">
        {[
          { id: 'muscle', icon: 'fitness_center', title: 'Build Muscle', desc: 'Strength & hypertrophy' },
          { id: 'weight', icon: 'scale', title: 'Lose Weight', desc: 'Calorie deficit & fat loss' },
          { id: 'fit', icon: 'favorite', title: 'Stay Fit', desc: 'General health & wellness' },
          { id: 'athletic', icon: 'trophy', title: 'Athletic', desc: 'Sport-specific performance' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setGoal(item.id)}
            className={`flex flex-col gap-3 rounded-xl border p-4 text-left transition-all ${
              selections.goal === item.id 
                ? 'border-primary bg-surfaceHighlight shadow-[0_0_10px_rgba(205,255,0,0.2)]' 
                : 'border-transparent bg-surfaceHighlight hover:bg-[#2a2a2a]'
            }`}
          >
            <span className={`material-symbols-outlined text-[24px] ${selections.goal === item.id ? 'text-primary' : 'text-white'}`}>
              {item.icon}
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-white">{item.title}</h2>
              <p className="text-sm font-normal text-secondary">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto px-4 pb-8 pt-4">
        <div className="flex justify-center gap-3 py-5">
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-[#505639]"></div>
          <div className="h-2 w-2 rounded-full bg-[#505639]"></div>
        </div>
        <button 
          onClick={nextStep}
          disabled={!selections.goal}
          className="h-14 w-full rounded-xl bg-primary text-base font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const EquipmentStep = () => (
    <div className="flex h-full flex-col">
      <h1 className="px-4 pt-8 pb-4 text-center text-[32px] font-bold leading-tight text-white">
        What equipment do you have?
      </h1>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="grid grid-cols-3 gap-3 py-4">
          {[
            { id: 'dumbbells', icon: 'fitness_center', label: 'Dumbbells' },
            { id: 'barbell', icon: 'horizontal_rule', label: 'Barbell', iconClass: 'scale-x-[2.5] font-black' },
            { id: 'bands', icon: 'straighten', label: 'Bands' },
            { id: 'bench', icon: 'chair_alt', label: 'Bench' },
            { id: 'pullup', icon: 'align_horizontal_center', label: 'Pull-up Bar', iconClass: 'rotate-90' },
            { id: 'kettlebell', icon: 'kettle', label: 'Kettlebell' },
            { id: 'mat', icon: 'square_foot', label: 'Yoga Mat' },
            { id: 'rope', icon: 'u_turn_left', label: 'Jump Rope' },
            { id: 'none', icon: 'accessibility_new', label: 'None' },
          ].map((item) => {
            const isSelected = selections.equipment.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleEquipment(item.id)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl border-2 p-2 transition-all ${
                  isSelected ? 'border-primary bg-surfaceHighlight' : 'border-transparent bg-surfaceHighlight'
                }`}
              >
                <span className={`material-symbols-outlined text-[32px] text-white ${item.iconClass || ''}`}>
                  {item.icon}
                </span>
                <span className="mt-2 text-center text-xs font-medium text-white">
                  {item.label}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <span className="material-symbols-outlined text-[14px] text-black font-bold">check</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-shrink-0 px-4 pb-8 pt-4">
        <div className="flex justify-center gap-3 py-5">
          <div className="h-2 w-2 rounded-full bg-[#4A4A4A]"></div>
          <div className="h-2 w-2 rounded-full bg-white"></div>
          <div className="h-2 w-2 rounded-full bg-[#4A4A4A]"></div>
        </div>
        <button 
          onClick={nextStep}
          className="h-14 w-full rounded-xl bg-primary text-base font-bold text-black"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const ExperienceStep = () => (
    <div className="flex h-full flex-col px-4 pt-12">
      <h1 className="pb-8 text-center text-[32px] font-bold leading-tight text-white">
        What's your experience level?
      </h1>

      <div className="flex flex-col gap-4">
        {[
          { id: 'beginner', title: 'Beginner', desc: 'New to fitness, ready to learn basics.', stars: 1 },
          { id: 'intermediate', title: 'Intermediate', desc: 'Have experience, looking to progress.', stars: 2 },
          { id: 'advanced', title: 'Advanced', desc: 'Consistent and experienced in routines.', stars: 3 },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setExperience(item.id)}
            className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all ${
              selections.experience === item.id
                ? 'border-primary bg-surfaceHighlight shadow-[0_0_15px_rgba(205,255,0,0.3)]'
                : 'border-transparent bg-surfaceHighlight'
            }`}
          >
            <div className="flex items-center gap-1 text-lg text-primary">
              {[...Array(item.stars)].map((_, i) => (
                <span key={i} className="material-symbols-outlined filled">star</span>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="text-base font-medium text-white">{item.title}</p>
              <p className="text-sm font-normal text-secondary">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-auto pb-8 pt-4">
        <div className="flex justify-center gap-3 py-5">
          <div className="h-2 w-2 rounded-full bg-[#4A4A4A]"></div>
          <div className="h-2 w-2 rounded-full bg-[#4A4A4A]"></div>
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
        <button 
          onClick={handleFinish}
          disabled={!selections.experience}
          className="h-14 w-full rounded-xl bg-primary text-base font-bold text-black disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-full bg-background font-display text-white">
      {step === 0 && <WelcomeStep />}
      {step === 1 && <GoalStep />}
      {step === 2 && <EquipmentStep />}
      {step === 3 && <ExperienceStep />}
    </div>
  );
};

export default Onboarding;
