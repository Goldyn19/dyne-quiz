'use client'
import { useState } from 'react';
import { AppNavigation } from '@/components/custom/app-navigation';
import { SettingsGeneralForm } from '@/components/custom/settings-general-form';
import { SettingsAccountForm } from '@/components/custom/settings-account-form';
import { SettingsNotificationForm } from '@/components/custom/settings-notification-form';
import { SettingsMembersSection } from '@/components/custom/settings-members-section';
import { SettingsLanguageRegionForm } from '@/components/custom/settings-language-region-form';
import { SettingsIntegrationSection } from '@/components/custom/settings-integration-section';
import { SettingsRolesSection } from '@/components/custom/settings-roles-section';
import { SettingsDataPrivacySection } from '@/components/custom/settings-data-privacy-section';
import { User, Bell, Database, Globe, Users, Shield, CreditCard, Settings as SettingsIcon } from 'lucide-react';

const sidebarItems = [
  { key: 'general', label: 'General', icon: <User className="w-5 h-5 mr-2 inline" /> },
  { key: 'account', label: 'Account', icon: <Users className="w-5 h-5 mr-2 inline" /> },
  { key: 'notification', label: 'Notification', icon: <Bell className="w-5 h-5 mr-2 inline" /> },
  { key: 'privacy', label: 'Data and Privacy', icon: <Database className="w-5 h-5 mr-2 inline" /> },
  { key: 'language', label: 'Language and Region', icon: <Globe className="w-5 h-5 mr-2 inline" /> },
  { separator: true },
  { key: 'members', label: 'Members', icon: <Users className="w-5 h-5 mr-2 inline" /> },
  { key: 'roles', label: 'Roles and permissions', icon: <Shield className="w-5 h-5 mr-2 inline" /> },
  { key: 'integrations', label: 'Integrations', icon: <SettingsIcon className="w-5 h-5 mr-2 inline" /> },
  { key: 'payment', label: 'Payment Information', icon: <CreditCard className="w-5 h-5 mr-2 inline" /> },
];

function SectionContent({ section }: { section: string }) {
  switch (section) {
    case 'general':
      return (
        <div>
          <h2 className="text-xl font-semibold mb-6 mt-8">General</h2>
          <SettingsGeneralForm />
        </div>
      );
    case 'account':
      return (
        <div className='mt-8'>
          <SettingsAccountForm />
        </div>
      );
    case 'notification':
      return (
        <div className='mt-8'>
          <SettingsNotificationForm />
        </div>
      );
    case 'privacy':
      return (
        <div className='mt-8'>
          <SettingsDataPrivacySection />
        </div>
      );
    case 'language':
      return (
        <div className='mt-8'>
          <SettingsLanguageRegionForm />
        </div>
      );
    case 'members':
      return (
        <div className='mt-8'>
          <SettingsMembersSection />
        </div>
      );
    case 'roles':
      return (
        <div className='mt-8'>
          <SettingsRolesSection />
        </div>
      );
    case 'integrations':
      return (
        <div className='mt-8'>
          <SettingsIntegrationSection />
        </div>
      );
    case 'payment':
      return (
        <div className='mt-8'>
          <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-muted-foreground">[Payment information placeholder]</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function SettingsPage() {
  const [selected, setSelected] = useState('general');

  return (
    <div className="min-h-screen bg-background relative">
      <AppNavigation />
      {/* Sidebar (responsive) */}
      <aside className="hidden md:fixed md:top-16 md:left-0 md:w-72 md:h-[calc(100vh-4rem)] md:border-r md:border-border md:bg-white md:px-6 md:py-8 md:flex md:flex-col md:gap-2 md:z-40">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item, idx) =>
            item.separator ? (
              <hr key={idx} className="my-4 border-t border-border" />
            ) : (
              <button
                key={item.key}
                className={`flex items-center text-left px-4 py-2 rounded-lg font-medium transition-colors ${selected === item.key ? 'bg-orange-100 text-orange-600' : 'hover:bg-muted text-muted-foreground'}`}
                onClick={() => item.key && setSelected(item.key)}
              >
                {item.icon}
                {item.label}
                {[
                  "account",
                  "notification",
                  "privacy",
                  "language",
                  "members",
                  "roles",
                  "integrations",
                  "payment",
                ].includes(item.key ?? "") && <span className="ml-auto text-muted-foreground"></span>}
              </button>
            )
          )}
        </nav>
      </aside>
      {/* Mobile Sidebar (horizontal scrollable) */}
      <nav className="md:hidden mb-5 flex gap-2 overflow-x-auto px-2 py-4 bg-background border-b border-border sticky top-16 z-30">
        {sidebarItems.filter(i => !i.separator).map(item => (
          <button
            key={item.key}
            className={`flex items-center px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selected === item.key ? 'bg-orange-100 text-orange-600' : 'hover:bg-muted text-muted-foreground'}`}
            onClick={() => item.key && setSelected(item.key)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
      {/* Main Content */}
      <main className="md:ml-72 px-2 sm:px-4 md:px-12 py-6 md:py-12  max-w-full">
        <SectionContent section={selected} />
      </main>
    </div>
  );
} 