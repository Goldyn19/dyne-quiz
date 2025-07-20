import { useState } from 'react';
import { Button } from '@/components/ui/button';

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative w-12 h-7 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-primary' : 'bg-muted'}`}
      aria-pressed={checked}
    >
      <span
        className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-card border border-border shadow transition-transform duration-200 ${checked ? 'translate-x-5' : ''}`}
      />
    </button>
  );
}

export function SettingsNotificationForm() {
  const [mobilePush, setMobilePush] = useState(true);
  const [emailActivity, setEmailActivity] = useState(false);
  const [emailAlways, setEmailAlways] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [slackActivity, setSlackActivity] = useState(true);
  const [slackAlways, setSlackAlways] = useState(true);
  const [slackUpdates, setSlackUpdates] = useState(true);

  return (
    <form className="max-w-3xl">
      <h2 className="text-2xl font-bold mb-2">Notifications Alert</h2>
      <div className="mb-10">
        <div className="flex items-center justify-between mb-1">
          <span className="text-lg font-semibold">Mobile push notifications</span>
          <Toggle checked={mobilePush} onChange={() => setMobilePush(v => !v)} />
        </div>
        <p className="text-muted-foreground mb-4">Receive push notifications on mentions and comments via your mobile app</p>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">Email notifications</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Activity in your workspace</span>
              <Toggle checked={emailActivity} onChange={() => setEmailActivity(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Always send email notifications</span>
              <Toggle checked={emailAlways} onChange={() => setEmailAlways(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive emails about activity in your workspace, even when you are active on the app</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Email digests</span>
              <Toggle checked={emailDigest} onChange={() => setEmailDigest(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive email digest every 8 hours for changes to pages you are subscribed to</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Announcements and update emails</span>
              <Toggle checked={emailUpdates} onChange={() => setEmailUpdates(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive occasional emails about product launches and new features from notion</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">Slack notifications</h3>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Activity in your workspace</span>
              <Toggle checked={slackActivity} onChange={() => setSlackActivity(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Always send email notifications</span>
              <Toggle checked={slackAlways} onChange={() => setSlackAlways(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive emails about activity in your workspace, even when you are active on the app</p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Announcements and update emails</span>
              <Toggle checked={slackUpdates} onChange={() => setSlackUpdates(v => !v)} />
            </div>
            <p className="text-muted-foreground">Receive occasional emails about product launches and new features from notion</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-lg">Save Changes</Button>
      </div>
    </form>
  );
} 