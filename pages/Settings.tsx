import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 pt-6">
      <h2 className="text-2xl font-bold font-display">Settings</h2>

      <div className="flex items-center gap-4 bg-surface p-4 rounded-2xl">
        <div className="h-16 w-16 rounded-full bg-surfaceHighlight border-2 border-primary overflow-hidden">
          <img src="https://picsum.photos/100/100" alt="Profile" className="h-full w-full object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-bold">John Doe</h3>
          <p className="text-xs text-secondary">john.doe@example.com</p>
          <button className="text-xs text-primary mt-1 font-medium">Edit Profile</button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Section title="Preferences">
          <SettingItem icon="straighten" label="Units" value="Metric" />
          <SettingItem icon="fitness_center" label="Equipment" value="Gym" />
          <SettingItem icon="signal_cellular_alt" label="Experience" value="Intermediate" />
        </Section>

        <Section title="App Settings">
          <SettingItem icon="dark_mode" label="Theme" value="Dark" />
          <SettingItem icon="notifications" label="Notifications" toggle />
          <SettingItem icon="volume_up" label="Sound Effects" toggle />
        </Section>

        <Section title="Data">
          <button className="flex w-full items-center gap-3 rounded-xl bg-surface p-4 text-left transition-colors hover:bg-surfaceHighlight">
            <span className="material-symbols-outlined text-secondary">download</span>
            <span className="flex-1 font-medium">Export Data</span>
          </button>
          <button className="flex w-full items-center gap-3 rounded-xl bg-surface p-4 text-left text-error transition-colors hover:bg-error/10">
            <span className="material-symbols-outlined">delete</span>
            <span className="flex-1 font-medium">Reset Progress</span>
          </button>
        </Section>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
    <h3 className="text-sm font-bold text-secondary mb-2 px-1">{title}</h3>
    <div className="flex flex-col gap-2">
      {children}
    </div>
  </div>
);

const SettingItem: React.FC<{ icon: string; label: string; value?: string; toggle?: boolean }> = ({ icon, label, value, toggle }) => (
  <div className="flex items-center gap-3 rounded-xl bg-surface p-4">
    <span className="material-symbols-outlined text-secondary">{icon}</span>
    <span className="flex-1 font-medium">{label}</span>
    {value && <span className="text-sm text-secondary">{value}</span>}
    {toggle && (
      <div className="h-6 w-11 rounded-full bg-primary p-1 cursor-pointer">
        <div className="h-4 w-4 rounded-full bg-black translate-x-5"></div>
      </div>
    )}
    {!toggle && <span className="material-symbols-outlined text-secondary text-sm">chevron_right</span>}
  </div>
);

export default Settings;
