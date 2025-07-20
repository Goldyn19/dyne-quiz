import { useState } from 'react';
import { Button } from '@/components/ui/button';

const languages = [
  { value: '', label: 'Language' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese' },
  // Add more as needed
];

const regions = [
  { value: '', label: 'Region' },
  { value: 'us', label: 'United States' },
  { value: 'eu', label: 'Europe' },
  { value: 'asia', label: 'Asia' },
  { value: 'africa', label: 'Africa' },
  { value: 'oceania', label: 'Oceania' },
  // Add more as needed
];

const timezones = [
  { value: '', label: 'Time-Zone' },
  { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
  { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
  { value: 'UTC+0', label: 'Greenwich Mean Time (UTC+0)' },
  { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
  { value: 'UTC+8', label: 'China Standard Time (UTC+8)' },
  // Add more as needed
];

export function SettingsLanguageRegionForm() {
  const [language, setLanguage] = useState('');
  const [region, setRegion] = useState('');
  const [timezone, setTimezone] = useState('');

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Save logic
  }

  function handleCancel() {
    setLanguage('');
    setRegion('');
    setTimezone('');
  }

  return (
    <form className="max-w-2xl" onSubmit={handleSave}>
      <h2 className="text-xl font-semibold mb-2">Language & Region</h2>
      <p className="text-muted-foreground mb-8">Customize your language and region preferences</p>
      <div className="space-y-6 mb-8">
        <div>
          <select
            className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {languages.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14"
            value={region}
            onChange={e => setRegion(e.target.value)}
          >
            {regions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="w-full px-5 py-4 border rounded-lg bg-card text-lg text-foreground h-14"
            value={timezone}
            onChange={e => setTimezone(e.target.value)}
          >
            {timezones.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-3">
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">Save</Button>
        <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
      </div>
    </form>
  );
} 