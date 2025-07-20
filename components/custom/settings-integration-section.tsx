import { useState } from 'react';
import { Button } from '@/components/ui/button';

const integrations = [
  {
    key: 'drive',
    name: 'Drive',
    description: 'Store, share, and collaborate on documents and files securely',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#F4B400" /></svg>
    ),
  },
  {
    key: 'onedrive',
    name: 'OneDrive',
    description: 'Access, share, and manage your files seamlessly across devices',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0078D4" /></svg>
    ),
  },
  {
    key: 'trello',
    name: 'Trello',
    description: 'Organize your projects, track tasks, and collaborate in a visual way',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0052CC" /></svg>
    ),
  },
  {
    key: 'dropbox',
    name: 'Dropbox',
    description: 'Securely store, sync, and share all your files and documents',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0061FF" /></svg>
    ),
  },
  {
    key: 'atlassian',
    name: 'Atlassian',
    description: 'Streamline project planning and manage workflows effectively',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2684FF" /></svg>
    ),
  },
  {
    key: 'jira',
    name: 'Jira',
    description: 'Track tasks, manage projects, and streamline team collaboration',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#0052CC" /></svg>
    ),
  },
  {
    key: 'notion',
    name: 'Notion',
    description: 'Organize information, collaborate on projects, and create flexible workflows',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#000" /></svg>
    ),
  },
  {
    key: 'teams',
    name: 'Microsoft teams',
    description: 'Enhance team communication, and project management with Microsoft Teams',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#6264A7" /></svg>
    ),
  },
  {
    key: 'slack',
    name: 'Slack',
    description: 'Transform team communication, enhance collaboration, and streamline workflow efficiency',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#611F69" /></svg>
    ),
  },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-primary' : 'bg-muted'}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'inactive', label: 'Inactive' },
];

export function SettingsIntegrationSection() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [active, setActive] = useState<{ [key: string]: boolean }>({
    drive: false,
    onedrive: true,
    trello: false,
    dropbox: true,
    atlassian: false,
    jira: true,
    notion: false,
    teams: true,
    slack: false,
  });

  const filtered = integrations.filter(intg => {
    if (filter === 'active' && !active[intg.key]) return false;
    if (filter === 'inactive' && active[intg.key]) return false;
    if (search && !intg.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 mt-8">Integration</h2>
      <p className="text-muted-foreground mb-8">Supercharge your workflow and handle repetitive tasks with apps you use every day</p>
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex gap-2 bg-muted rounded-lg p-1">
          {filterTabs.map(tab => (
            <Button
              key={tab.key}
              type="button"
              variant={filter === tab.key ? 'default' : 'ghost'}
              className={`px-4 py-2 text-base font-medium rounded-lg ${filter === tab.key ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={() => setFilter(tab.key)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        <div className="ml-auto flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-lg px-4 py-2 w-64 bg-background text-base"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(intg => (
          <div key={intg.key} className="flex items-center gap-4 bg-card rounded-xl border border-border px-6 py-6 shadow-sm">
            <div>{intg.icon}</div>
            <div className="flex-1">
              <div className="font-semibold text-lg mb-1">{intg.name}</div>
              <div className="text-muted-foreground text-sm">{intg.description}</div>
            </div>
            <Toggle checked={!!active[intg.key]} onChange={() => setActive(a => ({ ...a, [intg.key]: !a[intg.key] }))} />
          </div>
        ))}
      </div>
    </div>
  );
} 