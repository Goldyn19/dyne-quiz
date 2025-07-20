import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

export function SettingsAccountForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form className="max-w-xl">
      <h2 className="text-2xl font-bold mb-2">Password Settings</h2>
      <p className="text-lg text-muted-foreground mb-8">Update password for enhanced account security</p>
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">Current Password</label>
        <div className="relative">
          <input
            type={showCurrent ? 'text' : 'password'}
            className="w-full px-5 py-4 border rounded-lg bg-background text-lg text-foreground h-14 pr-12"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowCurrent(v => !v)}
            tabIndex={-1}
          >
            {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">New Password</label>
        <div className="relative">
          <input
            type={showNew ? 'text' : 'password'}
            className="w-full px-5 py-4 border rounded-lg bg-background text-lg text-foreground h-14 pr-12"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowNew(v => !v)}
            tabIndex={-1}
          >
            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-lg font-semibold mb-2">Confirm New Password</label>
        <div className="relative">
          <input
            type={showConfirm ? 'text' : 'password'}
            className="w-full px-5 py-4 border rounded-lg bg-background text-lg text-foreground h-14 pr-12"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowConfirm(v => !v)}
            tabIndex={-1}
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="button" variant="outline" className="h-12 px-8 text-lg">Cancel</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-lg">Update Password</Button>
      </div>
    </form>
  );
} 