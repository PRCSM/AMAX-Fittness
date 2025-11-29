import React from 'react';

const Nutrition: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 pt-6">
      <h2 className="text-2xl font-bold font-display">Nutrition</h2>

      {/* Summary Card */}
      <div className="rounded-2xl bg-gradient-to-br from-surface to-surfaceHighlight p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-secondary">Calories Remaining</p>
            <h3 className="text-3xl font-bold font-display">1,845</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-secondary">Goal</p>
            <p className="text-lg font-bold text-white">2,200</p>
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-4">
          {['Protein', 'Carbs', 'Fats'].map((macro, i) => (
            <div key={macro} className="flex flex-col gap-2">
              <div className="flex justify-between text-xs">
                <span className="text-secondary">{macro}</span>
                <span className="text-white font-bold">{[120, 200, 65][i]}g</span>
              </div>
              <div className="h-1.5 w-full bg-black/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${i === 0 ? 'bg-[#3A96FF]' : i === 1 ? 'bg-[#FF6B3A]' : 'bg-[#AF52DE]'}`} 
                  style={{ width: '60%' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Water Intake */}
      <div>
        <h3 className="text-lg font-bold mb-3">Water Intake</h3>
        <div className="grid grid-cols-8 gap-2">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`aspect-[2/3] rounded-md flex items-center justify-center ${i < 5 ? 'bg-[#3A96FF] text-black' : 'bg-surface text-secondary'}`}>
              <span className="material-symbols-outlined text-lg">local_drink</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Suggestions */}
      <div>
        <h3 className="text-lg font-bold mb-3">Meal Suggestions</h3>
        <div className="flex flex-col gap-3">
          {[
            { title: 'Pre-Workout Power', cal: 350, img: 'https://images.unsplash.com/photo-1517922533039-2f22c6074274?q=80&w=2070' },
            { title: 'Post-Workout Recovery', cal: 450, img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780' }
          ].map((meal, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl bg-surface p-3">
              <img src={meal.img} alt={meal.title} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-bold">{meal.title}</h4>
                <p className="text-xs text-secondary">{meal.cal} Calories</p>
              </div>
              <button className="h-8 w-8 rounded-full bg-surfaceHighlight flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-lg">add</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Supplements */}
      <div>
        <h3 className="text-lg font-bold mb-3">Supplements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-surface p-4 flex flex-col gap-3">
            <div className="aspect-square w-full bg-white rounded-lg flex items-center justify-center p-2">
               <img src="https://m.media-amazon.com/images/I/61JSj3o1u2L._AC_SX679_.jpg" alt="Whey Protein" className="object-contain h-full" />
            </div>
            <div>
              <h4 className="font-bold leading-tight">Whey Protein Isolate</h4>
              <p className="text-xs text-secondary mt-1">24g Protein • Fast Absorb</p>
            </div>
            <a 
              href="#" 
              target="_blank" 
              className="mt-auto block w-full rounded-lg bg-primary py-2 text-center text-sm font-bold text-black hover:bg-white transition-colors"
            >
              View on Amazon
            </a>
          </div>
          
          <div className="rounded-xl bg-surface p-4 flex flex-col gap-3">
            <div className="aspect-square w-full bg-white rounded-lg flex items-center justify-center p-2">
               <img src="https://m.media-amazon.com/images/I/71D+E5gY4UL._AC_SX679_.jpg" alt="Creatine" className="object-contain h-full" />
            </div>
            <div>
              <h4 className="font-bold leading-tight">Micronized Creatine</h4>
              <p className="text-xs text-secondary mt-1">Muscle Strength • Recovery</p>
            </div>
            <a 
              href="#" 
              target="_blank" 
              className="mt-auto block w-full rounded-lg bg-primary py-2 text-center text-sm font-bold text-black hover:bg-white transition-colors"
            >
              View on Amazon
            </a>
          </div>
        </div>
        <p className="text-[10px] text-secondary text-center mt-4 italic">
          As an Amazon Associate, AMAX Fit earns from qualifying purchases.
        </p>
      </div>
    </div>
  );
};

export default Nutrition;
